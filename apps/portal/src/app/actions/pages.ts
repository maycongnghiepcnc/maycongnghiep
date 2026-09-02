'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getPages() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cms_pages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching pages:', error)
    return []
  }
  return data
}

export async function getPageById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cms_pages')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching page:', error)
    return null
  }
  return data
}

export async function createPage(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const is_published = formData.get('is_published') === 'on'

  if (!title || !slug) {
    return { error: 'Tiêu đề và đường dẫn (slug) là bắt buộc' }
  }

  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('cms_pages')
    .insert([{ 
      title, 
      slug, 
      content, 
      is_published,
      created_by: user?.id,
      updated_by: user?.id
    }])

  if (error) {
    console.error('Error creating page:', error)
    // Check unique constraint violation for slug
    if (error.code === '23505') {
      return { error: 'Đường dẫn (slug) này đã tồn tại' }
    }
    return { error: 'Không thể tạo trang nội dung' }
  }

  revalidatePath('/cms/pages')
  redirect('/cms/pages')
}

export async function updatePage(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const is_published = formData.get('is_published') === 'on'

  if (!title || !slug) {
    return { error: 'Tiêu đề và đường dẫn (slug) là bắt buộc' }
  }

  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('cms_pages')
    .update({ 
      title, 
      slug, 
      content, 
      is_published,
      updated_by: user?.id
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating page:', error)
    if (error.code === '23505') {
      return { error: 'Đường dẫn (slug) này đã tồn tại' }
    }
    return { error: 'Không thể cập nhật trang nội dung' }
  }

  revalidatePath('/cms/pages')
  redirect('/cms/pages')
}

export async function deletePage(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('cms_pages').delete().eq('id', id)

  if (error) {
    console.error('Error deleting page:', error)
    return { error: 'Không thể xóa trang' }
  }

  revalidatePath('/cms/pages')
}
