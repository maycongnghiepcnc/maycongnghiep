import { supabase } from '@/utils/supabase'

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return data
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }
  return data
}

export async function getProductsByCategorySlug(slug: string) {
  // First get category
  const category = await getCategoryBySlug(slug)
  if (!category) return []

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories!inner (
        category_id
      )
    `)
    .eq('product_categories.category_id', category.id)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
  return data
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories (
        categories (
          id,
          title,
          slug
        )
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
  return data
}

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories (
        categories (
          id,
          title,
          slug
        )
      )
    `)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all products:', error)
    return []
  }
  return data
}
