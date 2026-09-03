import { notFound } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import Header from '@/components/Header'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const revalidate = 60

interface PageProps {
  params: Promise<{
    categorySlug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug } = await params

  const { data: category } = await supabase
    .from('categories')
    .select('title')
    .eq('slug', categorySlug)
    .single()

  if (category) {
    return { title: `${category.title} - Công ty TNHH YUJI VINA` }
  }

  return { title: 'Danh mục không tồn tại' }
}

export default async function CategoryPage({ params }: PageProps) {
  const { categorySlug } = await params

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single()

  if (!category) {
    notFound()
  }

  // Fetch all categories for sidebar
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  // Fetch products in this category
  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      product_categories!inner (
        category_id
      )
    `)
    .eq('product_categories.category_id', category.id)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header />

      {/* Page Header */}
      <div
        className="bg-[#0b1c3e] text-white py-12 pt-32 relative bg-cover bg-center"
        style={category.hero_banner ? { backgroundImage: `url(${category.hero_banner})` } : {}}
      >
        {category.hero_banner && <div className="absolute inset-0 bg-[#0b1c3e]/80"></div>}
        <div className="max-w-7xl mx-auto px-4 sm:px-10 relative z-10">
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition">Trang chủ</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link href="/san-pham" className="hover:text-white transition">Sản phẩm</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white">{category.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{category.title}</h1>
          <p className="mt-4 text-gray-300 max-w-2xl">
            {category.summary || `Khám phá các sản phẩm thuộc danh mục ${category.title} từ YUJI VINA.`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-12 flex flex-col md:flex-row gap-8 w-full">
        {/* Sidebar / Categories */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="font-bold text-lg text-[#0b1c3e] mb-4 pb-2 border-b border-gray-100">
              Danh mục sản phẩm
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/san-pham"
                  className="block py-2 text-gray-600 hover:text-orange-500 transition"
                >
                  Tất cả sản phẩm
                </Link>
              </li>
              {categories?.map((cat: any) => (
                <li key={cat.id}>
                  <Link
                    href={`/san-pham/${cat.slug}`}
                    className={`block py-2 transition ${cat.id === category.id ? 'text-orange-500 font-medium' : 'text-gray-600 hover:text-orange-500'}`}
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {!products || products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              Chưa có sản phẩm nào trong danh mục này.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <Link
                  key={product.id}
                  href={`/san-pham/${category.slug}/${product.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Không có ảnh
                      </div>
                    )}

                    {/* Price Badge */}
                    {product.price && (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white font-bold px-3 py-1.5 rounded-lg text-sm shadow-lg">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
                      {category.title}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                      {product.summary}
                    </p>
                    <div className="text-blue-600 font-semibold text-sm flex items-center mt-auto">
                      Xem chi tiết <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>

      <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH YUJI VINA (YUJI VINA). Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}
