"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string[];
  categoryName: string;
  subCategoryName: string;
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface SubCategory {
  id: string;
  name: string;
}

const ProductCategoriesPage = () => {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [allsubCategory, setAllSubCategory] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrl = isProduction
    ? "https://westcanadmin.onrender.com/admin/api"
    : "http://localhost:8081/admin/api";
  

  // Fetch categories and all available categories
  console.log("token: ",token)
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const headers = { Authorization: `Bearer ${token}` };
    
        const [productCategoryRes, allCategoryRes, allSubCategoryRes] = await Promise.all([
          fetch(`${apiUrl}/product-category`, { headers }),
          fetch(`${apiUrl}/category`, { headers }),
          fetch(`${apiUrl}/subcategory`, { headers }),
        ]);
    
        if (!productCategoryRes.ok || !allCategoryRes.ok || !allSubCategoryRes.ok) {
          throw new Error("Failed to fetch data");
        }
    
        const productCategoryData = await productCategoryRes.json();
        const allCategoryData = await allCategoryRes.json();
        const allSubCategoryData = await allSubCategoryRes.json();
    
        setProductCategories(productCategoryData);
        setAllCategories(allCategoryData);
        setAllSubCategory(allSubCategoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };    
    fetchData();
  }, [token]);

  // Handle delete category
  const handleDelete = async (id: string) => {
    if (!token) return;
    const res = await fetch(`${apiUrl}/product-category/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setProductCategories(productCategories.filter((category) => category.id !== id));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Categories</h1>
      <button
        onClick={() => router.push("/admin/productcategories/create")}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        Add a product category
      </button>
      {/* Product Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Description</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Image</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">SubCategory</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Category</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Featured</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Best Seller</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productCategories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-2 text-sm text-gray-700">{category.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{category.description}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {category.imageUrl && category.imageUrl.length > 0 ? (
                    <img
                      src={category.imageUrl[0]}
                      alt="Category"
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{category.subCategoryName}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{category.categoryName}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{category.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{category.bestSeller ? "Yes" : "No"}</td>
                <td className="px-4 py-2 text-sm">
                  <button
                    className="bg-yellow-500 text-white px-4 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition"
                    onClick={() => router.push(`/admin/productcategories/edit/${category.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleDelete(category.id)}
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

export default ProductCategoriesPage;
