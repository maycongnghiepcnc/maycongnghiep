'use server'

import { Resend } from 'resend'
import { updateQuotationStatus } from './quotations'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendQuotationEmail(
  quotationId: string, 
  toEmail: string, 
  subject: string,
  message: string,
  base64Pdf: string,
  fileName: string
) {
  try {
    const supabase = createServerActionClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('Not authenticated')
    }

    // Convert Base64 string to Buffer for Resend
    // Format is usually "data:application/pdf;base64,JVBER..."
    const base64Data = base64Pdf.includes(',') ? base64Pdf.split(',')[1] : base64Pdf
    const buffer = Buffer.from(base64Data, 'base64')

    const data = await resend.emails.send({
      from: 'Máy Công Nghiệp CNC <onboarding@resend.dev>', // Replace with verified domain in production
      to: [toEmail],
      subject: subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #2563eb;">Kính gửi Quý Khách hàng,</h2>
          <p>Chúng tôi xin gửi đến Quý khách báo giá chi tiết đính kèm theo thư này.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; white-space: pre-wrap;">
            ${message || 'Xin vui lòng xem file PDF đính kèm.'}
          </div>
          <p>Nếu có bất kỳ thắc mắc nào, Quý khách vui lòng liên hệ lại với chúng tôi.</p>
          <br/>
          <p>Trân trọng,<br/><strong>Đội ngũ Máy Công Nghiệp CNC</strong></p>
        </div>
      `,
      attachments: [
        {
          filename: fileName || 'Bao_Gia.pdf',
          content: buffer,
        },
      ],
    })

    // Update status to 'sent'
    await updateQuotationStatus(quotationId, 'sent')
    
    // Log activity in CRM
    const { data: quotation } = await supabase.from('crm_quotations').select('contact_id, opportunity_id').eq('id', quotationId).single()
    if (quotation) {
      await supabase.from('crm_activities').insert({
        contact_id: quotation.contact_id,
        opportunity_id: quotation.opportunity_id,
        type: 'email',
        description: `Đã gửi báo giá ${fileName} tới ${toEmail}`,
        outcome: 'Gửi thành công',
        created_by: user.id
      })
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Error sending quotation email:', error)
    return { success: false, error: error.message }
  }
}
