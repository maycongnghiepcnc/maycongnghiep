'use client'

import { useState } from 'react'
import { Save, Loader2, Mail } from 'lucide-react'
import { setSetting } from '@/app/actions/settings'
import toast from 'react-hot-toast'

interface SettingsFormProps {
  initialAdminEmail?: string
}

export function SettingsForm({ initialAdminEmail }: SettingsFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [adminEmail, setAdminEmail] = useState(initialAdminEmail || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    
    try {
      const res = await setSetting('admin_email', adminEmail)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success('Đã lưu cấu hình thành công!')
      }
    } catch (error) {
      toast.error('Lỗi kết nối')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-accent" />
          Thông báo Email
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Email nhận các thông báo từ hệ thống, ví dụ khi có khách hàng liên hệ qua form Liên Hệ trên website.
        </p>

        <div className="space-y-2 max-w-md">
          <label htmlFor="adminEmail" className="text-sm font-medium text-foreground">
            Email Quản Trị Viên
          </label>
          <input
            id="adminEmail"
            type="email"
            required
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
            placeholder="admin@maycongnghiep.com"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-2.5 px-6 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20 disabled:opacity-50"
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isPending ? 'Đang lưu...' : 'Lưu cài đặt'}
        </button>
      </div>
    </form>
  )
}
