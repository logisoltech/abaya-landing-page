'use client';

import { ptSerif } from '../Cx/Font/font';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Footer from '../Cx/Sections/Footer';
import { addToCart } from '../lib/cart';
import CartIcon from '../Cx/Components/CartIcon';

// All products from all collections
const allProducts = {
  'new-arrival': [
    {
      id: 1,
      name: 'Classic Black Abaya',
      price: 12500,
      originalPrice: 15000,
      image: '/abaya-1.jpeg',
      rating: 5,
      reviews: 24,
      description: 'A timeless classic black abaya featuring elegant design and premium quality fabric. Perfect for everyday wear and special occasions. This piece combines traditional elegance with modern sophistication.',
      details: 'Made from premium quality fabric with attention to detail. Features comfortable fit and elegant drape.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black'],
    },
    {
      id: 2,
      name: 'Embroidered Silk Abaya',
      price: 18900,
      originalPrice: null,
      image: '/abaya-2.jpeg',
      rating: 4,
      reviews: 17,
      description: 'Luxurious silk abaya with intricate embroidery details. This exquisite piece showcases traditional craftsmanship with contemporary style.',
      details: 'Premium silk fabric with hand-embroidered details. Delicate and elegant design perfect for special occasions.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Navy Blue', 'Burgundy'],
    },
    {
      id: 3,
      name: 'Modern Open Abaya',
      price: 14500,
      originalPrice: 17000,
      image: '/abaya-3.jpeg',
      rating: 5,
      reviews: 31,
      description: 'Contemporary open-front abaya design that offers both style and comfort. Perfect for the modern woman who values elegance and practicality.',
      details: 'Modern silhouette with comfortable fit. Features quality fabric and contemporary design elements.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Gray', 'Beige'],
    },
    {
      id: 4,
      name: 'Luxury Pearl Abaya',
      price: 22000,
      originalPrice: 25000,
      image: '/abaya-1.jpeg',
      rating: 4,
      reviews: 12,
      description: 'Exquisite abaya adorned with pearl details, creating a luxurious and sophisticated look. Perfect for special events and celebrations.',
      details: 'Premium fabric with hand-sewn pearl embellishments. Elegant and luxurious design.',
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Navy'],
    },
    {
      id: 5,
      name: 'Floral Lace Abaya',
      price: 16800,
      originalPrice: null,
      image: '/abaya-2.jpeg',
      rating: 5,
      reviews: 28,
      description: 'Beautiful abaya featuring delicate floral lace patterns. A perfect blend of femininity and elegance.',
      details: 'Quality fabric with intricate lace details. Feminine and elegant design.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Burgundy'],
    },
    {
      id: 6,
      name: 'Minimalist Everyday Abaya',
      price: 9900,
      originalPrice: 12500,
      image: '/abaya-3.jpeg',
      rating: 4,
      reviews: 42,
      description: 'Simple yet elegant abaya perfect for everyday wear. Comfortable, versatile, and timeless design.',
      details: 'Comfortable fabric with minimalist design. Perfect for daily wear.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Gray', 'Brown'],
    },
  ],
  'summer-collection': [
    {
      id: 1,
      name: 'Summer Breeze Abaya',
      price: 12500,
      originalPrice: 15000,
      image: '/summer-1.webp',
      rating: 5,
      reviews: 24,
      description: 'Lightweight and breathable abaya perfect for summer. Features airy fabric and comfortable design.',
      details: 'Lightweight fabric perfect for warm weather. Comfortable and elegant.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Beige', 'Light Gray', 'White'],
    },
    {
      id: 2,
      name: 'Tropical Floral Abaya',
      price: 18900,
      originalPrice: null,
      image: '/summer-2.webp',
      rating: 4,
      reviews: 17,
      description: 'Vibrant tropical floral pattern abaya that brings summer vibes. Lightweight and stylish.',
      details: 'Tropical print on lightweight fabric. Perfect for summer occasions.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Multi-color'],
    },
    {
      id: 3,
      name: 'Lightweight Summer Abaya',
      price: 14500,
      originalPrice: 17000,
      image: '/summer-3.webp',
      rating: 5,
      reviews: 31,
      description: 'Ultra-lightweight abaya designed for summer comfort. Breathable fabric keeps you cool.',
      details: 'Ultra-lightweight breathable fabric. Perfect for hot summer days.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Beige', 'Light Blue'],
    },
    {
      id: 4,
      name: 'Ocean Breeze Abaya',
      price: 22000,
      originalPrice: 25000,
      image: '/summer-1.webp',
      rating: 4,
      reviews: 12,
      description: 'Elegant abaya inspired by ocean colors. Lightweight and perfect for summer elegance.',
      details: 'Ocean-inspired colors on premium lightweight fabric.',
      sizes: ['S', 'M', 'L'],
      colors: ['Navy', 'Teal', 'Aqua'],
    },
    {
      id: 5,
      name: 'Sunset Elegance Abaya',
      price: 16800,
      originalPrice: null,
      image: '/summer-2.webp',
      rating: 5,
      reviews: 28,
      description: 'Beautiful abaya with sunset-inspired colors. Lightweight and elegant for summer evenings.',
      details: 'Sunset color palette on comfortable summer fabric.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Coral', 'Peach', 'Rose'],
    },
    {
      id: 6,
      name: 'Beachside Classic Abaya',
      price: 9900,
      originalPrice: 12500,
      image: '/summer-3.webp',
      rating: 4,
      reviews: 42,
      description: 'Classic summer abaya perfect for beachside elegance. Comfortable and stylish.',
      details: 'Classic design with summer-appropriate fabric.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Beige', 'Sand'],
    },
  ],
  'winter-collection': [
    {
      id: 1,
      name: 'Winter Elegance Abaya',
      price: 12500,
      originalPrice: 15000,
      image: '/winter-1.webp',
      rating: 5,
      reviews: 24,
      description: 'Elegant winter abaya with premium fabric perfect for colder months. Warm and sophisticated.',
      details: 'Premium warm fabric with elegant design. Perfect for winter elegance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Burgundy'],
    },
    {
      id: 2,
      name: 'Cozy Warmth Abaya',
      price: 18900,
      originalPrice: null,
      image: '/winter-2.webp',
      rating: 4,
      reviews: 17,
      description: 'Cozy and warm abaya designed for winter comfort. Premium fabric keeps you warm.',
      details: 'Warm cozy fabric perfect for winter. Comfortable and elegant.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Gray', 'Brown'],
    },
    {
      id: 3,
      name: 'Luxury Winter Abaya',
      price: 14500,
      originalPrice: 17000,
      image: '/winter-3.webp',
      rating: 5,
      reviews: 31,
      description: 'Luxurious winter abaya with premium materials. Elegant and warm for the season.',
      details: 'Premium materials with luxurious feel. Perfect for winter occasions.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Navy', 'Burgundy'],
    },
    {
      id: 4,
      name: 'Snowflake Classic Abaya',
      price: 22000,
      originalPrice: 25000,
      image: '/winter-1.webp',
      rating: 4,
      reviews: 12,
      description: 'Classic winter abaya with subtle snowflake-inspired details. Warm and elegant.',
      details: 'Winter-inspired design with premium warm fabric.',
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Navy'],
    },
    {
      id: 5,
      name: 'Frosted Velvet Abaya',
      price: 16800,
      originalPrice: null,
      image: '/winter-2.webp',
      rating: 5,
      reviews: 28,
      description: 'Luxurious velvet abaya perfect for winter elegance. Soft and warm.',
      details: 'Premium velvet fabric with elegant winter design.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Burgundy'],
    },
    {
      id: 6,
      name: 'Winter Nights Abaya',
      price: 9900,
      originalPrice: 12500,
      image: '/winter-3.webp',
      rating: 4,
      reviews: 42,
      description: 'Perfect abaya for winter nights. Warm, comfortable, and elegant.',
      details: 'Comfortable warm fabric perfect for winter evenings.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Gray', 'Brown'],
    },
  ],
};

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-gray-600 text-sm">({reviews} reviews)</span>
    </div>
  );
}

export default function ProductInner() {
  const searchParams = useSearchParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const productId = searchParams.get('id');
  const collection = searchParams.get('collection') || 'new-arrival';

  // Find the product
  const product = allProducts[collection]?.find(p => p.id === parseInt(productId));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <div className="text-center">
          <h1 className={`${ptSerif.className} text-3xl font-bold text-gray-900 mb-4`}>Product Not Found</h1>
          <Link href="/new-arrival" className="text-blue-600 hover:underline">
            Return to Collections
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      size: selectedSize,
      color: selectedColor || 'Default',
      quantity: quantity,
      collection: collection,
    };
    
    addToCart(cartItem);
    alert(`Added ${quantity} x ${product.name} (Size: ${selectedSize}${selectedColor ? `, Color: ${selectedColor}` : ''}) to cart!`);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Navbar */}
      <nav className={`${ptSerif.className} fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className={`${ptSerif.className} text-xl sm:text-2xl lg:text-3xl font-bold transition-colors duration-300 text-black`}>
              Abaya.
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="transition-colors duration-200 p-2 text-black hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="transition-colors duration-200 p-2 text-black hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <CartIcon isScrolled={true} />
          </div>
        </div>
      </nav>

      {/* Product Detail Section */}
      <div className="bg-[#F5F5DC] min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${collection}`} className="hover:text-gray-900 capitalize">{collection.replace('-', ' ')}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-sm">
                    SALE
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className={`${ptSerif.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4`}>
                  {product.name}
                </h1>
                <div className="mb-4">
                  <StarRating rating={product.rating} reviews={product.reviews} />
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-blue-600">
                  PKR {product.price.toLocaleString()}.00
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    PKR {product.originalPrice.toLocaleString()}.00
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-700 text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Size <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2 border-2 rounded-lg font-medium transition-all ${
                          selectedSize === size
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-2 border-2 rounded-lg font-medium transition-all ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 uppercase tracking-wide text-base"
              >
                Add to Cart
              </button>

              {/* Details */}
              {product.details && (
                <div className="pt-6 border-t border-gray-300">
                  <h3 className={`${ptSerif.className} text-xl font-bold text-gray-900 mb-3`}>
                    Product Details
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.details}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
