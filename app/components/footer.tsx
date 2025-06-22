import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-inner mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-700">
        
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-semibold text-green-600 mb-4">YourCompany</h3>
          <p className="leading-relaxed text-gray-600">
            Delivering quality products and exceptional service since 2020. We’re passionate about your satisfaction.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-green-600 transition">Home</a></li>
            <li><a href="/products" className="hover:text-green-600 transition">Products</a></li>
            <li><a href="/about" className="hover:text-green-600 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-green-600 transition">Contact</a></li>
            <li><a href="/faq" className="hover:text-green-600 transition">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h4>
          <address className="not-italic space-y-2 text-gray-600">
            <p>123 Main Street, City, Country</p>
            <p>Email: <a href="mailto:support@yourcompany.com" className="hover:text-green-600 transition">support@yourcompany.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="hover:text-green-600 transition">+1 (234) 567-890</a></p>
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
          </address>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h4>
          <div className="flex space-x-5 text-gray-600">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-green-600 transition">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5 3.657 9.127 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-green-600 transition">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5.5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-600 transition">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zm8.25 1.75a.75.75 0 11.001 1.501A.75.75 0 0116 5.75zm-4 2a4.25 4.25 0 110 8.5 4.25 4.25 0 010-8.5zm0 2a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-green-600 transition">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.026-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.353V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.603 0 4.268 2.37 4.268 5.451v6.292zM5.337 7.433a2.07 2.07 0 110-4.141 2.07 2.07 0 010 4.141zM6.941 20.452H3.73V9h3.211v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.224.792 24 1.771 24h20.451c.98 0 1.778-.776 1.778-1.729V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-50 border-t border-gray-200 text-gray-500 text-center text-sm py-4 select-none">
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
}
