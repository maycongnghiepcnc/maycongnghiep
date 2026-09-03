import { getUsers } from '@/app/actions/users'
import { InviteForm } from './invite-form'
import { RoleSelect } from './role-select'
import dayjs from 'dayjs'
import { ShieldCheck, User as UserIcon } from 'lucide-react'

export const metadata = {
  title: 'Quản lý người dùng - Admin Portal',
}

export default async function UsersPage() {
  const { users, error } = await getUsers()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Quản lý người dùng</h1>
        <p className="text-muted-foreground mt-2">Mời người dùng mới và phân quyền truy cập hệ thống.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {error ? (
            <div className="p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive/20 text-sm">
              {error}
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border/50">
                      <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Người dùng</th>
                      <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ngày tạo</th>
                      <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Phân quyền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {users?.map((u: any) => (
                      <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                              {u.role === 'admin' ? <ShieldCheck className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{u.full_name || 'Chưa cập nhật'}</div>
                              <div className="text-sm text-muted-foreground">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-foreground">
                            {dayjs(u.created_at).format('DD/MM/YYYY')}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <RoleSelect userId={u.id} initialRole={u.role} />
                        </td>
                      </tr>
                    ))}
                    {!users?.length && (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                          Không có người dùng nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div>
          <InviteForm />
        </div>
      </div>
    </div>
  )
}
