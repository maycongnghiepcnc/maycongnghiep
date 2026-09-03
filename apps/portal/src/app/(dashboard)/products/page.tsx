import Link from 'next/link'
import { Plus, Image as ImageIcon, Trash2, Star } from 'lucide-react'
import { getProducts, deleteProduct } from '@/app/actions/products'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Quản lý Sản phẩm</h1>
          <p className="text-muted-foreground text-sm">
            Thêm, sửa, xóa và quản lý các sản phẩm trong hệ thống.
          </p>
        </div>
        <Link 
          href="/products/create"
          className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-2.5 px-4 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
        >
          <Plus className="w-5 h-5" />
          Thêm sản phẩm
        </Link>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-background/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Hình ảnh</th>
                <th className="px-6 py-4 font-medium">Tên sản phẩm</th>
                <th className="px-6 py-4 font-medium">Danh mục</th>
                <th className="px-6 py-4 font-medium">Giá</th>
                <th className="px-6 py-4 font-medium text-center">Thứ tự</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const firstImage = product.images?.[0]
                  const cats = product.product_categories?.map((pc: any) => pc.categories?.title).filter(Boolean) || []

                  return (
                    <tr key={product.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        {firstImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={firstImage} 
                            alt={product.title} 
                            className="w-12 h-12 rounded-lg object-cover border border-border/50"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-background border border-border/50 flex items-center justify-center text-muted-foreground">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          {product.title}
                          {product.is_featured && (
                            <span title="Sản phẩm nổi bật">
                              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {cats.length > 0 ? cats.join(', ') : '—'}
                      </td>
                      <td className="px-6 py-4 text-accent font-medium">
                        {product.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price) : 'Liên hệ'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border/50">
                          {product.sort_order ?? 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/edit/${product.id}`}
                            className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                            title="Sửa sản phẩm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                          </Link>
                          <form action={async () => {
                            'use server'
                            await deleteProduct(product.id)
                          }}>
                            <button 
                              type="submit"
                              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
