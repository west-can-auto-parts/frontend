"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import axios from "axios";

const Page = ({ params }) => {
  const [supplier, setSupplier] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // const isProduction = process.env.NODE_ENV === "production";
  // const apiUrl = isProduction
  //   ? "https://clientsidebackend.onrender.com/api/suppliers"
  //   : "http://localhost:8080/api/suppliers";



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

  const slugToOriginalName = (slug) => {
    if (!slug || slug.trim() === "") {
      return slug;
    }
    return slug.replace("-", " ").toUpperCase();
  };

  const supplierDescriptionStyles = {
    container: {
      backgroundColor: "#b12b29", // Light red background
      color: "#ffffff", // White text
      padding: "16px", // Add padding for a clean layout
      lineHeight: "1.5", // Improve readability with proper line height
    },
    toggleButton: {
      color: "#ffffff", // White button text
      fontWeight: "bold",
      textDecoration: "underline",
      marginTop: "8px", // Space between the description and button
    },
  };


  const brand = slugToOriginalName(params.supplierName);

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "40px",
      width: "380px",
      fontSize: "16px",
      borderColor: state.isFocused ? "#b12b29" : "#b12b29", // Red border
      "&:hover": {
        borderColor: "#b12b29",
      },
      boxShadow: state.isFocused ? "0 0 0 1px #b12b29" : "none",
    }),
    dropdownIndicator: (base) => ({ ...base, padding: "4px", color: "#b12b29" }),
    clearIndicator: (base) => ({ ...base, padding: "4px", color: "#b12b29" }),
    valueContainer: (base) => ({ ...base, padding: "2px 6px" }),
    menu: (base) => ({
      ...base,
      width: "380px",
      fontSize: "16px",
      backgroundColor: "#ffffff", color: "#000000"
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#ffffff"
        : state.isFocused
          ? "#b12b29"
          : "#ffffff",
      color: state.isSelected ? "#b12b29" : "#000000",
      "&:hover": { backgroundColor: "#b12b29", color: "#ffffff" },
    }),
  };

  const customSelectStyles2 = {
    control: (base, state) => ({
      ...base,
      borderColor: "#b12b29", // Red border
      "&:hover": {
        borderColor: "#b12b29",
      },
      boxShadow: state.isFocused ? "0 0 0 1px #b12b29" : "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "4px",
      color: "#b12b29",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "4px",
      color: "#b12b29",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "2px 6px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#ffffff", // White background for dropdown menu
      color: "#000000", // Black text for dropdown menu
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#b12b29" : "#ffffff", // Red only for selected, white for others
      color: state.isSelected ? "#ffffff" : "#000000", // White text only for selected
      "&:hover": {
        backgroundColor: "#b12b29", // Red background on hover
        color: "#ffffff", // White text on hover
      },
    }),
  };


  // useEffect(() => {
  //   const fetchSupplierData = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/name`, {
  //         params: { names: brand },
  //       });
  //       setSupplier(response.data);

  //       const sortedCategories = Object.entries(response.data.subCategory || {})
  //         .sort((a, b) => a[1].position - b[1].position)
  //         .map(([key]) => ({ value: key, label: key }));

  //       setSelectedCategory(sortedCategories[0]?.value || "");
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching supplier data:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchSupplierData();
  // }, [brand]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobileView(window.innerWidth < 768);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleClick = (listing, category) => {
    const categorySlug =
      category === "Replacement Parts" || category === "Fluids & Lubricants"
        ? "replacement-parts"
        : "shop-supplies";

    const slug = stringToSlug(listing);
    router.push(`/${categorySlug}/${slug}`);
  };

  const getShortDescription = (text) => {
    return isDescriptionExpanded ? text : text.split(" ").slice(0, 60).join(" ") + "...";
  };

  const backgroundImageUrl = (supplier?.bannerUrl) ||
    "https://res.cloudinary.com/dpeocx0yy/image/upload/v1737539505/BANNER_fwflwx.png";


  const vehicles = [
    {
      id: 1,
      name: "Toyota Camry",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Sedan"
    },
    {
      id: 2,
      name: "Honda Civic",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "Sedan"
    },
    {
      id: 3,
      name: "Ford F-150",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "Truck"
    },
    {
      id: 4,
      name: "Chevrolet Silverado",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Truck"
    },
    {
      id: 5,
      name: "Nissan Altima",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2020,
      type: "Sedan"
    },
    {
      id: 6,
      name: "Hyundai Elantra",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "Sedan"
    },
    {
      id: 7,
      name: "Kia Sorento",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 8,
      name: "Mazda CX-5",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "SUV"
    },
    {
      id: 9,
      name: "Subaru Outback",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Wagon"
    },
    {
      id: 10,
      name: "Volkswagen Jetta",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "Sedan"
    },
    {
      id: 11,
      name: "BMW 3 Series",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Sedan"
    },
    {
      id: 12,
      name: "Mercedes-Benz C-Class",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "Sedan"
    },
    {
      id: 13,
      name: "Audi Q5",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 14,
      name: "Jeep Wrangler",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "SUV"
    },
    {
      id: 15,
      name: "Tesla Model 3",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "Sedan"
    },
    {
      id: 16,
      name: "Chevrolet Equinox",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 17,
      name: "Toyota RAV4",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2021,
      type: "SUV"
    },
    {
      id: 18,
      name: "Honda CR-V",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "SUV"
    },
    {
      id: 19,
      name: "Ford Escape",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2023,
      type: "SUV"
    },
    {
      id: 20,
      name: "GMC Sierra",
      imageUrl: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      year: 2022,
      type: "Truck"
    }
  ];

  const vehicleOptions = vehicles.map(vehicle => ({
    value: vehicle.name,
    label: `${vehicle.year} ${vehicle.name} (${vehicle.type})`
  }));

  const MobileView = () => (
    <div className="flex flex-col w-full gap-4">
      {/* Mobile Header */}
      <div
        className="h-40 relative"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "contain", // Ensure the entire image is visible
          backgroundRepeat: "no-repeat", // Avoid repeating the image
          backgroundPosition: "center", // Center the image
        }}
      >
        <div className="overlay bg-[#00000080] h-full w-full absolute top-0 left-0"></div>
      </div>
      {/* Mobile Sidebar */}
      <div className="bg-white p-4 shadow-md">
        <div className="w-full h-[100px] flex items-center justify-center border border-gray-300 bg-gray-100">
          <img
            src={supplier?.imageUrl || ""}
            alt={brand || "Supplier logo"}
            className="object-contain max-w-full max-h-full"
          />
        </div>
        <div style={supplierDescriptionStyles.container}>
          <p>{getShortDescription(supplier?.description || "No description available.")}</p>
          <button style={supplierDescriptionStyles.toggleButton} onClick={toggleDescription}>
            {isDescriptionExpanded ? "View Less" : "View More"}
          </button>
        </div>

      </div>
      {/* Mobile Products */}
      <div>
        <div className="mb-4">
          <Select
            id="vehicle-select"
            className="basic-single"
            classNamePrefix="select"
            value={vehicleOptions.find(option => option.value === selectedCategory)}
            onChange={(e) => setSelectedCategory(e.value)}
            options={vehicleOptions}
            styles={customSelectStyles2}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {supplier?.subCategory?.[selectedCategory]?.productCategory?.map((product, i) => (
            <div
              key={i}
              className="bg-white p-4 shadow-sm"
              onClick={() => handleClick(product.name, product.categoryName)}
            >
              <img
                src={product.imageUrl[0]}
                alt={product.name}
                className="w-full h-40 object-contain"
              />
              <h3 className="text-sm font-semibold">{product.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  const DesktopView = () => (
    <>
      {/* Banner Image */}
      <div
        className="w-full bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "contain",
          height: "30vh",
        }}
      >
        <div className="overlay bg-[#00000080] h-full w-full"></div>
      </div>

      <div className="flex flex-col-reverse md:flex-row flex-wrap md:flex-nowrap w-10/12 mx-auto gap-8">
        {/* Sidebar */}
        <div className="mt-[-130px] bg-white p-4 md:p-12 w-full md:w-1/3 shadow-md">
          <div className="w-full h-[130px] flex items-center justify-center">
            <img
              className="object-contain max-w-full max-h-full"
              src={supplier?.imageUrl || ""}
              alt={brand || "Supplier logo"}
            />
          </div>
          <div className="mt-4">
            <div style={supplierDescriptionStyles.container}>
              <p>{getShortDescription(supplier?.description || "No description available.")}</p>
              <button style={supplierDescriptionStyles.toggleButton} onClick={toggleDescription}>
                {isDescriptionExpanded ? "View Less" : "View More"}
              </button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-2/3">
          <div className="mt-6">
            <Select
              value={vehicleOptions.find(option => option.value === selectedCategory)}
              onChange={(e) => setSelectedCategory(e.value)}
              options={vehicleOptions}
              styles={customSelectStyles}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {supplier?.subCategory?.[selectedCategory]?.productCategory?.map((product, i) => (
              <div key={i} className="bg-white p-4 shadow-sm cursor-pointer" onClick={() => handleClick(product.name, product.categoryName)}>
                <img
                  src={product.imageUrl[0]}
                  alt={product.name}
                  className="object-cover w-full h-32"
                />
                <p className="mt-2 text-center font-semibold">{product.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  // if (isLoading) return <p>Loading...</p>;
  // if (!supplier) return <p>Supplier not found.</p>;

  return isMobileView ? <MobileView /> : <DesktopView />;
};
export default Page;