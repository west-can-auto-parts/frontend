'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Select from 'react-select';

interface Supplier {
    id: '',
    name: string;
    description: string;
    imageUrl: string;
    category: string[]; // Array of selected category IDs
    subCategoryAndPosition: SubCategory[];
    productCategory: string[];
}

interface FormData {
    id: '',
    name: string;
    description: string;
    imageUrl: string;
    category: string[]; // Array of selected category IDs
    subCategoryAndPosition: SubCategory[];
    productCategory: string[]; // Array of selected product category IDs
}

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
interface SelectOption {
    value: string;
    label: string;
}

const EditSupplierPage = ({ params }: { params: { id: string } }) => {
    const [formData, setFormData] = useState<FormData>({
        id: '',
        name: '',
        description: '',
        imageUrl: '',
        category: [], // Initialize as an empty array
        subCategoryAndPosition: [],
        productCategory: [] // Initialize as an empty array
    });
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [allSubCategory, setAllSubCategory] = useState<Array<{ id: string, name: string }>>([]);
    const [tag, setTag] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [supplierData, setSupplierData] = useState<Supplier[]>([]);
    const [allProductCategory, setAllProductCategory] = useState<ProductCategory[]>([]);

    const router = useRouter();
    const { id } = params;
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl2 = isProduction
        ? 'https://westcanadmin.onrender.com/admin/api/suppliers'
        : 'http://localhost:8081/admin/api/suppliers';
    const apiUrl = isProduction
        ? 'https://westcanadmin.onrender.com/admin/api'
        : 'http://localhost:8081/admin/api';
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                const productCategoryRes = await fetch(`${apiUrl}/product-category`, { headers });
                const allCategoryRes = await fetch(`${apiUrl}/category`, { headers });
                const allSubCategoryRes = await fetch(`${apiUrl}/subcategory`, { headers });
                const brandsRes = await fetch(`${apiUrl2}/${id}`, { headers });

                if (!productCategoryRes.ok || !allCategoryRes.ok || !allSubCategoryRes.ok || !brandsRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const productCategoryData = await productCategoryRes.json();
                const allCategoryData = await allCategoryRes.json();
                const allSubCategoryData = await allSubCategoryRes.json();
                const supplierData = await brandsRes.json();

                // Set the form data with proper structure and default values
                setFormData({
                    id: supplierData.id || '',
                    name: supplierData.name || '',
                    description: supplierData.description || '',
                    imageUrl: supplierData.imageUrl || '',
                    category: supplierData.category || [],
                    productCategory: supplierData.productCategory || [],
                    subCategoryAndPosition: supplierData.subCategoryAndPosition
                        ? Object.entries(supplierData.subCategoryAndPosition).map(([subcategoryId, position]) => ({
                            subcategoryId,
                            position: Number(position)
                        }))
                        : []
                });

                setAllCategories(allCategoryData);
                setAllSubCategory(allSubCategoryData);
                setSupplierData(supplierData);
                setAllProductCategory(productCategoryData)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id && token) {
            fetchData();
        }
    }, [id, token, apiUrl]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox' && (e.target as HTMLInputElement).checked !== undefined) {
            setFormData({
                ...formData,
                [name]: (e.target as HTMLInputElement).checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageUpload = (result: any) => {
        const imageUrl = result.info.secure_url;
        setFormData(prevData => ({
            ...prevData,
            imageUrl // Update to set imageUrl directly as a string
        }));
    };

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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const subCategoryAndPosition = formData.subCategoryAndPosition.reduce((acc, { subcategoryId, position }) => {
                if (subcategoryId && position) {
                    acc[subcategoryId] = position;
                }
                return acc;
            }, {} as { [key: string]: number });

            // Prepare data for API
            const dataToSend = {
                ...formData,
                subCategoryAndPosition: Object.keys(subCategoryAndPosition).length > 0 ? subCategoryAndPosition : null,
                brandPositions: undefined
            };

            const res = await fetch(`${apiUrl2}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(dataToSend),
            });

            if (!res.ok) throw new Error('Failed to update product category');
            router.push('/admin/suppliers');
        } catch (error) {
            console.error('Error updating product category:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    const categoryOptions: SelectOption[] = allCategories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const productCategoryOptions: SelectOption[] = allProductCategory.map(category => ({
        value: category.id,
        label: category.name
    }));

    const handleMultiSelectChange = (selectedOptions: any, field: 'category' | 'productCategory') => {
        const selectedValues = selectedOptions.map((option: SelectOption) => option.value);
        setFormData({
            ...formData,
            [field]: selectedValues, // Update the field with an array of strings
        });
    };


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Supplier</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-[500px] rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="block w-[500px] rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-800 sm:text-sm sm:leading-6"
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
                <button
                    type="submit"
                    className="w-[500px] flex justify-center rounded-md bg-[#b91b29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
                >
                    Update Supplier
                </button>
            </form>
        </div>
    );
};

export default EditSupplierPage;