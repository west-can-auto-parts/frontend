import { useState, useEffect, useRef } from 'react';

export const AboutPart = ({ mySubPart }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isContentTruncated, setIsContentTruncated] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    // Check if the content exceeds the two-line limit
    if (descriptionRef.current) {
      const lineHeight = parseFloat(getComputedStyle(descriptionRef.current).lineHeight);
      const maxHeight = lineHeight * 2; // Maximum height for two lines
      setIsContentTruncated(descriptionRef.current.scrollHeight > maxHeight);
    }
  }, [mySubPart.description]);

  const imageUrl = mySubPart.images && mySubPart.images.length > 0 ? mySubPart.images[0] : '';

  return (
    <div
      className="overflow-hidden bg-cover bg-center relative"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Adding blur effect to the container */}
      <div className="absolute inset-0 bg-cover bg-center filter blur-sm"></div>

      {/* Content container with backdrop overlay */}
      <div className="relative px-6 py-6 bg-[#000000d6] text-white">
        <p className="text-lg font-bold mb-2">About: {mySubPart.name}</p>
        <div
          ref={descriptionRef}
          className={`text-xs md:text-sm text-justify ${
            showFullDescription ? 'line-clamp-none' : 'line-clamp-2'
          }`}
        >
          {mySubPart.description}
        </div>

        {isContentTruncated && (
          <button
            className="text-[#b12b29] font-semibold mt-4 underline"
            onClick={() => setShowFullDescription((prev) => !prev)}
          >
            {showFullDescription ? 'View Less' : 'View More'}
          </button>
        )}
      </div>
    </div>
  );
};
