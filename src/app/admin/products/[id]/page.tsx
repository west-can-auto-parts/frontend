// src/app/admin/products/[id]/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const EditProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    supplier: '',
    images: '',
    categoryId: '',
    properties: '',
    featured: true,
    bestSeller: true,
    tags: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        const product = response.data.product;

        setFormData({
          title: product.title,
          description: product.description || '',
          price: product.price || '',
          supplier: product.supplier,
          images: (product.images || []).join(', '),
          categoryId: product.categoryId || '',
          properties: JSON.stringify(product.properties) || '',
          featured: product.featured,
          bestSeller: product.bestSeller,
          tags: (product.tags || []).join(', ')
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/products/${id}`, {
        ...formData,
        price: parseFloat(formData.price),
        images: formData.images.split(',').map(img => img.trim()),
        tags: formData.tags.split(',').map(tag => tag.trim()),
        properties: JSON.parse(formData.properties) // Convert string back to JSON object
      });
      router.push('/admin/products');
    } catch (err) {
      setError('Failed to update product.');
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
          <label className="block text-sm font-medium text-gray-700">Category ID</label>
          <input
            type="text"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Properties (JSON)</label>
          <textarea
            name="properties"
            value={formData.properties}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Featured</label>
          <select
            name="featured"
            value={formData.featured?"true":"false"}
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
            value={formData.bestSeller?"true":"false"}
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
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
