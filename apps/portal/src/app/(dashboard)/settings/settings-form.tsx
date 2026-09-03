'use client'

import { useState } from 'react'
import { Save, Loader2, Mail, Building2 } from 'lucide-react'
import { setSetting } from '@/app/actions/settings'
import toast from 'react-hot-toast'

interface SettingsFormProps {
  initialSettings: Record<string, string>
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [settings, setSettings] = useState(initialSettings)

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    
    try {
      const promises = Object.entries(settings).map(([key, value]) => 
        setSetting(key, value)
      )
      
      const results = await Promise.all(promises)
      const hasError = results.some(r => r.error)

      if (hasError) {
        toast.error('Có lỗi xảy ra khi lưu một số cài đặt')
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
      
      {/* Company Info */}
      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-accent" />
          Thông tin Công ty (Hiển thị trên Báo giá & Website)
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Các thông tin này sẽ được tự động điền vào mẫu Báo Giá PDF và các trang công khai.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tên Công ty</label>
            <input
              type="text"
              value={settings['company_name'] || ''}
              onChange={(e) => handleChange('company_name', e.target.value)}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              placeholder="VD: MÁY CÔNG NGHIỆP CNC"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Địa chỉ</label>
            <input
              type="text"
              value={settings['company_address'] || ''}
              onChange={(e) => handleChange('company_address', e.target.value)}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              placeholder="VD: 123 Đường Công Nghiệp..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Hotline / Số điện thoại</label>
            <input
              type="text"
              value={settings['company_phone'] || ''}
              onChange={(e) => handleChange('company_phone', e.target.value)}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              placeholder="VD: 0987 654 321"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email liên hệ</label>
            <input
              type="email"
              value={settings['company_email'] || ''}
              onChange={(e) => handleChange('company_email', e.target.value)}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              placeholder="VD: contact@company.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Link Zalo</label>
            <input
              type="text"
              value={settings['company_zalo'] || ''}
              onChange={(e) => handleChange('company_zalo', e.target.value)}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              placeholder="VD: https://zalo.me/..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Link Facebook</label>
            <input
              type="text"
              value={settings['company_fb'] || ''}
              onChange={(e) => handleChange('company_fb', e.target.value)}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              placeholder="VD: https://facebook.com/..."
            />
          </div>
        </div>
      </div>

      {/* Admin Email */}
      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-accent" />
          Thông báo Hệ thống
        </h3>
        <div className="space-y-2 max-w-md">
          <label className="text-sm font-medium text-foreground">
            Email Quản Trị Viên (nhận thông báo liên hệ mới)
          </label>
          <input
            type="email"
            value={settings['admin_email'] || ''}
            onChange={(e) => handleChange('admin_email', e.target.value)}
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
