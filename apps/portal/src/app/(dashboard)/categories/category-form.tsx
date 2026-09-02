'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { ImageUpload } from '@/components/image-upload'
import { createCategory, updateCategory } from '@/app/actions/categories'

interface CategoryFormProps {
  initialData?: {
    id: string
    title: string
    summary: string | null
    image_url: string | null
  }
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.image_url ? [initialData.image_url] : [])
  const [error, setError] = useState<string | null>(null)
  
  const isEditing = !!initialData

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append('image_urls', JSON.stringify(imageUrls))
    
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
              defaultValue={initialData?.title}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              placeholder="VD: Máy Phay CNC"
            />
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
