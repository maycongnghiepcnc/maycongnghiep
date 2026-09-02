import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SidebarNav } from '@/components/sidebar-nav'
import { Factory, LogOut } from 'lucide-react'
import { Notifications } from '@/components/notifications'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch role
  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  console.log('--- ROLE CHECK ---', { userId: user.id, roleData, roleError })

  if (!roleData || roleData.role === 'pending') {
    return redirect('/pending')
  }

  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-card border-r border-border/50 shadow-xl z-20">
        {/* Brand Area */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-border/50">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 text-accent">
            <Factory className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">CNC Portal</span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          <SidebarNav />
        </div>

        {/* User & Sign Out Footer */}
        <div className="p-4 border-t border-border/50 bg-background/50">
          <div className="flex flex-col gap-3">
            <div className="px-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Tài khoản</p>
              <p className="text-sm text-foreground font-medium truncate">{user.email}</p>
            </div>
            
            <form action={signOut}>
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
        {/* Subtle Decorative Background Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none z-0"></div>
        
        {/* Top Header */}
        <div className="h-16 flex items-center justify-end px-8 z-20 border-b border-border/50 bg-background/50 backdrop-blur-md">
          <Notifications />
        </div>

        <div className="flex-1 overflow-y-auto z-10 p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
