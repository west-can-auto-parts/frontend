"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFlip,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "@/components/LazySwiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-flip";
import Link from "next/link";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CgShoppingCart } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useInView } from "@/hooks/useInView";

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

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? "https://clientsidebackend.onrender.com/api/product"
  : "http://localhost:8080/api/product";

const fetchCategory = async () => {
  const response = await fetch(`${apiUrl}/category`);
  const data = await response.json();
  return data;
};

const fetchSubCategory = async () => {
  const response = await fetch(`${apiUrl}/subcategory`);
  const data = await response.json();
  return data;
};

const CategorySkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-4 mb-8 min-h-[400px] animate-pulse">
    <div className="w-full lg:w-[120px] xl:w-[15%] bg-gray-300 rounded-md h-[300px] lg:h-full" />
    <div className="w-full lg:flex-1 xl:w-4/5 grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bg-white shadow-md rounded p-4 space-y-3">
          <div className="w-full h-[150px] md:h-[200px] bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
        </div>
      ))}
    </div>
  </div>
);

const CategoryProductCard = React.memo(({ product, onClick, slug }) => (
  <div
    className="bg-white shadow-md rounded flex flex-col justify-between p-4 cursor-pointer h-full group transition"
    onClick={onClick}
  >
    <div>
      <img
        src={product.images[0] || "https://via.placeholder.com/250"}
        alt={product.name}
        className="w-full h-[150px] md:h-[200px] lg:h-[200px] xl:h-[200px] object-contain mb-4 rounded"
        loading="lazy"
      />
      <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-2 text-[#b21b29] line-clamp-1">
        {product.name}
      </h3>
      <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-3">
        {product.description}
      </p>
    </div>
    <div className="flex justify-between items-center mt-4">
      <Link
        className="text-xs md:text-sm bg-[#b21b29] px-2 py-1 md:px-3 md:py-2 text-white rounded-md font-semibold flex gap-2 items-center hover:bg-[#9c1f24] transition"
        href={`/shop/${slug}`}
        onClick={(event) => event.stopPropagation()}
      >
        <CgShoppingCart /> Shop Now
      </Link>
      <div className="group-hover:bg-[#b12b29] group-hover:text-white bg-gray-100 rounded-full flex text-lg md:text-xl items-center w-8 h-8 md:w-10 md:h-10 justify-center transition">
        <HiMagnifyingGlass />
      </div>
    </div>
  </div>
));
CategoryProductCard.displayName = "CategoryProductCard";

const PopularCategories = () => {
  const [cats, setCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [view, setView] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Create refs object to store navigation refs for each category
  const navigationRefs = useRef({});
  const [swiperInstances, setSwiperInstances] = useState({});
  const swiperStoreRef = useRef({});
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { threshold: 0.15 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedCategories, fetchedSubCategories] = await Promise.all([
          fetchCategory(),
          fetchSubCategory(),
        ]);
        setCats(fetchedCategories);
        setSubCats(fetchedSubCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Initialize navigation refs for each category
  const getNavigationRefs = (categoryId) => {
    if (!navigationRefs.current[categoryId]) {
      navigationRefs.current[categoryId] = {
        prevRef: React.createRef(),
        nextRef: React.createRef()
      };
    }
    return navigationRefs.current[categoryId];
  };

  // Update navigation when swiper instances are ready
  useEffect(() => {
    Object.entries(swiperInstances).forEach(([categoryId, swiper]) => {
      const refs = navigationRefs.current[categoryId];
      if (swiper && refs?.prevRef.current && refs?.nextRef.current) {
        swiper.params.navigation.prevEl = refs.prevRef.current;
        swiper.params.navigation.nextEl = refs.nextRef.current;

        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
    });
  }, [swiperInstances]);

  const sideMenu = useMemo(
    () =>
      cats.map((cat) => ({
        title: cat.name,
        items: subCats
          .filter((subCat) => subCat.categoryName === cat.name)
          .map((subCat) => subCat.name),
        imgUrl:
          Array.isArray(cat.imageUrl) && cat.imageUrl.length > 0
            ? cat.imageUrl[0]
            : "default_image_url.jpg",
        id: cat.id,
      })),
    [cats, subCats]
  );

  useEffect(() => {
    Object.values(swiperStoreRef.current).forEach((instance) => {
      if (instance?.autoplay) {
        if (sectionInView) {
          instance.autoplay.start();
        } else {
          instance.autoplay.stop();
        }
      }
    });
  }, [sectionInView]);

  return (
    <section className="bg-gray-100/50 py-8" ref={sectionRef}>
      <div className="w-10/12 mx-auto py-2">
        <div className="flex justify-between items-center">
          <div className="flex justify-between flex-wrap md:flex-nowrap gap-2 mb-4 w-full">
            <p className="text-2xl font-bold pb-2 md:pb-0">Featured Categories</p>
            <div className="w-full md:w-auto flex items-center justify-center gap-3 pb-2 md:pb-0">
              <button
                className={`text-xs px-4 py-2 w-full md:w-auto ${
                  view === "featured"
                    ? "bg-[#b21b29] text-white"
                    : "bg-gray-200 text-[#b21b29]"
                }`}
                onClick={() => setView("featured")}
              >
                View Featured
              </button>
              <button
                className={`text-xs px-4 py-2 w-full md:w-auto ${
                  view === "bestsellers"
                    ? "bg-[#b21b29] text-white"
                    : "bg-gray-200 text-[#b21b29]"
                }`}
                onClick={() => setView("bestsellers")}
              >
                View Best Sellers
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))
            : sideMenu.map((menu) => {
                const { prevRef, nextRef } = getNavigationRefs(menu.id);

                return (
                  <div
                    key={menu.title}
                    className="flex flex-col lg:flex-row gap-4 mb-8 min-h-[400px] lg:h-[50vh] xl:h-[40vh]"
                  >
                    {/* Sidebar */}
                    <div
                      className="w-full lg:w-[120px] xl:w-[15%] bg-gray-800 bg-cover bg-center text-white relative rounded-md overflow-hidden h-[300px] lg:h-full"
                      style={{ backgroundImage: `url(${menu.imgUrl})` }}
                    >
                      <div className="absolute inset-0 bg-[#00000090] z-0" />
                      <div className="relative z-10 flex flex-col justify-between h-full p-4">
                        {/* Top */}
                        <div className="w-full flex justify-center">
                          <p className="text-lg font-bold text-center text-white break-words whitespace-normal max-w-xs">
                            {menu.title}
                          </p>
                        </div>

                        {/* Middle - Menu List */}
                        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#b21b29] scrollbar-track-gray-800">
                          <ul
                            className="flex flex-col gap-2 pt-4"
                            style={{ scrollBehavior: "smooth" }}
                          >
                            {menu.items.map((item, index) => (
                              <li key={index}>
                                <Link
                                  href={`/shop/${stringToSlug(item)}`}
                                  className="block p-1 text-white rounded hover:bg-[#b21b29] transition duration-300 text-xs"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Bottom - Button */}
                        <Link
                          href={
                            menu.title === "Replacement Parts" ||
                            menu.title === "Fluids & Lubricants"
                              ? `/replacement-parts`
                              : `/shop-supplies`
                          }
                        >
                          <button className="mt-4 text-xs bg-[#b12b29] px-4 py-2 rounded w-full hover:bg-[#9c1f24] transition">
                            Shop All
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Right Panel - Swiper with custom navigation */}
                    <div className="w-full lg:flex-1 xl:w-4/5 h-full relative group">
                      {/* Custom Prev Button */}
                      <button
                        ref={prevRef}
                        className="absolute top-1/2 left-2 z-20 -translate-y-1/2 bg-[#b21b29] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#9c1f24] transition opacity-0 group-hover:opacity-100"
                        aria-label="Previous slide"
                        type="button"
                      >
                        <span className="text-white font-bold text-3xl leading-none flex items-center justify-center">
                          ‹
                        </span>
                      </button>

                      {/* Custom Next Button */}
                      <button
                        ref={nextRef}
                        className="absolute top-1/2 right-2 z-20 -translate-y-1/2 bg-[#b21b29] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#9c1f24] transition opacity-0 group-hover:opacity-100"
                        aria-label="Next slide"
                        type="button"
                      >
                        <span className="text-white font-bold text-3xl leading-none flex items-center justify-center">
                          ›
                        </span>
                      </button>

                      <Swiper
                        observer={false}
                        observeParents={false}
                        resizeObserver={false}
                        watchOverflow
                        spaceBetween={12}
                        slidesPerView={4.5}
                        navigation={{
                          prevEl: prevRef.current,
                          nextEl: nextRef.current,
                        }}
                        pagination={false}
                        modules={[Navigation, Pagination, Scrollbar, A11y, EffectFlip]}
                        onSwiper={(swiper) => {
                          swiperStoreRef.current[menu.id] = swiper;
                          setSwiperInstances((prev) => ({
                            ...prev,
                            [menu.id]: swiper,
                          }));
                        }}
                        onDestroy={() => {
                          delete swiperStoreRef.current[menu.id];
                        }}
                        breakpoints={{
                          320: { slidesPerView: 1.2, spaceBetween: 8 },
                          640: { slidesPerView: 2.2, spaceBetween: 8 },
                          900: { slidesPerView: 3.2, spaceBetween: 12 },
                          1024: { slidesPerView: 4.5, spaceBetween: 12 },
                          1280: { slidesPerView: 4.5, spaceBetween: 12 },
                          1536: { slidesPerView: 4.5, spaceBetween: 12 },
                        }}
                        className="h-full"
                      >
                        {subCats
                          .filter((subCat) => subCat.categoryName === menu.title)
                          .filter((subCat) =>
                            view === "bestsellers" ? subCat.bestSeller : true
                          )
                          .map((product) => {
                            const slug = stringToSlug(product.name);
                            return (
                              <SwiperSlide key={product.id}>
                                <CategoryProductCard
                                  product={product}
                                  slug={slug}
                                  onClick={() => router.push(`/shop/${slug}`)}
                                />
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      {/* Inline Global CSS for scrollbar */}
      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #b21b29 #1f2937;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
          background: #1f2937;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #b21b29;
          border-radius: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9c1f24;
        }
      `}</style>
    </section>
  );
};

export default PopularCategories;
