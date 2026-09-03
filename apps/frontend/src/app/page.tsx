import React from 'react';
import { supabase } from '@/utils/supabase';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureRow from '../components/FeatureRow';
import FeaturedProducts from '../components/FeaturedProducts';
import Industries from '../components/Industries';

export default async function Home() {
  const { data: settingsData } = await supabase
    .from('system_settings')
    .select('key, value')
    .in('key', [
      'home_hero_banner',
      'home_hero_mode',
      'home_hero_image_only_landscape',
      'home_hero_image_only_portrait'
    ]);

  const settingsMap = (settingsData || []).reduce((acc: any, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  const homeHeroBanner = settingsMap['home_hero_banner'];
  const homeHeroMode = settingsMap['home_hero_mode'] || 'standard';
  const homeHeroImageOnlyLandscape = settingsMap['home_hero_image_only_landscape'];
  const homeHeroImageOnlyPortrait = settingsMap['home_hero_image_only_portrait'];

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
        <Hero 
          heroBannerUrl={homeHeroBanner} 
          mode={homeHeroMode}
          landscapeUrl={homeHeroImageOnlyLandscape}
          portraitUrl={homeHeroImageOnlyPortrait}
        />
        <FeatureRow />
        <FeaturedProducts products={featuredProducts} />
        <Industries />
      </main>

      <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH Máy Công Nghiệp CNC (YUJI VINA). Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  );
}
