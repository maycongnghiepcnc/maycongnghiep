'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ==========================================
// CONTACTS
// ==========================================

export async function getContacts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('crm_contacts')
    .select(`*`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching contacts:', error)
    return []
  }
  return data
}

export async function getContactById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('crm_contacts')
    .select(`*`)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching contact:', error)
    return null
  }
  return data
}

export async function createContact(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const email = formData.get('email') as string || null
  const phone = formData.get('phone') as string || null
  const company = formData.get('company') as string || null
  const job_title = formData.get('job_title') as string || null
  const status = formData.get('status') as string || 'new'
  const note = formData.get('note') as string || null

  if (!name) {
    return { error: 'Tên liên hệ là bắt buộc' }
  }

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  const { error } = await supabase
    .from('crm_contacts')
    .insert([{ 
      name, email, phone, company, job_title, status, note,
      created_by: userId, updated_by: userId
    }])

  if (error) {
    console.error('Error creating contact:', error)
    return { error: 'Không thể tạo liên hệ' }
  }

  revalidatePath('/crm/contacts')
  redirect('/crm/contacts')
}

export async function updateContact(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const email = formData.get('email') as string || null
  const phone = formData.get('phone') as string || null
  const company = formData.get('company') as string || null
  const job_title = formData.get('job_title') as string || null
  const status = formData.get('status') as string || 'new'
  const note = formData.get('note') as string || null

  if (!name) {
    return { error: 'Tên liên hệ là bắt buộc' }
  }

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  const { error } = await supabase
    .from('crm_contacts')
    .update({ 
      name, email, phone, company, job_title, status, note,
      updated_by: userId
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating contact:', error)
    return { error: 'Không thể cập nhật liên hệ' }
  }

  revalidatePath('/crm/contacts')
  redirect('/crm/contacts')
}

export async function deleteContact(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('crm_contacts').delete().eq('id', id)

  if (error) {
    console.error('Error deleting contact:', error)
    return { error: 'Không thể xóa liên hệ' }
  }

  revalidatePath('/crm/contacts')
}

// ==========================================
// OPPORTUNITIES
// ==========================================

export async function getOpportunities() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('crm_opportunities')
    .select(`
      *,
      contact:crm_contacts(name, company)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching opportunities:', error)
    return []
  }
  return data
}

export async function getOpportunityById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('crm_opportunities')
    .select(`*`)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching opportunity:', error)
    return null
  }
  return data
}

export async function createOpportunity(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const contact_id = formData.get('contact_id') as string || null
  const expected_revenue_str = formData.get('expected_revenue') as string
  const expected_revenue = expected_revenue_str ? parseFloat(expected_revenue_str) : null
  const stage = formData.get('stage') as string || 'lead'
  const probability_str = formData.get('probability') as string
  const probability = probability_str ? parseInt(probability_str, 10) : 0
  const note = formData.get('note') as string || null

  if (!title) {
    return { error: 'Tiêu đề là bắt buộc' }
  }
  
  if (!contact_id) {
    return { error: 'Vui lòng chọn liên hệ' }
  }

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  const { error } = await supabase
    .from('crm_opportunities')
    .insert([{ 
      title, contact_id, expected_revenue, stage, probability, note,
      created_by: userId, updated_by: userId
    }])

  if (error) {
    console.error('Error creating opportunity:', error)
    return { error: 'Không thể tạo cơ hội' }
  }

  revalidatePath('/crm/opportunities')
  redirect('/crm/opportunities')
}

export async function updateOpportunity(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const contact_id = formData.get('contact_id') as string || null
  const expected_revenue_str = formData.get('expected_revenue') as string
  const expected_revenue = expected_revenue_str ? parseFloat(expected_revenue_str) : null
  const stage = formData.get('stage') as string || 'lead'
  const probability_str = formData.get('probability') as string
  const probability = probability_str ? parseInt(probability_str, 10) : 0
  const note = formData.get('note') as string || null

  if (!title) {
    return { error: 'Tiêu đề là bắt buộc' }
  }

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  const { error } = await supabase
    .from('crm_opportunities')
    .update({ 
      title, contact_id, expected_revenue, stage, probability, note,
      updated_by: userId
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating opportunity:', error)
    return { error: 'Không thể cập nhật cơ hội' }
  }

  revalidatePath('/crm/opportunities')
  redirect('/crm/opportunities')
}

export async function deleteOpportunity(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('crm_opportunities').delete().eq('id', id)

  if (error) {
    console.error('Error deleting opportunity:', error)
    return { error: 'Không thể xóa cơ hội' }
  }

  revalidatePath('/crm/opportunities')
}

// ==========================================
// ACTIVITIES
// ==========================================

export async function getActivities(contactId?: string, opportunityId?: string) {
  const supabase = await createClient()
  
  let query = supabase
    .from('crm_activities')
    .select(`
      *,
      contact:crm_contacts(name),
      opportunity:crm_opportunities(title)
    `)
    .order('performed_at', { ascending: false })
    
  if (contactId) query = query.eq('contact_id', contactId)
  if (opportunityId) query = query.eq('opportunity_id', opportunityId)

  const { data, error } = await query

  if (error) {
    console.error('Error fetching activities:', error)
    return []
  }
  return data
}

export async function createActivity(formData: FormData) {
  const supabase = await createClient()
  
  const type = formData.get('type') as string || 'note'
  const description = formData.get('description') as string || null
  const outcome = formData.get('outcome') as string || null
  const contact_id = formData.get('contact_id') as string || null
  const opportunity_id = formData.get('opportunity_id') as string || null
  const performed_at = formData.get('performed_at') as string || new Date().toISOString()

  if (!contact_id && !opportunity_id) {
    return { error: 'Hoạt động phải liên kết với Liên hệ hoặc Cơ hội' }
  }

  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id

  const { error } = await supabase
    .from('crm_activities')
    .insert([{ 
      type, description, outcome, contact_id, opportunity_id, performed_at,
      created_by: userId, updated_by: userId
    }])

  if (error) {
    console.error('Error creating activity:', error)
    return { error: 'Không thể lưu hoạt động' }
  }

  // Refresh current path
  return { success: true }
}
