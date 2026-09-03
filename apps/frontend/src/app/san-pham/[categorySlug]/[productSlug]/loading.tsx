import Header from '@/components/Header'
import { ChevronRight } from 'lucide-react'

export default function ProductLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans w-full animate-pulse">
      <Header />
      
      {/* Skeleton Breadcrumb Header */}
      <div className="bg-[#0b1c3e] py-10 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="flex flex-wrap items-center text-sm opacity-50">
            <span className="w-16 h-4 bg-gray-600 rounded"></span>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <span className="w-20 h-4 bg-gray-600 rounded"></span>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <span className="w-32 h-4 bg-gray-600 rounded"></span>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <span className="w-48 h-4 bg-gray-600 rounded"></span>
          </div>
        </div>
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-10 py-12">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-10">
          
          {/* Skeleton Product Images Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/3] bg-gray-200 rounded-xl"></div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="aspect-[4/3] bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Skeleton Product Details Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="w-3/4 h-10 bg-gray-200 rounded mb-4"></div>
            
            <div className="flex gap-4 mb-6">
              <div className="w-32 h-8 bg-gray-200 rounded"></div>
              <div className="w-24 h-8 bg-gray-100 rounded"></div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="w-full h-4 bg-gray-100 rounded"></div>
              <div className="w-full h-4 bg-gray-100 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-100 rounded"></div>
              <div className="w-4/5 h-4 bg-gray-100 rounded"></div>
            </div>

            <div className="mt-auto border-t border-gray-100 pt-6">
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="w-20 h-4 bg-gray-100 rounded"></div>
                <div className="col-span-2 w-32 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="w-12 h-4 bg-gray-100 rounded"></div>
                <div className="col-span-2 flex gap-2">
                  <div className="w-16 h-6 bg-gray-100 rounded"></div>
                  <div className="w-20 h-6 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="w-full h-12 bg-orange-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Extended Description */}
        <div className="mt-12 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-40 h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="w-full h-4 bg-gray-100 rounded"></div>
            <div className="w-full h-4 bg-gray-100 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-100 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-100 rounded"></div>
            <div className="w-full h-40 bg-gray-100 rounded-xl mt-6"></div>
          </div>
        </div>
      </main>
      
      <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH Máy Công Nghiệp CNC (MAYMOC PRO). Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}
