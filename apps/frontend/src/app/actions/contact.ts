'use server'

import { supabaseAdmin } from '@/utils/supabase'
import { Resend } from 'resend'
import { ContactNotificationEmail } from '@/emails/ContactNotification'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string

    if (!name || (!email && !phone)) {
      return { error: 'Vui lòng điền họ tên và ít nhất 1 phương thức liên lạc' }
    }

    // 1. Insert into CRM Contacts
    const { data: contact, error: contactError } = await supabaseAdmin
      .from('crm_contacts')
      .insert({
        name,
        email: email || null,
        phone: phone || null,
        status: 'new'
      })
      .select('id')
      .single()

    if (contactError) {
      console.error('Error creating contact:', contactError)
      return { error: 'Có lỗi xảy ra khi lưu thông tin liên hệ.' }
    }

    // 2. Insert into CRM Opportunities
    const { error: oppError } = await supabaseAdmin
      .from('crm_opportunities')
      .insert({
        contact_id: contact.id,
        title: `Liên hệ từ Website - ${name}`,
        stage: 'lead'
      })

    if (oppError) {
      console.error('Error creating opportunity:', oppError)
    }

    // 3. Insert note into crm_activities (for the message)
    if (message) {
      await supabaseAdmin
        .from('crm_activities')
        .insert({
          contact_id: contact.id,
          type: 'note',
          description: message
        })
    }

    // 4. Create Notification
    await supabaseAdmin
      .from('notifications')
      .insert({
        title: 'Khách hàng liên hệ mới',
        message: `${name} vừa gửi yêu cầu liên hệ từ Website`,
        link: `/crm/contacts` // Or link to the specific contact page if you have one
      })

    // 5. Send Email via Resend
    // First, fetch the admin email setting
    const { data: setting } = await supabaseAdmin
      .from('system_settings')
      .select('value')
      .eq('key', 'admin_email')
      .single()
    
    const adminEmail = setting?.value

    if (adminEmail && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Website Contact <onboarding@resend.dev>', // Should use a verified domain if available
          to: [adminEmail],
          subject: `Liên hệ mới từ Website: ${name}`,
          react: ContactNotificationEmail({ name, email, phone, message }),
        })
      } catch (emailErr) {
        console.error('Error sending email:', emailErr)
        // We don't fail the submission if email fails, just log it.
      }
    }

    return { success: true }
  } catch (err) {
    console.error('Unhandled error in contact submit:', err)
    return { error: 'Lỗi hệ thống không xác định.' }
  }
}
