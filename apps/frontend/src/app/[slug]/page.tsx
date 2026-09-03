import { notFound } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import Header from '@/components/Header'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const revalidate = 60

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  // Try CMS page
  const { data: page } = await supabase
    .from('cms_pages')
    .select('title')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (page) {
    return { title: `${page.title} - Công ty TNHH YUJI VINA` }
  }

  return { title: 'Trang không tồn tại' }
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params

  // Try fetching CMS page
  const { data: page } = await supabase
    .from('cms_pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (page) {
    // Render CMS Page
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans w-full">
        <Header />
        
        {/* Page Hero Header */}
        <div className="w-full bg-[#0b1c3e] pt-32 pb-16 md:pb-24 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-10 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-blue-200/60 mb-6 font-medium tracking-wide">
              <Link href="/" className="hover:text-yellow-500 transition-colors">Trang chủ</Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-white">{page.title}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
              {page.title}
            </h1>
            
            <div className="w-24 h-1.5 bg-yellow-500 rounded-full mt-8"></div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-grow w-full relative z-20 -mt-8 md:-mt-12 mb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-10">
            <div className="bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100">
              <div
                className="prose prose-lg prose-blue max-w-none prose-img:rounded-2xl prose-img:shadow-md prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: page.content || '' }}
              />
            </div>
          </div>
        </main>

        <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs mt-auto">
          <p>&copy; {new Date().getFullYear()} Công ty TNHH YUJI VINA (YUJI VINA). Tất cả các quyền được bảo lưu.</p>
        </footer>
      </div>
    )
  }

  notFound()
}
