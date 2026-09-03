import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Factory, LogOut, Clock } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PendingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Check role
  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (roleData && roleData.role !== 'pending') {
    return redirect('/')
  }

  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[100vw] h-[100vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-[100vw] h-[100vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-md w-full bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/50 text-accent mb-6">
          <Clock className="w-8 h-8 animate-pulse" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">Chờ phê duyệt</h1>
        <p className="text-muted-foreground mb-8">
          Tài khoản <strong>{user.email}</strong> của bạn chưa được cấp quyền truy cập. Vui lòng liên hệ với quản trị viên hệ thống (Admin) để được phê duyệt.
        </p>

        <form action={signOut} className="w-full">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 py-3 px-4 rounded-xl font-medium transition-all group"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Đăng xuất
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border/50 w-full flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Factory className="w-4 h-4" />
          <span>Admin Portal System</span>
        </div>
      </div>
    </div>
  )
}
