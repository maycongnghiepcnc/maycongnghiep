import Link from 'next/link'
import { ShoppingBag, Target, Calendar, MoreHorizontal } from 'lucide-react'
import { getSales } from '@/app/actions/sales'

const statusMap: Record<string, { label: string, color: string }> = {
  pending: { label: 'Đang xử lý', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  completed: { label: 'Hoàn thành', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
}

export default async function SalesPage() {
  const { sales = [] } = await getSales()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Đơn hàng / Bán hàng</h1>
          <p className="text-muted-foreground text-sm">
            Quản lý các đơn hàng đã chốt từ khách hàng.
          </p>
        </div>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-background/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Chi tiết Đơn hàng</th>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Giá trị</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {!sales || sales.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Chưa có đơn hàng nào.
                  </td>
                </tr>
              ) : (
                sales.map((sale) => (
                  <tr key={sale.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2 font-medium text-foreground">
                          <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                          {sale.title}
                        </span>
                        {sale.sale_date && (
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-normal">
                            <Calendar className="w-3 h-3" /> 
                            {new Date(sale.sale_date).toLocaleDateString('vi-VN')}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-foreground">{sale.crm_customers?.name || 'Khách vãng lai'}</span>
                        {sale.crm_customers?.company && <span className="text-xs">{sale.crm_customers.company}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-accent font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sale.amount || 0)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusMap[sale.status || 'pending']?.color}`}>
                        {statusMap[sale.status || 'pending']?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
