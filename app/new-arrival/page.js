'use client';

import { ptSerif } from '../Cx/Font/font';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Footer from '../Cx/Sections/Footer';

const products = [
  {
    id: 1,
    name: 'Classic Black Abaya',
    price: 12500,
    originalPrice: 15000,
    image: '/abaya-1.jpeg',
    rating: 5,
    reviews: 24,
  },
  {
    id: 2,
    name: 'Embroidered Silk Abaya',
    price: 18900,
    originalPrice: null,
    image: '/abaya-2.jpeg',
    rating: 4,
    reviews: 17,
  },
  {
    id: 3,
    name: 'Modern Open Abaya',
    price: 14500,
    originalPrice: 17000,
    image: '/abaya-3.jpeg',
    rating: 5,
    reviews: 31,
  },
  {
    id: 4,
    name: 'Luxury Pearl Abaya',
    price: 22000,
    originalPrice: 25000,
    image: '/abaya-1.jpeg',
    rating: 4,
    reviews: 12,
  },
  {
    id: 5,
    name: 'Floral Lace Abaya',
    price: 16800,
    originalPrice: null,
    image: '/abaya-2.jpeg',
    rating: 5,
    reviews: 28,
  },
  {
    id: 6,
    name: 'Minimalist Everyday Abaya',
    price: 9900,
    originalPrice: 12500,
    image: '/abaya-3.jpeg',
    rating: 4,
    reviews: 42,
  },
];

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
              star <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-gray-500 text-xs sm:text-sm">({reviews})</span>
    </div>
  );
}

export default function NewArrival() {
  const [gridView, setGridView] = useState('2x2');
  const [sortOpen, setSortOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const sortRef = useRef(null);

  // Handle scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    };

    if (sortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sortOpen]);

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter((product) => {
      // Availability filter
      if (selectedAvailability.length > 0) {
        const hasSale = product.originalPrice !== null;
        const inStock = true; // All products are in stock for now
        if (selectedAvailability.includes('on-sale') && !hasSale) return false;
        if (selectedAvailability.includes('in-stock') && !inStock) return false;
      }

      // Price range filter
      if (selectedPriceRange.length > 0) {
        const price = product.price;
        let matchesRange = false;
        if (selectedPriceRange.includes('under-10k') && price < 10000) matchesRange = true;
        if (selectedPriceRange.includes('10k-15k') && price >= 10000 && price < 15000) matchesRange = true;
        if (selectedPriceRange.includes('15k-20k') && price >= 15000 && price < 20000) matchesRange = true;
        if (selectedPriceRange.includes('over-20k') && price >= 20000) matchesRange = true;
        if (!matchesRange) return false;
      }

      // Rating filter
      if (selectedRating.length > 0) {
        if (!selectedRating.includes(product.rating.toString())) return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'newest-first':
          return b.id - a.id;
        case 'name-a-z':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleSort = (sortType) => {
    setSortBy(sortType);
    setSortOpen(false);
  };

  const toggleAvailability = (value) => {
    setSelectedAvailability((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const togglePriceRange = (value) => {
    setSelectedPriceRange((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleRating = (value) => {
    setSelectedRating((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Video Section */}
      <div className="relative w-full h-screen">
        {/* Navbar */}
        <nav className={`${ptSerif.className} fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
            {/* Left Side - Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className={`${ptSerif.className} text-xl sm:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>
                Abaya.
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Icon */}
              <button 
                className={`transition-colors duration-200 p-2 ${
                  isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'
                }`}
                aria-label="Search"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Profile Icon */}
              <button 
                className={`transition-colors duration-200 p-2 ${
                  isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'
                }`}
                aria-label="Account"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Cart Icon */}
              <button 
                className={`transition-colors duration-200 p-2 relative ${
                  isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'
                }`}
                aria-label="Cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Black Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/new-arrival.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Text Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-6 sm:space-y-8">
              {/* Top Text */}
              <div className={`${ptSerif.className} text-white text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wider`}>
                Navigating
              </div>

              {/* Center Main Text */}
              <h1 className={`${ptSerif.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white`}>
                New Arrival
              </h1>

              {/* Bottom Text */}
              <div className={`${ptSerif.className} text-white text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wider`}>
                Section
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Listing Section */}
      <div className="bg-[#F5F5DC] min-h-screen">
        {/* Header Section */}
        <div className="sticky top-0 z-40 bg-[#F5F5DC] border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            {/* Mobile Layout */}
            <div className="flex md:hidden items-center justify-between mb-2">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 text-gray-900 font-medium text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
              <div className="text-gray-900 font-medium text-sm">{filteredAndSortedProducts.length} PRODUCTS</div>
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-1 text-gray-900 font-medium text-sm"
                >
                  Sort
                  <svg className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {sortOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <button 
                      onClick={() => handleSort('default')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'default' ? 'bg-gray-100 font-semibold' : 'text-gray-700'}`}
                    >
                      Default
                    </button>
                    <button 
                      onClick={() => handleSort('price-low-high')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'price-low-high' ? 'bg-gray-100 font-semibold' : 'text-gray-700'}`}
                    >
                      Price: Low to High
                    </button>
                    <button 
                      onClick={() => handleSort('price-high-low')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'price-high-low' ? 'bg-gray-100 font-semibold' : 'text-gray-700'}`}
                    >
                      Price: High to Low
                    </button>
                    <button 
                      onClick={() => handleSort('newest-first')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'newest-first' ? 'bg-gray-100 font-semibold' : 'text-gray-700'}`}
                    >
                      Newest First
                    </button>
                    <button 
                      onClick={() => handleSort('name-a-z')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'name-a-z' ? 'bg-gray-100 font-semibold' : 'text-gray-700'}`}
                    >
                      Name: A-Z
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between">
              {/* Left - Grid View Icons and Hamburger */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGridView('2x2')}
                  className={`p-2 ${gridView === '2x2' ? 'text-gray-900' : 'text-gray-500'}`}
                  aria-label="2x2 Grid View"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setGridView('3x3')}
                  className={`p-2 ${gridView === '3x3' ? 'text-gray-900' : 'text-gray-500'}`}
                  aria-label="3x3 Grid View"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM2 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2zM2 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2zM8 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM8 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2zM8 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2zM14 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM14 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM14 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-500" aria-label="Menu">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Center - Product Count */}
              <div className="text-gray-900 font-medium text-xs sm:text-sm">
                {filteredAndSortedProducts.length} PRODUCT{filteredAndSortedProducts.length !== 1 ? 'S' : ''}
              </div>

              {/* Right - Sort By */}
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 text-gray-900 font-medium"
                >
                  SORT BY
                  <svg className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {sortOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <button 
                      onClick={() => handleSort('default')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'default' ? 'bg-gray-100 font-semibold' : 'text-gray-700'}`}
                    >
                      Default
                    </button>
                    <button 
                      onClick={() => handleSort('price-low-high')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'price-low-high' ? 'bg-gray-100 font-semibold' : 'text-gray-700'}`}
                    >
                      Price: Low to High
                    </button>
                    <button 
                      onClick={() => handleSort('price-high-low')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'price-high-low' ? 'bg-gray-100 font-semibold' : 'text-gray-700'}`}
                    >
                      Price: High to Low
                    </button>
                    <button 
                      onClick={() => handleSort('newest-first')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'newest-first' ? 'bg-gray-100 font-semibold' : 'text-gray-700'}`}
                    >
                      Newest First
                    </button>
                    <button 
                      onClick={() => handleSort('name-a-z')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'name-a-z' ? 'bg-gray-100 font-semibold' : 'text-gray-700'}`}
                    >
                      Name: A-Z
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="flex gap-4 lg:gap-8">
            {/* Left Sidebar - Filters (Desktop) */}
            <aside className={`hidden lg:block w-64 shrink-0`}>
              {(selectedAvailability.length > 0 || selectedPriceRange.length > 0 || selectedRating.length > 0) && (
                <div className="mb-4">
                  <button
                    onClick={() => {
                      setSelectedAvailability([]);
                      setSelectedPriceRange([]);
                      setSelectedRating([]);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
              <div className="space-y-6">
                {/* AVAILABILITY Filter */}
                <div className="border-b border-gray-300 pb-4">
                  <button 
                    onClick={() => setAvailabilityOpen(!availabilityOpen)}
                    className="w-full flex items-center justify-between text-gray-900 font-medium uppercase tracking-wide text-sm"
                  >
                    AVAILABILITY
                    <svg className={`w-4 h-4 transition-transform ${availabilityOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {availabilityOpen && (
                    <div className="mt-4 space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAvailability.includes('in-stock')}
                          onChange={() => toggleAvailability('in-stock')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">In Stock</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAvailability.includes('on-sale')}
                          onChange={() => toggleAvailability('on-sale')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">On Sale</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* PRICE Filter */}
                <div className="border-b border-gray-300 pb-4">
                  <button 
                    onClick={() => setPriceOpen(!priceOpen)}
                    className="w-full flex items-center justify-between text-gray-900 font-medium uppercase tracking-wide text-sm"
                  >
                    PRICE
                    <svg className={`w-4 h-4 transition-transform ${priceOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {priceOpen && (
                    <div className="mt-4 space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPriceRange.includes('under-10k')}
                          onChange={() => togglePriceRange('under-10k')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Under PKR 10,000</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPriceRange.includes('10k-15k')}
                          onChange={() => togglePriceRange('10k-15k')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">PKR 10,000 - 15,000</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPriceRange.includes('15k-20k')}
                          onChange={() => togglePriceRange('15k-20k')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">PKR 15,000 - 20,000</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPriceRange.includes('over-20k')}
                          onChange={() => togglePriceRange('over-20k')}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Over PKR 20,000</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* MORE FILTERS */}
                <div className="border-b border-gray-300 pb-4">
                  <button 
                    onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}
                    className="w-full flex items-center justify-between text-gray-900 font-medium uppercase tracking-wide text-sm"
                  >
                    MORE FILTERS
                    <svg className={`w-4 h-4 transition-transform ${moreFiltersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {moreFiltersOpen && (
                    <div className="mt-4 space-y-2">
                      <div className="text-xs text-gray-600 uppercase tracking-wide mb-2">Rating</div>
                      {[5, 4, 3].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedRating.includes(rating.toString())}
                            onChange={() => toggleRating(rating.toString())}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-3 h-3 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-xs text-gray-600 ml-1">& up</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Mobile Filters Drawer */}
            {filtersOpen && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setFiltersOpen(false)}>
                <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#F5F5DC] p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-gray-900 font-bold text-lg uppercase">Filters</h2>
                    <button onClick={() => setFiltersOpen(false)} className="text-gray-900">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {(selectedAvailability.length > 0 || selectedPriceRange.length > 0 || selectedRating.length > 0) && (
                    <div className="mb-4">
                      <button
                        onClick={() => {
                          setSelectedAvailability([]);
                          setSelectedPriceRange([]);
                          setSelectedRating([]);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                  <div className="space-y-6">
                    {/* AVAILABILITY Filter */}
                    <div className="border-b border-gray-300 pb-4">
                      <button 
                        onClick={() => setAvailabilityOpen(!availabilityOpen)}
                        className="w-full flex items-center justify-between text-gray-900 font-medium uppercase tracking-wide text-sm"
                      >
                        AVAILABILITY
                        <svg className={`w-4 h-4 transition-transform ${availabilityOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {availabilityOpen && (
                        <div className="mt-4 space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedAvailability.includes('in-stock')}
                              onChange={() => toggleAvailability('in-stock')}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">In Stock</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedAvailability.includes('on-sale')}
                              onChange={() => toggleAvailability('on-sale')}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">On Sale</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* PRICE Filter */}
                    <div className="border-b border-gray-300 pb-4">
                      <button 
                        onClick={() => setPriceOpen(!priceOpen)}
                        className="w-full flex items-center justify-between text-gray-900 font-medium uppercase tracking-wide text-sm"
                      >
                        PRICE
                        <svg className={`w-4 h-4 transition-transform ${priceOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {priceOpen && (
                        <div className="mt-4 space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedPriceRange.includes('under-10k')}
                              onChange={() => togglePriceRange('under-10k')}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Under PKR 10,000</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedPriceRange.includes('10k-15k')}
                              onChange={() => togglePriceRange('10k-15k')}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">PKR 10,000 - 15,000</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedPriceRange.includes('15k-20k')}
                              onChange={() => togglePriceRange('15k-20k')}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">PKR 15,000 - 20,000</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedPriceRange.includes('over-20k')}
                              onChange={() => togglePriceRange('over-20k')}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Over PKR 20,000</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* MORE FILTERS */}
                    <div className="border-b border-gray-300 pb-4">
                      <button 
                        onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}
                        className="w-full flex items-center justify-between text-gray-900 font-medium uppercase tracking-wide text-sm"
                      >
                        MORE FILTERS
                        <svg className={`w-4 h-4 transition-transform ${moreFiltersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {moreFiltersOpen && (
                        <div className="mt-4 space-y-2">
                          <div className="text-xs text-gray-600 uppercase tracking-wide mb-2">Rating</div>
                          {[5, 4, 3].map((rating) => (
                            <label key={rating} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedRating.includes(rating.toString())}
                                onChange={() => toggleRating(rating.toString())}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    className={`w-3 h-3 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                <span className="text-xs text-gray-600 ml-1">& up</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1 w-full">
              {filteredAndSortedProducts.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-gray-600 text-center">
                    <p className="text-lg font-medium mb-2">No products found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                </div>
              ) : (
                <div className={`grid gap-4 sm:gap-6 ${
                  gridView === '2x2' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'
                }`}>
                  {filteredAndSortedProducts.map((product) => (
                  <div key={product.id} className="group cursor-pointer">
                    {/* Product Image */}
                    <div className="relative w-full aspect-[3/4] bg-gray-200 mb-2 sm:mb-3 overflow-hidden rounded-sm">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-sm">
                          SALE
                        </div>
                      )}
                    </div>
                    
                    {/* Product Name */}
                    <h3 className={`${ptSerif.className} text-gray-900 font-semibold mb-1 text-xs sm:text-sm uppercase tracking-wide`}>
                      {product.name}
                    </h3>

                    {/* Reviews */}
                    <div className="mb-1.5">
                      <StarRating rating={product.rating} reviews={product.reviews} />
                    </div>
                    
                    {/* Price */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-blue-600 font-semibold text-xs sm:text-sm">
                        PKR {product.price.toLocaleString()}.00
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-xs sm:text-sm">
                          PKR {product.originalPrice.toLocaleString()}.00
                        </span>
                      )}
                    </div>
                  </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
