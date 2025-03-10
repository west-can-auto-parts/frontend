"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const FeaturedProductsList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/featured-products');
        setProducts(response.data.featuredProducts); // Access the featuredProducts array
      } catch (err) {
        setError('Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    router.push(`admin/featured-products/${id}`); // Navigate to the edit page with the product ID
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/featured-products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      setError('Failed to delete product.');
    }
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="text-lg font-bold my-6">Featured Products</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className='bg-[#b21b29] text-white'>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Sub Category</th>
            <th className="py-2 px-4 border-b">Tags</th>
            <th className="py-2 px-4 border-b">Images</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b">{product.subCategory}</td>
              <td className="py-2 px-4 border-b">{product.tags.join(', ')}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex gap-2">
                  {product.imageUrls.slice(0, 3).map((url, index) => (
                    <img key={index} src={url} alt={`Uploaded ${index}`} className="w-16 h-auto" />
                  ))}
                </div>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedProductsList;
