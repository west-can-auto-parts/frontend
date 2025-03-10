"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners'; // Import the spinner

const BlogPost = ({ params }) => {
  const id = params.blogId;
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com/api/blog'
    : 'http://localhost:8080/api/blog';
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${apiUrl}/${id}`);
        const data = await response.json();
        setBlog(data); // Assuming the response structure as shown in the API response
      } catch (error) {
        console.error("Error fetching the blog:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllBlogs = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
    fetchAllBlogs();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#b12b29" loading={loading} size={50} />
      </div>
    );
  }

  if (!blog) {
    return <p>Blog post not found.</p>;
  }

  return (
    <main className="bg-gray-100 py-12">
      <section className="w-10/12 mx-auto flex flex-wrap md:flex-nowrap gap-8">
        {/* Blog Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white shadow-md rounded-lg">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-[50vh] object-cover mb-4 rounded-t" />
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
              <p className="text-xs text-gray-500 mb-4">By {blog.authorName} on {new Date(blog.createdAt).toLocaleDateString()}</p>
              <div className="text-gray-700 text-base leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          {/* Categories */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className='flex gap-2 flex-wrap'>
              {blog.categories.map((category, index) => (
                <li key={index} className="mb-2">
                  <a href={`/category/${category.toLowerCase()}`} className="bg-[#b12b29] text-white px-2 py-1 rounded-md hover:underline">{category}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Blogs */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Latest Blogs</h3>
            {blogs.slice(0, 4).map(post => (
              <div key={post._id} className="flex items-center mb-4">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-sm font-semibold">{post.title}</h4>
                  <Link href={`/blogs/${post._id}`} className="text-[#b12b29] hover:underline text-xs">Read More</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <ul className='flex gap-2 flex-wrap text-xs'>
              {blog.tags.map((tag, index) => (
                <li key={index} className="mb-2">
                  <a href={`/tag/${tag.toLowerCase()}`} className="bg-[#b12b29] text-white px-2 py-1 rounded-md hover:underline">{tag}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Posts */}
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
