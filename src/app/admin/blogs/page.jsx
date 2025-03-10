"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BlogPostsList = () => {
    const router = useRouter()
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const isProduction = process.env.NODE_ENV === "production";
    const apiUrl = isProduction
    ? "https://westcanadmin.onrender.com/admin/api"
    : "http://localhost:8081/api/blog";
    const token = typeof window !== 'undefined' ? localStorage.getItem("jwt_token") : null;
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(apiUrl,headers); // Adjust the endpoint if needed
                setPosts(response.data); // Adjust the data structure if needed
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch posts.');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleEdit = (postId) => {
        // Handle edit logic, such as redirecting to an edit page
        console.log(`Edit post with ID: ${postId}`);
        router.push(`/admin/blogs/${postId }`)
    };

    const handleDelete = async (postId) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            await axios.delete(`/api/blogs/${postId}`,headers); // Adjust the endpoint if needed
            setPosts(posts.filter(post => post._id !== postId)); // Remove post from state
            setError('');
        } catch (err) {
            setError('Failed to delete the post.');
        }
    };

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="w-full">
            <h1 className="text-lg font-bold mb-6">Managing Blogs</h1>
            {posts.length > 0 ? (
                <table className="w-full text-sm text-center border-collapse border border-gray-200">
                    <thead>
                        <tr className="text-white bg-[#b21b29]">
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Author</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {post.imageUrl && (
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{post.authorName}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(post.id)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No posts available</p>
            )}
        </div>
    );
};

export default BlogPostsList;
