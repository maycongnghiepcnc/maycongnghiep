import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { SidebarNav } from '@/components/sidebar-nav'
import { Factory } from 'lucide-react'
import { Notifications } from '@/components/notifications'
import { UserProfile } from '@/components/user-profile'
import { getSetting } from '@/app/actions/settings'
import Image from 'next/image'

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

  if (!roleData || roleData.role === 'pending') {
    return redirect('/pending')
  }

  const cookieStore = await cookies()
  const activeTenancy = cookieStore.get('active_tenancy')?.value

  if (!activeTenancy) {
    return redirect('/select-tenancy')
  }

  const [siteName, siteLogo] = await Promise.all([
    getSetting('site_name'),
    getSetting('site_logo')
  ])

  const displayName = siteName || 'Admin Portal'

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-card border-r border-border/50 shadow-xl z-20">
        {/* Brand Area */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-border/50">
          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/20 text-accent overflow-hidden relative">
            {siteLogo ? (
              <Image src={siteLogo} alt={displayName} fill className="object-contain p-1" />
            ) : (
              <Factory className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          <SidebarNav />
        </div>

        {/* User & Sign Out Footer */}
        <UserProfile email={user.email || ''} />
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
