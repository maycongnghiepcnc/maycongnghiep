'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getCustomers() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('crm_customers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching customers:', error)
    return { error: 'Lỗi tải danh sách khách hàng', customers: [] }
  }

  return { customers: data }
}

export async function convertContactToCustomer(contactId: string) {
  const supabase = await createClient()

  // 1. Fetch contact details
  const { data: contact, error: fetchError } = await supabase
    .from('crm_contacts')
    .select('*')
    .eq('id', contactId)
    .single()

  if (fetchError || !contact) {
    return { error: 'Không tìm thấy liên hệ' }
  }

  // 2. Insert into customers
  const { data: newCustomer, error: insertError } = await supabase
    .from('crm_customers')
    .insert({
      contact_id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
    })
    .select()
    .single()

  if (insertError) {
    console.error('Error creating customer:', insertError)
    return { error: 'Không thể tạo khách hàng' }
  }

  // 3. Update contact status
  const { error: updateError } = await supabase
    .from('crm_contacts')
    .update({ status: 'customer' })
    .eq('id', contactId)

  if (updateError) {
    console.error('Error updating contact status:', updateError)
    // Non-fatal, we still created the customer
  }

  revalidatePath('/crm/contacts')
  revalidatePath('/crm/customers')
  
  return { success: true, customerId: newCustomer.id }
}
