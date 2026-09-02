'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getCategories() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
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

  if (!title) {
    return { error: 'Tiêu đề là bắt buộc' }
  }

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  const { error } = await supabase
    .from('categories')
    .insert([{ 
      title, 
      summary, 
      image_url,
      created_by: userId,
      updated_by: userId
    }])

  if (error) {
    console.error('Error creating category:', error)
    return { error: 'Không thể tạo danh mục' }
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

  if (!title) {
    return { error: 'Tiêu đề là bắt buộc' }
  }

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  const { error } = await supabase
    .from('categories')
    .update({ 
      title, 
      summary, 
      image_url,
      updated_by: userId
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating category:', error)
    return { error: 'Không thể cập nhật danh mục' }
  }

  revalidatePath('/categories')
  redirect('/categories')
}
