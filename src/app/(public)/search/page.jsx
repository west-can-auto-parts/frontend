"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { PartCard } from "./_components/PartCard";
import { PartCardSkeleton } from "./_components/PartCardSkeleton";
import { EmptyState } from "./_components/EmptyState";

const isProduction = process.env.NODE_ENV === "production";
const API_BASE = isProduction
  ? "https://clientsidebackend.onrender.com"
  : "http://localhost:8080";

export default function PartsSearchPage() {
  const searchParams = useSearchParams();

  const year = searchParams.get("year") || "";
  const make = searchParams.get("make") || "";
  const model = searchParams.get("model") || "";
  const submodel = searchParams.get("submodel") || "";
  const engine = searchParams.get("engine") || "";

  const initialCategory = searchParams.get("category") || "";
  const initialSubcategory = searchParams.get("subCategory") || "";
  const initialPage = parseInt(searchParams.get("page") || "0", 10);
  const size = parseInt(searchParams.get("size") || "20", 10);

  const [parts, setParts] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [selectedBrand, setSelectedBrand] = useState("");

  const [priceMinDraft, setPriceMinDraft] = useState("");
  const [priceMaxDraft, setPriceMaxDraft] = useState("");
  const [priceMinFilter, setPriceMinFilter] = useState("");
  const [priceMaxFilter, setPriceMaxFilter] = useState("");

  const [reviewFilter, setReviewFilter] = useState("");
  const [selectedProductLine, setSelectedProductLine] = useState("");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productLineOptions, setProductLineOptions] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState(true);

  // ─────────────────────────────────────────────────────────────
  // FETCH CATEGORIES
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      setLoadingCategories(true);

      try {
        const response = await fetch(
          `${API_BASE}/api/product/category`
        );

        const data = await response.json();

        if (isMounted) {
          setCategories(data || []);
        }
      } catch (fetchError) {
        console.error("Error fetching categories:", fetchError);
      } finally {
        if (isMounted) {
          setLoadingCategories(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // FETCH BRANDS (suppliers)
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    let isMounted = true;

    const fetchBrands = async () => {
      setLoadingBrands(true);
      try {
        const response = await fetch(`${API_BASE}/api/suppliers/all`);
        if (!response.ok) throw new Error("Failed to fetch suppliers");
        const data = await response.json();
        const names = (Array.isArray(data) ? data : [])
          .map((supplier) => supplier?.name)
          .filter(Boolean);
        const unique = [...new Set(names)].sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "base" }),
        );
        if (isMounted) setBrands(unique);
      } catch (fetchError) {
        console.error("Error fetching brands:", fetchError);
        if (isMounted) setBrands([]);
      } finally {
        if (isMounted) setLoadingBrands(false);
      }
    };

    fetchBrands();
    return () => {
      isMounted = false;
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // FETCH SUBCATEGORIES
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    let isMounted = true;

    const fetchSubcategories = async () => {

      if (!selectedCategory) {
        setSubcategories([]);
        setLoadingSubcategories(false);
        return;
      }

      const selectedCategoryObj = categories.find(
        (category) => category.name === selectedCategory
      );

      if (!selectedCategoryObj?.id) {
        setSubcategories([]);
        setLoadingSubcategories(false);
        return;
      }

      setLoadingSubcategories(true);

      try {
        const response = await fetch(
          `${API_BASE}/api/product/subcategory/category/${selectedCategoryObj.id}`
        );

        const data = await response.json();

        if (isMounted) {
          setSubcategories(data || []);
        }

      } catch (fetchError) {

        console.error(
          "Error fetching subcategories:",
          fetchError
        );

      } finally {

        if (isMounted) {
          setLoadingSubcategories(false);
        }
      }
    };

    fetchSubcategories();

    return () => {
      isMounted = false;
    };

  }, [selectedCategory, categories]);

  // ─────────────────────────────────────────────────────────────
  // FETCH PARTS
  // ─────────────────────────────────────────────────────────────

  const fetchParts = useCallback(async () => {

    if (!year || !make || !model) {

      setError(
        "Please select a Year, Make, and Model to search."
      );

      setLoading(false);

      return;
    }

    setLoading(true);
    setError(null);

    try {

      const body = {
        year: Number(year),
        make,
        model,
        page: currentPage,
        size,
      };

      if (submodel) {
        body.submodel = submodel;
      }

      if (engine) {
        body.engine = engine;
      }

      if (selectedCategory) {
        body.category = selectedCategory;
      }

      if (selectedSubcategory) {
        body.subCategory = selectedSubcategory;
      }

      const brandTrimmed = selectedBrand.trim();
      if (brandTrimmed) {
        body.brand = brandTrimmed;
      }

      const minParsed = Number.parseFloat(priceMinFilter);
      if (priceMinFilter !== "" && !Number.isNaN(minParsed)) {
        body.minPrice = minParsed;
      }

      const maxParsed = Number.parseFloat(priceMaxFilter);
      if (priceMaxFilter !== "" && !Number.isNaN(maxParsed)) {
        body.maxPrice = maxParsed;
      }

      const reviewParsed = Number.parseFloat(reviewFilter);
      if (reviewFilter !== "" && !Number.isNaN(reviewParsed)) {
        body.review = reviewParsed;
      }

      const lineTrimmed = selectedProductLine.trim();
      if (lineTrimmed) {
        body.productLines = [lineTrimmed];
      }

      const res = await fetch(
        `${API_BASE}/api/search`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      const nextParts = data.parts || [];
      setParts(nextParts);
      setTotalHits(data.totalHits || 0);
      setTotalPages(data.totalPages || 0);

      const fromParts = nextParts
        .map(
          (part) =>
            part.productLine ??
            part.product_line ??
            part.line ??
            part.productLineName,
        )
        .filter((value) => typeof value === "string" && value.trim() !== "");

      const fromApi =
        data.productLines ??
        data.productLineFacets ??
        data.facets?.productLines;
      const apiLines = Array.isArray(fromApi)
        ? fromApi
            .map((item) =>
              typeof item === "string"
                ? item
                : item?.name ?? item?.label ?? item?.value,
            )
            .filter((value) => typeof value === "string" && value.trim() !== "")
        : [];

      const combined = [
        ...fromParts.map((s) => s.trim()),
        ...apiLines.map((s) => s.trim()),
      ];
      if (combined.length > 0) {
        setProductLineOptions((previous) => {
          const merged = new Set(previous);
          for (const line of combined) merged.add(line);
          return [...merged].sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: "base" }),
          );
        });
      }

    } catch (err) {

      console.error("Fetch error:", err);

      setError(
        "Failed to load parts. Please try again."
      );

    } finally {

      setLoading(false);
    }

  }, [
    year,
    make,
    model,
    submodel,
    engine,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    priceMinFilter,
    priceMaxFilter,
    reviewFilter,
    selectedProductLine,
    currentPage,
    size,
  ]);

  // ─────────────────────────────────────────────────────────────
  // FETCH ON CHANGE
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchParts();
  }, [fetchParts]);

  // ─────────────────────────────────────────────────────────────
  // LABEL
  // ─────────────────────────────────────────────────────────────

  const vehicleLabel = [
    year,
    make,
    model,
    submodel,
    engine,
  ]
    .filter(Boolean)
    .join(" ");

  // ─────────────────────────────────────────────────────────────
  // PAGINATION
  // ─────────────────────────────────────────────────────────────

  const goToPage = (newPage) => {
    setCurrentPage(newPage);
  };

  // ─────────────────────────────────────────────────────────────
  // CATEGORY CHANGE
  // ─────────────────────────────────────────────────────────────

  const handleCategoryChange = (event) => {
    const nextCategory = event.target.value;
    setSelectedCategory(nextCategory);
    setSelectedSubcategory("");
    setCurrentPage(0);
  };

  // ─────────────────────────────────────────────────────────────
  // SUBCATEGORY CHANGE
  // ─────────────────────────────────────────────────────────────

  const handleSubcategoryChange = (event) => {
    const nextSubcategory = event.target.value;
    setSelectedSubcategory(nextSubcategory);
    setCurrentPage(0);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setCurrentPage(0);
  };

  const applyPriceFilters = () => {
    const minCandidate = priceMinDraft.trim();
    const maxCandidate = priceMaxDraft.trim();

    let nextMin = "";
    let nextMax = "";

    if (minCandidate !== "") {
      const minNum = Number.parseFloat(minCandidate);
      nextMin = Number.isNaN(minNum) ? "" : minCandidate;
    }
    if (maxCandidate !== "") {
      const maxNum = Number.parseFloat(maxCandidate);
      nextMax = Number.isNaN(maxNum) ? "" : maxCandidate;
    }

    setPriceMinFilter(nextMin);
    setPriceMaxFilter(nextMax);
    setCurrentPage(0);
  };

  const handleReviewChange = (event) => {
    setReviewFilter(event.target.value);
    setCurrentPage(0);
  };

  const handleProductLineChange = (event) => {
    setSelectedProductLine(event.target.value);
    setCurrentPage(0);
  };

  const handleClearAuxFilters = () => {
    setSelectedBrand("");
    setPriceMinDraft("");
    setPriceMaxDraft("");
    setPriceMinFilter("");
    setPriceMaxFilter("");
    setReviewFilter("");
    setSelectedProductLine("");
    setCurrentPage(0);
  };

  // ─────────────────────────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f5f5f5]">

      {/* BREADCRUMB */}

      <div className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

          <nav className="flex items-center gap-1 text-sm text-gray-500 flex-wrap">

            <Link
              href="/"
              className="hover:text-[#b91c1c] transition-colors"
            >
              Home
            </Link>

            <FaChevronRight className="text-xs text-gray-400 flex-shrink-0" />

            <Link
              href="/parts"
              className="hover:text-[#b91c1c] transition-colors"
            >
              Parts
            </Link>

            {vehicleLabel && (
              <>
                <FaChevronRight className="text-xs text-gray-400 flex-shrink-0" />

                <span className="text-gray-800 font-medium truncate">
                  {vehicleLabel}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* HEADER */}

      {/* <div className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {vehicleLabel || "Part Search Results"}
              </h1>
            </div>

            {vehicleLabel && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm">

                <span className="text-gray-500">
                  Vehicle:
                </span>

                <span className="font-semibold text-[#b91c1c]">
                  {vehicleLabel}
                </span>

                <button
                  onClick={() => router.push("/parts")}
                  className="ml-1 text-gray-400 hover:text-red-600 transition-colors text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div> */}

      {/* BODY */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <div className="flex flex-col md:flex-row gap-6">

          {/* SIDEBAR */}

          <aside className="w-full md:w-72 bg-white border border-gray-200 rounded-xl p-4 h-fit">

            {/* CATEGORY */}

            <p className="text-[#b91c1c] font-semibold text-sm pb-2">
              Filter By Category
            </p>

            {loadingCategories ? (

              <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />

            ) : (

              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full p-2 border rounded-md text-sm"
              >

                <option value="">
                  All categories
                </option>

                {categories.map((category) => (

                  <option
                    key={category.id}
                    value={category.name}
                  >
                    {category.name}
                  </option>

                ))}
              </select>
            )}

            {/* SUBCATEGORY */}

            <p className="text-[#b91c1c] font-semibold text-sm pb-2 mt-4">
              Filter By Subcategory
            </p>

            {loadingSubcategories ? (

              <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />

            ) : (

              <select
                value={selectedSubcategory}
                onChange={handleSubcategoryChange}
                className="w-full p-2 border rounded-md text-sm"
                disabled={!selectedCategory}
              >

                <option value="">
                  {selectedCategory
                    ? "All subcategories"
                    : "Select a category first"}
                </option>

                {subcategories.map((subcategory) => (

                  <option
                    key={subcategory.id}
                    value={subcategory.name}
                  >
                    {subcategory.name}
                  </option>

                ))}
              </select>
            )}

            <p className="text-[#b91c1c] font-semibold text-sm pb-2 mt-4">
              Filter by brand
            </p>
            {loadingBrands ? (
              <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
            ) : (
              <select
                value={selectedBrand}
                onChange={handleBrandChange}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="">All brands</option>
                {brands.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            )}

            <p className="text-[#b91c1c] font-semibold text-sm pb-2 mt-4">
              Price range (CAD)
            </p>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={0}
                step={0.01}
                inputMode="decimal"
                value={priceMinDraft}
                onChange={(e) => setPriceMinDraft(e.target.value)}
                onBlur={applyPriceFilters}
                placeholder="Min"
                className="w-1/2 p-2 border rounded-md text-sm"
              />
              <span className="text-gray-400 text-xs shrink-0">–</span>
              <input
                type="number"
                min={0}
                step={0.01}
                inputMode="decimal"
                value={priceMaxDraft}
                onChange={(e) => setPriceMaxDraft(e.target.value)}
                onBlur={applyPriceFilters}
                placeholder="Max"
                className="w-1/2 p-2 border rounded-md text-sm"
              />
            </div>

            <p className="text-[#b91c1c] font-semibold text-sm pb-2 mt-4">
              Minimum customer review
            </p>
            <select
              value={reviewFilter}
              onChange={handleReviewChange}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="">Any rating</option>
              <option value="5">5 stars and up</option>
              <option value="4">4 stars and up</option>
              <option value="3">3 stars and up</option>
              <option value="2">2 stars and up</option>
              <option value="1">1 star and up</option>
            </select>

            <p className="text-[#b91c1c] font-semibold text-sm pb-2 mt-4">
              Product line
            </p>
            <select
              value={selectedProductLine}
              onChange={handleProductLineChange}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="">
                {productLineOptions.length > 0
                  ? "All product lines"
                  : "Run a search to load lines"}
              </option>
              {productLineOptions.map((line) => (
                <option key={line} value={line}>
                  {line}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleClearAuxFilters}
              className="w-full mt-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear extra filters
            </button>
          </aside>

          {/* CONTENT */}

          <div className="flex-1">

            {/* ERROR */}

            {error && !loading && (

              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">

                <p className="text-red-700 font-medium">
                  {error}
                </p>

                <button
                  onClick={fetchParts}
                  className="mt-3 px-5 py-2 bg-[#b91c1c] text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* LOADING */}

            {loading && (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                {Array.from({ length: 8 }).map((_, i) => (
                  <PartCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* EMPTY */}

            {!loading &&
              !error &&
              parts.length === 0 && (
                <EmptyState
                  vehicleLabel={vehicleLabel}
                />
              )}

            {/* PARTS */}

            {!loading &&
              !error &&
              parts.length > 0 && (
                <>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                    {parts.map((part) => (
                      <PartCard
                        key={part.id}
                        part={part}
                      />
                    ))}
                  </div>

                  {/* PAGINATION */}

                  {totalPages > 1 && (

                    <div className="flex items-center justify-center gap-2 mt-10">

                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        Previous
                      </button>

                      {Array.from(
                        { length: totalPages },
                        (_, i) => (

                          <button
                            key={i}
                            onClick={() => goToPage(i)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                              i === currentPage
                                ? "bg-[#b91c1c] text-white border border-[#b91c1c]"
                                : "border border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {i + 1}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}