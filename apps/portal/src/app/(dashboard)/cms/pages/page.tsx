import Link from 'next/link'
import { Plus, FileText, Trash2, Check, X, ExternalLink } from 'lucide-react'
import { getPages, deletePage } from '@/app/actions/pages'

export default async function PagesPage() {
  const pages = await getPages()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Trang tĩnh (CMS)</h1>
          <p className="text-muted-foreground text-sm">
            Quản lý nội dung các trang tĩnh như FAQ, Giới thiệu, Liên hệ...
          </p>
        </div>
        <Link 
          href="/cms/pages/create"
          className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-2.5 px-4 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
        >
          <Plus className="w-5 h-5" />
          Thêm trang mới
        </Link>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-background/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Tiêu đề trang</th>
                <th className="px-6 py-4 font-medium">Đường dẫn (Slug)</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {!pages || pages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    Chưa có trang nào.
                  </td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {page.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                      /{page.slug}
                    </td>
                    <td className="px-6 py-4">
                      {page.is_published ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border bg-green-500/10 text-green-500 border-green-500/20">
                          <Check className="w-3 h-3" /> Xuất bản
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border bg-muted text-muted-foreground border-border">
                          <X className="w-3 h-3" /> Bản nháp
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`${(process.env.NEXT_PUBLIC_PUBLIC_SITE_URL || 'http://localhost:4000').replace(/^=+/, '')}/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Xem trên Web"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/cms/pages/edit/${page.id}`}
                          className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                          title="Sửa trang"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                        </Link>
                        <form action={async () => {
                          'use server'
                          await deletePage(page.id)
                        }}>
                          <button 
                            type="submit"
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            title="Xóa trang"
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
