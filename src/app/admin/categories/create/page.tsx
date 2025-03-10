'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

const CreateCategoryPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [parentId, setParentId] = useState<string | null>(null);
  const [parentCategories, setParentCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [properties, setProperties] = useState<{ key: string; value: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com/admin/api'
    : 'http://localhost:8081/admin/api';


  const token = typeof window !== 'undefined' ? localStorage.getItem("jwt_token") : null;
  const handleCreate = async () => {
    if (!name) {
      setError('Category name is required.');
      return;
    }

    try {
      await fetch(`${apiUrl}/category/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name,
          description,
          images,
          parentId,
          tags,
          featured,
          bestSeller,
          properties
        }),
      });
      setSuccess('Category created successfully.');
      setError(null);
      setName('');
      setDescription('');
      setImages([]);
      setParentId(null);
      setTags([]);
      setFeatured(false);
      setBestSeller(false);
      setProperties([]);
      setTimeout(() => router.push('/admin/categories'), 2000);
    } catch (error) {
      setError('Error creating category.');
    }
  };

  const addProperty = () => {
    setProperties([...properties, { key: '', value: '' }]);
  };

  const handlePropertyChange = (index: number, field: 'key' | 'value', value: string) => {
    const newProperties = [...properties];
    newProperties[index] = { ...newProperties[index], [field]: value };
    setProperties(newProperties);
  };

  const handleImageUpload = (result: any) => {
    const imageUrl = result.info.secure_url;
    setImages(prevImages => [...prevImages, imageUrl]); // Append new image URL to the array
  };

  const removeProperty = (index: number) => {
    const newProperties = properties.filter((_, i) => i !== index);
    setProperties(newProperties);
  };

  return (
    <div className=" mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Category</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Category name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
          />
        </div>

        <div>
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
            {images.map((url, index) => (
              <img key={index} src={url} alt={`Uploaded image ${index}`} className="w-32 h-32 object-cover mb-2 rounded-md" />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            value={tags.join(', ')}
            onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tags (comma-separated)"
          />
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-700">Featured</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={bestSeller}
              onChange={(e) => setBestSeller(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-700">Best Seller</span>
          </label>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Properties</h2>
          {properties.map((property, index) => (
            <div key={index} className="flex gap-4 mb-2 items-center">
              <input
                type="text"
                value={property.key}
                onChange={(e) => handlePropertyChange(index, 'key', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Key"
              />
              <input
                type="text"
                value={property.value}
                onChange={(e) => handlePropertyChange(index, 'value', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Value"
              />
              <button
                type="button"
                onClick={() => removeProperty(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addProperty}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600"
          >
            Add Property
          </button>
        </div>

        <button
          onClick={handleCreate}
          className="w-fit px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Create
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default CreateCategoryPage;
