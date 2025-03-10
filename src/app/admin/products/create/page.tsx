"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateProductPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    supplier: '',
    images: '',
    categoryId: '',
    properties: '{}', // Initialize as empty JSON object
    featured: 'true',
    bestSeller: 'true',
    tags: ''
  });
  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePropertyChange = (key: string, value: string) => {
    setFormData(prevState => {
      const properties = JSON.parse(prevState.properties) as Record<string, string>;
      properties[key] = value;
      return {
        ...prevState,
        properties: JSON.stringify(properties)
      };
    });
  };

  const addProperty = () => {
    // Adding a new property - this is a simplified approach
    // You may want to handle adding properties more dynamically
    setFormData(prevState => {
      const properties = JSON.parse(prevState.properties) as Record<string, string>;
      properties[`newKey${Date.now()}`] = ''; // Use a unique key for new property
      return {
        ...prevState,
        properties: JSON.stringify(properties)
      };
    });
  };

  const removeProperty = (key: string) => {
    setFormData(prevState => {
      const properties = JSON.parse(prevState.properties) as Record<string, string>;
      delete properties[key];
      return {
        ...prevState,
        properties: JSON.stringify(properties)
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', {
        ...formData,
        price: parseFloat(formData.price),
        images: formData.images.split(',').map(img => img.trim()), // Convert string to array
        tags: formData.tags.split(',').map(tag => tag.trim()), // Convert string to array
        featured: formData.featured === 'true', // Convert to boolean
        bestSeller: formData.bestSeller === 'true', // Convert to boolean
        properties: JSON.parse(formData.properties) // Convert JSON string back to object
      });
      router.push('/admin/products');
    } catch (err) {
      setError('Failed to create product.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Supplier</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Images (comma-separated URLs)</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Properties</h2>
          {Object.entries(JSON.parse(formData.properties) as Record<string, string>).map(([key, value]) => (
            <div key={key} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                value={key}
                onChange={(e) => handlePropertyChange(e.target.value, value)}
                className="p-2 border border-gray-300 rounded"
                placeholder="Key"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handlePropertyChange(key, e.target.value)}
                className="p-2 border border-gray-300 rounded"
                placeholder="Value"
              />
              <button
                type="button"
                onClick={() => removeProperty(key)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addProperty}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Property
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Featured</label>
          <select
            name="featured"
            value={formData.featured}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Best Seller</label>
          <select
            name="bestSeller"
            value={formData.bestSeller}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
