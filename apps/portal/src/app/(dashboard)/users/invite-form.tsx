'use client'

import { useState } from 'react'
import { inviteUser } from '@/app/actions/users'
import { Send, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function InviteForm() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      const res = await inviteUser(formData)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success('Đã gửi lời mời thành công!')
        const form = document.getElementById('invite-form') as HTMLFormElement
        form.reset()
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra khi mời người dùng')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form id="invite-form" action={handleSubmit} className="bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden backdrop-blur-xl p-6">
      <h3 className="text-lg font-bold text-foreground mb-1">Mời người dùng</h3>
      <p className="text-sm text-muted-foreground mb-6">Gửi email mời tham gia hệ thống.</p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="full_name" className="text-sm font-medium text-foreground">Họ tên</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
            placeholder="VD: Nguyễn Văn A"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
            placeholder="email@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium text-foreground">Phân quyền</label>
          <select
            id="role"
            name="role"
            className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
            defaultValue="user"
          >
            <option value="admin">Quản trị viên (Admin)</option>
            <option value="user">Người dùng (User)</option>
            <option value="pending">Chờ duyệt (Pending)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          Gửi lời mời
        </button>
      </div>
    </form>
  )
}
