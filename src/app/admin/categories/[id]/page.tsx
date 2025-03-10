"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

// Define types for the category and parent category
interface Property {
  key: string;
  value: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  images: string[];
  parentId: string | null;
  properties: Property[];
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
}

interface ParentCategory {
  id: string;
  name: string;
}

const CategoryPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [parentCategories, setParentCategories] = useState<ParentCategory[]>([]);
  const [newProperty, setNewProperty] = useState<Property>({ key: '', value: '' });
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleImageUpload = (result: any) => {
    const imageUrl = result.info.secure_url;
    setImages(prevImages => [...prevImages, imageUrl]); // Append new image URL to the array
  };

  useEffect(() => {
    async function fetchCategory() {
      if (id) {
        try {
          const response = await fetch(`/api/categories/${id}`);
          if (!response.ok) throw new Error('Failed to fetch category');
          const data: Category = await response.json();
          if (Object.keys(data).length === 0) throw new Error('Category not found');
          setCategory(data);
          setImages(data.images); // Initialize images state with existing category images
          setTags(data.tags); // Initialize tags state with existing category tags
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    }

    async function fetchParentCategories() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch parent categories');
        const data: ParentCategory[] = await response.json();
        setParentCategories(data.filter((cat: ParentCategory) => cat.id !== id)); // Exclude current category from parent options
      } catch (error: any) {
        setError(error.message);
      }
    }

    fetchCategory();
    fetchParentCategories();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (category) {
      setCategory({ ...category, [e.target.name]: e.target.value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category) {
      setCategory({ ...category, [e.target.name]: e.target.checked });
    }
  };

  const handlePropertiesChange = (index: number, field: 'key' | 'value', value: string) => {
    if (category) {
      const updatedProperties = [...category.properties];
      updatedProperties[index] = { ...updatedProperties[index], [field]: value };
      setCategory({ ...category, properties: updatedProperties });
    }
  };

  const addProperty = () => {
    if (category) {
      setCategory({ ...category, properties: [...category.properties, newProperty] });
      setNewProperty({ key: '', value: '' });
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
    setTags(tagsArray);
  };

  const handleSave = async () => {
    try {
      await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...category, images, tags }), // Include images and tags in the request
      });
      router.push('/categories');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      {category && (
        <div>
          <input
            type="text"
            name="name"
            value={category.name || ''}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded"
            placeholder="Category Name"
          />
          <textarea
            name="description"
            value={category.description || ''}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded"
            placeholder="Description"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
          <CldUploadWidget
            uploadPreset="my-next-cloudinary-app"
            onSuccess={handleImageUpload}
          >
            {({ open }) => (
              <button type="button" onClick={() => open()} className="bg-gray-200 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300">
                Upload Images
              </button>
            )}
          </CldUploadWidget>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Uploaded Images</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((img, index) => (
                <img key={index} src={img} alt={`Uploaded Image ${index}`} className="w-24 h-24 object-cover border rounded" />
              ))}
            </div>
          </div>
          <select
            name="parentId"
            value={category.parentId || ''}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded"
          >
            <option value="">None</option>
            {parentCategories.map((parent: ParentCategory) => (
              <option key={parent.id} value={parent.id}>
                {parent.name}
              </option>
            ))}
          </select>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Properties</h2>
            {(category.properties || []).map((prop: Property, index: number) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={prop.key || ''}
                  onChange={(e) => handlePropertiesChange(index, 'key', e.target.value)}
                  className="mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Property Key"
                />
                <input
                  type="text"
                  value={prop.value || ''}
                  onChange={(e) => handlePropertiesChange(index, 'value', e.target.value)}
                  className="mr-2 p-2 border border-gray-300 rounded"
                  placeholder="Property Value"
                />
              </div>
            ))}
            <div className="flex mb-4">
              <input
                type="text"
                value={newProperty.key}
                onChange={(e) => setNewProperty({ ...newProperty, key: e.target.value })}
                className="mr-2 p-2 border border-gray-300 rounded"
                placeholder="New Property Key"
              />
              <input
                type="text"
                value={newProperty.value}
                onChange={(e) => setNewProperty({ ...newProperty, value: e.target.value })}
                className="mr-2 p-2 border border-gray-300 rounded"
                placeholder="New Property Value"
              />
              <button
                onClick={addProperty}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Property
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input
              type="text"
              value={tags.join(', ')}
              onChange={handleTagsChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tags (comma-separated)"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="featured"
              checked={category.featured || false}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="featured">Featured</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="bestSeller"
              checked={category.bestSeller || false}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="bestSeller">Best Seller</label>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
