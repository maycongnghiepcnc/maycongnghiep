'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Clock, Phone, Search, Menu, X, ChevronDown } from 'lucide-react';

interface Category {
  title: string;
  slug: string;
}

export default function HeaderClient({ categories = [] }: { categories?: Category[] }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#0b1221] text-gray-300 text-xs py-2 px-4 sm:px-10 flex justify-between items-center">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span className="hidden sm:inline">Showroom: 1234 Quốc lộ 1A, P. An Phú Đông, Q.12, TP.HCM</span>
            <span className="sm:hidden">1234 QL1A, TP.HCM</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span className="hidden sm:inline">Giờ làm việc: 08:00 - 17:30 (T2 - T7)</span>
            <span className="sm:hidden">08:00 - 17:30</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white">
            {/* Facebook icon fallback */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="#" className="hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33zM9.75 15.02V8.48L15.5 11.75l-5.75 3.27z"/></svg>
          </a>
          <a href="#" className="hover:text-white">
             {/* TikTok icon fallback */}
             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z"/></svg>
          </a>
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-[#0b1c3e] text-white px-4 sm:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="YUJI VINA Logo" 
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
          <Link 
            href="/" 
            className={`hover:text-yellow-500 pb-1 flex items-center gap-1 border-b-2 transition-colors ${pathname === '/' ? 'text-yellow-500 border-yellow-500' : 'border-transparent'}`}
          >
            TRANG CHỦ
          </Link>
          <div className="relative group flex items-center h-full">
            <Link 
              href="/san-pham" 
              className={`hover:text-yellow-500 pb-1 flex items-center gap-1 border-b-2 transition-colors ${pathname.startsWith('/san-pham') ? 'text-yellow-500 border-yellow-500' : 'border-transparent'}`}
            >
              SẢN PHẨM <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </Link>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#0b1221]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden translate-y-2 group-hover:translate-y-0">
              <div className="py-2 flex flex-col">
                {categories.map((cat) => (
                  <Link 
                    key={cat.slug} 
                    href={`/san-pham/${cat.slug}`}
                    className="px-5 py-3 hover:bg-white/5 hover:text-yellow-500 transition-colors border-b border-white/5 last:border-0 flex items-center gap-2 group/item"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover/item:bg-yellow-500 transition-colors"></div>
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <a href="#" className="hover:text-yellow-500 pb-1 flex items-center gap-1 border-b-2 border-transparent transition-colors">
            GIẢI PHÁP <ChevronDown size={14} />
          </a>
          <a href="#" className="hover:text-yellow-500 pb-1 flex items-center gap-1 border-b-2 border-transparent transition-colors">DỰ ÁN</a>
          <a href="#" className="hover:text-yellow-500 pb-1 flex items-center gap-1 border-b-2 border-transparent transition-colors">KIẾN THỨC</a>
          <a href="#" className="hover:text-yellow-500 pb-1 flex items-center gap-1 border-b-2 border-transparent transition-colors">VỀ CHÚNG TÔI</a>
          <Link 
            href="/lien-he" 
            className={`hover:text-yellow-500 pb-1 flex items-center gap-1 border-b-2 transition-colors ${pathname.startsWith('/lien-he') ? 'text-yellow-500 border-yellow-500' : 'border-transparent'}`}
          >
            LIÊN HỆ
          </Link>
        </nav>

        {/* CTA & Search */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-[#0b1c3e] transition px-4 py-2 text-sm font-bold">
            NHẬN TƯ VẤN MIỄN PHÍ
          </button>
          <button className="text-white hover:text-yellow-500">
            <Search size={20} />
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button 
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-md transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0b1221] text-white border-t border-white/10 absolute w-full z-50 shadow-2xl">
          <nav className="flex flex-col py-4 px-6 gap-4 font-semibold text-sm">
            <Link 
              href="/" 
              className={`hover:text-yellow-500 py-2 ${pathname === '/' ? 'text-yellow-500' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              TRANG CHỦ
            </Link>
            
            <div className="flex flex-col">
              <Link 
                href="/san-pham" 
                className={`hover:text-yellow-500 py-2 ${pathname.startsWith('/san-pham') ? 'text-yellow-500' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SẢN PHẨM
              </Link>
              <div className="flex flex-col pl-4 border-l border-white/10 mt-2 gap-2">
                {categories.map((cat) => (
                  <Link 
                    key={cat.slug}
                    href={`/san-pham/${cat.slug}`}
                    className="text-gray-300 hover:text-yellow-500 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>

            <a href="#" className="hover:text-yellow-500 py-2">GIẢI PHÁP</a>
            <a href="#" className="hover:text-yellow-500 py-2">DỰ ÁN</a>
            <a href="#" className="hover:text-yellow-500 py-2">KIẾN THỨC</a>
            <a href="#" className="hover:text-yellow-500 py-2">VỀ CHÚNG TÔI</a>
            <Link 
              href="/lien-he" 
              className="hover:text-yellow-500 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              LIÊN HỆ
            </Link>

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              <button className="bg-yellow-500 text-[#0b1c3e] w-full py-3 text-sm font-bold rounded-md hover:bg-yellow-400">
                NHẬN TƯ VẤN MIỄN PHÍ
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
