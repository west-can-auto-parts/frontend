// "use client"

// import React, { useState, useEffect, useRef } from 'react'
// import {
//   FaMagnifyingGlass, FaBars, FaCar, FaHeart,
//   FaCartShopping, FaXmark, FaWhatsapp, FaChevronRight, FaChevronDown
// } from 'react-icons/fa6';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import PreHeader from './PreHeader'
// import HeaderMenu from './HeaderMenu'
// import OnScrollHeader from '../OnScrollHeader/OnScrollNav'
// import { UserButton } from './_components/user-button'
// import { Logo } from '../Logo'

// const navItems = [
//   { label: 'Home',     href: '/' },
//   { label: 'Shop All', href: '/categories' },
//   { label: 'About Us', href: '/about-us' },
//   { label: 'Contact',  href: '/contact-us' },
//   { label: 'Blogs',    href: '/blogs' },
//   { label: 'Careers',  href: '/careers' },
//   { label: 'FAQs',     href: '/faqs' },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // VehicleSelector — dropdown panel triggered by "Find Parts" button
// // ─────────────────────────────────────────────────────────────────────────────
// const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

// const MAKES_MODELS = {
//   HYUNDAI: ['ACCENT', 'ELANTRA', 'SONATA', 'TUCSON', 'SANTA FE', 'VELOSTER', 'IONIQ 5'],
//   KIA:     ['RIO', 'FORTE', 'SOUL', 'SPORTAGE', 'SORENTO', 'STINGER', 'TELLURIDE'],
//   TOYOTA:  ['COROLLA', 'CAMRY', 'RAV4', 'HIGHLANDER', 'TACOMA', 'TUNDRA', '4RUNNER'],
//   HONDA:   ['CIVIC', 'ACCORD', 'CR-V', 'PILOT', 'ODYSSEY', 'RIDGELINE', 'HR-V'],
//   FORD:    ['F-150', 'MUSTANG', 'EXPLORER', 'ESCAPE', 'EDGE', 'BRONCO', 'RANGER'],
//   CHEVROLET: ['SILVERADO', 'EQUINOX', 'MALIBU', 'TAHOE', 'TRAVERSE', 'COLORADO', 'CAMARO'],
//   DODGE:   ['RAM 1500', 'CHARGER', 'CHALLENGER', 'DURANGO', 'GRAND CARAVAN', 'JOURNEY'],
//   NISSAN:  ['ALTIMA', 'SENTRA', 'ROGUE', 'MURANO', 'PATHFINDER', 'FRONTIER', 'TITAN'],
//   BMW:     ['3 SERIES', '5 SERIES', 'X3', 'X5', '7 SERIES', 'M3', 'M5'],
//   MERCEDES: ['C-CLASS', 'E-CLASS', 'GLC', 'GLE', 'A-CLASS', 'S-CLASS', 'CLA'],
// };

// function VehicleSelector({ onClose }) {
//   const router = useRouter();
//   const [year,     setYear]     = useState('');
//   const [make,     setMake]     = useState('');
//   const [model,    setModel]    = useState('');
//   const [submodel, setSubmodel] = useState('');
//   const [engine,   setEngine]   = useState('');

//   const models = make ? (MAKES_MODELS[make] || []) : [];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!year || !make || !model) return;

//     const params = new URLSearchParams({ year, make, model });
//     if (submodel) params.set('submodel', submodel);
//     if (engine)   params.set('engine',   engine);

//     onClose();
//     router.push(`/parts/search?${params.toString()}`);
//   };

//   const isValid = year && make && model;

//   return (
//     <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] max-w-[95vw]
//                     bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">

//       {/* Header strip */}
//       <div className="bg-[#b91c1c] px-5 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <FaCar className="text-white text-lg" />
//           <span className="text-white font-bold text-sm tracking-wide">
//             Find Parts For Your Vehicle
//           </span>
//         </div>
//         <button onClick={onClose}
//           className="text-white/70 hover:text-white transition-colors"
//           aria-label="Close vehicle selector">
//           <FaXmark className="text-base" />
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="p-5 space-y-4">

//         {/* Row 1 — Year + Make */}
//         <div className="grid grid-cols-2 gap-3">
//           <div className="flex flex-col gap-1">
//             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//               Year <span className="text-[#b91c1c]">*</span>
//             </label>
//             <div className="relative">
//               <select
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//                 className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5
//                            text-sm text-gray-800 bg-white focus:outline-none focus:ring-2
//                            focus:ring-[#b91c1c] focus:border-[#b91c1c] cursor-pointer pr-8"
//               >
//                 <option value="">Select Year</option>
//                 {YEARS.map((y) => (
//                   <option key={y} value={y}>{y}</option>
//                 ))}
//               </select>
//               <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
//             </div>
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//               Make <span className="text-[#b91c1c]">*</span>
//             </label>
//             <div className="relative">
//               <select
//                 value={make}
//                 onChange={(e) => { setMake(e.target.value); setModel(''); }}
//                 className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5
//                            text-sm text-gray-800 bg-white focus:outline-none focus:ring-2
//                            focus:ring-[#b91c1c] focus:border-[#b91c1c] cursor-pointer pr-8"
//               >
//                 <option value="">Select Make</option>
//                 {Object.keys(MAKES_MODELS).map((m) => (
//                   <option key={m} value={m}>{m}</option>
//                 ))}
//               </select>
//               <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
//             </div>
//           </div>
//         </div>

//         {/* Row 2 — Model (full width) */}
//         <div className="flex flex-col gap-1">
//           <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//             Model <span className="text-[#b91c1c]">*</span>
//           </label>
//           <div className="relative">
//             <select
//               value={model}
//               onChange={(e) => setModel(e.target.value)}
//               disabled={!make}
//               className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5
//                          text-sm text-gray-800 bg-white focus:outline-none focus:ring-2
//                          focus:ring-[#b91c1c] focus:border-[#b91c1c] cursor-pointer pr-8
//                          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
//             >
//               <option value="">{make ? 'Select Model' : 'Select a Make first'}</option>
//               {models.map((m) => (
//                 <option key={m} value={m}>{m}</option>
//               ))}
//             </select>
//             <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
//           </div>
//         </div>

//         {/* Row 3 — Submodel + Engine (optional) */}
//         <div className="grid grid-cols-2 gap-3">
//           <div className="flex flex-col gap-1">
//             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//               Submodel <span className="text-gray-300 font-normal">(optional)</span>
//             </label>
//             <input
//               type="text"
//               value={submodel}
//               onChange={(e) => setSubmodel(e.target.value.toUpperCase())}
//               placeholder="e.g. SE, GL, LX"
//               className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800
//                          focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]
//                          placeholder:text-gray-300"
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//               Engine <span className="text-gray-300 font-normal">(optional)</span>
//             </label>
//             <input
//               type="text"
//               value={engine}
//               onChange={(e) => setEngine(e.target.value)}
//               placeholder="e.g. 1.6L L4"
//               className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800
//                          focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]
//                          placeholder:text-gray-300"
//             />
//           </div>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={!isValid}
//           className="w-full py-3 rounded-xl font-bold text-sm transition-all
//                      flex items-center justify-center gap-2
//                      disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
//                      enabled:bg-[#b91c1c] enabled:text-white enabled:hover:bg-red-800
//                      enabled:shadow-md enabled:shadow-red-100"
//         >
//           <FaMagnifyingGlass className="text-xs" />
//           Search Parts
//           {isValid && <FaChevronRight className="text-xs" />}
//         </button>

//         {!isValid && (
//           <p className="text-center text-xs text-gray-400">
//             Year, Make, and Model are required
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MainContent (Header)
// // ─────────────────────────────────────────────────────────────────────────────
// const MainContent = () => {
//   const [isMenuOpen,        setIsMenuOpen]        = useState(false);
//   const [isVehicleOpen,     setIsVehicleOpen]     = useState(false);
//   const [searchQuery,       setSearchQuery]       = useState('');
//   const [searchResults,     setSearchResults]     = useState([]);
//   const [showResults,       setShowResults]       = useState(false);
//   const [showNavbar,        setShowNavbar]        = useState(false);
//   const [prevScrollY,       setPrevScrollY]       = useState(0);

//   const searchBoxRef  = useRef(null);
//   const vehicleRef    = useRef(null);
//   const router        = useRouter();

//   const isProduction = process.env.NODE_ENV === 'production';
//   const apiUrl = isProduction
//     ? 'https://clientsidebackend.onrender.com/api'
//     : 'http://localhost:8080/api';

//   function stringToSlug(str) {
//     str = str.replace("&", "and");
//     str = str.replace(/,/g, "~");
//     return str
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9 -~]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/--+/g, "-");
//   }

//   const toggleMenu = () => setIsMenuOpen(prev => !prev);

//   // ── Text search ──────────────────────────────────────────────────────
//   const handleSearch = async (query) => {
//     if (query.length < 3) { setSearchResults(null); setShowResults(false); return; }
//     const slug = stringToSlug(query);
//     try {
//       const res = await fetch(
//         `${apiUrl}/suggestions?prefix=${encodeURIComponent(slug)}&limit=10`,
//         { headers: { Accept: "application/json" } }
//       );
//       if (!res.ok) { setSearchResults(null); setShowResults(false); return; }
//       const data = await res.json();
//       setSearchResults(data);
//       setShowResults(true);
//     } catch { setSearchResults(null); setShowResults(false); }
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.length >= 3) handleSearch(query);
//     else { setSearchResults([]); setShowResults(false); }
//   };

//   const handleSearchSubmit = async (e) => {
//     e.preventDefault();
//     if (searchQuery.length < 3) return;
//     await handleSearch(searchQuery);
//   };

//   const handleResultClick = (listing, category) => {
//     const categorySlug =
//       category === 'Replacement Parts' || category === 'Fluids & Lubricants'
//         ? 'replacement-parts'
//         : 'shop-supplies';
//     router.push(`/${categorySlug}/${stringToSlug(listing)}`);
//   };

//   // ── Click outside (search + vehicle panel) ───────────────────────────
//   const handleClickOutside = (event) => {
//     if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
//       setSearchQuery(''); setShowResults(false);
//     }
//     if (vehicleRef.current && !vehicleRef.current.contains(event.target)) {
//       setIsVehicleOpen(false);
//     }
//   };

//   // ── Scroll handler ────────────────────────────────────────────────────
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setSearchQuery(""); setShowResults(false); setIsVehicleOpen(false);
//       setShowNavbar(currentScrollY > prevScrollY && currentScrollY > 100);
//       setPrevScrollY(currentScrollY);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [prevScrollY]);

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <header className="w-full z-40 sticky top-0">
//       <PreHeader />

//       {/* ── Main bar ──────────────────────────────────────────────────── */}
//       <div className="bg-white border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 gap-4">

//             {/* Logo */}
//             <Link href="/" className="flex-shrink-0">
//               <Logo />
//             </Link>

//             {/* ── Desktop: Search + Vehicle Selector ────────────────── */}
//             <div className="hidden md:flex flex-1 items-center gap-3 max-w-2xl">

//               {/* Text search */}
//               <div className="relative flex-1" ref={searchBoxRef}>
//                 <form onSubmit={handleSearchSubmit} className="flex">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Search parts, SKU, part number…"
//                     className="w-full border border-gray-200 rounded-l-lg px-4 py-2.5 text-sm
//                                focus:outline-none focus:ring-2 focus:ring-[#b91c1c]
//                                focus:border-[#b91c1c] bg-gray-50"
//                   />
//                   <button type="submit"
//                     className="bg-[#b91c1c] hover:bg-red-800 text-white px-4 rounded-r-lg
//                                transition-colors flex items-center">
//                     <FaMagnifyingGlass className="text-sm" />
//                   </button>
//                 </form>

//                 {/* Suggestions dropdown */}
//                 {showResults && searchResults && searchResults.length > 0 && (
//                   <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl
//                                   shadow-xl border border-gray-100 z-50 overflow-hidden max-h-72 overflow-y-auto">
//                     {searchResults.map((result, idx) => (
//                       <button key={idx}
//                         onClick={() => handleResultClick(result.listing, result.category)}
//                         className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center
//                                    justify-between border-b border-gray-50 last:border-0 transition-colors">
//                         <span className="text-sm text-gray-800">{result.listing}</span>
//                         <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
//                           {result.category}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Vehicle selector trigger */}
//               <div className="relative flex-shrink-0" ref={vehicleRef}>
//                 <button
//                   onClick={() => setIsVehicleOpen(prev => !prev)}
//                   className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm
//                               font-semibold transition-all whitespace-nowrap
//                               ${isVehicleOpen
//                                 ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
//                                 : 'bg-white text-gray-700 border-gray-200 hover:border-[#b91c1c] hover:text-[#b91c1c]'
//                               }`}
//                 >
//                   <FaCar className="text-base flex-shrink-0" />
//                   <span>Find by Vehicle</span>
//                   <FaChevronDown
//                     className={`text-xs transition-transform duration-200
//                       ${isVehicleOpen ? 'rotate-180' : ''}`}
//                   />
//                 </button>

//                 {isVehicleOpen && (
//                   <VehicleSelector onClose={() => setIsVehicleOpen(false)} />
//                 )}
//               </div>
//             </div>

//             {/* ── Desktop: Icon actions ──────────────────────────────── */}
//             <div className="hidden md:flex items-center gap-1">
//               <Link href="/wishlist"
//                 className="p-2.5 rounded-lg text-gray-500 hover:text-[#b91c1c] hover:bg-red-50 transition-colors"
//                 aria-label="Wishlist">
//                 <FaHeart className="text-lg" />
//               </Link>
//               <Link href="/cart"
//                 className="p-2.5 rounded-lg text-gray-500 hover:text-[#b91c1c] hover:bg-red-50 transition-colors"
//                 aria-label="Cart">
//                 <FaCartShopping className="text-lg" />
//               </Link>
//               <UserButton />
//             </div>

//             {/* ── Mobile: icons + hamburger ──────────────────────────── */}
//             <div className="flex md:hidden items-center gap-2">
//               {/* Vehicle selector button mobile */}
//               <div className="relative" ref={vehicleRef}>
//                 <button
//                   onClick={() => setIsVehicleOpen(prev => !prev)}
//                   className={`p-2.5 rounded-lg transition-colors
//                     ${isVehicleOpen
//                       ? 'bg-[#b91c1c] text-white'
//                       : 'text-gray-600 hover:text-[#b91c1c] hover:bg-red-50'
//                     }`}
//                   aria-label="Find parts by vehicle"
//                 >
//                   <FaCar className="text-lg" />
//                 </button>
//                 {isVehicleOpen && (
//                   <VehicleSelector onClose={() => setIsVehicleOpen(false)} />
//                 )}
//               </div>

//               <Link href="/cart"
//                 className="p-2.5 rounded-lg text-gray-600 hover:text-[#b91c1c] hover:bg-red-50 transition-colors"
//                 aria-label="Cart">
//                 <FaCartShopping className="text-lg" />
//               </Link>

//               <button onClick={toggleMenu}
//                 className="p-2.5 rounded-lg text-gray-600 hover:text-[#b91c1c] hover:bg-red-50 transition-colors"
//                 aria-label="Menu">
//                 {isMenuOpen ? <FaXmark className="text-lg" /> : <FaBars className="text-lg" />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Nav bar ───────────────────────────────────────────────────── */}
//       <HeaderMenu navItems={navItems} />

//       {/* ── On-scroll sticky nav ──────────────────────────────────────── */}
//       {showNavbar && <OnScrollHeader />}

//       {/* ── Mobile menu drawer ────────────────────────────────────────── */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
//           {/* Mobile search */}
//           <div className="px-4 py-3 border-b border-gray-100" ref={searchBoxRef}>
//             <form onSubmit={handleSearchSubmit} className="flex">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search parts…"
//                 className="flex-1 border border-gray-200 rounded-l-lg px-3 py-2 text-sm
//                            focus:outline-none focus:ring-2 focus:ring-[#b91c1c] bg-gray-50"
//               />
//               <button type="submit"
//                 className="bg-[#b91c1c] text-white px-4 rounded-r-lg hover:bg-red-800 transition-colors">
//                 <FaMagnifyingGlass className="text-sm" />
//               </button>
//             </form>
//           </div>

//           {/* Mobile nav links */}
//           <nav className="px-2 py-2">
//             {navItems.map((item) => (
//               <Link key={item.href} href={item.href}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="flex items-center justify-between px-4 py-3 rounded-lg
//                            text-sm text-gray-700 hover:text-[#b91c1c] hover:bg-red-50 transition-colors">
//                 {item.label}
//                 <FaChevronRight className="text-xs text-gray-300" />
//               </Link>
//             ))}
//           </nav>

//           {/* WhatsApp CTA */}
//           <div className="px-4 py-3 border-t border-gray-100">
//             <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"
//               className="flex items-center justify-center gap-2 w-full py-3 bg-green-500
//                          hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-colors">
//               <FaWhatsapp className="text-lg" />
//               Chat With Us On WhatsApp
//             </a>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default MainContent;
