'use client';

import Link from 'next/link';
import { ptSerif } from '../Font/font';

export default function Footer() {
  return (
    <footer className="bg-[#F5F5DC] border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo Section */}
          <div className="flex items-start justify-center md:justify-start">
            <h2 className={`${ptSerif.className} text-2xl sm:text-3xl font-bold text-black`}>
              Abaya.
            </h2>
          </div>

          {/* CUSTOMER SERVICE Column */}
          <div>
            <h3 className={`${ptSerif.className} text-blue-600 font-bold text-sm uppercase tracking-wide mb-4`}>
              CUSTOMER SERVICE
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-black hover:underline text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black hover:underline text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-black hover:underline text-sm">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* TERMS Column */}
          <div>
            <h3 className={`${ptSerif.className} text-blue-600 font-bold text-sm uppercase tracking-wide mb-4`}>
              TERMS
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-black hover:underline text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-black hover:underline text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-black hover:underline text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-black hover:underline text-sm">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-black hover:underline text-sm">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-black hover:underline text-sm">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT US Column */}
          <div>
            <h3 className={`${ptSerif.className} text-blue-600 font-bold text-sm uppercase tracking-wide mb-4`}>
              CONTACT US
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:info@selectedlines.ae" 
                  className="text-black underline hover:no-underline text-sm"
                >
                  Email: info@selectedlines.ae
                </a>
              </li>
              <li>
                <a 
                  href="tel:+971566216225" 
                  className="text-black underline hover:no-underline text-sm"
                >
                  Tel: +971 56 621 6225
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

