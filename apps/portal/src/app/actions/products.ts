'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getProducts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories (
        categories (
          id,
          title
        )
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const summary = formData.get('summary') as string
  const priceString = formData.get('price') as string
  const video_url = formData.get('video_url') as string
  const content = formData.get('content') as string
  
  // New fields
  const code = formData.get('code') as string || null
  const serial_number = formData.get('serial_number') as string || null
  const meta_title = formData.get('meta_title') as string || null
  const meta_description = formData.get('meta_description') as string || null
  
  const tagsString = formData.get('tags') as string
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : []
  
  const price = priceString ? parseFloat(priceString) : null
  
  const imageUrlsString = formData.get('image_urls') as string
  const images = imageUrlsString ? JSON.parse(imageUrlsString) : []
  
  const categoryIdsString = formData.get('category_ids') as string
  const categoryIds = categoryIdsString ? JSON.parse(categoryIdsString) : []

  if (!title) {
    return { error: 'Tiêu đề là bắt buộc' }
  }

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  // 1. Insert Product
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert([{ 
      title, 
      summary, 
      content, 
      price, 
      video_url, 
      images,
      code,
      serial_number,
      tags,
      meta_title,
      meta_description,
      created_by: userId,
      updated_by: userId
    }])
    .select()
    .single()

  if (productError || !product) {
    console.error('Error creating product:', productError)
    return { error: 'Không thể tạo sản phẩm' }
  }

  // 2. Insert Categories mappings
  if (categoryIds.length > 0) {
    const mappings = categoryIds.map((categoryId: string) => ({
      product_id: product.id,
      category_id: categoryId
    }))
    
    const { error: mappingError } = await supabase
      .from('product_categories')
      .insert(mappings)
      
    if (mappingError) {
      console.error('Error mapping categories:', mappingError)
      // Continue anyway, but log the error
    }
  }

  revalidatePath('/products')
  redirect('/products')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    return { error: 'Không thể xóa sản phẩm' }
  }

  revalidatePath('/products')
}

export async function getProductById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories (
        category_id
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }
  return data
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const summary = formData.get('summary') as string
  const priceString = formData.get('price') as string
  const video_url = formData.get('video_url') as string
  const content = formData.get('content') as string
  
  // SEO fields
  const code = formData.get('code') as string || null
  const serial_number = formData.get('serial_number') as string || null
  const meta_title = formData.get('meta_title') as string || null
  const meta_description = formData.get('meta_description') as string || null
  
  const tagsString = formData.get('tags') as string
  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : []
  
  const price = priceString ? parseFloat(priceString) : null
  
  const imageUrlsString = formData.get('image_urls') as string
  const images = imageUrlsString ? JSON.parse(imageUrlsString) : []
  
  const categoryIdsString = formData.get('category_ids') as string
  const categoryIds = categoryIdsString ? JSON.parse(categoryIdsString) : []

  if (!title) {
    return { error: 'Tiêu đề là bắt buộc' }
  }

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  // 1. Update Product
  const { error: productError } = await supabase
    .from('products')
    .update({ 
      title, 
      summary, 
      content, 
      price, 
      video_url, 
      images,
      code,
      serial_number,
      tags,
      meta_title,
      meta_description,
      updated_by: userId
    })
    .eq('id', id)

  if (productError) {
    console.error('Error updating product:', productError)
    return { error: 'Không thể cập nhật sản phẩm' }
  }

  // 2. Update Categories mappings
  // Delete existing mappings first
  await supabase.from('product_categories').delete().eq('product_id', id)
  
  // Insert new mappings
  if (categoryIds.length > 0) {
    const mappings = categoryIds.map((categoryId: string) => ({
      product_id: id,
      category_id: categoryId
    }))
    
    const { error: mappingError } = await supabase
      .from('product_categories')
      .insert(mappings)
      
    if (mappingError) {
      console.error('Error mapping categories:', mappingError)
      // Continue anyway, but log the error
    }
  }

  revalidatePath('/products')
  redirect('/products')
}
