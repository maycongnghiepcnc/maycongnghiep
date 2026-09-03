import React from 'react';
import Header from '@/components/Header';
import { getAllProducts, getCategories } from '@/app/actions/products';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts()
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header />
      
      {/* Page Header */}
      <div className="bg-[#0b1c3e] text-white py-12 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition">Trang chủ</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white">Sản phẩm</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Tất cả Sản phẩm</h1>
          <p className="mt-4 text-gray-300 max-w-2xl">
            Khám phá danh mục máy móc và thiết bị công nghiệp đa dạng, chất lượng cao từ YUJI VINA.
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
                  className="block py-2 text-orange-500 font-medium"
                >
                  Tất cả sản phẩm
                </Link>
              </li>
              {categories.map((cat: any) => (
                <li key={cat.id}>
                  <Link 
                    href={`/san-pham/${cat.slug}`} 
                    className="block py-2 text-gray-600 hover:text-orange-500 transition"
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
          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              Chưa có sản phẩm nào.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => {
                // Determine the primary category slug for the link
                const primaryCategory = product.product_categories?.[0]?.categories;
                const categorySlug = primaryCategory?.slug || 'uncategorized';
                
                return (
                  <Link 
                    key={product.id} 
                    href={`/san-pham/${categorySlug}/${product.slug}`}
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
                        {primaryCategory?.title || 'Chưa phân loại'}
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
                );
              })}
            </div>
          )}
        </main>
      </div>

      <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH Máy Công Nghiệp CNC (YUJI VINA). Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  );
}
