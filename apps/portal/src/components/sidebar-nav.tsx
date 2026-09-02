'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  PackageSearch, 
  Package, 
  Settings,
  LogOut
} from 'lucide-react'

const navItems = [
  {
    title: 'Tổng quan',
    href: '/',
    icon: LayoutDashboard
  },
  {
    title: 'Quản lý danh mục',
    href: '/categories',
    icon: PackageSearch
  },
  {
    title: 'Quản lý sản phẩm',
    href: '/products',
    icon: Package
  },
  {
    title: 'Cài đặt',
    href: '/settings',
    icon: Settings
  }
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 px-4 space-y-1">
      {navItems.map((item) => {
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
    </nav>
  )
}
