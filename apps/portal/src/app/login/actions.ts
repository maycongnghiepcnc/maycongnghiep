'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  // We need to pass the redirect URL where the user should land after clicking the magic link.
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // In production, you would want this to dynamically grab the host
      // or set a specific environment variable for the site URL.
      emailRedirectTo: 'http://localhost:4001/auth/callback',
    },
  })

  if (error) {
    redirect('/login?message=Không thể gửi liên kết đăng nhập: ' + error.message)
  }

  redirect('/login?message=Vui lòng kiểm tra email của bạn để lấy liên kết đăng nhập!')
}
