import React from 'react';
import { supabase } from '@/utils/supabase';
import HeaderClient from './HeaderClient';

export default async function Header() {
  const { data: categories } = await supabase
    .from('categories')
    .select('title, slug')
    .eq('tenancy', process.env.NEXT_PUBLIC_TENANCY)
    .order('sort_order', { ascending: true });

  const { data: settingsData } = await supabase
    .from('system_settings')
    .select('key, value')
    .eq('tenancy', process.env.NEXT_PUBLIC_TENANCY)
    .in('key', ['company_address', 'company_phone', 'company_fb', 'company_zalo', 'site_name', 'site_logo']);
    
  const settings = (settingsData || []).reduce((acc: any, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return (
    <HeaderClient 
      categories={categories || []} 
      settings={settings}
    />
  );
}
