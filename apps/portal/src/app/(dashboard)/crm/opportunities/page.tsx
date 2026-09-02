import Link from 'next/link'
import { Plus, Target, Trash2 } from 'lucide-react'
import { getOpportunities, deleteOpportunity } from '@/app/actions/crm'

const stageMap: Record<string, { label: string, color: string }> = {
  lead: { label: 'Tiềm năng', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  proposal: { label: 'Báo giá', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  negotiation: { label: 'Thương lượng', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  won: { label: 'Thành công', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  lost: { label: 'Thất bại', color: 'bg-muted text-muted-foreground border-border' },
}

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Cơ hội (Deals)</h1>
          <p className="text-muted-foreground text-sm">
            Quản lý phễu bán hàng và các giao dịch đang diễn ra.
          </p>
        </div>
        <Link 
          href="/crm/opportunities/create"
          className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-2.5 px-4 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
        >
          <Plus className="w-5 h-5" />
          Tạo Cơ hội mới
        </Link>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-background/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Tên Cơ hội</th>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Doanh thu dự kiến</th>
                <th className="px-6 py-4 font-medium">Giai đoạn</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Chưa có cơ hội nào. Hãy tạo mới để bắt đầu!
                  </td>
                </tr>
              ) : (
                opportunities.map((opp) => (
                  <tr key={opp.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        {opp.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-foreground">{opp.contact?.name || '—'}</span>
                        {opp.contact?.company && <span className="text-xs">{opp.contact.company}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-accent font-medium">
                      {opp.expected_revenue 
                        ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(opp.expected_revenue) 
                        : '—'}
                      {opp.probability > 0 && <span className="ml-2 text-xs text-muted-foreground font-normal">({opp.probability}%)</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${stageMap[opp.stage || 'lead']?.color}`}>
                        {stageMap[opp.stage || 'lead']?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/crm/opportunities/edit/${opp.id}`}
                          className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                          title="Sửa cơ hội"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                        </Link>
                        <form action={async () => {
                          'use server'
                          await deleteOpportunity(opp.id)
                        }}>
                          <button 
                            type="submit"
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            title="Xóa cơ hội"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
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
