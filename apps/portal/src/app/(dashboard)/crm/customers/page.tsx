import Link from 'next/link'
import { Building2, Phone, Mail, MoreHorizontal } from 'lucide-react'
import { getCustomers } from '@/app/actions/customers'

export default async function CustomersPage() {
  const { customers = [] } = await getCustomers()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Khách hàng</h1>
          <p className="text-muted-foreground text-sm">
            Danh sách khách hàng chính thức của công ty.
          </p>
        </div>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-background/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Tên Khách hàng</th>
                <th className="px-6 py-4 font-medium">Thông tin liên lạc</th>
                <th className="px-6 py-4 font-medium">Ghi chú</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {!customers || customers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    Chưa có khách hàng nào.
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-foreground">{customer.name}</span>
                        {customer.company && (
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Building2 className="w-3 h-3" /> {customer.company}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground space-y-1">
                      {customer.phone && (
                        <div className="flex items-center gap-2 text-xs">
                          <Phone className="w-3 h-3" /> {customer.phone}
                        </div>
                      )}
                      {customer.email && (
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="w-3 h-3" /> {customer.email}
                        </div>
                      )}
                      {!customer.phone && !customer.email && '—'}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {customer.notes || '—'}
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
