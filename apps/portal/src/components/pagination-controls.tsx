'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  totalItems: number
}

export function PaginationControls({ currentPage, totalPages, totalItems }: PaginationControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-border/50">
      <div className="text-sm text-muted-foreground">
        Hiển thị tổng cộng <strong>{totalItems}</strong> kết quả
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center justify-center w-9 h-9 rounded-md border border-input bg-background hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-sm font-medium px-2">
          Trang {currentPage} / {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center justify-center w-9 h-9 rounded-md border border-input bg-background hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
