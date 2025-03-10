'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Select from 'react-select'; // For multi-select dropdowns

interface ProductCategory {
    id: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
}

interface SubCategory {
    subcategoryId: string;
    position: number;
}

interface FormData {
    name: string;
    description: string;
    imageUrl: string;
    category: string[]; // Array of selected category IDs
    subCategoryAndPosition: SubCategory[];
    productCategory: string[]; // Array of selected product category IDs
}

// Define the type for react-select options
interface SelectOption {
    value: string;
    label: string;
}

const CreateSupplierForm = () => {
    const [productCategories, setProductCategories] = useState<Category[]>([]);
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [allProductCategory, setAllProductCategory] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        imageUrl: '',
        category: [], // Initialize as an empty array
        subCategoryAndPosition: [],
        productCategory: [] // Initialize as an empty array
    });
    const [allSubCategory, setAllSubCategory] = useState<Array<{ id: string, name: string }>>([]);

    const router = useRouter();
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl2 = isProduction
        ? 'https://westcanadmin.onrender.com/admin/api/suppliers'
        : 'http://localhost:8081/admin/api/suppliers';
    const apiUrl = isProduction
        ? 'https://westcanadmin.onrender.com/admin/api'
        : 'http://localhost:8081/admin/api';

    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

    // Handle image upload
    const handleImageUpload = (result: any) => {
        const imageUrl = result.info.secure_url;
        setFormData(prevData => ({
            ...prevData,
            imageUrl // Update to set imageUrl directly as a string
        }));
    };

    // Fetch categories, subcategories, and product categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const allCategoryRes = await fetch(`${apiUrl}/category`, { headers });
                const allSubCategoryRes = await fetch(`${apiUrl}/subcategory`, { headers });
                const allProductCategoryRes = await fetch(`${apiUrl}/product-category`, { headers });

                if (!allCategoryRes.ok || !allSubCategoryRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const allCategoryData = await allCategoryRes.json();
                const allSubCategoryData = await allSubCategoryRes.json();
                const allProductCategoryData = await allProductCategoryRes.json();

                setAllCategories(allCategoryData);
                setAllSubCategory(allSubCategoryData);
                setAllProductCategory(allProductCategoryData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Convert categories and product categories to react-select options
    const categoryOptions: SelectOption[] = allCategories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const productCategoryOptions: SelectOption[] = allProductCategory.map(category => ({
        value: category.id,
        label: category.name
    }));

    // Handle multi-select change for category and productCategory
    const handleMultiSelectChange = (selectedOptions: any, field: 'category' | 'productCategory') => {
        const selectedValues = selectedOptions.map((option: SelectOption) => option.value);
        setFormData({
            ...formData,
            [field]: selectedValues, // Update the field with an array of strings
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Convert subCategoryAndPosition array to a map
            const subCategoryAndPositionMap = formData.subCategoryAndPosition.reduce((acc, { subcategoryId, position }) => {
                acc[subcategoryId] = position;
                return acc;
            }, {} as Record<string, number>);

            const dataToSend = {
                ...formData,
                subCategoryAndPosition: subCategoryAndPositionMap, // Send as a map
            };

            const res = await fetch(`${apiUrl2}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(dataToSend),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const result = await res.json();
            console.log('Success:', result);
            router.refresh();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again.');
        }
    };

    // Handle textarea changes
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Add a new subcategory position
    const handleAddSubCategoryPosition = () => {
        setFormData(prev => ({
            ...prev,
            subCategoryAndPosition: [...prev.subCategoryAndPosition, { subcategoryId: '', position: 0 }]
        }));
    };

    // Handle changes in subcategory position
    const handleSubCategoryPositionChange = (index: number, field: 'subcategoryId' | 'position', value: string | number) => {
        const newSubCategoryAndPosition = [...formData.subCategoryAndPosition];
        newSubCategoryAndPosition[index] = {
            ...newSubCategoryAndPosition[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            subCategoryAndPosition: newSubCategoryAndPosition
        }));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Suppliers</h1>

            <form onSubmit={handleSubmit} className="mb-6">
                <h2 className="text-xl mb-2">Add New Supplier</h2>
                <div className="mb-4">
                    <label className="block">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border p-2 rounded w-full"
                        required
                        style={{
                            width: "500px",
                            resize: "none",
                            overflow: "hidden",
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Description</label>
                    <textarea
                        id="content"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        style={{
                            width: "500px",
                            resize: "none",
                            overflow: "hidden",
                        }}
                        rows={6}
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Images</label>
                    <CldUploadWidget
                        uploadPreset="my-next-cloudinary-app"
                        onSuccess={handleImageUpload}
                    >
                        {({ open }) => (
                            <button type="button" onClick={() => open()} className="bg-[#b91b29] p-2 rounded text-white">
                                Upload an Image
                            </button>
                        )}
                    </CldUploadWidget>
                    <div className="mt-2">
                        {formData.imageUrl && <p>{formData.imageUrl}</p>} {/* Display the image URL if it exists */}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block">Category</label>
                    <Select
                        options={categoryOptions}
                        isMulti // Enable multi-select
                        onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'category')}
                        value={categoryOptions.filter(option => formData.category.includes(option.value))} // Match selected values
                        className="w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Product Category</label>
                    <Select
                        options={productCategoryOptions}
                        isMulti // Enable multi-select
                        onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'productCategory')}
                        value={productCategoryOptions.filter(option => formData.productCategory.includes(option.value))} // Match selected values
                        className="w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">
                        SubCategory Position
                    </label>
                    {formData.subCategoryAndPosition.map((bp, index) => (
                        <div key={index} className="flex gap-4 mb-2">
                            <select
                                value={bp.subcategoryId}
                                onChange={(e) => handleSubCategoryPositionChange(index, 'subcategoryId', e.target.value)}
                                className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
                                required
                                style={{
                                    width: "500px",
                                    resize: "none",
                                    overflow: "hidden",
                                }}
                            >
                                <option value="">Select Sub Category</option>
                                {allSubCategory.map(subCategory => (
                                    <option key={subCategory.id} value={subCategory.id}>
                                        {subCategory.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={bp.position}
                                onChange={(e) => handleSubCategoryPositionChange(index, 'position', parseInt(e.target.value))}
                                min="1"
                                placeholder="Position"
                                className="block w-32 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const newSubCategoryAndPosition = formData.subCategoryAndPosition.filter((_, i) => i !== index);
                                    setFormData(prev => ({ ...prev, subCategoryAndPosition: newSubCategoryAndPosition }));
                                }}
                                className="flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddSubCategoryPosition}
                        className="flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
                    >
                        Add SubCategory Position
                    </button>
                </div>
                <button type="submit" className="bg-[#b91b29] text-white px-4 py-2 rounded">
                    Add Product Category
                </button>
            </form>
        </div>
    );
};

export default CreateSupplierForm;