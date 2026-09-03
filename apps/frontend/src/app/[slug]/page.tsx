import { notFound } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import Header from '@/components/Header'

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
        <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-12 pt-32">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 border-b pb-6">
              {page.title}
            </h1>
            <div
              className="prose prose-blue max-w-none prose-img:rounded-xl prose-headings:text-gray-800"
              dangerouslySetInnerHTML={{ __html: page.content || '' }}
            />
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
