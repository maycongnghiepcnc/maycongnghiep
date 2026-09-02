'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSetting(key: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('system_settings')
    .select('value')
    .eq('key', key)
    .single()

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error(`Error fetching setting ${key}:`, error)
    }
    return null
  }
  return data.value
}

export async function setSetting(key: string, value: any) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { error } = await supabase
    .from('system_settings')
    .upsert({
      key,
      value,
      updated_by: user?.id
    })

  if (error) {
    console.error(`Error saving setting ${key}:`, error)
    return { error: 'Không thể lưu cài đặt' }
  }

  revalidatePath('/settings')
  return { success: true }
}
