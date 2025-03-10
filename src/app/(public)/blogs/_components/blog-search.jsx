import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export const BlogSearch = ({ handleSearch, filteredBlogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0 && filteredBlogs.length > 0) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [searchTerm, filteredBlogs]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);  // Trigger the search function passed down as a prop
  };

  return (
    <div className="relative mb-2 md:mb-4 rounded-md shadow-md">
      <div className="flex items-center bg-white">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search blogs..."
          className="w-full p-2 rounded-md focus:outline-none bg-none bg-white"
        />
        <div className="bg-white px-2">
          <FaMagnifyingGlass className='h-full bg-white' />
        </div>
      </div>

      {dropdownVisible && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 mt-1 rounded-md max-h-60 overflow-auto z-10">
          {filteredBlogs.map((blog) => (
            <li key={blog._id} className="p-2 hover:bg-gray-100 cursor-pointer">
              <Link href={`/blogs/${blog._id}`}>

                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{blog.title}</span>
                  <span className="text-xs text-gray-500">By {blog.authorName}</span>
                </div>

              </Link>
            </li>
          ))}
          {filteredBlogs.length === 0 && (
            <li className="p-2 text-gray-500">No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
};


