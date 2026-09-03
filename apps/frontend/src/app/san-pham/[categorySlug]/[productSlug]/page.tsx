import { notFound } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import Header from '@/components/Header'
import ProductGallery from '@/components/ProductGallery'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const revalidate = 60

interface PageProps {
  params: Promise<{
    categorySlug: string
    productSlug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { productSlug } = await params

  const { data: product } = await supabase
    .from('products')
    .select('title, meta_title, meta_description')
    .eq('slug', productSlug)
    .single()

  if (product) {
    return {
      title: product.meta_title || `${product.title} - Công ty TNHH YUJI VINA`,
      description: product.meta_description || undefined
    }
  }

  return { title: 'Sản phẩm không tồn tại' }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { categorySlug, productSlug } = await params

  // Fetch product by slug and include its category details
  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      product_categories (
        categories (
          id,
          title,
          slug
        )
      )
    `)
    .eq('slug', productSlug)
    .single()

  if (!product) {
    notFound()
  }

  // Get the category to display in breadcrumb
  // We try to match with the categorySlug from URL, or fallback to the first category
  const categoriesList = product.product_categories?.map((pc: any) => pc.categories).filter(Boolean) || []
  let category = categoriesList.find((c: any) => c.slug === categorySlug)
  if (!category && categoriesList.length > 0) {
    category = categoriesList[0]
  }

  // Fetch similar products from the same category
  let similarProducts: any[] = []
  if (category) {
    const { data } = await supabase
      .from('products')
      .select(`
        *,
        product_categories!inner (
          category_id
        )
      `)
      .eq('product_categories.category_id', category.id)
      .neq('id', product.id)
      .limit(4)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (data) {
      similarProducts = data
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans w-full">
      <Header />

      {/* Breadcrumb Header */}
      <div className="bg-[#0b1c3e] text-white py-10 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="flex flex-wrap items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">Trang chủ</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link href="/san-pham" className="hover:text-white transition">Sản phẩm</Link>

            {category && (
              <>
                <ChevronRight size={16} className="mx-2" />
                <Link href={`/san-pham/${category.slug}`} className="hover:text-white transition">
                  {category.title}
                </Link>
              </>
            )}

            <ChevronRight size={16} className="mx-2 shrink-0" />
            <span className="text-white truncate">{product.title}</span>
          </div>
        </div>
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-10 py-12">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-10">

          {/* Product Images Gallery (Lightbox & Slideshow) */}
          <ProductGallery
            images={product.images || []}
            title={product.title}
            isFeatured={product.is_featured}
          />

          {/* Product Details Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {product.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {product.price && (
                <div className="text-2xl font-bold text-orange-500">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </div>
              )}
              {product.code && (
                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm font-medium">
                  Mã SP: {product.code}
                </div>
              )}
            </div>

            <div className="prose prose-blue mb-8 text-gray-600">
              <p>{product.summary}</p>
            </div>

            {/* Additional Details */}
            {(product.serial_number || product.tags) && (
              <div className="mt-auto border-t border-gray-100 pt-6">
                <dl className="space-y-3 text-sm">
                  {product.serial_number && (
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-500 font-medium">Serial Number:</dt>
                      <dd className="col-span-2 text-gray-900">{product.serial_number}</dd>
                    </div>
                  )}
                  {product.tags && product.tags.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-500 font-medium">Tags:</dt>
                      <dd className="col-span-2 text-gray-900 flex flex-wrap gap-2">
                        {product.tags.map((tag: string, idx: number) => (
                          <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <Link
                href={`/lien-he?product=${encodeURIComponent(product.title)}${product.code ? encodeURIComponent(` - ${product.code}`) : ''}`}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors shadow-sm"
              >
                Nhận báo giá
              </Link>
            </div>
          </div>
        </div>

        {/* Extended Description Content */}
        {product.content && (
          <div className="mt-12 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">
              Mô tả chi tiết
            </h2>
            <div
              className="prose prose-blue max-w-none prose-img:rounded-xl prose-headings:text-gray-800"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        )}

        {/* Video Section */}
        {product.video_url && (
          <div className="mt-12 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">
              Video sản phẩm
            </h2>
            <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <iframe
                src={product.video_url}
                className="w-full h-full"
                title="Product Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-12 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">
              Sản phẩm tương tự
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((simProduct: any) => (
                <Link
                  key={simProduct.id}
                  href={`/san-pham/${category.slug}/${simProduct.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                    {simProduct.images && simProduct.images.length > 0 ? (
                      <img
                        src={simProduct.images[0]}
                        alt={simProduct.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Không có ảnh
                      </div>
                    )}

                    {/* Price Badge */}
                    {simProduct.price && (
                      <div className="absolute top-3 right-3 bg-orange-500 text-white font-bold px-2 py-1 rounded-lg text-xs shadow-lg">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(simProduct.price)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {simProduct.title}
                    </h3>
                    {simProduct.code && (
                      <p className="text-xs text-gray-500 mb-2">Mã SP: {simProduct.code}</p>
                    )}
                    <div className="text-blue-600 font-semibold text-xs flex items-center mt-auto">
                      Xem chi tiết <ChevronRight size={14} className="ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH YUJI VINA (YUJI VINA). Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}
