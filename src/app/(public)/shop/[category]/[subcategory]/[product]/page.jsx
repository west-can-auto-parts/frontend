"use client";
import React, { useState } from 'react';
import { FaShippingFast, FaPhoneAlt, FaShieldAlt, FaTag, FaHeart, FaBars, FaPlus, FaMinus } from 'react-icons/fa';

const product = {

  image: [
    "https://red-parts.angular.themeforest.scompiler.ru/themes/red/assets/images/products/product-1-1.jpg",
    "https://red-parts.angular.themeforest.scompiler.ru/themes/red/assets/images/products/product-1-2.jpg"
  ],
  title: "Product Title",
  description: "Detailed product description goes here. This should include all relevant details about the product.",
  specs: [
    { label: "Dimensions", value: "10 x 5 x 3 inches" },
    { label: "Weight", value: "1.5 lbs" },
    { label: "Color", value: "Red" },
    { label: "Warranty", value: "2 years" },
  ],
  pricing: "$199.99",
  material: "Aluminum",
  quantity: "50 units",
  origin: "USA",
  tags: ["New", "Featured", "On Sale"],
  ratings: 4.2, // Average rating
  reviews: [
    { author: "John Doe", text: "Great product! Highly recommend.", rating: 5 },
    { author: "Jane Smith", text: "Good quality but a bit expensive.", rating: 4 },
    { author: "Alice Johnson", text: "Not satisfied with the material.", rating: 2 }
  ],
  keyFeatures: [
    "High-quality aluminum construction",
    "Long-lasting durability",
    "Affordable price",
    "Easy to install"
  ],
  price: "$19.00",
  stockStatus: "In Stock",
  sku: "140-10440-B",
  brand: "Brandix",
  country: "Japan",
  partNumber: "BDX-750Z370-S",
  material: ["Steel", "Aluminium", "Thorium"], // Adjust as needed
  color: ["white", "red", "yellow", "blue"],
  categories: ["Brake Kit", "Brandix", "Filter", "Bumper", "Transmission", "Hood"]
};



const Page = () => {
  
  const [selectedColor, setSelectedColor] = useState(product.color[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;

    return (
      <div className="flex items-center">
        {Array.from({ length: totalStars }, (_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${index < fullStars ? 'text-yellow-500' : 'text-gray-300'} fill-current`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {index < fullStars ? (
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
            ) : (
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
            )}
          </svg>
        ))}
        {halfStar && (
          <svg
            className="w-5 h-5 text-yellow-500 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className='flex flex-wrap md:flex-nowrap w-10/12 mx-auto gap-8'>
      {/* Product Image and Specifications */}
      <div className="w-full md:w-3/4">
        <div className='flex flex-wrap md:flex-nowrap border rounded shadow-md p-8 bg-white mb-4'>
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img src={product.image[0]} alt={product.title} className="w-full h-auto object-cover rounded" />
            <div className="mt-4 flex flex-wrap gap-2">
              {product.image.slice(1).map((img, index) => (
                <img key={index} src={img} alt={`${product.title} ${index + 2}`} className="w-24 h-24 object-cover rounded border" />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-8">
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <div className="flex items-center mb-4">
              {renderStars(product.ratings)}
              <span className="text-gray-600 text-sm ml-2">({product.reviews.length} reviews)</span>
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {product.keyFeatures.map((feature, index) => (
                  <li key={index} className="mb-1">{feature}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
        <div className="bg-white w-full p-8 rounded-md shadow-md">
          <div className="mb-4">
            <div className="flex space-x-4 mb-2">
              <button
                className={`py-2 px-4 font-semibold ${activeTab === 'description' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`py-2 px-4 font-semibold ${activeTab === 'specs' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                onClick={() => setActiveTab('specs')}
              >
                Specifications
              </button>
              <button
                className={`py-2 px-4 font-semibold ${activeTab === 'reviews' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
            {activeTab === 'description' && <p className="text-gray-700">{product.description}</p>}
            {activeTab === 'specs' && (
              <div className="space-y-2">
                {product.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-semibold">{spec.label}:</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-t pt-4">
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-gray-700">{review.text}</p>
                    <p className="text-yellow-500">Rating: {review.rating} stars</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Pricing and Details */}
      <div className="w-full md:w-1/4 ">
        <div className='p-8 bg-white border rounded shadow-md mb-6'>


          <p className="text-2xl font-bold mb-2">{product.price}</p>
          <p className="mb-2"><strong>Stock Status:</strong> {product.stockStatus}</p>
          <p className="mb-2"><strong>SKU:</strong> {product.sku}</p>
          <p className="mb-2"><strong>Brand:</strong> {product.brand}</p>
          <p className="mb-2"><strong>Country:</strong> {product.country}</p>
          <p className="mb-2"><strong>Part Number:</strong> {product.partNumber}</p>

        </div>
        <div className="p-8">
          <p className="mb-2"><strong>Material:</strong> </p>
          <div className="flex gap-2 text-xs font-semibold mb-2"> {product.material.map((mat, index) => (<div key={index} className='border px-2 py-1 bg-white'>{mat}</div>))}</div>
          <p className="mb-2"><strong>Color:</strong> </p>
          <div className="flex space-x-2">
            {product.color.map((color, index) => (
              <div
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-7 h-7 rounded-full cursor-pointer border ${selectedColor === color ? 'border-blue-500' : 'border-gray-300'}`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>



        </div>
        <div className='p-8 w-full mb-6 shadow-md rounded-md text-sm bg-white'>
          <div className="flex items-center justify-center mb-6 gap-4">
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="w-12 h-12 bg-gray-200 flex items-center justify-center border border-gray-300 rounded-l"
              >
                <FaMinus className="text-xl" />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 h-12 text-center bg-gray-200 border border-gray-300 text-lg"
              />
              <button
                onClick={increaseQuantity}
                className="w-12 h-12 bg-gray-200 flex items-center justify-center border border-gray-300 rounded-r"
              >
                <FaPlus className="text-xl" />
              </button>
            </div>
            <button className='bg-[#b12b29] text-white px-6 py-2'>Add To Cart</button>
          </div>
          <div className="flex items-center justify-center mb-4">
            <button className="w-full flex gap-2 items-center justify-center">
              <FaHeart />  Add to Wishlist
            </button>
            <button className="w-full flex gap-2 items-center justify-center ">
              <FaBars />  Add to Compare
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 text-sm font-semibold py-1 px-2 rounded">
                {tag}
              </span>
            ))}
          </div>

        </div>
        <div className='p-8 bg-white border rounded shadow-md'>
          <div className="text-sm flex flex-col gap-4">
            <div className="flex  items-center space-x-2">
              <FaShippingFast className="h-6 w-6 text-[#b91b29]" />
              <div>
                <p className="font-semibold">Free Shipping</p>
                <p>For orders from $50</p>
              </div>
            </div>
            <div className="flex  items-center space-x-2">
              <FaPhoneAlt className="h-6 w-6 text-[#b91b29]" />
              <div>
                <p className="font-semibold">Support 24/7</p>
                <p>Call us anytime</p>
              </div>
            </div>
            <div className="flex  items-center space-x-2">
              <FaShieldAlt className="h-6 w-6 text-[#b91b29]" />
              <div>
                <p className="font-semibold">100% Safety</p>
                <p>Only secure payments</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaTag className="h-6 w-6 text-[#b91b29]" />
              <div>
                <p className="font-semibold">Hot Offers</p>
                <p>Discounts up to 90%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
