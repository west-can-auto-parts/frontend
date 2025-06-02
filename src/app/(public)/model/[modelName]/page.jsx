"use client";

import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { RelatedSubCategory } from "./_components/related-subcategory";
import { ModelList } from "./_components/model-list";

const Page = ({ params }) => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imageUrl, setImageUrl] = useState('');


  const isProduction = process.env.NODE_ENV === "production";
  const apiBaseUrl = isProduction
    ? "https://clientsidebackend.onrender.com/api"
    : "http://localhost:8080/api";

  const router = useRouter();
  function stringToSlug(str) {
    str = str.replace("&", "and");
    str = str.replace(/,/g, "~");
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -~]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  }
  function removeVehicleName(str) {
    if (!str) return '';
    if (str.includes('-')) {
      const parts = str.split('-');
      return parts.slice(1).join('-'); // Remove first part
    }
    return str;
  }
  function getVehicleName(str) {
    if (!str) return '';
    // First split by hyphen to separate vehicle-model parts
    const hyphenParts = str.split('-');
    // Then take the first part and split by spaces
    const firstPart = hyphenParts[0];
    const words = firstPart.split(/\s+/);
    // Return the first word only
    return words[0] || '';
  }
  const toCamelCase = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const slug = removeVehicleName(params.modelName);
  const vehicleName = getVehicleName(params.modelName);

  const fetchModel = async (modelName) => {
    setLoading(true);
    try {
      const modelRes = await fetch(`${apiBaseUrl}/model/${modelName}`);
      if (!modelRes.ok) throw new Error("Model not found");
      const modelData = await modelRes.json();
      setModel(modelData);

      // Convert subCategoryAndProduct object to array for easier rendering
      if (modelData.subCategoryAndProduct) {
        const categories = Object.entries(modelData.subCategoryAndProduct).map(
          ([categoryName, products]) => ({
            name: categoryName,
            products
          })
        );
        setSubCategories(categories);
        const categoryNames = Object.keys(modelData.subCategoryAndProduct).map(name => ({
          name,
          slug: stringToSlug(name)
        }));
        setSubCategoryList(categoryNames);

        // Set first subcategory as selected by default
        if (categories.length > 0) {
          setSelectedCategory({ name: categories[0].name, slug: stringToSlug(categories[0].name) });
        } else {
          setSelectedCategory(null);
        }
      } else {
        setSelectedCategory(null);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleAndModels = async (vehicleName) => {
    setLoading(true);
    try {
      const vehicleRes = await fetch(`${apiBaseUrl}/vehicle/${vehicleName}`);
      if (!vehicleRes.ok) throw new Error("Vehicle not found");
      const vehicleData = await vehicleRes.json();
      setVehicle(vehicleData);

      if (vehicleData.model && Array.isArray(vehicleData.model)) {
        // Extract just the model names from the array of model objects
        const modelNames = vehicleData.model.map(model => model.name);
        setModelList(modelNames);
      } else {
        setModelList([]); // Set empty array if no models found
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setModelList([]); // Ensure modelList is empty on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch model data when slug changes
    if (slug) {
      fetchModel(slug);
    }
  }, [slug]);

  // Separate useEffect for initial vehicle data fetch
  useEffect(() => {
    // Only fetch vehicle data if we have a vehicle name and haven't fetched it yet
    if (vehicleName && !vehicle) {
      fetchVehicleAndModels(vehicleName);
    }
  }, [vehicleName, vehicle]);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`/api/getImage?vehicle=${vehicleName}&model=${params.modelName}`);
      const data = await res.json();
      setImageUrl(data.imageUrl);
    };

    fetchImage();
  }, [vehicleName, params.modelName]);

  // Handler for subcategory selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClick = (listing, category) => {
    const categorySlug =
      category === "Replacement Parts" || category === "Fluids & Lubricants"
        ? "replacement-parts"
        : "shop-supplies";

    const slug = stringToSlug(listing);
    router.push(`/${categorySlug}/${slug}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!model) return <div>Model not found</div>;

  // Find the selected category's full data (with products) if selected
  const filteredCategories = selectedCategory
    ? subCategories.filter(category => category.name === selectedCategory.name)
    : subCategories;

  return (
    <>
      <div className="w-10/12 mx-auto py-8 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/6 bg-white h-fit">
          <div className="mb-4">
            <ModelList modelList={modelList} />
            <div className="mt-6">
              <RelatedSubCategory
                subCategories={subCategoryList}
                onCategorySelect={handleCategorySelect}
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/5 py-2 md:py-0">
          <div className="bg-white shadow-md p-4 rounded flex justify-center mb-6">
           <img src={imageUrl || "/placeholder.jpg"} alt={model.name} className="h-48 object-contain" />
          </div>
          {/* Main content area showing products by category */}
          {filteredCategories.map((category) => (
            <div key={category.name} className="mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.products.map((product, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() =>
                      handleClick(
                        product.name,
                        product.categoryName
                      )
                    }
                  >
                    <div className="bg-white shadow-md rounded h-full flex flex-col group">
                      {/* Product Image */}
                      <img
                        src={product.imageUrl || "/placeholder.jpg"}
                        alt={product.name || "Product"}
                        className="w-full h-[10vh] md:h-[15vh] object-cover object-center rounded-t"
                      />

                      {/* Content Section */}
                      <div className="flex-grow px-3 md:px-4 pt-3 md:pt-4 group-hover:bg-gray-100 transition">
                        <p className="text-xs font-semibold mb-2 !line-clamp-2">
                          {toCamelCase(vehicleName) + " " + toCamelCase(removeVehicleName(params.modelName)) + " " + (product.name || "Product Name")}
                        </p>
                      </div>

                      {/* Full-width Button at Bottom */}
                      <button className="bg-[#b12b29] text-white py-2 w-full text-sm font-semibold flex items-center px-4 rounded-b">
                        <span>Explore</span>
                        <FaChevronRight className="h-3 w-3 ml-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;