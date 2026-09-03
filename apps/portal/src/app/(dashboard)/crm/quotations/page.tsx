import Link from 'next/link'
import { Plus, FileText, Calendar, Trash2, Send, FileCheck } from 'lucide-react'
import { getQuotations, deleteQuotation } from '@/app/actions/quotations'

const statusMap: Record<string, { label: string, color: string, icon: any }> = {
  draft: { label: 'Bản nháp', color: 'bg-muted text-muted-foreground border-border', icon: FileText },
  sent: { label: 'Đã gửi', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: Send },
  accepted: { label: 'Đã chốt', color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: FileCheck },
  rejected: { label: 'Từ chối', color: 'bg-red-500/10 text-red-500 border-red-500/20', icon: Trash2 },
}

export default async function QuotationsPage() {
  const quotations = await getQuotations()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Báo Giá</h1>
          <p className="text-muted-foreground text-sm">
            Quản lý danh sách báo giá đã tạo và gửi cho khách hàng.
          </p>
        </div>
        <Link 
          href="/crm/quotations/create"
          className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-2.5 px-4 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
        >
          <Plus className="w-5 h-5" />
          Tạo báo giá mới
        </Link>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-background/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Mã Báo Giá</th>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Tổng tiền</th>
                <th className="px-6 py-4 font-medium">Ngày tạo</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {quotations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Chưa có báo giá nào trong hệ thống.
                  </td>
                </tr>
              ) : (
                quotations.map((quote: any) => {
                  const StatusIcon = statusMap[quote.status || 'draft']?.icon || FileText
                  return (
                    <tr key={quote.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 font-semibold text-foreground">
                        {quote.code}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <div className="font-medium text-foreground">{quote.contact?.name || 'Khách vãng lai'}</div>
                        {quote.contact?.company && <div className="text-xs">{quote.contact.company}</div>}
                      </td>
                      <td className="px-6 py-4 text-accent font-medium">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(quote.total || 0)}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(quote.created_at).toLocaleDateString('vi-VN')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${statusMap[quote.status || 'draft']?.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusMap[quote.status || 'draft']?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/crm/quotations/${quote.id}`}
                            className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                            title="Xem chi tiết & Xuất PDF"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                          </Link>
                          <form action={async () => {
                            'use server'
                            await deleteQuotation(quote.id)
                          }}>
                            <button 
                              type="submit"
                              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                              title="Xóa báo giá"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
