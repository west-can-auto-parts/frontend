import React, { useState, useEffect } from 'react'
import Link from 'next/link';

export const NewBlogs = () => {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true);
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction
        ? 'https://westcanuserbackend.onrender.com/api/blog'
        : 'http://localhost:8080/api/blog';

    useEffect(() => {


        const fetchAllBlogs = async () => {
            try {
                const response = await fetch(apiUrl)
                const data = await response.json()
                setBlogs(data)
            }
            catch (error) {
                console.log(error)
            }
        }


        fetchAllBlogs();
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold mb-4">Latest Blogs</h3>
            {blogs.slice(0, 4).map(post => (
                <div key={post._d} className="flex items-center mb-4">
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
    )


}
