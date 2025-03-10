"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';

const AddFeaturedProduct = () => {
  const [formData, setFormData] = useState({
    description: '',
    extendedDescription: '',
    imageUrls: [], 
    tags: [],
    category: '',
    subCategory: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tagInput, setTagInput] = useState(''); // To hold the current tag input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('/api/featured-products', formData);

      if (response.status === 200) {
        alert('Product Added Successfully');
        setSuccess('Featured product added successfully!');
        setFormData({
          description: '',
          extendedDescription: '',
          imageUrls: [],
          tags: [],
          category: '',
          subCategory: ''
        });
      }
    } catch (err) {
      setError('Failed to add featured product. Please try again.');
    }
  };

  return (
    <div className="w-full mx-auto p-0">
      <h1 className="text-lg font-bold my-6">Add Featured Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="extendedDescription" className="block text-sm font-medium text-gray-700">Extended Description</label>
          <textarea
            id="extendedDescription"
            name="extendedDescription"
            value={formData.extendedDescription}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
          />
        </div>
        <div>
          <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700">Images</label>
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
        </div>
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
        <div>
          <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">Sub Category</label>
          <select
            id="subCategory"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Sub Category</option>
            {formData.category &&
              parts.find(cat => cat.title === formData.category)?.subParts.map((subCategory, index) => (
                <option key={index} value={subCategory.listing}>{subCategory.listing}</option>
              ))
            }
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFeaturedProduct;
