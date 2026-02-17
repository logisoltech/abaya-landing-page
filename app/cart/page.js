'use client';

import { ptSerif } from '../Cx/Font/font';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '../Cx/Sections/Footer';
import { getCart, removeFromCart, updateCartItemQuantity, clearCart } from '../lib/cart';
import CartIcon from '../Cx/Components/CartIcon';

// All products data for getting product details
const allProducts = {
  'new-arrival': [
    { id: 1, name: 'Classic Black Abaya', image: '/abaya-1.jpeg' },
    { id: 2, name: 'Embroidered Silk Abaya', image: '/abaya-2.jpeg' },
    { id: 3, name: 'Modern Open Abaya', image: '/abaya-3.jpeg' },
    { id: 4, name: 'Luxury Pearl Abaya', image: '/abaya-1.jpeg' },
    { id: 5, name: 'Floral Lace Abaya', image: '/abaya-2.jpeg' },
    { id: 6, name: 'Minimalist Everyday Abaya', image: '/abaya-3.jpeg' },
  ],
  'summer-collection': [
    { id: 1, name: 'Summer Breeze Abaya', image: '/summer-1.webp' },
    { id: 2, name: 'Tropical Floral Abaya', image: '/summer-2.webp' },
    { id: 3, name: 'Lightweight Summer Abaya', image: '/summer-3.webp' },
    { id: 4, name: 'Ocean Breeze Abaya', image: '/summer-1.webp' },
    { id: 5, name: 'Sunset Elegance Abaya', image: '/summer-2.webp' },
    { id: 6, name: 'Beachside Classic Abaya', image: '/summer-3.webp' },
  ],
  'winter-collection': [
    { id: 1, name: 'Winter Elegance Abaya', image: '/winter-1.webp' },
    { id: 2, name: 'Cozy Warmth Abaya', image: '/winter-2.webp' },
    { id: 3, name: 'Luxury Winter Abaya', image: '/winter-3.webp' },
    { id: 4, name: 'Snowflake Classic Abaya', image: '/winter-1.webp' },
    { id: 5, name: 'Frosted Velvet Abaya', image: '/winter-2.webp' },
    { id: 6, name: 'Winter Nights Abaya', image: '/winter-3.webp' },
  ],
};

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    const loadCart = () => {
      setCartItems(getCart());
    };

    loadCart();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('cartUpdated', loadCart);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  const handleRemoveItem = (index) => {
    removeFromCart(index);
    setCartItems(getCart());
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    updateCartItemQuantity(index, newQuantity);
    setCartItems(getCart());
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      setCartItems([]);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 500 : 0; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="w-full overflow-x-hidden">
      {/* Navbar */}
      <nav className={`${ptSerif.className} fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className={`${ptSerif.className} text-xl sm:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>
              Abaya.
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className={`transition-colors duration-200 p-2 ${
              isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className={`transition-colors duration-200 p-2 ${
              isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <CartIcon isScrolled={isScrolled} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-64 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className={`${ptSerif.className} text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4`}>
              Shopping Cart
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="bg-[#F5F5DC] min-h-screen py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className={`${ptSerif.className} text-2xl sm:text-3xl font-bold text-gray-900 mb-4`}>
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">Start shopping to add items to your cart.</p>
              <Link
                href="/new-arrival"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors uppercase tracking-wide"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`${ptSerif.className} text-2xl font-bold text-gray-900`}>
                    Cart Items
                  </h2>
                  {cartItems.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="text-sm text-red-600 hover:text-red-800 underline"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>

                {cartItems.map((item, index) => {
                  const productInfo = allProducts[item.collection]?.find(p => p.id === item.id);
                  return (
                    <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <Link 
                          href={`/product-inner?id=${item.id}&collection=${item.collection}`}
                          className="relative w-full sm:w-32 h-48 sm:h-32 bg-gray-200 rounded-lg overflow-hidden shrink-0"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 128px"
                          />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <Link 
                              href={`/product-inner?id=${item.id}&collection=${item.collection}`}
                              className="block"
                            >
                              <h3 className={`${ptSerif.className} text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors`}>
                                {item.name}
                              </h3>
                            </Link>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>Size: <span className="font-medium text-gray-900">{item.size}</span></p>
                              <p>Color: <span className="font-medium text-gray-900">{item.color}</span></p>
                              <p className="text-base font-semibold text-blue-600 mt-2">
                                PKR {item.price.toLocaleString()}.00
                              </p>
                            </div>
                          </div>

                          {/* Quantity and Remove */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                                className="w-8 h-8 border-2 border-gray-300 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                                className="w-8 h-8 border-2 border-gray-300 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                        <p className="text-gray-900 font-semibold">
                          Subtotal: PKR {(item.price * item.quantity).toLocaleString()}.00
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 sticky top-24">
                  <h2 className={`${ptSerif.className} text-2xl font-bold text-gray-900 mb-6`}>
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">PKR {subtotal.toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-semibold">PKR {shipping.toLocaleString()}.00</span>
                    </div>
                    <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>PKR {total.toLocaleString()}.00</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 uppercase tracking-wide mb-4 text-center"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    href="/new-arrival"
                    className="block text-center text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
