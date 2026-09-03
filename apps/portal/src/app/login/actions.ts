'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  console.log('Login action started');
  const supabase = await createClient()
  console.log('Supabase client created');

  const email = formData.get('email') as string
  console.log('Email to login:', email);

  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;
  console.log('Redirect URL:', redirectUrl);

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectUrl,
    },
  })
  
  console.log('signInWithOtp result error:', error);

  if (error) {
    console.log('Redirecting with error message:', error.message);
    redirect('/login?message=' + encodeURIComponent('Không thể gửi liên kết đăng nhập: ' + error.message))
  }

  console.log('Redirecting with success message');
  redirect('/login?message=' + encodeURIComponent('Vui lòng kiểm tra email của bạn để lấy liên kết đăng nhập!'))
}

export async function loginWithPassword(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect('/login?message=' + encodeURIComponent('Đăng nhập thất bại: ' + error.message))
  }

  // Check role
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (!roleData || roleData.role === 'pending') {
      redirect('/pending')
    }
  }

  redirect('/')
}
