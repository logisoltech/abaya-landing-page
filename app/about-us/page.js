'use client';

import { ptSerif } from '../Cx/Font/font';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '../Cx/Sections/Footer';
import CartIcon from '../Cx/Components/CartIcon';

export default function AboutUs() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <CartIcon isScrolled={isScrolled} />
            </div>
          </div>
        </nav>

        {/* Black Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

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
                Our Story
              </div>

              {/* Center Main Text */}
              <h1 className={`${ptSerif.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white`}>
                About Us
              </h1>

              {/* Bottom Text */}
              <div className={`${ptSerif.className} text-white text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wider`}>
                Crafting Elegance Since 2020
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1 - Our Mission */}
      <section className="bg-[#F5F5DC] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className={`${ptSerif.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900`}>
                Our Mission
              </h2>
              <div className="h-1 w-20 bg-blue-600"></div>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                At Abaya, we are dedicated to creating timeless, elegant abayas that celebrate the beauty of modest fashion. 
                Our mission is to provide women with high-quality, beautifully crafted garments that blend traditional elegance 
                with contemporary style.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                We believe that every woman deserves to feel confident and beautiful in what she wears. Our carefully curated 
                collections are designed to empower women while honoring cultural heritage and modern aesthetics.
              </p>
            </div>

            {/* Image */}
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/abaya-1.jpeg"
                alt="Quality & Craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Our Values */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`${ptSerif.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4`}>
              Our Values
            </h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Value 1 */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className={`${ptSerif.className} text-xl sm:text-2xl font-bold text-gray-900`}>
                Quality First
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We source only the finest materials and employ skilled artisans to ensure every piece meets our 
                exacting standards of quality and durability.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className={`${ptSerif.className} text-xl sm:text-2xl font-bold text-gray-900`}>
                Authenticity
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We honor traditional craftsmanship while embracing modern design, creating authentic pieces that 
                resonate with contemporary women.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className={`${ptSerif.className} text-xl sm:text-2xl font-bold text-gray-900`}>
                Community
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We are committed to building a community of empowered women who celebrate modesty, elegance, and 
                self-expression through fashion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Our Story */}
      <section className="bg-[#F5F5DC] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden order-2 lg:order-1">
              <Image
                src="/abaya-2.jpeg"
                alt="Our Heritage"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className={`${ptSerif.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900`}>
                Our Story
              </h2>
              <div className="h-1 w-20 bg-blue-600"></div>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Founded in 2020, Abaya began with a simple vision: to create abayas that seamlessly blend traditional 
                elegance with modern sophistication. What started as a passion project has grown into a beloved brand 
                trusted by women around the world.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Our journey has been guided by a deep respect for cultural heritage and a commitment to innovation. 
                Each collection is thoughtfully designed to celebrate the timeless beauty of the abaya while offering 
                contemporary styles that suit modern lifestyles.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Today, we continue to honor our founding principles while pushing the boundaries of design, ensuring 
                that every piece we create is not just a garment, but a statement of elegance and empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
