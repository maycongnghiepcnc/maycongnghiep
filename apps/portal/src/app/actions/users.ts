'use server'

import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

// Helper to check if current user is admin
async function isAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  return roleData?.role === 'admin'
}

export async function getUsers() {
  if (!(await isAdmin())) return { error: 'Không có quyền truy cập', users: [] }

  const supabase = await createClient()
  
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
  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('id, email, full_name, avatar_url')

  if (profilesError) {
    console.error('Error fetching profiles:', profilesError)
  }

  // Merge
  const users = rolesData.map((u: any) => {
    const profile = profilesData?.find((p: any) => p.id === u.user_id)
    return {
      id: u.user_id,
      role: u.role,
      created_at: u.created_at,
      email: profile?.email || 'N/A',
      full_name: profile?.full_name || null,
      avatar_url: profile?.avatar_url || null,
    }
  })

  return { users }
}

export async function inviteUser(formData: FormData) {
  if (!(await isAdmin())) return { error: 'Không có quyền truy cập' }

  const email = formData.get('email') as string
  const role = formData.get('role') as string
  const fullName = formData.get('full_name') as string

  if (!email || !role) {
    return { error: 'Vui lòng nhập đủ thông tin' }
  }

  const supabaseAdmin = createAdminClient()

  // Use the Supabase Admin API to invite user
  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: {
      role: role, // the postgres trigger reads this
      full_name: fullName,
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
  if (!(await isAdmin())) return { error: 'Không có quyền truy cập' }

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
