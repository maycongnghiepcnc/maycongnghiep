'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { slugify } from '@/utils/slugify'

export async function getCategories() {
  const supabase = await createClient()
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

export async function createCategory(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const summary = formData.get('summary') as string
  const imageUrlsString = formData.get('image_urls') as string
  const imageUrls = imageUrlsString ? JSON.parse(imageUrlsString) : []
  const image_url = imageUrls.length > 0 ? imageUrls[0] : null

  const heroBannerString = formData.get('hero_banner_urls') as string
  const heroBanners = heroBannerString ? JSON.parse(heroBannerString) : []
  const hero_banner = heroBanners.length > 0 ? heroBanners[0] : null

  const sort_order_str = formData.get('sort_order') as string
  const sort_order = sort_order_str ? parseInt(sort_order_str, 10) : 0

  if (!title) {
    return { error: 'Tiêu đề là bắt buộc' }
  }

  const slug = slugify(title)

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  // We loop to ensure slug uniqueness if it already exists
  let finalSlug = slug
  let counter = 1
  let success = false
  let errorMsg = 'Không thể tạo danh mục'

  while (!success && counter < 10) {
    const { error } = await supabase
      .from('categories')
      .insert([{ 
        title, 
        summary, 
        image_url,
        hero_banner,
        sort_order,
        slug: finalSlug,
        created_by: userId,
        updated_by: userId
      }])

    if (error) {
      if (error.code === '23505') { // unique violation
        finalSlug = `${slug}-${counter}`
        counter++
      } else {
        console.error('Error creating category:', error)
        errorMsg = error.message
        break
      }
    } else {
      success = true
    }
  }

  if (!success) {
    return { error: errorMsg }
  }

  revalidatePath('/categories')
  redirect('/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('categories').delete().eq('id', id)

  if (error) {
    console.error('Error deleting category:', error)
    return { error: 'Không thể xóa danh mục' }
  }

  revalidatePath('/categories')
}

export async function getCategoryById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }
  return data
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const summary = formData.get('summary') as string
  const imageUrlsString = formData.get('image_urls') as string
  const imageUrls = imageUrlsString ? JSON.parse(imageUrlsString) : []
  const image_url = imageUrls.length > 0 ? imageUrls[0] : null

  const heroBannerString = formData.get('hero_banner_urls') as string
  const heroBanners = heroBannerString ? JSON.parse(heroBannerString) : []
  const hero_banner = heroBanners.length > 0 ? heroBanners[0] : null

  const sort_order_str = formData.get('sort_order') as string
  const sort_order = sort_order_str ? parseInt(sort_order_str, 10) : 0

  if (!title) {
    return { error: 'Tiêu đề là bắt buộc' }
  }

  const slug = slugify(title)

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  let finalSlug = slug
  let counter = 1
  let success = false
  let errorMsg = 'Không thể cập nhật danh mục'

  while (!success && counter < 10) {
    const { error } = await supabase
      .from('categories')
      .update({ 
        title, 
        summary, 
        image_url,
        hero_banner,
        sort_order,
        slug: finalSlug,
        updated_by: userId
      })
      .eq('id', id)

    if (error) {
      if (error.code === '23505') { // unique violation
        finalSlug = `${slug}-${counter}`
        counter++
      } else {
        console.error('Error updating category:', error)
        errorMsg = error.message
        break
      }
    } else {
      success = true
    }
  }

  if (!success) {
    return { error: errorMsg }
  }

  revalidatePath('/categories')
  redirect('/categories')
}
