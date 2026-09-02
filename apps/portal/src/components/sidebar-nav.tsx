'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  PackageSearch, 
  Package, 
  Settings,
  LogOut,
  Users,
  Target,
  Activity
} from 'lucide-react'

const navGroups = [
  {
    title: 'Hệ thống',
    items: [
      { title: 'Tổng quan', href: '/', icon: LayoutDashboard },
      { title: 'Người dùng', href: '/users', icon: Users }
    ]
  },
  {
    title: 'Catalog',
    items: [
      { title: 'Danh mục', href: '/categories', icon: PackageSearch },
      { title: 'Sản phẩm', href: '/products', icon: Package }
    ]
  },
  {
    title: 'CRM',
    items: [
      { title: 'Liên hệ', href: '/crm/contacts', icon: Users },
      { title: 'Cơ hội', href: '/crm/opportunities', icon: Target },
      { title: 'Hoạt động', href: '/crm/activities', icon: Activity }
    ]
  },
  {
    title: 'Cấu hình',
    items: [
      { title: 'Cài đặt', href: '/settings', icon: Settings }
    ]
  }
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 px-4 space-y-6">
      {navGroups.map((group, index) => (
        <div key={index} className="space-y-1">
          {group.title && (
            <h4 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.title}
            </h4>
          )}
          {group.items.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-accent text-accent-foreground font-semibold shadow-md shadow-accent/20' 
                    : 'text-muted-foreground hover:bg-card-foreground/5 hover:text-foreground'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-foreground transition-colors'}`} />
                {item.title}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
