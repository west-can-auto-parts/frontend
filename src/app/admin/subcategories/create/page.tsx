'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

interface ProdcutCatgoryPosition {
  brandId: string;
  position: number;
}

interface SubCategory {
  id: string;
  name: string;
  description: string;
  images: string[];
  parentId?: string;
  properties: { key: string; value: string }[];
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
  productCategoryPositions:ProdcutCatgoryPosition[]
}

interface Category {
  id: string;
  name: string;
}

const SubCategoriesPage = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<SubCategory>({
    id: '', // Assuming ID is managed by the backend and not needed on the form
    name: '',
    description: '',
    images: [],
    parentId: '',
    properties: [],
    tags: [],
    featured: true,
    bestSeller: true,
    productCategoryPositions: []
  });
  const [imageUrl, setImageUrl] = useState<string>('');
  const [propertyKey, setPropertyKey] = useState<string>('');
  const [propertyValue, setPropertyValue] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [productCategories, setProductCategories] = useState<Array<{ id: string, name: string }>>([]);

  const router = useRouter();

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com/admin/api'
    : 'http://localhost:8081/admin/api';

  const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;

  // Fetch subcategories and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const subCategoryRes = await fetch(`${apiUrl}/subcategory`, { headers });
        const categoryRes = await fetch(`${apiUrl}/category`, { headers });
        if (!subCategoryRes.ok || !categoryRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const subCategoryData = await subCategoryRes.json();
        const categoryData = await categoryRes.json();
        console.log(categoryData)
        setSubCategories(subCategoryData);
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
      const fetchBrands = async () => {
        try {
          const headers = { Authorization: `Bearer ${token}` };
          const response = await fetch(`${apiUrl}/product-category`, { headers });
          const data = await response.json();
          setProductCategories(data);
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

  const handleImageUpload = (result: any) => {
    const imageUrl = result.info.secure_url;
    setFormData(prevData => ({
      ...prevData,
      images: [...prevData.images, imageUrl] // Append new image URL to the array
    }));
  };

  // Handle property addition
  const handleAddProperty = () => {
    if (propertyKey && propertyValue) {
      setFormData({
        ...formData,
        properties: [...formData.properties, { key: propertyKey, value: propertyValue }],
      });
      setPropertyKey('');
      setPropertyValue('');
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${apiUrl}/subcategory/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.refresh(); // Refresh the page to update the list
    }
  };

  // Handle delete subcategory
  const handleDelete = async (id: string) => {
    const res = await fetch(`${apiUrl}/subcategory/delete/${id}`, { method: 'DELETE' });

    if (res.ok) {
      setSubCategories(subCategories.filter((subcategory) => subcategory.id !== id));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleProductCategoryPositionChange = (index: number, field: 'brandId' | 'position', value: string | number) => {
    const newBrandPositions = [...formData.productCategoryPositions];
    newBrandPositions[index] = {
      ...newBrandPositions[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      productCategoryPositions: newBrandPositions
    }));
  };

  const handleAddProductCategoryPosition = () => {
    setFormData(prev => ({
      ...prev,
      productCategoryPositions: [...prev.productCategoryPositions, { brandId: '', position: 0 }]
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">SubCategories</h1>

      {/* Form to add new subcategory */}
      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-xl mb-2">Add New SubCategory</h2>
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
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
          <div className="mt-2 flex flex-wrap gap-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover rounded" />
              </div>
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
          />
          <button type="button" onClick={handleAddTag} className="bg-[#b91b29] text-white px-4 py-2 rounded mt-2">
            Add Tag
          </button>
          <div className="mt-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="inline-block bg-gray-200 p-1 mr-2 rounded">{tag}</span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block">Category</label>
          <select
            name="parentId"
            value={formData.parentId || ''}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
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
            ProductCategory Positions
          </label>
          {formData.productCategoryPositions.map((bp, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <select
                value={bp.brandId}
                onChange={(e) => handleProductCategoryPositionChange(index, 'brandId', e.target.value)}
                className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
                required
                style={{
                  width: "500px", // Set dynamic height based on content
                  resize: "none", // Disable manual resizing
                  overflow: "hidden", // Prevent scrollbars
                }}
              >
                <option value="">Select Brand</option>
                {productCategories.map(productCategories => (
                  <option key={productCategories.id} value={productCategories.id}>
                    {productCategories.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={bp.position}
                onChange={(e) => handleProductCategoryPositionChange(index, 'position', parseInt(e.target.value))}
                min="1"
                placeholder="Position"
                className="block w-32 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                onClick={() => {
                  const newBrandPositions = formData.productCategoryPositions.filter((_, i) => i !== index);
                  setFormData(prev => ({ ...prev, productCategoryPositions: newBrandPositions }));
                }}
                className="flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProductCategoryPosition}
            className="flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
          >
            Add ProductCategory Position
          </button>
        </div>
        <button type="submit" className="bg-[#b91b29] text-white px-4 py-2 rounded">
          Add SubCategory
        </button>
      </form>
    </div>
  );
};

export default SubCategoriesPage;
