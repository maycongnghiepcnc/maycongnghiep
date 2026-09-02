import Link from 'next/link'
import { Plus, Phone, Mail, Calendar, StickyNote } from 'lucide-react'
import { getActivities } from '@/app/actions/crm'
import dayjs from 'dayjs'

const typeMap: Record<string, { label: string, icon: any, color: string }> = {
  phone_call: { label: 'Cuộc gọi', icon: Phone, color: 'text-blue-500 bg-blue-500/10' },
  email: { label: 'Email', icon: Mail, color: 'text-purple-500 bg-purple-500/10' },
  meeting: { label: 'Cuộc họp', icon: Calendar, color: 'text-orange-500 bg-orange-500/10' },
  note: { label: 'Ghi chú', icon: StickyNote, color: 'text-zinc-500 bg-zinc-500/10' },
}

export default async function ActivitiesPage() {
  const activities = await getActivities()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Nhật ký Hoạt động</h1>
          <p className="text-muted-foreground text-sm">
            Lịch sử tương tác, chăm sóc khách hàng và các ghi chú.
          </p>
        </div>
        <Link 
          href="/crm/activities/create"
          className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-2.5 px-4 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
        >
          <Plus className="w-5 h-5" />
          Ghi nhận HĐ
        </Link>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-2 sm:p-4">
          {activities.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">
              Chưa có hoạt động nào được ghi nhận.
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => {
                const Icon = typeMap[activity.type || 'note']?.icon || StickyNote
                const color = typeMap[activity.type || 'note']?.color || 'text-zinc-500 bg-zinc-500/10'
                const label = typeMap[activity.type || 'note']?.label || 'Khác'

                return (
                  <div key={activity.id} className="p-4 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/20 transition-all flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{label}</span>
                        <span className="text-xs text-muted-foreground">
                          {dayjs(activity.performed_at).format('DD/MM/YYYY HH:mm')}
                        </span>
                      </div>
                      
                      <div className="text-sm text-foreground break-words">
                        {activity.description}
                      </div>

                      {activity.outcome && (
                        <div className="text-xs mt-2 p-2 rounded-lg bg-accent/5 text-accent-foreground/80 border border-accent/10">
                          <span className="font-semibold">Kết quả:</span> {activity.outcome}
                        </div>
                      )}

                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        {activity.contact?.name && (
                          <span className="flex items-center gap-1">
                            Khách hàng: <span className="font-medium text-foreground">{activity.contact.name}</span>
                          </span>
                        )}
                        {activity.opportunity?.title && (
                          <span className="flex items-center gap-1">
                            Cơ hội: <span className="font-medium text-foreground">{activity.opportunity.title}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
