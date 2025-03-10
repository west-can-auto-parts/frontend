"use client"

import React, { useState, useEffect, useRef } from 'react'
import { FaMagnifyingGlass, FaBars, FaCar, FaHeart, FaPersonCircleCheck, FaCartShopping, FaXmark, FaWhatsapp, FaChevronRight } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import PreHeader from './PreHeader'
import HeaderMenu from './HeaderMenu'
import OnScrollHeader from '../OnScrollHeader/OnScrollNav'
import { BiUser } from 'react-icons/bi';
import { UserButton } from './_components/user-button'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop All', href: '/categories' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQs', href: '/faqs' },
];

const MainContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const searchBoxRef = useRef(null);

  const router = useRouter()

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://westcanuserbackend.onrender.com/api'
    : 'http://localhost:8080/api';

  function stringToSlug(str) {
    str = str.replace("&", "and");

    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
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
      const response = await fetch(`${apiUrl}/search?query=${slug}`);
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
      const response = await fetch(`${apiUrl}/search?query=${(slug)}`);
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
              <img src="https://westcanauto.com/wp-content/uploads/2023/05/WestCanAP_logoNOUSI-300x156.png" alt="Logo" className='w-[75px] lg:w-[125px]' /></Link>
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