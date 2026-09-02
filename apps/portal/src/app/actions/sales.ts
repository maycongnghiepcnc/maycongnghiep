'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSales() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('crm_sales')
    .select(`
      *,
      crm_customers(name, company, email)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching sales:', error)
    return { error: 'Lỗi tải danh sách đơn hàng', sales: [] }
  }

  return { sales: data }
}

export async function convertOpportunityToSale(opportunityId: string, amount: number, title: string, customerId?: string) {
  const supabase = await createClient()

  let finalCustomerId = customerId

  // If no customer ID is provided, try to fetch the contact linked to the opportunity and see if they are a customer
  if (!finalCustomerId) {
    const { data: opp } = await supabase
      .from('crm_opportunities')
      .select('contact_id')
      .eq('id', opportunityId)
      .single()

    if (opp?.contact_id) {
      const { data: cust } = await supabase
        .from('crm_customers')
        .select('id')
        .eq('contact_id', opp.contact_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
        
      if (cust) {
        finalCustomerId = cust.id
      }
    }
  }

  // Insert into sales
  const { error: insertError } = await supabase
    .from('crm_sales')
    .insert({
      opportunity_id: opportunityId,
      customer_id: finalCustomerId || null,
      title: title,
      amount: amount,
      status: 'completed'
    })

  if (insertError) {
    console.error('Error creating sale:', insertError)
    return { error: 'Không thể tạo đơn hàng' }
  }

  // Update opportunity status
  const { error: updateError } = await supabase
    .from('crm_opportunities')
    .update({ stage: 'won' })
    .eq('id', opportunityId)

  if (updateError) {
    console.error('Error updating opportunity:', updateError)
  }

  revalidatePath('/crm/opportunities')
  revalidatePath('/crm/sales')
  
  return { success: true }
}
