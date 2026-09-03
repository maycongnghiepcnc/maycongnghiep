import React from 'react';
import { supabase } from '@/utils/supabase';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureRow from '../components/FeatureRow';
import FeaturedProducts from '../components/FeaturedProducts';
import Industries from '../components/Industries';

export default async function Home() {
  const { data } = await supabase
    .from('system_settings')
    .select('value')
    .eq('key', 'home_hero_banner')
    .single();

  const homeHeroBanner = data?.value;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans w-full">
      <Header />
      
      <main className="flex-grow w-full">
        <Hero heroBannerUrl={homeHeroBanner} />
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
