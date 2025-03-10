"use client";

import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import SuccessModal from '@/components/SuccessModal'
import FailureModal from '@/components/FailureModal';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateBlog = () => {


  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': ['Montserrat','Raleway'] }],
      [{ 'align': [] }],

      ['clean']
    ],
  };

  // Define the formats supported by the toolbar
  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'check', 'script', 'align',
    'link', 'image', 'video', 'color', 'background', 'direction'
  ];


  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    categories: [],
    tags: [],
    authorName: '',
    authorLinkedin: '',
  });

  const [newTag, setNewTag] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [previewUrl, setPreviewUrl] = useState(''); // State for image preview
  const [publicId, setPublicId] = useState('')
  const isProduction = process.env.NODE_ENV === "production";
    const apiUrl = isProduction
    ? "https://westcanadmin.onrender.com/admin/api"
    : "http://localhost:8081/api/blog";
    const token = typeof window !== 'undefined' ? localStorage.getItem("jwt_token") : null;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  // Callback function for handling Cloudinary upload result
  const handleImageUpload = (result) => {
    if (result.event === 'success') {
      const imageUrl = result.info.secure_url;
      setFormData({ ...formData, imageUrl });
      setPreviewUrl(imageUrl); // Set preview URL to the uploaded image
    }
  };

  const handleTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const addCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData({ ...formData, categories: [...formData.categories, newCategory.trim()] });
      setNewCategory('');
    }
  };

  const removeCategory = (category) => {
    setFormData({ ...formData, categories: formData.categories.filter(c => c !== category) });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(apiUrl, formData,headers);
      // Reset form after successful submission
      setFormData({
        title: '',
        content: '',
        imageUrl: '',
        categories: [],
        tags: [],
        authorName: '',
        authorLinkedin: '',
      });
      setPreviewUrl(''); // Clear preview after successful submission

      alert("Blog Added Successfully");
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error creating blog:', error);
      setIsFailureModalOpen(true);
    }
  };

  return (
    <div className=" mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <ReactQuill
          modules={quillModules}
          formats={quillFormats}
          value={formData.content}
          onChange={handleContentChange}
          placeholder="Content"
          className="w-full border rounded-lg"

        />

        {publicId && <CldImage src={publicId} alt={publicId} width={"300"} height={"300"} />}
        <CldUploadWidget
          uploadPreset="my-next-cloudinary-app"

          onSuccess={({ event, info }) => {
            if (event === "success") {
              const imageUrl = info.secure_url; // Store the secure_url from the upload result
              setPublicId(info.public_id);
              setPreviewUrl(imageUrl);
              setFormData((prevFormData) => ({
                ...prevFormData,
                imageUrl: imageUrl, // Correctly set the imageUrl using the secure_url
              }));

            }
            console.log(event, "event");
            console.log(info, "info");
            setPreviewUrl(info.secure_url)
            console.log(previewUrl)
          }}
        >
          {({ open }) => (
            <button type="button" onClick={() => open()} className="bg-gray-200 p-2 rounded">
              Upload an Image
            </button>
          )}
        </CldUploadWidget>

        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="w-full mt-4 rounded-lg" />
        )}

        <input
          type="text"
          value={newCategory}
          onChange={handleCategoryChange}
          placeholder="Add Category"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={addCategory}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Add Category
        </button>
        {formData.categories.length > 0 && (
          <ul className="list-disc pl-5 flex gap-4">
            {formData.categories.map((category, index) => (
              <li key={index} className="flex justify-between items-center gap-4">
                {category}
                <button
                  type="button"
                  onClick={() => removeCategory(category)}
                  className="text-red-500 hover:underline"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}

        <input
          type="text"
          value={newTag}
          onChange={handleTagChange}
          placeholder="Add Tag"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={addTag}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Add Tag
        </button>
        {formData.tags.length > 0 && (
          <ul className="list-disc pl-5">
            {formData.tags.map((tag, index) => (
              <li key={index} className="flex justify-between items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <input
          type="text"
          name="authorName"
          value={formData.authorName}
          onChange={handleChange}
          placeholder="Author Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="authorLinkedin"
          value={formData.authorLinkedin}
          onChange={handleChange}
          placeholder="Author LinkedIn"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Create
        </button>
      </form>
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
      <FailureModal isOpen={isFailureModalOpen} onClose={() => setIsFailureModalOpen(false)} />
    </div >
  );
};

export default CreateBlog;
