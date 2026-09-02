import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureRow from '../components/FeatureRow';
import FeaturedProducts from '../components/FeaturedProducts';
import Industries from '../components/Industries';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans w-full">
      <Header />
      
      <main className="flex-grow w-full">
        <Hero />
        <FeatureRow />
        <FeaturedProducts />
        <Industries />
      </main>

      <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH Máy Công Nghiệp CNC (MAYMOC PRO). Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  );
}
