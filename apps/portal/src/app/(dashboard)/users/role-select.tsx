'use client'

import { useState } from 'react'
import { updateUserRole } from '@/app/actions/users'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

export function RoleSelect({ userId, initialRole }: { userId: string, initialRole: string }) {
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState(initialRole)

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = e.target.value
    setRole(newRole)
    setLoading(true)
    
    try {
      const res = await updateUserRole(userId, newRole)
      if (res.error) {
        toast.error(res.error)
        setRole(initialRole) // revert
      } else {
        toast.success('Đã cập nhật quyền!')
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra')
      setRole(initialRole) // revert
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative inline-block w-40">
      <select
        value={role}
        onChange={handleChange}
        disabled={loading}
        className="w-full appearance-none bg-background border border-border/50 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground disabled:opacity-50"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="pending">Pending</option>
      </select>
      
      {loading && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  )
}
