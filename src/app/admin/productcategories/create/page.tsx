'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary'

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string[];
  categoryId: string;
  subCategoryId: string;
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
  productPosition?: number;
  supplierPosition?: number;
}

interface Category {
  id: string;
  name: string;
}

interface SubCategory {
  id: string;
  name: string;
}

interface BrandPosition {
  brandId: string;
  position: number;
}

interface FormData {
  id: string;
  name: string;
  description: string;
  imageUrl: string[];
  categoryId: string;
  subCategoryId: string;
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
  brandPositions: BrandPosition[];
}

const ProductCategoriesPage = () => {
  const [productCategories, setProductCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [allsubCategory, setAllSubCategory] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    description: '',
    imageUrl: [],
    tags: [],
    featured: false,
    bestSeller: false,
    categoryId: '',
    subCategoryId: '',
    brandPositions: []
  });
  const [imageUrl, setImageUrl] = useState<string>('');
  const [propertyKey, setPropertyKey] = useState<string>('');
  const [propertyValue, setPropertyValue] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [brands, setBrands] = useState<Array<{ id: string, name: string }>>([]);

  const router = useRouter();
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com/admin/api'
    : 'http://localhost:8081/admin/api';

  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

  const handleImageUpload = (result: any) => {
    const imageUrl = result.info.secure_url;
    setFormData(prevData => ({
      ...prevData,
      imageUrl: [...prevData.imageUrl, imageUrl] // Append new image URL to the array
    }));
  };

  // Fetch categories and all available categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const allCategoryRes = await fetch(`${apiUrl}/category`, { headers });
        const allSubCategoryRes = await fetch(`${apiUrl}/subcategory`, { headers })

        if (!allCategoryRes.ok || !allSubCategoryRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const allCategoryData = await allCategoryRes.json();
        const allSubCategoryData = await allSubCategoryRes.json();

        setAllCategories(allCategoryData);
        setAllSubCategory(allSubCategoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch brands when component mounts
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(`${apiUrl}/suppliers/all`, { headers });
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image URL addition
  const handleAddImage = () => {
    if (imageUrl) {
      setFormData({
        ...formData,
        imageUrl: [...formData.imageUrl, imageUrl],
      });
      setImageUrl('');
    }
  };

  // Handle tag addition
  const handleAddTag = () => {
    if (tag) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
      setTag('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert brandPositions array to Map structure
    const brandAndPosition: { [key: string]: number } = {};
    formData.brandPositions.forEach(bp => {
      if (bp.brandId && bp.position) {
        brandAndPosition[bp.brandId] = bp.position;
      }
    });

    const dataToSend = {
      ...formData,
      brandAndPosition // This will be sent as a Map to the backend
    };

    const res = await fetch(`${apiUrl}/product-category/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(dataToSend),
    });

    if (res.ok) {
      router.refresh(); // Refresh the page to update the list
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddBrandPosition = () => {
    setFormData(prev => ({
      ...prev,
      brandPositions: [...prev.brandPositions, { brandId: '', position: 0 }]
    }));
  };

  const handleBrandPositionChange = (index: number, field: 'brandId' | 'position', value: string | number) => {
    const newBrandPositions = [...formData.brandPositions];
    newBrandPositions[index] = {
      ...newBrandPositions[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      brandPositions: newBrandPositions
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Categories</h1>

      {/* Form to add new product category */}
      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-xl mb-2">Add New Product Category</h2>
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
            style={{
              width: "500px", // Set dynamic height based on content
              resize: "none", // Disable manual resizing
              overflow: "hidden", // Prevent scrollbars
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block">Description</label>
          <textarea
            id="content"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            style={{
              width: "500px",
              resize: "none",
              overflow: "hidden",
            }}
            rows={6}
          />
        </div>
        <div className="mb-4">
          <label className="block">Images</label>
          <CldUploadWidget
            uploadPreset="my-next-cloudinary-app"
            onSuccess={handleImageUpload}
          >
            {({ open }) => (
              <button type="button" onClick={() => open()} className="bg-[#b91b29] text-white p-2 rounded">
                Upload an Image
              </button>
            )}
          </CldUploadWidget>
          <div className="mt-2">
            {formData.imageUrl.map((img, index) => (
              <p key={index}>{img}</p>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block">Tags</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border p-2 rounded w-full"
            style={{
              width: "500px", // Set dynamic height based on content
              resize: "none", // Disable manual resizing
              overflow: "hidden", // Prevent scrollbars
            }}
          />
          <button type="button" onClick={handleAddTag} className="bg-[#b91b29] text-white px-4 py-2 rounded">
            Add Tag
          </button>
          <div className="mt-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="inline-block bg-gray-200 p-1 mr-2 rounded">{tag}</span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block">SubCategory</label>
          <select
            name="subCategoryId"
            value={formData.subCategoryId || ''}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            style={{
              width: "500px",
              resize: "none",
              overflow: "hidden",
            }}
          >
            <option value="">Select SubCategory</option>
            {allsubCategory.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId || ''}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            style={{
              width: "500px", // Set dynamic height based on content
              resize: "none", // Disable manual resizing
              overflow: "hidden", // Prevent scrollbars
            }}
          >
            <option value="">Select Category</option>
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block">Featured</label>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="mr-2"
          />
          <label className="block">Best Seller</label>
          <input
            type="checkbox"
            name="bestSeller"
            checked={formData.bestSeller}
            onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })}
            className="mr-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Positions
          </label>
          {formData.brandPositions.map((bp, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <select
                value={bp.brandId}
                onChange={(e) => handleBrandPositionChange(index, 'brandId', e.target.value)}
                className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
                required
              style={{
                width: "500px", // Set dynamic height based on content
                resize: "none", // Disable manual resizing
                overflow: "hidden", // Prevent scrollbars
              }}
              >
                <option value="">Select Brand</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={bp.position}
                onChange={(e) => handleBrandPositionChange(index, 'position', parseInt(e.target.value))}
                min="1"
                placeholder="Position"
                className="block w-32 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                onClick={() => {
                  const newBrandPositions = formData.brandPositions.filter((_, i) => i !== index);
                  setFormData(prev => ({ ...prev, brandPositions: newBrandPositions }));
                }}
                className="flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddBrandPosition}
            className="flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
          >
            Add Brand Position
          </button>
        </div>
        <button type="submit" className="bg-[#b91b29] text-white px-4 py-2 rounded">
          Add Product Category
        </button>
      </form>

      {/* Product Categories Table */}
    </div>
  );
};

export default ProductCategoriesPage;
