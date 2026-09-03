import Header from '@/components/Header'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function CategoryLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans animate-pulse">
      <Header />

      {/* Skeleton Page Header */}
      <div className="bg-[#0b1c3e] py-12 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="flex items-center text-sm text-gray-400 mb-4 opacity-50">
            <span className="w-16 h-4 bg-gray-600 rounded"></span>
            <ChevronRight size={16} className="mx-2" />
            <span className="w-20 h-4 bg-gray-600 rounded"></span>
            <ChevronRight size={16} className="mx-2" />
            <span className="w-32 h-4 bg-gray-600 rounded"></span>
          </div>
          <div className="w-64 h-12 bg-gray-600 rounded mb-4 opacity-50"></div>
          <div className="w-96 max-w-full h-4 bg-gray-600 rounded opacity-50"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-12 flex flex-col md:flex-row gap-8 w-full">
        {/* Skeleton Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-32 h-6 bg-gray-200 rounded mb-6"></div>
            <ul className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <li key={i}>
                  <div className="w-full h-4 bg-gray-100 rounded"></div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Skeleton Product Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="aspect-[4/3] bg-gray-200"></div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="w-20 h-3 bg-gray-100 rounded mb-3"></div>
                  <div className="w-full h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="w-3/4 h-5 bg-gray-200 rounded mb-4"></div>
                  <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
                  <div className="w-5/6 h-3 bg-gray-100 rounded mb-4"></div>
                  <div className="mt-auto w-24 h-4 bg-blue-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH YUJI VINA (YUJI VINA). Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}
