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

  const { data: rawFeaturedProducts } = await supabase
    .from('products')
    .select(`
      id,
      title,
      slug,
      images,
      summary,
      product_categories!inner (
        categories (
          slug
        )
      )
    `)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(8);

  const featuredProducts = rawFeaturedProducts?.map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    image: p.images?.[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=300',
    summary: p.summary,
    categorySlug: p.product_categories?.[0]?.categories?.slug || 'danh-muc-chung'
  })) || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans w-full">
      <Header />
      
      <main className="flex-grow w-full">
        <Hero heroBannerUrl={homeHeroBanner} />
        <FeatureRow />
        <FeaturedProducts products={featuredProducts} />
        <Industries />
      </main>

      <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH Máy Công Nghiệp CNC (MAYMOC PRO). Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  );
}
