'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function setPassword(password: string) {
  const supabase = await createClient()
  const active_tenancy = (await cookies()).get('active_tenancy')?.value

  // Use the admin API or simply the user API if they are logged in
  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  const active_tenancy = (await cookies()).get('active_tenancy')?.value
  await supabase.auth.signOut()
  return redirect('/login')
}
