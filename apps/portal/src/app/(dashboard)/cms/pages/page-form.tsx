'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { RichTextEditor } from '@/components/rich-text-editor'
import { createPage, updatePage } from '@/app/actions/pages'

interface PageFormProps {
  initialData?: any
}

export function PageForm({ initialData }: PageFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [content, setContent] = useState(initialData?.content || '')
  const [error, setError] = useState<string | null>(null)
  
  const isEditing = !!initialData

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append('content', content)
    
    try {
      const res = isEditing 
        ? await updatePage(initialData.id, formData)
        : await createPage(formData)
        
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
          href="/cms/pages"
          className="p-2 bg-card border border-border/50 rounded-xl hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all text-muted-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isEditing ? 'Sửa Trang Tĩnh' : 'Thêm Trang Tĩnh'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isEditing ? 'Cập nhật nội dung cho trang.' : 'Tạo một trang nội dung mới (FAQ, Giới thiệu...).'}
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
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-foreground">
                Tiêu đề trang <span className="text-destructive">*</span>
              </label>
              <input
                id="title"
                name="title"
                required
                defaultValue={initialData?.title}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                placeholder="VD: Câu hỏi thường gặp"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium text-foreground">
                Đường dẫn (Slug) <span className="text-destructive">*</span>
              </label>
              <input
                id="slug"
                name="slug"
                required
                defaultValue={initialData?.slug}
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground font-mono"
                placeholder="VD: faq, gioi-thieu"
              />
            </div>
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-3 p-4 border border-border/50 rounded-xl bg-background/30">
            <input 
              type="checkbox"
              id="is_published"
              name="is_published"
              defaultChecked={initialData?.is_published}
              className="w-5 h-5 rounded border-border/50 text-accent focus:ring-accent accent-accent"
            />
            <div className="space-y-0.5">
              <label htmlFor="is_published" className="text-sm font-medium text-foreground cursor-pointer">
                Xuất bản (Hiển thị công khai)
              </label>
              <p className="text-xs text-muted-foreground">
                Bỏ chọn nếu bạn muốn lưu dưới dạng bản nháp.
              </p>
            </div>
          </div>

          {/* Content (TipTap) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Nội dung chi tiết
            </label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          <div className="pt-6 flex justify-end border-t border-border/50 mt-10">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-3 px-8 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isPending ? 'Đang lưu...' : 'Lưu Trang'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
