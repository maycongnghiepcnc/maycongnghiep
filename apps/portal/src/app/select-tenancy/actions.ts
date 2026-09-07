'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function setTenancyCookie(tenancy: string) {
  const cookieStore = await cookies()
  cookieStore.set('active_tenancy', tenancy, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  redirect('/')
}
