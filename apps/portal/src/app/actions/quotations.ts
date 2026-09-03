'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type QuotationItem = {
  product_id: string
  quantity: number
  unit_price: number
  discount: number
  total_price: number
}

export async function createQuotation(data: {
  contact_id: string
  opportunity_id?: string
  subtotal: number
  discount: number
  tax: number
  total: number
  notes?: string
  valid_until?: string
  items: QuotationItem[]
}) {
  const supabase = createServerActionClient({ cookies })
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    throw new Error('Not authenticated')
  }

  // Generate a random code BG-YYYYMMDD-XXXX
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const randomStr = Math.floor(1000 + Math.random() * 9000)
  const code = `BG-${dateStr}-${randomStr}`

  // 1. Insert Quotation
  const { data: quotation, error: qError } = await supabase
    .from('crm_quotations')
    .insert({
      code,
      contact_id: data.contact_id,
      opportunity_id: data.opportunity_id || null,
      subtotal: data.subtotal,
      discount: data.discount,
      tax: data.tax,
      total: data.total,
      notes: data.notes || '',
      valid_until: data.valid_until || null,
      created_by: userData.user.id
    })
    .select()
    .single()

  if (qError) {
    console.error('Create quotation error:', qError)
    throw new Error('Could not create quotation')
  }

  // 2. Insert Items
  const itemsToInsert = data.items.map(item => ({
    quotation_id: quotation.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    discount: item.discount,
    total_price: item.total_price
  }))

  const { error: itemsError } = await supabase
    .from('crm_quotation_items')
    .insert(itemsToInsert)

  if (itemsError) {
    console.error('Create quotation items error:', itemsError)
    // Rollback quotation (best effort)
    await supabase.from('crm_quotations').delete().eq('id', quotation.id)
    throw new Error('Could not create quotation items')
  }

  revalidatePath('/crm/quotations')
  return { id: quotation.id, code: quotation.code }
}

export async function getQuotations() {
  const supabase = createServerActionClient({ cookies })
  
  const { data, error } = await supabase
    .from('crm_quotations')
    .select(`
      *,
      contact:crm_contacts(id, name, company),
      opportunity:crm_opportunities(id, title)
    `)
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error('Error fetching quotations:', error)
    return []
  }
  
  return data
}

export async function getQuotationById(id: string) {
  const supabase = createServerActionClient({ cookies })
  
  const { data, error } = await supabase
    .from('crm_quotations')
    .select(`
      *,
      contact:crm_contacts(id, name, email, phone, company, job_title),
      items:crm_quotation_items(
        id, quantity, unit_price, discount, total_price,
        product:products(id, title, slug)
      )
    `)
    .eq('id', id)
    .single()
    
  if (error) {
    console.error('Error fetching quotation:', error)
    return null
  }
  
  return data
}

export async function updateQuotationStatus(id: string, status: string) {
  const supabase = createServerActionClient({ cookies })
  
  const { error } = await supabase
    .from('crm_quotations')
    .update({ status })
    .eq('id', id)
    
  if (error) {
    console.error('Error updating quotation status:', error)
    throw new Error('Could not update status')
  }
  
  revalidatePath(`/crm/quotations/${id}`)
  revalidatePath('/crm/quotations')
}

export async function updateQuotationPdf(id: string, pdfUrl: string) {
  const supabase = createServerActionClient({ cookies })
  
  const { error } = await supabase
    .from('crm_quotations')
    .update({ pdf_url: pdfUrl })
    .eq('id', id)
    
  if (error) {
    console.error('Error updating quotation pdf_url:', error)
    throw new Error('Could not update pdf_url')
  }
}

export async function deleteQuotation(id: string) {
  const supabase = createServerActionClient({ cookies })
  
  const { error } = await supabase
    .from('crm_quotations')
    .delete()
    .eq('id', id)
    
  if (error) {
    console.error('Error deleting quotation:', error)
    throw new Error('Could not delete quotation')
  }
  
  revalidatePath('/crm/quotations')
}
