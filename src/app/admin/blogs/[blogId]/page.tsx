"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const EditBlogPage = ({ params }: { params: { blogId: string } }) => {

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
      [{ 'font': ['Montserrat', 'Raleway'] }],
      [{ 'align': [] }],

      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'check', 'script', 'align',
    'link', 'image', 'video', 'color', 'background', 'direction'
  ];

  const handleContentChange = (value: any) => {
    setFormData({ ...formData, content: value });
  };


  const { blogId } = params;
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    categories: '',
    tags: '',
    authorName: '',
    authorLinkedin: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isProduction = process.env.NODE_ENV === "production";
    const apiUrl = isProduction
    ? "https://westcanadmin.onrender.com/admin/api"
    : "http://localhost:8081/api/blog";
    const token = typeof window !== 'undefined' ? localStorage.getItem('') : null;
  useEffect(() => {
    // Fetch blog post details based on ID
    const fetchBlogPost = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${apiUrl}/${blogId}`,{headers});
        const post = response.data;

        // Populate form data with existing post details
        setFormData({
          title: post.title,
          content: post.content,
          imageUrl: post.imageUrl || '',
          categories: post.categories.join(', '),
          tags: post.tags.join(', '),
          authorName: post.authorName,
          authorLinkedin: post.authorLinkedin || ''
        });
      } catch (err) {
        setError('Failed to fetch blog post details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [blogId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Convert categories and tags back to arrays
      const updatedData = {
        ...formData,
        categories: formData.categories.split(',').map(category => category.trim()),
        tags: formData.tags.split(',').map(tag => tag.trim())
      };

      await axios.patch(`${apiUrl}/${blogId}`, updatedData);
      router.push('/admin/blogs');
    } catch (err) {
      setError('Failed to update the blog post. Please try again.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading blog post details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <ReactQuill
          modules={quillModules}
          formats={quillFormats}
          value={formData.content}
          onChange={handleContentChange}
          placeholder="Content"
          className="w-full border rounded-lg"

        />
        {/* <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows={6}
          />
        </div> */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700">Categories (comma-separated)</label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">Author Name</label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="authorLinkedin" className="block text-sm font-medium text-gray-700">Author LinkedIn (optional)</label>
          <input
            type="text"
            id="authorLinkedin"
            name="authorLinkedin"
            value={formData.authorLinkedin}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPage;
