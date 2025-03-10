"use client";

import { useRouter } from "next/navigation";

export const Grid4Layout = ({ products }) => {
  const router = useRouter();

  function stringToSlug(str) {
    str = str.replace("&", "and");
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  }

  const handleClick = (listing, category) => {
    const categorySlug =
      category === "Replacement Parts" || category === "Fluids & Lubricants"
        ? "replacement-parts"
        : "shop-supplies";

    const slug = stringToSlug(listing); // Convert listing to a slug
    router.push(`/${categorySlug}/${slug}`);
  };

  // Ensure the number of products is a multiple of 4
  const paddedProducts = [...products];
  while (paddedProducts.length % 4 !== 0) {
    paddedProducts.push({ name: "", imageUrl: [""], categoryName: "", isPlaceholder: true });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {paddedProducts.map((part, index) =>
        part.isPlaceholder ? (
          <div
            key={index}
            className="invisible" // Hide placeholder items
            aria-hidden="true"
          ></div>
        ) : (
          <div
            key={index}
            className="bg-white p-4 hover:shadow-md hover:scale-105 transition border border-gray-100 cursor-pointer"
            onClick={() => handleClick(part.name, part.categoryName)}
          >
            <img
              src={part.imageUrl[0]}
              alt={part.name}
              className="w-full h-40 object-contain"
            />
            <h3 className="font-semibold mb-2 text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis">
              {part.name}
            </h3>
            <p className="text-gray-500 text-center text-xs">View Products</p>
          </div>
        )
      )}
    </div>
  );
};