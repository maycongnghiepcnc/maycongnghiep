import React from 'react';
import { supabase } from '@/utils/supabase';
import HeaderClient from './HeaderClient';

export default async function Header() {
  const { data: categories } = await supabase
    .from('categories')
    .select('title, slug')
    .order('sort_order', { ascending: true });

  return <HeaderClient categories={categories || []} />;
}
