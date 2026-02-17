'use client';

import { ptSerif } from '../Cx/Font/font';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '../Cx/Sections/Footer';
import { getCart, clearCart } from '../lib/cart';
import CartIcon from '../Cx/Components/CartIcon';
import { useRouter } from 'next/navigation';

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

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [formData, setFormData] = useState({
    // Billing Information
    billingFirstName: '',
    billingLastName: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: 'Pakistan',
    // Shipping Information
    shippingFirstName: '',
    shippingLastName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: 'Pakistan',
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVC: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    const loadCart = () => {
      const cart = getCart();
      setCartItems(cart);
      if (cart.length === 0) {
        router.push('/cart');
      }
    };

    loadCart();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('cartUpdated', loadCart);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If "same as billing" is checked, update shipping fields
    if (sameAsBilling && name.startsWith('billing')) {
      const shippingField = name.replace('billing', 'shipping');
      if (shippingField !== 'shippingEmail' && shippingField !== 'shippingPhone') {
        setFormData((prev) => ({
          ...prev,
          [shippingField]: value,
        }));
      }
    }
  };

  const handleSameAsBillingChange = (e) => {
    setSameAsBilling(e.target.checked);
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        shippingFirstName: prev.billingFirstName,
        shippingLastName: prev.billingLastName,
        shippingAddress: prev.billingAddress,
        shippingCity: prev.billingCity,
        shippingPostalCode: prev.billingPostalCode,
        shippingCountry: prev.billingCountry,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process checkout
    alert('Order placed successfully! Thank you for your purchase.');
    clearCart();
    router.push('/');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 500 : 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return null; // Will redirect
  }

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
              Checkout
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              Complete your order
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="bg-[#F5F5DC] min-h-screen py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Billing Information */}
                <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200">
                  <h2 className={`${ptSerif.className} text-2xl font-bold text-gray-900 mb-6`}>
                    Billing Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="billingFirstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="billingFirstName"
                        name="billingFirstName"
                        value={formData.billingFirstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingLastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="billingLastName"
                        name="billingLastName"
                        value={formData.billingLastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingEmail" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="billingEmail"
                        name="billingEmail"
                        value={formData.billingEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingPhone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="billingPhone"
                        name="billingPhone"
                        value={formData.billingPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="billingCity"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingPostalCode" className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="billingPostalCode"
                        name="billingPostalCode"
                        value={formData.billingPostalCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <select
                        id="billingCountry"
                        name="billingCountry"
                        value={formData.billingCountry}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      >
                        <option value="Pakistan">Pakistan</option>
                        <option value="UAE">UAE</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`${ptSerif.className} text-2xl font-bold text-gray-900`}>
                      Shipping Information
                    </h2>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsBilling}
                        onChange={handleSameAsBillingChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Same as billing</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="shippingFirstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="shippingFirstName"
                        name="shippingFirstName"
                        value={formData.shippingFirstName}
                        onChange={handleChange}
                        required
                        disabled={sameAsBilling}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label htmlFor="shippingLastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="shippingLastName"
                        name="shippingLastName"
                        value={formData.shippingLastName}
                        onChange={handleChange}
                        required
                        disabled={sameAsBilling}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="shippingAddress"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        required
                        disabled={sameAsBilling}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label htmlFor="shippingCity" className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="shippingCity"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleChange}
                        required
                        disabled={sameAsBilling}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label htmlFor="shippingPostalCode" className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="shippingPostalCode"
                        name="shippingPostalCode"
                        value={formData.shippingPostalCode}
                        onChange={handleChange}
                        required
                        disabled={sameAsBilling}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label htmlFor="shippingCountry" className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <select
                        id="shippingCountry"
                        name="shippingCountry"
                        value={formData.shippingCountry}
                        onChange={handleChange}
                        required
                        disabled={sameAsBilling}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="Pakistan">Pakistan</option>
                        <option value="UAE">UAE</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200">
                  <h2 className={`${ptSerif.className} text-2xl font-bold text-gray-900 mb-6`}>
                    Payment Method
                  </h2>
                  <div className="space-y-4 mb-6">
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <span className="font-semibold text-gray-900">Credit/Debit Card</span>
                      </div>
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <span className="font-semibold text-gray-900">Cash on Delivery</span>
                      </div>
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </label>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          required={formData.paymentMethod === 'card'}
                          maxLength={19}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          required={formData.paymentMethod === 'card'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            required={formData.paymentMethod === 'card'}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700 mb-2">
                            CVC *
                          </label>
                          <input
                            type="text"
                            id="cardCVC"
                            name="cardCVC"
                            value={formData.cardCVC}
                            onChange={handleChange}
                            required={formData.paymentMethod === 'card'}
                            placeholder="123"
                            maxLength={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 sticky top-24">
                  <h2 className={`${ptSerif.className} text-2xl font-bold text-gray-900 mb-6`}>
                    Order Summary
                  </h2>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0">
                        <div className="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                          <p className="text-xs text-gray-600">Size: {item.size}</p>
                          <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold text-blue-600 mt-1">
                            PKR {(item.price * item.quantity).toLocaleString()}.00
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Summary */}
                  <div className="space-y-4 mb-6 pt-4 border-t border-gray-300">
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

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 uppercase tracking-wide mb-4"
                  >
                    Place Order
                  </button>

                  <Link
                    href="/cart"
                    className="block text-center text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    ← Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
