'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SubCategory {
  id: string;
  name: string;
  description: string;
  images: string[];
  categoryId?: string;
  categoryName: string;
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
}

interface Category {
  id: string;
  name: string;
}

const SubCategoriesPage = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com/admin/api'
    : 'http://localhost:8081/admin/api';

  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
  // Fetch subcategories and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const subCategoryRes = await fetch(`${apiUrl}/subcategory`,{headers});
        const categoryRes = await fetch(`${apiUrl}/category`,{headers});

        if (!subCategoryRes.ok || !categoryRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const subCategoryData = await subCategoryRes.json();
        const categoryData = await categoryRes.json();

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

  // Handle delete subcategory
  const handleDelete = async (id: string) => {
    const headers = { Authorization: `Bearer ${token}` };
    const res = await fetch(`${apiUrl}/subcategory/${id}`, {headers, method: 'DELETE' });

    if (res.ok) {
      setSubCategories(subCategories.filter((subcategory) => subcategory.id !== id));
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading...</p>;
  }

  return (
    <div className="p-0">
      <h1 className="text-2xl font-semibold mb-6 pb-2">SubCategories</h1>

      {/* Form to add new subcategory */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => router.push('/admin/subcategories/create')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add a SubCategory
        </button>
      </div>

      {/* SubCategories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Description</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Images</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Category</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Tags</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Featured</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Best Seller</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subCategories.map((subcategory) => (
              <tr key={subcategory.id}>
                <td className="px-4 py-2 text-sm text-gray-700">{subcategory.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{subcategory.description}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <div className="flex space-x-2">
                    {subcategory.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {subcategory.categoryName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {subcategory.tags.join(', ')}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {subcategory.featured ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {subcategory.bestSeller ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-2 text-sm">
                  <button
                    className="bg-yellow-500 text-white px-4 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition"
                    onClick={() => router.push(`/admin/subcategories/edit/${subcategory.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleDelete(subcategory.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategoriesPage;
