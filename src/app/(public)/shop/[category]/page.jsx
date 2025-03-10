"use client";

import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { RelatedProduct } from "./_components/related-product";
import { SubCategories } from "./_components/sub-categories";
import { AboutPart } from "./_components/about-part";
import { PartTags } from "./_components/part-tags";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl1 = isProduction
  ? "https://westcanuserbackend.onrender.com/"
  : "http://localhost:8080/";

const apiUrl = apiUrl1 + "api/product";
const apiUrl2 = apiUrl1 + "api/suppliers";

const Page = ({ params }) => {
  const [myProduct, setMyProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [subCategory, setSubCategory] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [categoryType, setCategoryType] = useState("");
  const [categorySlug, setCategorySlug] = useState("");

  const router = useRouter();
  const slug = params.category;
  const currentListing = slug || "";

  function stringToSlug(str) {
    return str
      .toLowerCase()
      .trim()
      .replace("&", "and")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productRes, subCategoryRes, allSubCategoryRes] = await Promise.all([
          fetch(`${apiUrl}/products-category/subCategoryName?subCategoryName=${slug}`),
          fetch(`${apiUrl}/subcategory/${slug}`),
          fetch(`${apiUrl}/subcategory`)
        ]);

        // Read responses as text first
        const productText = await productRes.text();
        const subCategoryText = await subCategoryRes.text();
        const allSubCategoryText = await allSubCategoryRes.text();

        if (!productText) throw new Error("Empty product response");
        if (!subCategoryText) throw new Error("Empty subcategory response");
        if (!allSubCategoryText) throw new Error("Empty subcategories response");

        // Parse JSON
        const productData = JSON.parse(productText);
        const subCategoryData = JSON.parse(subCategoryText);
        const allSubCategoryData = JSON.parse(allSubCategoryText);

        // Sort products based on productCategoryAndPosition from subCategoryData
        const positionMap = subCategoryData.productCategoryAndPosition || {};
        
        const sortedProducts = productData.sort((a, b) => {
          // Get positions from the positionMap, using product ID or name
          const posA = positionMap[a.id] || positionMap[a.name] || Infinity;
          const posB = positionMap[b.id] || positionMap[b.name] || Infinity;
          return posA - posB;
        });

        setMyProduct(sortedProducts);
        setSubCategory(subCategoryData);
        setAllSubCategory(allSubCategoryData);
        determineCategory(sortedProducts[0]);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleClick = (listing, category) => {
    const categorySlug =
      category === "Replacement Parts" || category === "Fluids & Lubricants"
        ? "replacement-parts"
        : "shop-supplies";

    const slug = stringToSlug(listing);
    router.push(`/${categorySlug}/${slug}`);
  };

  const determineCategory = (product) => {
    if (!product) return;
    
    if (
      product.categoryName === "Replacement Parts" ||
      product.categoryName === "Fluids & Lubricants"
    ) {
      setCategoryType("Replacement Parts");
      setCategorySlug("replacement-parts");
    } else {
      setCategoryType("Tools & Equipments");
      setCategorySlug("shop-supplies");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row flex-wrap md:flex-nowrap w-10/12 mx-auto gap-8">
        <div className="w-full md:w-1/5 bg-white h-fit">
          <div className="mb-4">
            <SubCategories myProduct={myProduct} subCategory={subCategory.name} />
            <RelatedProduct subCategoryData={allSubCategory} />
            <PartTags tags={subCategory.tags || []} />
          </div>
        </div>

        <div className="w-full md:w-4/5 py-2 md:py-0">
          <div className="pb-2">
            <div className="flex flex-wrap gap-1 md:pb-4">
              <Link className="bg-gray-200 text-sm font-semibold px-2 rounded-md" href={`/`}>
                Home
              </Link>
              /
              <Link className="bg-gray-200 text-sm font-semibold px-2 rounded-md" href={`/categories/`}>
                Categories
              </Link>
              /
              {myProduct && myProduct[0] ? (
                <Link className="bg-gray-200 text-sm font-semibold px-2 rounded-md" href={`/${(categorySlug || "")}/`}>
                  {myProduct[0].categoryName || "Category"}
                </Link>
              ) : (
                <span className="bg-gray-200 text-sm font-semibold px-2 rounded-md">Category</span>
              )}
            </div>
            <h1 className="text-2xl font-bold py-2">{subCategory.name || "SubPart"}</h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {myProduct?.map((product, index) => (
              <div key={index} className="cursor-pointer" onClick={() => handleClick(product.name, product.categoryName)}>
                <div className="bg-white shadow-md rounded h-full flex flex-col justify-between group">
                  <div>
                    <img
                      src={product.imageUrl?.[0] || "/placeholder.jpg"}
                      alt={product.name || "Product"}
                      className="w-full h-[15vh] md:h-[20vh] object-cover object-center mb-4 rounded"
                    />
                    <div className="p-3 md:p-4 group-hover:bg-gray-100 transition">
                      <h3 className="text-sm md:text-lg font-semibold mb-2 !line-clamp-1">
                        {product.name || "Product Name"}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 hidden md:block !line-clamp-3">
                        {product.description || "Product Description"}
                      </p>
                      <div className="flex justify-between items-center">
                        <button className="text-[#b12b29] py-1 text-sm font-semibold">
                          Explore
                        </button>
                        <FaChevronRight className="h-3 w-3 text-[#b12b29]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-10/12 mx-auto my-8">
        <AboutPart mySubPart={subCategory} />
      </div>
    </>
  );
};

export default Page;