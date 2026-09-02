'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { createContact, updateContact } from '@/app/actions/crm'

export function ContactForm({ initialData }: { initialData?: any }) {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isEditing = !!initialData

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = isEditing 
        ? await updateContact(initialData.id, formData)
        : await createContact(formData)
        
      if (res?.error) {
        setError(res.error)
        setIsPending(false)
      }
    } catch (err) {
      console.error(err)
      setError('Đã xảy ra lỗi không xác định')
      setIsPending(false)
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/crm/contacts"
          className="p-2 bg-card border border-border/50 rounded-xl hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all text-muted-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isEditing ? 'Sửa Liên hệ' : 'Thêm Liên hệ mới'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isEditing ? 'Cập nhật thông tin khách hàng.' : 'Tạo mới một hồ sơ liên hệ trong hệ thống.'}
          </p>
        </div>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg p-6 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Họ và Tên <span className="text-destructive">*</span>
              </label>
              <input
                id="name"
                name="name"
                required
                defaultValue={initialData?.name}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="VD: Nguyễn Văn A"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={initialData?.email}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="email@company.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">Số điện thoại</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={initialData?.phone}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="0912..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-foreground">Công ty</label>
              <input
                id="company"
                name="company"
                defaultValue={initialData?.company}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="Tên doanh nghiệp..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="job_title" className="text-sm font-medium text-foreground">Chức vụ</label>
              <input
                id="job_title"
                name="job_title"
                defaultValue={initialData?.job_title}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="Giám đốc, Quản lý mua hàng..."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="status" className="text-sm font-medium text-foreground">Trạng thái</label>
              <select
                id="status"
                name="status"
                defaultValue={initialData?.status || 'new'}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              >
                <option value="new">Mới</option>
                <option value="contacted">Đã liên hệ</option>
                <option value="qualified">Tiềm năng (Qualified)</option>
                <option value="customer">Khách hàng</option>
                <option value="lost">Từ chối / Mất</option>
              </select>
            </div>
          </div>

          <div className="pt-6 flex justify-end border-t border-border/50 mt-10">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-3 px-8 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isPending ? 'Đang lưu...' : 'Lưu Liên hệ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
