"use client"

import React, { useState, useEffect } from 'react';
import { BlogSearch } from './_components/blog-search';
import { NewBlogs } from './_components/new-blogs';
import { AllCategories } from './_components/all-categories';
import { NewsletterSubscription } from './_components/news-letter-subscription';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners'; // Importing the spinner
import { useRouter } from 'next/navigation';

const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com/api/blog'
    : 'http://localhost:8080/api/blog';
const page = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter()
    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log(data);
                setBlogs(data);
                setFilteredBlogs(data); // Initially display all blogs

                // Extract all categories from the blogs
                const allCategories = data.reduce((acc, blog) => {
                    blog.categories.forEach(category => {
                        if (!acc.includes(category)) {
                            acc.push(category);
                        }
                    });
                    return acc;
                }, []);
                setCategories(allCategories);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };
        fetchAllBlogs();
    }, []);
    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredBlogs(blogs); // Reset to all blogs if no search term
        } else {
            const filtered = blogs.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredBlogs(filtered);
        }
    };

    return (
        <main className='bg-gray-100 py-6'>
            <section className=''>
                <div className="flex flex-wrap md:flex-nowrap gap-8 w-10/12 mx-auto">
                    <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {loading ? (
                            <div className="flex justify-center items-center w-full col-span-2">
                                <ClipLoader color="#b12b29" loading={loading} size={50} />
                            </div>
                        ) : (
                            filteredBlogs.map(blog => (
                                <div key={blog.id} onClick={()=>router.push(`/blogs/${blog.id}`)} className="mb-6 h-full group">
                                    <div className='bg-white shadow-md rounded-lg flex flex-col'>
                                        <img src={blog.imageUrl} alt={blog.title} className="w-full h-[30vh] object-cover mb-4 rounded-t" />
                                        <p className="font-semibold text-sm bg-white w-fit text-[#b12b29] px-4 py-1 rounded-md mt-[-30px]">{blog.categories[0]}</p>
                                        <div className='p-4 flex flex-1 flex-col'>
                                            <p className="text-xs text-gray-500 mb-4">By <span className='text-[#b91b29] font-semibold'>West Can Auto</span> on {new Date(blog.createdAt).toLocaleDateString()}</p>
                                            <h4 className="text-lg font-semibold mb-2">{blog.title}</h4>
                                            <div dangerouslySetInnerHTML={{ __html: blog.content }} className='!line-clamp-2 mb-4' />
                                            <Link href={`/blogs/${blog.id}`} className="text-[#b12b29] hover:underline mt-auto">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="w-full md:w-1/4 flex flex-col">
                        <BlogSearch handleSearch={handleSearch} filteredBlogs={filteredBlogs} />
                        <NewsletterSubscription />
                        <NewBlogs />
                        <AllCategories categories={categories} />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default page;
