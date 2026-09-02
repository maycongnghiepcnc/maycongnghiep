import Link from 'next/link'
import { Plus, Image as ImageIcon, Trash2 } from 'lucide-react'
import { getCategories, deleteCategory } from '@/app/actions/categories'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Quản lý Danh mục</h1>
          <p className="text-muted-foreground text-sm">
            Tạo và quản lý các danh mục sản phẩm của bạn.
          </p>
        </div>
        <Link 
          href="/categories/create"
          className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-2.5 px-4 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
        >
          <Plus className="w-5 h-5" />
          Thêm danh mục
        </Link>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-background/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Hình ảnh</th>
                <th className="px-6 py-4 font-medium">Tên danh mục</th>
                <th className="px-6 py-4 font-medium">Mô tả</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    Chưa có danh mục nào. Hãy tạo danh mục đầu tiên!
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      {category.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={category.image_url} 
                          alt={category.title} 
                          className="w-12 h-12 rounded-lg object-cover border border-border/50"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-background border border-border/50 flex items-center justify-center text-muted-foreground">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {category.title}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground max-w-md truncate">
                      {category.summary || '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/categories/edit/${category.id}`}
                          className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                          title="Sửa danh mục"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                        </Link>
                        <form action={async () => {
                          'use server'
                          await deleteCategory(category.id)
                        }}>
                          <button 
                            type="submit"
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            title="Xóa danh mục"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
