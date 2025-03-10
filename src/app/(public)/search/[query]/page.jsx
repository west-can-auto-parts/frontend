"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
const Page = ({ params }) => {

    const router = useRouter()

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const query = params.query || '';

    useEffect(() => {
        setSearchQuery(query);
    }, [query]);

    useEffect(() => {
        if (searchQuery) {
            handleSearch();
        }
    }, [searchQuery]);

    const handleSearch = () => {
        const allItems = parts.flatMap(category =>
            category.subParts.flatMap(subPart =>
                subPart.parts.map(part => ({
                    label: part.listing,
                    description: part.description,
                    href: `/shop/${category.title}/${subPart.listing}/${part.listing}`,
                    tags: [category.title, ...category.tags, subPart.listing, ...subPart.tags, ...part.tags],
                    image: part.imageUrl || part.imgUrl
                }))
            )
        );
        const results = filterItemsByTags(allItems, searchQuery);
        setSearchResults(results);
    };

    const filterItemsByTags = (items, query) => {
        const queryTags = query.toLowerCase().split(' ').filter(tag => tag);
        return items.filter(item =>
            queryTags.every(queryTag =>
                item.tags.some(tag => tag.toLowerCase().includes(queryTag))
            )
        );
    };

    return (
        <main className='bg-gray-100 py-12 min-h-[100vh]'>
            <section className='w-10/12 mx-auto'>
                <p className="text-2xl font-bold py-3">Search Results For : {searchQuery}</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {searchResults.map((item, index) => (
                        <div key={index} className='bg-white rounded-lg shadow-md'  onClick={()=>router.push(item.href)}>
                            <img src={item.image} alt={item.label} className='w-full h-32 object-cover rounded-md mb-4' />
                            <div className="p-4">
                                <h2 className='text-lg font-semibold mb-2'>{item.label}</h2>
                                <p className='text-gray-600 mb-4 text-xs line-clamp-3'>{item.description}</p>
                                <div className='flex flex-wrap'>
                                    {item.tags.map((tag, idx) => (
                                        <span key={idx} className='bg-gray-200 text-gray-700 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded'>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Page;
