// src/app/admin/products/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.products);
      } catch (err) {
        setError('Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((product: any) => product.id !== id));
    } catch (err) {
      setError('Failed to delete product.');
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <button
        onClick={() => router.push('/admin/products/new')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add New Product
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.title}</td>
              <td className="py-2 px-4 border-b">${product.price?.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => router.push(`/admin/products/${product.id}`)}
                  className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
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

export default ProductsPage;
