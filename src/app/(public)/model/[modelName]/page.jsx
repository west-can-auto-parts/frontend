"use client";

import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {VehicleList} from "./_components/vehicle-list";
import { RelatedSubCategory } from "./_components/related-subcategory";
import { ModelList } from "./_components/model-list";


const Page = ({ params }) => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modelList, setModelList] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [myProduct, setMyProduct] = useState(null);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // Add new state for products

  const isProduction = process.env.NODE_ENV === "production";
  const apiBaseUrl = isProduction
    ? "https://clientsidebackend.onrender.com/api"
    : "http://localhost:8080/api";

  const apiUrl1 = isProduction
  ? "https://clientsidebackend.onrender.com/"
  : "http://localhost:8080/";
  const apiUrl = apiUrl1 + "api/product";

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
      return parts.slice(1).join('-'); 
    }
    return str;
  }
  function getVehicleName(str) {
    if (!str) return '';
    const hyphenParts = str.split('-');
    const firstPart = hyphenParts[0];
    const words = firstPart.split(/\s+/);
    return words[0] || '';
  }
  const toCamelCase = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const slug = params.modelName;
  const vehicleName = getVehicleName(params.modelName);

      const handleCategorySelect = (categoryWithProducts) => {
      setSelectedCategory(categoryWithProducts);
      setSelectedProducts(categoryWithProducts.products || []);
    };

  const fetchModel = async (modelName) => {
    setLoading(true);
    try {
      const modelRes = await fetch(`${apiBaseUrl}/model/${modelName}`);
      if (!modelRes.ok) throw new Error("Model not found");
      const modelData = await modelRes.json();
      setModel(modelData);
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
        const modelNames = vehicleData.model.map(model => model.name);
        setModelList(modelNames);
      } else {
        setModelList([]); 
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setModelList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchModel(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (vehicleName && !vehicle) {
      fetchVehicleAndModels(vehicleName);
    }
  }, [vehicleName, vehicle]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const allSubCategoryRes = await fetch(`${apiUrl}/subcategory`);
        const allSubCategoryText = await allSubCategoryRes.text();
        if (!allSubCategoryText) throw new Error("Empty subcategories response");
        const allSubCategoryData = JSON.parse(allSubCategoryText);
        setSubCategoryList(allSubCategoryData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    if (subCategoryList.length > 0 && !selectedCategory) {
      const defaultCategory = subCategoryList[0];
      handleCategorySelect({
        ...defaultCategory,
        products: []
      });
    }
  }, [subCategoryList]);

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

  const filteredCategories = selectedCategory
    ? subCategories.filter(category => category.name === selectedCategory.name)
    : subCategories;

    return (
      <>
       <div className="w-10/12 mx-auto py-8 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/6 bg-white h-fit">
           <div className="mb-4 space-y-6">
              <VehicleList />
              <ModelList modelList={modelList} vehicleName={vehicleName} />
              <RelatedSubCategory
                subCategories={subCategoryList}
                onCategorySelect={handleCategorySelect}
              />
            </div>
         </div>
         <div className="w-full md:w-4/5 py-2 md:py-0">
            <div className="bg-white shadow-md rounded overflow-hidden mb-6 h-48 w-full">
              <img src={model.bannerImageUrl || "/placeholder.jpg"} alt={model.name} className="w-full h-full object-cover" />
            </div>
            {/* Main content area showing products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {selectedProducts.map((product, index) => (
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
                      src={product.imageUrl[0] || "/placeholder.jpg"}
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
        </div>
      </>
    );
};

export default Page;