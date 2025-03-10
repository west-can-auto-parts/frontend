"use client";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaMagnifyingGlass, FaCartShopping } from 'react-icons/fa6';
import Link from 'next/link';
import locations from '@/datas/store';

import Usps from '../_components/Usps';

const ProductPage = ({ params }) => {
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPart, setSelectedPart] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        store: '',
        phoneNumber: '',
        part: '',
        message: ''
    });
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/featured-products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data.job);
                setMainImage(data.job.imageUrls[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleModalToggle = () => {
        if (!isModalOpen && product) {
            setSelectedPart(product.description);
        }
        setIsModalOpen(!isModalOpen);
    };

    const handleSelectedPartChange = (event) => {
        setSelectedPart(event.target.value);
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');

        const { name, email, store, phoneNumber, part, message } = formData;

        if (!name || !email || !message) {
            setFormError('All fields are required except your Phone Number');
            return;
        }

        try {
            const response = await fetch('/api/product-query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, store, phoneNumber, part, message })
            });

            const result = await response.json();

            if (response.ok) {
                setFormSuccess(<div>
                    Your enquiry has been submitted successfully!
                    <br />Our experts with get back to you shortly.
                </div>);
                setFormData({
                    name: '',
                    email: '',
                    store: '',
                    phoneNumber: '',
                    part: '',
                    message: ''
                });
                setSelectedPart('');
                setIsModalOpen(false);
            } else {
                setFormError(result.error || 'Failed to submit enquiry');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormError('An error occurred. Please try again later.');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    if (!product) {
        return <div className="text-center">No product found</div>;
    }

    return (
        <div className="w-10/12 mx-auto py-4 md:py-12">
            <div className="mb-6 flex flex-wrap gap-2 text-sm">
                <Link className='bg-gray-100 px-2 font-semibold text-xs py-1 rounded-md' href={'/categories'}>Categories</Link>/
                <Link className='bg-gray-100 px-2 font-semibold text-xs py-1 rounded-md' href={`/${product.category}`}>
                    {product.category}
                </Link>/
                <Link className='bg-gray-100 px-2 font-semibold text-xs py-1 rounded-md' href={`/${product.category}/${product.subCategory}`}>
                    {product.subCategory}
                </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image Carousel */}
                <div className="w-full md:w-1/2 md:flex md:flex-nowrap md:flex-row-reverse gap-4">
                    <div className="w-full">
                        <img
                            src={mainImage}
                            alt={product.description}
                            className="w-full h-[40vh] md:h-[50vh] object-contain object-center rounded-lg"
                        />
                    </div>
                    <div className=" w-full md:w-24 xs:mt-0 sm:mt-2 md:mt-6">
                        <div className="flex flex-wrap md:flex-col gap-2">
                            {product.imageUrls.map((url, index) => (
                                <div
                                    key={index}
                                    className={`relative group cursor-pointer ${mainImage === url ? 'border-2 border-[#b21b29]' : ''} rounded-lg`}
                                    onClick={() => setMainImage(url)}
                                >
                                    <img
                                        src={url}
                                        alt={`Additional view ${index + 1}`}
                                        className="w-24 h-20 object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div className='flex flex-col justify-start gap-1 h-full'>
                        <h1 className="text-2xl font-bold mb-4">{product.description}</h1>
                        <p className="text-xs md:text-sm text-justify text-gray-700 mb-4">{product.extendedDescription}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {product.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-800 text-xs font-semibold py-1 px-2 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <Usps />
                    </div>
                    <div className='flex flex-col gap-2 text-sm my-2'>
                        <button onClick={handleModalToggle} className='bg-white border px-6 w-full py-2 rounded-md text-[#b12b29] border-[#b12b29]'>
                            Reach out to us
                        </button>
                        <button className="bg-[#b21b29] text-white px-6 flex gap-2 items-center justify-center py-2 border-[#b12b29] rounded-md hover:bg-[#a1121d] transition duration-300">
                            <FaCartShopping className='w-4 h-4' /> Shop Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-11/12 mx-auto md:max-w-xl p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg md:text-2xl font-bold">Enquiry Form</h2>
                            <button onClick={handleModalToggle} type="button" className="bg-[#b21b29] text-white px-2 rounded-md transtion ">
                                X
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#b21b29] focus:border-[#b21b29] sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#b21b29] focus:border-[#b21b29] sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="store" className="block text-sm font-medium text-gray-700">
                                    Select Store
                                </label>
                                <select
                                    id="store"
                                    value={formData.store}
                                    onChange={handleInputChange}
                                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'>
                                    <option value="">Select Your Nearest Store</option>
                                    {locations.map(location => (
                                        <option key={location.name} value={location.name}>{location.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                                    Phone number
                                </label>
                                <div className="relative mt-2.5">
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <label htmlFor="country" className="sr-only">
                                            Country
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-4 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        >
                                            <option>CA</option>
                                            <option>US</option>
                                            <option>EU</option>
                                        </select>
                                    </div>
                                    <input
                                        id="phoneNumber" // Ensure the id matches the formData key
                                        name="phoneNumber"
                                        type="tel"
                                        autoComplete="tel"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="part" className="block text-sm font-medium text-gray-700">
                                    Part to Query About
                                </label>
                                <select
                                    id="part"
                                    value={formData.part}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#b21b29] focus:border-[#b21b29] sm:text-sm"
                                >
                                    <option value={product.description}>{product.description}</option>
                                    {product.parts?.map((part, index) => (
                                        <option key={index} value={part.listing}>
                                            {part.listing}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#b21b29] focus:border-[#b21b29] sm:text-sm"
                                    rows="4"
                                />
                            </div>
                            {formError && <div className="text-red-600 mb-4">{formError}</div>}
                            {formSuccess && <div className="text-green-600 mb-4 text-xs md:text-md text-center">{formSuccess}</div>}
                            <div className="flex justify-between">
                                <button type="submit" className="w-full bg-[#b21b29] text-white px-4 py-2 rounded-md hover:bg-[#a1121d]">
                                    Submit
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;