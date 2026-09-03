'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Check } from 'lucide-react'
import { ImageUpload } from '@/components/image-upload'
import { RichTextEditor } from '@/components/rich-text-editor'
import { createProduct, updateProduct } from '@/app/actions/products'
import { slugify } from '@/utils/slugify'

interface ProductFormProps {
  categories: any[]
  initialData?: any
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images || [])
  const [content, setContent] = useState(initialData?.content || '')
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    initialData?.product_categories?.map((pc: any) => pc.category_id) || []
  )
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState(initialData?.title || '')
  
  const isEditing = !!initialData

  const displaySlug = isEditing && initialData?.slug && initialData.title === title 
    ? initialData.slug 
    : slugify(title)

  const toggleCategory = (id: string) => {
    setSelectedCategoryIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append('image_urls', JSON.stringify(imageUrls))
    formData.append('content', content)
    formData.append('category_ids', JSON.stringify(selectedCategoryIds))
    
    try {
      const res = isEditing 
        ? await updateProduct(initialData.id, formData)
        : await createProduct(formData)
        
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/products"
          className="p-2 bg-card border border-border/50 rounded-xl hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all text-muted-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isEditing ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isEditing ? 'Cập nhật thông tin chi tiết của sản phẩm.' : 'Đăng sản phẩm mới lên hệ thống.'}
          </p>
        </div>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg p-6 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="title" className="text-sm font-medium text-foreground">
                Tên sản phẩm <span className="text-destructive">*</span>
              </label>
              <input
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="VD: Máy Tiện CNC Đa Trục"
              />
              <div className="text-xs text-muted-foreground mt-1.5 flex items-center">
                <span>Đường dẫn (Slug): </span>
                <span className="ml-1 px-2 py-0.5 bg-accent/10 text-accent rounded font-mono truncate">
                  {displaySlug || 'se-tu-dong-tao'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium text-foreground">
                Giá tham khảo (VNĐ)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                defaultValue={initialData?.price}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="VD: 150000000"
              />
            </div>
            
            {/* Product Code */}
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-medium text-foreground">
                Mã sản phẩm (SKU)
              </label>
              <input
                id="code"
                name="code"
                defaultValue={initialData?.code}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="VD: CNC-M500"
              />
            </div>

            {/* Serial Number */}
            <div className="space-y-2">
              <label htmlFor="serial_number" className="text-sm font-medium text-foreground">
                Serial Number
              </label>
              <input
                id="serial_number"
                name="serial_number"
                defaultValue={initialData?.serial_number}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="Nhập số Serial..."
              />
            </div>

            {/* Video URL */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="video_url" className="text-sm font-medium text-foreground">
                Link Video (Youtube/Vimeo)
              </label>
              <input
                id="video_url"
                name="video_url"
                type="url"
                defaultValue={initialData?.video_url}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 p-4 border border-border/50 rounded-xl bg-background/30">
            <input 
              type="checkbox"
              id="is_featured"
              name="is_featured"
              defaultChecked={initialData?.is_featured}
              className="w-5 h-5 rounded border-border/50 text-accent focus:ring-accent accent-accent"
            />
            <div className="space-y-0.5">
              <label htmlFor="is_featured" className="text-sm font-medium text-foreground cursor-pointer">
                Sản phẩm nổi bật (Hiển thị trang chủ)
              </label>
              <p className="text-xs text-muted-foreground">
                Đánh dấu nếu bạn muốn hiển thị sản phẩm này trên trang chủ.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Chọn danh mục
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium border flex items-center gap-2 transition-all
                    ${selectedCategoryIds.includes(cat.id) 
                      ? 'border-accent bg-accent/10 text-accent' 
                      : 'border-border/50 bg-background/50 text-muted-foreground hover:border-accent/50 hover:text-foreground'
                    }
                  `}
                >
                  {selectedCategoryIds.includes(cat.id) && <Check className="w-4 h-4" />}
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium text-foreground">
              Tags (phân cách bằng dấu phẩy)
            </label>
            <input
              id="tags"
              name="tags"
              defaultValue={initialData?.tags?.join(', ')}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
              placeholder="VD: máy phay, cnc, công nghiệp..."
            />
          </div>

          {/* Sort Order */}
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

          {/* Summary */}
          <div className="space-y-2">
            <label htmlFor="summary" className="text-sm font-medium text-foreground">
              Mô tả ngắn
            </label>
            <textarea
              id="summary"
              name="summary"
              rows={3}
              defaultValue={initialData?.summary}
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground resize-none"
              placeholder="Tóm tắt tính năng nổi bật..."
            />
          </div>

          {/* Content (TipTap) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Bài viết chi tiết (Thông số kỹ thuật, ứng dụng)
            </label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
          
          {/* SEO Info */}
          <div className="space-y-4 pt-6 border-t border-border/50">
            <h3 className="text-lg font-semibold text-foreground">Thông tin SEO</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label htmlFor="meta_title" className="text-sm font-medium text-foreground">
                  Meta Title (Tiêu đề SEO)
                </label>
                <input
                  id="meta_title"
                  name="meta_title"
                  defaultValue={initialData?.meta_title}
                  className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                  placeholder="Tiêu đề hiển thị trên kết quả tìm kiếm Google"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="meta_description" className="text-sm font-medium text-foreground">
                  Meta Description (Mô tả SEO)
                </label>
                <textarea
                  id="meta_description"
                  name="meta_description"
                  rows={2}
                  defaultValue={initialData?.meta_description}
                  className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground resize-none"
                  placeholder="Mô tả ngắn hiển thị trên kết quả tìm kiếm Google"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Hình ảnh sản phẩm (Hỗ trợ upload nhiều ảnh)
            </label>
            <ImageUpload 
              value={imageUrls}
              onChange={setImageUrls}
            />
          </div>

          <div className="pt-6 flex justify-end border-t border-border/50 mt-10">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-3 px-8 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isPending ? 'Đang lưu...' : 'Xuất bản Sản Phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
