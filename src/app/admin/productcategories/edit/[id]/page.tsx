'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

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
  brandPositions: BrandPosition[];
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

interface Brand {
  id: string;
  name: string;
}

const EditProductCategoryPage = ({ params }: { params: { id: string } }) => {
  const [formData, setFormData] = useState<ProductCategory>({
    id: '',
    name: '',
    description: '',
    imageUrl: [],
    tags: [],
    featured: false,
    bestSeller: false,
    categoryId: '',
    subCategoryId: '',
    brandPositions: [],
  });
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [allsubCategory, setAllSubCategory] = useState<SubCategory[]>([]);
  const [tag, setTag] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [brands, setBrands] = useState<Brand[]>([]);

  const router = useRouter();
  const { id } = params;
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com/admin/api'
    : 'http://localhost:8081/admin/api';
  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const productCategoryRes = await fetch(`${apiUrl}/product-category/${id}`, { headers });
        const allCategoryRes = await fetch(`${apiUrl}/category`, { headers });
        const allSubCategoryRes = await fetch(`${apiUrl}/subcategory`, { headers });
        const brandsRes = await fetch(`${apiUrl}/suppliers/all`, { headers });

        if (!productCategoryRes.ok || !allCategoryRes.ok || !allSubCategoryRes.ok || !brandsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const productCategoryData = await productCategoryRes.json();
        const allCategoryData = await allCategoryRes.json();
        const allSubCategoryData = await allSubCategoryRes.json();
        const brandsData = await brandsRes.json();

        // Set the form data with proper structure and default values
        setFormData({
          id: productCategoryData.id || '',
          name: productCategoryData.name || '',
          description: productCategoryData.description || '',
          imageUrl: productCategoryData.imageUrl || [],
          categoryId: productCategoryData.categoryId || '',
          subCategoryId: productCategoryData.subCategoryId || '',
          tags: productCategoryData.tags || [],
          featured: productCategoryData.featured || false,
          bestSeller: productCategoryData.bestSeller || false,
          brandPositions: productCategoryData.brandAndPosition 
            ? Object.entries(productCategoryData.brandAndPosition).map(([brandId, position]) => ({
                brandId,
                position: Number(position)
              }))
            : []
        });

        setAllCategories(allCategoryData);
        setAllSubCategory(allSubCategoryData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchData();
    }
  }, [id, token, apiUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox' && (e.target as HTMLInputElement).checked !== undefined) {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      imageUrl: [...(prevData.imageUrl || []), imageUrl]
    }));
  };

  const handleAddTag = () => {
    if (tag) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
      setTag('');
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const brandAndPosition = formData.brandPositions.reduce((acc, { brandId, position }) => {
        if (brandId && position) {
          acc[brandId] = position;
        }
        return acc;
      }, {} as { [key: string]: number });

      // Prepare data for API
      const dataToSend = {
        ...formData,
        brandAndPosition: Object.keys(brandAndPosition).length > 0 ? brandAndPosition : null,
        brandPositions: undefined
      };

      const res = await fetch(`${apiUrl}/product-category/update/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error('Failed to update product category');
      router.push('/admin/productcategories');
    } catch (error) {
      console.error('Error updating product category:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product Category</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-[500px] rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="block w-[500px] rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
            rows={6}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
          <CldUploadWidget
            uploadPreset="my-next-cloudinary-app"
            onSuccess={handleImageUpload}
          >
            {({ open }) => (
              <button 
                type="button" 
                onClick={() => open()} 
                className="flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
              >
                Upload an Image
              </button>
            )}
          </CldUploadWidget>
          <div className="mt-2 flex flex-wrap gap-4">
            {formData.imageUrl?.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="block w-[500px] rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
          />
          <button 
            type="button" 
            onClick={handleAddTag}
            className="mt-2 w-[500px] flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
          >
            Add Tag
          </button>
          <div className="mt-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="inline-block bg-gray-200 p-1 mr-2 rounded">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">SubCategory</label>
          <select
            name="subCategoryId"
            value={formData.subCategoryId || ''}
            onChange={handleInputChange}
            className="block w-[500px] rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId || ''}
            onChange={handleInputChange}
            className="block w-[500px] rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-red-800 focus:ring-red-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Best Seller</label>
          <input
            type="checkbox"
            name="bestSeller"
            checked={formData.bestSeller}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-red-800 focus:ring-red-800"
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
                className="block w-[60%] rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
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
                className="block w-[25%] rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                onClick={() => {
                  const newBrandPositions = formData.brandPositions.filter((_, i) => i !== index);
                  setFormData(prev => ({ ...prev, brandPositions: newBrandPositions }));
                }}
                className="w-[15%] flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddBrandPosition}
            className="w-[500px] flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
          >
            Add Brand Position
          </button>
        </div>

        <button 
          type="submit" 
          className="w-[500px] flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
        >
          Update Product Category
        </button>
      </form>
    </div>
  );
};

export default EditProductCategoryPage;