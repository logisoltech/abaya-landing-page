'use client';

import { ptSerif } from '../Cx/Font/font';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Footer from '../Cx/Sections/Footer';

export default function NewArrival() {
  const [gridView, setGridView] = useState('2x2');
  const [sortOpen, setSortOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sortRef = useRef(null);

  // Handle scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Change navbar style when scrolled past the video section (100vh)
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

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'GARDEN ELEGANCE',
      price: 1125,
      originalPrice: 1500,
      image: '/abaya-1.jpeg'
    },
    {
      id: 2,
      name: 'MIRA BLEND',
      price: 1275,
      originalPrice: 1700,
      image: '/abaya-2.jpeg'
    },
    {
      id: 3,
      name: 'SHADOW STYLE',
      price: 1275,
      originalPrice: null,
      image: '/abaya-3.jpeg'
    },
    {
      id: 4,
      name: 'CLASSIC ELEGANCE',
      price: 1100,
      originalPrice: 1400,
      image: '/abaya-1.jpeg'
    },
    {
      id: 5,
      name: 'ROYAL BLEND',
      price: 1350,
      originalPrice: 1800,
      image: '/abaya-3.jpeg'
    },
    {
      id: 6,
      name: 'MODERN STYLE',
      price: 1200,
      originalPrice: 1600,
      image: '/abaya-2.jpeg'
    }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Video Section */}
      <div className="relative w-full h-screen">
        {/* Navbar */}
        <nav className={`${ptSerif.className} fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            {/* Left Side - Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className={`${ptSerif.className} text-2xl sm:text-3xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>
                Abaya.
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
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
      </div>

      {/* Product Listing Section */}
      <div className="bg-[#F5F5DC] min-h-screen">
        {/* Header Section */}
        <div className="sticky top-0 z-40 bg-[#F5F5DC] border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
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
              <div className="text-gray-900 font-medium">
                6 PRODUCTS
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
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Price: Low to High</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Price: High to Low</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Newest First</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Name: A-Z</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Left Sidebar - Filters */}
            <aside className="w-64 shrink-0">
              <div className="space-y-6">
                {/* AVAILABILITY Filter */}
                <div className="border-b border-gray-300 pb-4">
                  <button className="w-full flex items-center justify-between text-gray-900 font-medium uppercase tracking-wide">
                    AVAILABILITY
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* PRICE Filter */}
                <div className="border-b border-gray-300 pb-4">
                  <button className="w-full flex items-center justify-between text-gray-900 font-medium uppercase tracking-wide">
                    PRICE
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* MORE FILTERS */}
                <div className="border-b border-gray-300 pb-4">
                  <button className="w-full flex items-center justify-between text-gray-900 font-medium uppercase tracking-wide">
                    MORE FILTERS
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className={`grid gap-6 ${
                gridView === '2x2' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              }`}>
                {products.map((product) => (
                  <div key={product.id} className="group">
                    {/* Product Image */}
                    <div className="relative w-full aspect-[3/4] bg-gray-200 mb-3 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Product Name */}
                    <h3 className={`${ptSerif.className} text-gray-900 font-semibold mb-2 text-sm uppercase tracking-wide`}>
                      {product.name}
                    </h3>
                    
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 font-semibold text-sm">
                        FROM PKR {product.price.toLocaleString()}.00
                      </span>
                      {product.originalPrice && (
                        <span className="text-[#F5F5DC] line-through text-sm">
                          PKR {product.originalPrice.toLocaleString()}.00
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

