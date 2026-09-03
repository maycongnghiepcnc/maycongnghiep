'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { ImageUpload } from '@/components/image-upload'
import { createCategory, updateCategory } from '@/app/actions/categories'
import { slugify } from '@/utils/slugify'

interface CategoryFormProps {
  initialData?: {
    id: string
    title: string
    summary: string | null
    image_url: string | null
    hero_banner?: string | null
    sort_order?: number
    slug?: string
    is_featured_home?: boolean
  }
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.image_url ? [initialData.image_url] : [])
  const [heroBannerUrls, setHeroBannerUrls] = useState<string[]>(initialData?.hero_banner ? [initialData.hero_banner] : [])
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState(initialData?.title || '')
  
  const isEditing = !!initialData
  
  const displaySlug = isEditing && initialData?.slug && initialData.title === title 
    ? initialData.slug 
    : slugify(title)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append('image_urls', JSON.stringify(imageUrls))
    formData.append('hero_banner_urls', JSON.stringify(heroBannerUrls))
    
    try {
      const res = isEditing 
        ? await updateCategory(initialData.id, formData)
        : await createCategory(formData)
        
      if (res?.error) {
        setError(res.error)
        setIsPending(false)
      }
    } catch (err) {
      console.error(err)
      setError('Đã xảy ra lỗi không xác định')
      setIsPending(false)
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/categories"
          className="p-2 bg-card border border-border/50 rounded-xl hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all text-muted-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isEditing ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isEditing ? 'Cập nhật thông tin danh mục hiện tại.' : 'Nhập thông tin chi tiết cho danh mục sản phẩm mới.'}
          </p>
        </div>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg p-6 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Tên danh mục <span className="text-destructive">*</span>
            </label>
            <input
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              placeholder="VD: Máy Phay CNC"
            />
            <div className="text-xs text-muted-foreground mt-1.5 flex items-center">
              <span>Đường dẫn (Slug): </span>
              <span className="ml-1 px-2 py-0.5 bg-accent/10 text-accent rounded font-mono truncate">
                {displaySlug || 'se-tu-dong-tao'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="summary" className="text-sm font-medium text-foreground">
              Mô tả ngắn
            </label>
            <textarea
              id="summary"
              name="summary"
              rows={3}
              defaultValue={initialData?.summary || ''}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground resize-none"
              placeholder="Nhập mô tả ngắn gọn về danh mục này..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Hình ảnh đại diện
            </label>
            <ImageUpload 
              value={imageUrls}
              onChange={(urls) => setImageUrls(urls.slice(0, 1))} // Only allow 1 image for category
            />
            <p className="text-xs text-muted-foreground mt-2">
              Chỉ được phép tải lên 1 hình ảnh làm đại diện cho danh mục.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Hero Banner (Hình nền lớn trên cùng)
            </label>
            <ImageUpload 
              value={heroBannerUrls}
              onChange={(urls) => setHeroBannerUrls(urls.slice(0, 1))} // Only allow 1 image for hero banner
            />
            <p className="text-xs text-muted-foreground mt-2">
              Hình ảnh sẽ hiển thị tràn viền ở phía trên cùng trang danh mục.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="sort_order" className="text-sm font-medium text-foreground">
              Thứ tự hiển thị
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={initialData?.sort_order ?? 0}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              placeholder="0"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Số nhỏ hơn sẽ hiển thị trước. Mặc định là 0.
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-background border border-border/50 rounded-xl">
            <input
              type="checkbox"
              id="is_featured_home"
              name="is_featured_home"
              defaultChecked={initialData?.is_featured_home ?? false}
              className="w-5 h-5 rounded border-border text-accent focus:ring-accent"
              value="true"
            />
            <div>
              <label htmlFor="is_featured_home" className="text-sm font-medium text-foreground cursor-pointer">
                Hiển thị trên Trang chủ
              </label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Bật tùy chọn này để danh mục nổi bật ngay dưới Hero Banner trang chủ.
              </p>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-3 px-6 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isPending ? 'Đang lưu...' : 'Lưu Danh Mục'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
