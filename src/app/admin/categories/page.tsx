// src/app/admin/categories/page.tsx

"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanadmin.onrender.com/admin/api'
    : 'http://localhost:8081/admin/api';
  const token = typeof window !== 'undefined' ? localStorage.getItem("jwt_token") : null;
  useEffect(() => {
    async function fetchCategories() {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(`${apiUrl}/category`,{headers});
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        await fetch(`${apiUrl}/category/delete/${id}`, {headers, method: 'DELETE' });
        setCategories(categories.filter(cat => cat.id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-gray-500">Loading...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-500">{error}</p></div>;
  if (categories.length === 0) return <div className="flex justify-center items-center h-screen"><p className="text-gray-500">No categories found.</p></div>;

  return (
    <div className=" min-h-screen">
      <div className=" mx-auto bg-white rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Categories Management</h1>
        <Link href="/admin/categories/create" className="mb-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create New Category
        </Link>
        <table className="w-full border-collapse divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Category Name</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Description</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Images</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Tags</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Featured</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Best Seller</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {categories.map(category => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-900">
                  <Link href={`/admin/categories/${category.id}`} className="text-blue-600 hover:underline">{category.name}</Link>
                </td>
                <td className="px-4 py-2 text-gray-900">{category.description || 'N/A'}</td>
                <td className="px-4 py-2 text-gray-900">
                  {category.images.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {category.images.map((img: string, index: number) => (
                        <li key={index}>
                          <a href={img} target="_blank" className="text-blue-600 hover:underline"><img src={img} className='h-12 w-12 object-cover object-center' alt="" /></a>
                        </li>
                      ))}
                    </ul>
                  ) : 'No Images'}
                </td>
                <td className="px-4 py-2 text-gray-900">
                  {category.tags?.length > 0 ? category.tags.join(', ') : 'No Tags'}
                </td>

                <td className="px-4 py-2 text-gray-900">{category.featured ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 text-gray-900">{category.bestSeller ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:underline"
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

export default AdminCategoriesPage;
