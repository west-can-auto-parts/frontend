import React, { useState } from 'react';

export const ImageGallery = ({ myProduct }) => {
  const [selectedImage, setSelectedImage] = useState(myProduct?.imageUrl[0] || '');

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  return (
    <div className="w-full md:w-1/2 md:flex md:flex-nowrap md:flex-row-reverse gap-4">
      {/* Main Image */}
      <div className="w-full">
        <img
          src={selectedImage}
          alt="Selected product"
          className="w-full h-[30vh] md:h-[40vh] object-cover object-center"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="w-full md:w-24 xs:mt-0 sm:mt-2 md:mt-0">
        <div className="flex flex-wrap md:flex-col gap-2">
          {myProduct.imageUrl && myProduct.imageUrl.length > 0 ? (
            myProduct.imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleImageClick(url)} // Update main image on click
                className={`h-24 w-24 rounded-md object-cover cursor-pointer ${
                  selectedImage === url ? 'border-2 border-[#b21b29]' : ''
                }`}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No images available</p>
          )}
        </div>
      </div>
    </div>
  );
};
