'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { createOpportunity, updateOpportunity } from '@/app/actions/crm'

export function OpportunityForm({ initialData, contacts }: { initialData?: any, contacts: any[] }) {
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
        ? await updateOpportunity(initialData.id, formData)
        : await createOpportunity(formData)
        
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
          href="/crm/opportunities"
          className="p-2 bg-card border border-border/50 rounded-xl hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all text-muted-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isEditing ? 'Sửa Cơ hội' : 'Thêm Cơ hội mới'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isEditing ? 'Cập nhật thông tin cơ hội / lead.' : 'Tạo mới một cơ hội trong hệ thống.'}
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
              <label htmlFor="title" className="text-sm font-medium text-foreground">
                Tên Cơ hội <span className="text-destructive">*</span>
              </label>
              <input
                id="title"
                name="title"
                required
                defaultValue={initialData?.title}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="VD: Quan tâm Máy Phay CNC X..."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="contact_id" className="text-sm font-medium text-foreground">
                Liên hệ / Khách hàng <span className="text-destructive">*</span>
              </label>
              <select
                id="contact_id"
                name="contact_id"
                required
                defaultValue={initialData?.contact_id || ''}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              >
                <option value="" disabled>-- Chọn khách hàng --</option>
                {contacts.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.company ? `(${c.company})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="expected_revenue" className="text-sm font-medium text-foreground">Doanh thu dự kiến (VNĐ)</label>
              <input
                id="expected_revenue"
                name="expected_revenue"
                type="number"
                defaultValue={initialData?.expected_revenue}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="VD: 500000000"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="probability" className="text-sm font-medium text-foreground">Tỷ lệ thành công (%)</label>
              <input
                id="probability"
                name="probability"
                type="number"
                min="0"
                max="100"
                defaultValue={initialData?.probability ?? 10}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="0 - 100"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="stage" className="text-sm font-medium text-foreground">Giai đoạn</label>
              <select
                id="stage"
                name="stage"
                defaultValue={initialData?.stage || 'lead'}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              >
                <option value="lead">Khách Hàng Tiềm Năng (Lead)</option>
                <option value="proposal">Đề xuất / Báo giá</option>
                <option value="negotiation">Thương lượng</option>
                <option value="won">Thành công (Won)</option>
                <option value="lost">Thất bại (Lost)</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="note" className="text-sm font-medium text-foreground">Ghi chú (Note)</label>
              <textarea
                id="note"
                name="note"
                rows={3}
                defaultValue={initialData?.note}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground resize-none"
                placeholder="Ghi chú thêm về cơ hội này..."
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end border-t border-border/50 mt-10">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-3 px-8 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isPending ? 'Đang lưu...' : 'Lưu Cơ hội'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
