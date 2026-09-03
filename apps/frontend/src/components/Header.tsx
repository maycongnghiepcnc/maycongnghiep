import React from 'react';
import { supabase } from '@/utils/supabase';
import HeaderClient from './HeaderClient';

export default async function Header() {
  const { data: categories } = await supabase
    .from('categories')
    .select('title, slug')
    .order('sort_order', { ascending: true });

  const { data: settingsData } = await supabase
    .from('system_settings')
    .select('key, value')
    .in('key', ['company_address', 'company_phone', 'company_fb', 'company_zalo']);
    
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
