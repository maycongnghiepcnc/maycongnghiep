'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useState, useEffect } from 'react'
import { Search } from 'lucide-react'

export function ProductSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams)
        if (query) {
          params.set('q', query)
          params.delete('page') // Reset to page 1 on new search
        } else {
          params.delete('q')
        }
        router.replace(`${pathname}?${params.toString()}`)
      })
    }, 500) // 500ms debounce

    return () => clearTimeout(delayDebounceFn)
  }, [query, pathname, router, searchParams])

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
        <Search className={`w-4 h-4 ${isPending ? 'animate-pulse' : ''}`} />
      </div>
      <input
        type="text"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
        placeholder="Tìm kiếm sản phẩm (tên, mã)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
