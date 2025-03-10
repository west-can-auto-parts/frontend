"use client";

import Usps from '@/app/(public)/product-view/_components/Usps';
import { FaShoppingCart, FaEnvelope } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import locations from '@/datas/store';
import Select from "react-select";
import { useRouter } from 'next/navigation';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com/api/product'
    : 'http://localhost:8080/api/product';

export const ProductDescription = ({ myProduct }) => {
    const [product, setProduct] = useState(myProduct || {});
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        store: '',
        phoneNumber: '',
        productName: [],
        message: ''
    });
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [categories, setCategories] = useState([]);
    const [isHovering, setIsHovering] = useState(false);
    const router = useRouter();

    const storeOptions = locations.map((location) => ({
        label: location.name,
        value: location.name,
    }));
    
    // Update handleInputChange to handle react-select for store
    const handleStoreChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            store: selectedOption ? selectedOption.value : '',
        }));
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            setFormData((prevData) => ({
                ...prevData,
            }));
        }
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}/product-category/all`);
            if (response.ok) {
                return await response.json();
            }
            throw new Error('Failed to fetch categories');
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    useEffect(() => {
        (async () => {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories.map((cat) => ({ label: cat.name, value: cat.name })));
        })();
    }, []);

    const handlePartChange = (selectedOptions) => {
        const selectedParts = selectedOptions.map((option) => option.value);
        setFormData((prev) => ({ ...prev, productName: selectedParts }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError('');
        setFormSuccess('');

        if (!formData.name || !formData.email || !formData.store || !formData.phoneNumber || !formData.message) {
            setFormError('All fields are required.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/productenquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const contentType = response.headers.get('content-type');
                const responseData = contentType?.includes('application/json')
                    ? await response.json()
                    : await response.text();

                setFormSuccess(responseData || 'Enquiry submitted successfully.');

                setFormData({
                    name: '',
                    email: '',
                    store: '',
                    phoneNumber: '',
                    productName: [],
                    message: ''
                });
                setIsModalOpen(false);
            } else {
                const errorText = await response.text();
                setFormError(errorText || 'Failed to submit enquiry.');
            }
        } catch (err) {
            setFormError('An error occurred while submitting the enquiry.');
        }
    };
    console.log(isHovering)

    return (
        <div className="w-full md:w-1/2">
            {isHovering && (
                <div
                    className="absolute bottom-[15%] transform -translate-x-1/2 translate-x-12 bg-[#b12b29] text-white text-sm rounded-md p-2 shadow-lg z-50 mt-2"
                >
                    Click the SHOP NOW button below to find the perfect brake rotors for your vehicle!
                </div>
            )}
            <h1 className="text-2xl font-bold mb-2 py-2">{myProduct.name}</h1>
            <p className="text-xs md:text-sm text-justify">{myProduct.description}</p>
            <div className="py-2 flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
                {myProduct.tags.map((tag, index) => (
                    <p key={index} className="bg-gray-200 font-semibold px-2 rounded-md">{tag}</p>
                ))}
            </div>
            <Usps />
            <div className="flex flex-col md:flex-row md:flex-nowrap w-full gap-2 md:gap-4">
                <button
                    className="bg-white border-2 rounded-md px-4 py-2 text-[#b12b29] w-full md:w-1/2 flex justify-center gap-2"
                    onClick={handleModalToggle}
                >
                    <FaEnvelope className="w-5 h-5" /> Message Us
                </button>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-11/12 mx-auto md:max-w-xl p-6 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg md:text-2xl font-bold">Enquiry Form</h2>
                                <button onClick={handleModalToggle} className="bg-[#b12b29] text-white px-2 rounded-md">
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
                                    <Select
                                        options={storeOptions}
                                        onChange={handleStoreChange}
                                        value={storeOptions.find((option) => option.value === formData.store)}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder="Select Your Nearest Store"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#b21b29] focus:border-[#b21b29] sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="part" className="block text-sm font-medium text-gray-700">
                                        ProductName to Query About
                                    </label>
                                    <Select
                                        isMulti
                                        options={categories}
                                        onChange={handlePartChange}
                                        value={categories.filter((cat) => formData.productName.includes(cat.value))}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
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
                                {formSuccess && <div className="text-green-600 mb-4 text-center">{formSuccess}</div>}
                                <button type="submit" className="w-full bg-[#b12b29] text-white px-4 py-2 rounded-md hover:bg-[#a1121d]">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                <button
                    className="bg-[#b12b29] text-white px-4 py-2 rounded-md w-full md:w-1/2 flex justify-center gap-2"
                    onClick={() => window.open('https://store.westcanauto.com/store/portal', '_blank')}
                    onMouseEnter={() => {
                        if (window.innerWidth >= 768) { 
                          setIsHovering(true);
                        }
                      }}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <FaShoppingCart className="w-5 h-5" /> Shop Now
                </button>
            </div>
        </div>
    );
};

export default ProductDescription;
