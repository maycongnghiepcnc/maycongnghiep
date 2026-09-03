import Header from '@/components/Header'

export default function CMSLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans animate-pulse w-full">
      <Header />
      
      {/* Skeleton Hero Header */}
      <div className="w-full bg-[#0b1c3e] pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-10 relative z-10">
          <div className="w-48 h-4 bg-blue-900/50 rounded mb-6"></div>
          <div className="w-3/4 max-w-2xl h-12 md:h-16 bg-blue-900/50 rounded-lg"></div>
          <div className="w-24 h-1.5 bg-blue-900/50 rounded-full mt-8"></div>
        </div>
      </div>
      
      {/* Skeleton Main Content */}
      <main className="flex-grow w-full relative z-20 -mt-8 md:-mt-12 mb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-10">
          <div className="bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100">
            
            {/* Skeleton Title */}
            <div className="border-b pb-6 mb-8">
              <div className="w-3/4 h-10 md:h-12 bg-gray-200 rounded-lg"></div>
            </div>
            
            {/* Skeleton Content */}
            <div className="space-y-4">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              
              <div className="py-4">
                <div className="w-1/3 h-6 bg-gray-200 rounded mb-4 mt-6"></div>
                <div className="w-full h-4 bg-gray-200 rounded mb-3"></div>
                <div className="w-4/5 h-4 bg-gray-200 rounded mb-3"></div>
                <div className="w-full h-4 bg-gray-200 rounded"></div>
              </div>
              
              <div className="w-full h-64 bg-gray-200 rounded-xl my-6"></div>
              
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH YUJI VINA (YUJI VINA). Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}
