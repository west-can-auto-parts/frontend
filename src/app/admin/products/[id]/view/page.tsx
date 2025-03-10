// src/app/admin/products/[id]/view/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <p className="text-lg font-semibold">Price: ${product.price?.toFixed(2)}</p>
      <p className="mt-2"><strong>Description:</strong> {product.description}</p>
      <p className="mt-2"><strong>Supplier:</strong> {product.supplier}</p>
      <p className="mt-2"><strong>Category ID:</strong> {product.categoryId}</p>
      <p className="mt-2"><strong>Featured:</strong> {product.featured ? 'Yes' : 'No'}</p>
      <p className="mt-2"><strong>Best Seller:</strong> {product.bestSeller ? 'Yes' : 'No'}</p>
      <div className="mt-4">
        <strong>Images:</strong>
        <div className="space-y-2">
          {product.images.map((img: string) => (
            <img key={img} src={img} alt={product.title} className="w-32 h-32 object-cover" />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <strong>Tags:</strong>
        <ul className="list-disc list-inside">
          {product.tags.map((tag: string) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <strong>Properties:</strong>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(product.properties, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ViewProductPage;
