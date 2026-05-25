"use client"

import React, { useState, useEffect, useRef } from 'react'
import { FaMagnifyingGlass, FaBars, FaCar, FaHeart, FaPersonCircleCheck, FaCartShopping, FaXmark, FaWhatsapp, FaChevronRight, FaChevronDown, FaWarehouse } from 'react-icons/fa6';
import { GaragePanel } from './_components/GaragePanel';
import { fetchUserSession, deleteGarageVehicle } from '@/lib/userSessionApi';
import { parseGarageVehicles, vehicleToSearchParams, vehicleToDeletePayload, vehicleToKey } from '@/lib/parseGarageVehicles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import PreHeader from './PreHeader'
import HeaderMenu from './HeaderMenu'
import OnScrollHeader from '../OnScrollHeader/OnScrollNav'
import { BiUser } from 'react-icons/bi';
import { UserButton } from './_components/user-button'
import { Logo } from '../Logo'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop All', href: '/categories' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQs', href: '/faqs' },
];

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

const MAKES_MODELS = {
  HYUNDAI: ['ACCENT', 'ELANTRA', 'SONATA', 'TUCSON', 'SANTA FE', 'VELOSTER', 'IONIQ 5'],
  KIA: ['RIO', 'FORTE', 'SOUL', 'SPORTAGE', 'SORENTO', 'STINGER', 'TELLURIDE'],
  TOYOTA: ['COROLLA', 'CAMRY', 'RAV4', 'HIGHLANDER', 'TACOMA', 'TUNDRA', '4RUNNER'],
  HONDA: ['CIVIC', 'ACCORD', 'CR-V', 'PILOT', 'ODYSSEY', 'RIDGELINE', 'HR-V'],
  FORD: ['F-150', 'MUSTANG', 'EXPLORER', 'ESCAPE', 'EDGE', 'BRONCO', 'RANGER'],
  CHEVROLET: ['SILVERADO', 'EQUINOX', 'MALIBU', 'TAHOE', 'TRAVERSE', 'COLORADO', 'CAMARO'],
  DODGE: ['RAM 1500', 'CHARGER', 'CHALLENGER', 'DURANGO', 'GRAND CARAVAN', 'JOURNEY'],
  NISSAN: ['ALTIMA', 'SENTRA', 'ROGUE', 'MURANO', 'PATHFINDER', 'FRONTIER', 'TITAN'],
  BMW: ['3 SERIES', '5 SERIES', 'X3', 'X5', '7 SERIES', 'M3', 'M5'],
  MERCEDES: ['C-CLASS', 'E-CLASS', 'GLC', 'GLE', 'A-CLASS', 'S-CLASS', 'CLA'],
};

const VehicleSelector = ({ onClose }) => {
  const router = useRouter();
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [submodel, setSubmodel] = useState('');
  const [engine, setEngine] = useState('');

  const models = make ? (MAKES_MODELS[make] || []) : [];
  const isValid = Boolean(year && make && model);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;

    const params = new URLSearchParams({ year, make, model });
    if (submodel) params.set('submodel', submodel);
    if (engine) params.set('engine', engine);

    onClose();
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      <div className="bg-[#b91c1c] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaCar className="text-white text-lg" />
          <span className="text-white font-bold text-sm tracking-wide">Find Parts For Your Vehicle</span>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Close vehicle selector"
        >
          <FaXmark className="text-base" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Year <span className="text-[#b91c1c]">*</span>
            </label>
            <div className="relative">
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] cursor-pointer pr-8"
              >
                <option value="">Select Year</option>
                {YEARS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Make <span className="text-[#b91c1c]">*</span>
            </label>
            <div className="relative">
              <select
                value={make}
                onChange={(event) => {
                  setMake(event.target.value);
                  setModel('');
                }}
                className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] cursor-pointer pr-8"
              >
                <option value="">Select Make</option>
                {Object.keys(MAKES_MODELS).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Model <span className="text-[#b91c1c]">*</span>
          </label>
          <div className="relative">
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              disabled={!make}
              className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] cursor-pointer pr-8 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <option value="">{make ? 'Select Model' : 'Select a Make first'}</option>
              {models.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Submodel <span className="text-gray-300 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={submodel}
              onChange={(event) => setSubmodel(event.target.value.toUpperCase())}
              placeholder="e.g. SE, GL, LX"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] placeholder:text-gray-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Engine <span className="text-gray-300 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={engine}
              onChange={(event) => setEngine(event.target.value)}
              placeholder="e.g. 1.6L L4"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] placeholder:text-gray-300"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed enabled:bg-[#b91c1c] enabled:text-white enabled:hover:bg-red-800 enabled:shadow-md enabled:shadow-red-100"
        >
          <FaMagnifyingGlass className="text-xs" />
          Search Parts
          {isValid && <FaChevronRight className="text-xs" />}
        </button>

        {!isValid && (
          <p className="text-center text-xs text-gray-400">Year, Make, and Model are required</p>
        )}
      </form>
    </div>
  );
};

const MainContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [garageVehicles, setGarageVehicles] = useState([]);
  const [garageLoading, setGarageLoading] = useState(false);
  const [garageError, setGarageError] = useState(null);
  const [garageDeletingKey, setGarageDeletingKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const searchBoxRef = useRef(null);
  const vehicleSelectorRef = useRef(null);
  const garageRef = useRef(null);

  const router = useRouter()

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://clientsidebackend.onrender.com/api'
    : 'http://localhost:8080/api';

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

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleSearch = async (query) => {
    if (query.length < 3) {
      setSearchResults(null);
      setShowResults(false);
      return;
    }
    const slug = stringToSlug(query);
    try {
      const response = await fetch(
      `${apiUrl}/suggestions?prefix=${encodeURIComponent(slug)}&limit=10`,
      { headers: { Accept: "application/json" } }
    );
      if (!response.ok) {
        console.error('Search API returned an error:', response.status);
        setSearchResults(null);
        setShowResults(false);
        return;
      }

      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults(null);
      setShowResults(false);
    }
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setSearchQuery('')
      setShowResults(false);
    }
    if (vehicleSelectorRef.current && !vehicleSelectorRef.current.contains(event.target)) {
      setIsVehicleOpen(false);
    }
    if (garageRef.current && !garageRef.current.contains(event.target)) {
      setIsGarageOpen(false);
    }
  };

  const loadGarageVehicles = async () => {
    setGarageLoading(true);
    setGarageError(null);
    try {
      const session = await fetchUserSession();
      setGarageVehicles(parseGarageVehicles(session));
    } catch (err) {
      console.error('Error loading garage:', err);
      setGarageError('Could not load your garage. Please try again.');
      setGarageVehicles([]);
    } finally {
      setGarageLoading(false);
    }
  };

  const handleGarageToggle = () => {
    const willOpen = !isGarageOpen;
    setIsGarageOpen(willOpen);
    if (willOpen) {
      setIsVehicleOpen(false);
      loadGarageVehicles();
    }
  };

  const handleVehicleToggle = () => {
    const willOpen = !isVehicleOpen;
    setIsVehicleOpen(willOpen);
    if (willOpen) setIsGarageOpen(false);
  };

  const handleGarageVehicleSelect = (vehicle) => {
    setIsGarageOpen(false);
    router.push(`/search?${vehicleToSearchParams(vehicle).toString()}`);
  };

  const handleGarageVehicleDelete = async (vehicle) => {
    const key = vehicleToKey(vehicle);
    setGarageDeletingKey(key);
    setGarageError(null);
    try {
      await deleteGarageVehicle(vehicleToDeletePayload(vehicle));
      setGarageVehicles((previous) =>
        previous.filter((item) => vehicleToKey(item) !== key),
      );
    } catch (err) {
      console.error('Error deleting garage vehicle:', err);
      setGarageError('Could not remove this vehicle. Please try again.');
    } finally {
      setGarageDeletingKey(null);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length >= 3) {
      handleSearch(query); // Pass the query string, not the event object
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };


  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
    if (searchQuery.length < 3) {
      return;
    }
    const slug = stringToSlug(searchQuery);

    try {
      const response = await fetch(
      `${apiUrl}/suggestions?prefix=${encodeURIComponent(slug)}&limit=10`,
      { headers: { Accept: "application/json" } }
    );
      if (!response.ok) {
        console.error('Search API returned an error:', response.status);
        setSearchResults(null);
        setShowResults(false);
        return;
      }

      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults(null);
      setShowResults(false);
    }
  };


  const handleResultClick = (listing, category) => {
    const categorySlug = category === 'Replacement Parts' || category === 'Fluids & Lubricants'
      ? 'replacement-parts'
      : 'shop-supplies';
      const slug = stringToSlug(listing)
    // Navigate to the specific product page with category and subcategory
    router.push(`/${categorySlug}/${slug}`);
  };

  const handleSubCategoryClick = (listing) => {
    router.push(`/shop/${listing}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Reset the search bar on scroll
      setSearchQuery("");
      setShowResults(false);
      setIsVehicleOpen(false);
      setIsGarageOpen(false);

      // Update navbar visibility based on scroll direction
      setShowNavbar(currentScrollY > prevScrollY && currentScrollY > 100);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    // Add event listener to detect clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='w-full border-b-2 border-[#00000010] py-1 md:py-4'>
      <div className="w-10/12 mx-auto flex gap-6 justify-between">
        <div className="flex items-center gap-8">
          <FaBars className='w-5 h-5 lg:hidden' onClick={toggleMenu} />
          <div className={`fixed inset-y-0 w-full px-4 left-0 overflow-y-auto bg-gray-100 z-50 transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ transition: 'transform 0.3s ease-out' }}>
            <div className='py-2 my-2 flex justify-between gap-6 items-center'>
              <p className='font-bold text-lg'>Menu</p>
              <FaXmark className='h-5 w-5' onClick={toggleMenu} />
            </div>
            <div className="flex justify-between gap-4">
              <button className='w-full flex items-center gap-2 text-xs  px-2 py-2 shadow-md rounded-md bg-gray-200 font-semibold'>
                <BiUser className='w-5 h-5 rounded-full bg-red-800 text-white p-1' /> Sign In / Register
              </button>
              <button className='w-full flex items-center gap-2 text-xs  px-2 py-2 shadow-md rounded-md bg-gray-200 font-semibold'>
                <FaWhatsapp className='w-6 h-6  rounded-full bg-green-700 text-white p-1' /> WhatsApp Us
              </button>
            </div>
            <ul className="list-none border-b border-gray-300 py-2 mb-2">
              {navItems.map((item) => (
                <li key={item.href} className='py-1 my-2'>
                  <Link href={item.href} className='block text-sm font-semibold text-gray-700'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="image-container">
            <Link href={'/'}>
              <Logo className='w-[75px] lg:w-[125px] h-auto' priority />
            </Link>
          </div>
          <div className='hidden md:flex gap-2 items-center h-fit'>
            <form className="relative" ref={searchBoxRef} onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className='bg-gray-100 h-full pl-4 pr-2 py-2 gap-4 w-[300px] lg:w-[500px]'
                placeholder='Enter Keyword or Part Number'
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type='submit' className='absolute top-1/2 right-2 transform -translate-y-1/2'>
                <FaMagnifyingGlass className='w-5 h-5 text-gray-600' />
              </button>
              {showResults && (searchResults?.ProductCategory?.length > 0 || searchResults?.SubCategory?.length > 0) && (
                <div className='absolute top-full mt-2 bg-white border border-gray-300 shadow-lg z-50 w-full'>
                  {/* Render ProductCategory Results */}
                  {searchResults.ProductCategory?.length > 0 && (
                    <div>
                      <h3 className='font-bold text-lg px-2 py-1'>Product Categories</h3>
                      {searchResults.ProductCategory.map((product) => (
                        <div
                          key={product.id}
                          className='p-2 hover:bg-gray-100 cursor-pointer'
                          onClick={() => {
                            handleResultClick(product.name, product.categoryName); // Example href generation for ProductCategory
                            setShowResults(false);
                          }}
                        >
                          <p className='font-semibold'>{product.name}</p>
                          {/* <p className='text-sm text-gray-600'>{product.description}</p> */}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render SubCategory Results */}
                  {searchResults.SubCategory?.length > 0 && (
                    <div>
                      <h3 className='font-bold text-lg px-2 py-1'>Sub Categories</h3>
                      {searchResults.SubCategory.map((subcategory) => (
                        <div
                          key={subcategory.id}
                          className='p-2 hover:bg-gray-100 cursor-pointer'
                          onClick={() => {
                            handleSubCategoryClick(subcategory.name); // Example href generation for SubCategory
                            setShowResults(false);
                          }}
                        >
                          <p className='font-semibold'>{subcategory.name}</p>
                          {/* <p className='text-sm text-gray-600'>{subcategory.description}</p> */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </form>
            <div className="flex items-center gap-2 shrink-0">
            <div className="relative" ref={vehicleSelectorRef}>
              <button
                type="button"
                onClick={handleVehicleToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold whitespace-nowrap transition-colors ${isVehicleOpen ? 'bg-[#b91c1c] text-white border-[#b91c1c]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#b91c1c] hover:text-[#b91c1c]'}`}
              >
                <FaCar className="text-base" />
                <span>Find by Vehicle</span>
                <FaChevronDown className={`text-xs transition-transform ${isVehicleOpen ? 'rotate-180' : ''}`} />
              </button>
              {isVehicleOpen && <VehicleSelector onClose={() => setIsVehicleOpen(false)} />}
            </div>
              <div className="relative" ref={garageRef}>
                <button
                  type="button"
                  onClick={handleGarageToggle}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold whitespace-nowrap transition-colors ${isGarageOpen ? 'bg-[#b91c1c] text-white border-[#b91c1c]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#b91c1c] hover:text-[#b91c1c]'}`}
                  aria-expanded={isGarageOpen}
                  aria-haspopup="listbox"
                >
                  <FaWarehouse className="text-base" />
                  <span>Garage</span>
                  <FaChevronDown className={`text-xs transition-transform ${isGarageOpen ? 'rotate-180' : ''}`} />
                </button>
                {isGarageOpen && (
                  <GaragePanel
                    vehicles={garageVehicles}
                    loading={garageLoading}
                    error={garageError}
                    deletingKey={garageDeletingKey}
                    onSelectVehicle={handleGarageVehicleSelect}
                    onDeleteVehicle={handleGarageVehicleDelete}
                    onClose={() => setIsGarageOpen(false)}
                    onRetry={loadGarageVehicles}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          <div className='flex gap-2 items-center'>
            <div className='hidden md:block bg-green-500 text-white rounded-md md:rounded-full p-2'>
              <FaWhatsapp className='h-6 w-6' />
            </div>
            <Link href={'https://wa.me/16045948800'} target='_blank' className='hidden md:flex items-center justify-end gap-2'>
              <div className='hidden lg:block'>
                <p className="text-xs text-gray-500">Chat With Us </p>
                <p className='font-semibold'>On WhatsApp</p>
              </div>
            </Link>
          </div>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <PreHeader />
      <MainContent />
      <HeaderMenu />
      <OnScrollHeader />
    </header>
  )
}

export default Header;