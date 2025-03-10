"use client";

import React, { useState } from 'react';
import axios from 'axios';

import { CldUploadWidget } from 'next-cloudinary';

const AddProductCategory = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [tagInput, setTagInput] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrls: '',
        tags: [],
        category: '',
        isFeatured: true,
        isBestSeller: false,
    });

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const addTag = () => {
        if (tagInput.trim() !== '' && !formData.tags.includes(tagInput.trim())) {
            setFormData((prevData) => ({
                ...prevData,
                tags: [...prevData.tags, tagInput.trim()]
            }));
            setTagInput(''); // Clear the tag input field
        }
    };

    const handleImageUpload = (result) => {
        const imageUrl = result.info.secure_url;
        setFormData(prevData => ({
            ...prevData,
            imageUrls: [...prevData.imageUrls, imageUrl] // Append new image URL to the array
        }));
        console.log(formData.imageUrls)
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Split imageUrls and tags by commas and trim whitespace

        try {
            console.log(formData)
            const response = await axios.post('/api/product-categories', formData);
            if (response.status === 200) {
                alert('Product category added successfully');
                setFormData({
                    title: '',
                    description: '',
                    imageUrls: '',
                    tags: [],
                    category: '',
                    isFeatured: true,
                    isBestSeller: false,
                });
            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Failed to add product category:', error);
            alert('Failed to add product category');
        }
    };

    return (
        <div className="w-1/2 mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add Product Category</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 rounded"
                    required
                />
                <CldUploadWidget
                    uploadPreset="my-next-cloudinary-app"
                    onSuccess={handleImageUpload}
                >
                    {({ open }) => (
                        <button type="button" onClick={() => open()} className="bg-gray-200 p-2 rounded">
                            Upload an Image
                        </button>
                    )}
                </CldUploadWidget>
                {/* Display all uploaded images */}
                {formData.imageUrls.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4">
                        {formData.imageUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Uploaded ${index}`} className="w-48 h-auto" />
                        ))}
                    </div>
                )}
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={addTag}
                            className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                            Add Tag
                        </button>
                    </div>
                    <div className="mt-2">
                        {formData.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-200 px-2 py-1 rounded-full mr-2">{tag}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select Category</option>
                        {parts.map((category, index) => (
                            <option key={index} value={category.title}>{category.title}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center">
                    <label className="mr-2">Featured:</label>
                    <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="mr-4"
                    />
                    <label className="mr-2">Best Seller:</label>
                    <input
                        type="checkbox"
                        name="isBestSeller"
                        checked={formData.isBestSeller}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#b21b29] text-white px-6 py-2 rounded-md hover:bg-[#a1121d] transition duration-300"
                >
                    Add Product Category
                </button>
            </form>
        </div>
    );
};

export default AddProductCategory;
