'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

// Helper to check current user role
export async function getUserRole() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  return roleData?.role || 'user'
}

export async function getUsers() {
  const role = await getUserRole()
  if (role !== 'admin' && role !== 'super_admin') return { error: 'Không có quyền truy cập', users: [] }

  const supabase = await createClient()
  const active_tenancy = (await cookies()).get('active_tenancy')?.value
  
  // Fetch user roles
  const { data: rolesData, error: rolesError } = await supabase
    .from('user_roles')
    .select('user_id, role, created_at')
    .order('created_at', { ascending: false })

  if (rolesError) {
    console.error('Error fetching user roles:', rolesError)
    return { error: 'Lỗi tải danh sách người dùng', users: [] }
  }

  // Fetch profiles
  let profilesQuery = supabase
    .from('profiles')
    .select('id, email, full_name, avatar_url, tenancies')

  if (role === 'admin') {
    // Admin can only see users that belong to their active tenancy
    profilesQuery = profilesQuery.contains('tenancies', [active_tenancy])
  }

  const { data: profilesData, error: profilesError } = await profilesQuery

  if (profilesError) {
    console.error('Error fetching profiles:', profilesError)
  }

  // Merge
  const users = rolesData.map((u: any) => {
    const profile = profilesData?.find((p: any) => p.id === u.user_id)
    if (!profile) return null // Filter out if not in the tenancy

    return {
      id: u.user_id,
      role: u.role,
      created_at: u.created_at,
      email: profile.email || 'N/A',
      full_name: profile.full_name || null,
      avatar_url: profile.avatar_url || null,
      tenancies: profile.tenancies || [],
    }
  }).filter(Boolean)

  return { users }
}

export async function inviteUser(formData: FormData) {
  const role = await getUserRole()
  if (role !== 'admin' && role !== 'super_admin') return { error: 'Không có quyền truy cập' }

  const email = formData.get('email') as string
  const targetRole = formData.get('role') as string
  const fullName = formData.get('full_name') as string
  
  let tenancies = formData.getAll('tenancies') as string[]
  
  const active_tenancy = (await cookies()).get('active_tenancy')?.value

  if (role === 'admin') {
    if (targetRole === 'admin' || targetRole === 'super_admin') {
      return { error: 'Admin không thể tạo Admin khác' }
    }
    // Admin can only assign users to their active tenancy
    tenancies = [active_tenancy || 'maycongnghiep']
  }

  if (!email || !targetRole) {
    return { error: 'Vui lòng nhập đủ thông tin' }
  }

  const supabaseAdmin = createAdminClient()

  // Use the Supabase Admin API to invite user
  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: {
      role: targetRole,
      full_name: fullName,
      tenancies, // Sent to trigger
    }
  })

  if (error) {
    console.error('Invite error:', error)
    return { error: 'Không thể mời người dùng: ' + error.message }
  }

  revalidatePath('/users')
  return { success: true }
}

export async function updateUserRole(userId: string, newRole: string) {
  const role = await getUserRole()
  if (role !== 'admin' && role !== 'super_admin') return { error: 'Không có quyền truy cập' }

  if (role === 'admin' && (newRole === 'admin' || newRole === 'super_admin')) {
    return { error: 'Admin không thể thăng quyền người khác lên Admin' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('user_roles')
    .update({ role: newRole })
    .eq('user_id', userId)

  if (error) {
    console.error('Update role error:', error)
    return { error: 'Không thể cập nhật quyền' }
  }

  revalidatePath('/users')
  return { success: true }
}

export async function updateUserTenancies(userId: string, newTenancies: string[]) {
  const role = await getUserRole()
  if (role !== 'super_admin') return { error: 'Chỉ Super Admin mới có quyền cập nhật Tenancy của người khác' }

  const supabase = await createClient()

  const { error } = await supabase
    .from('profiles')
    .update({ tenancies: newTenancies })
    .eq('id', userId)

  if (error) {
    console.error('Update tenancies error:', error)
    return { error: 'Không thể cập nhật tenancy' }
  }

  revalidatePath('/users')
  return { success: true }
}
