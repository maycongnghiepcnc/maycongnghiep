'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createQuotation, updateQuotation } from '@/app/actions/quotations'
import { Plus, Trash2, CheckCircle2, Save, X, Search } from 'lucide-react'

export default function QuotationForm({
  contacts,
  opportunities,
  products,
  initialContactId,
  initialOpportunityId,
  initialData // For editing
}: {
  contacts: any[]
  opportunities: any[]
  products: any[]
  initialContactId?: string
  initialOpportunityId?: string
  initialData?: any
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Form State
  const [contactId, setContactId] = useState(initialData?.contact_id || initialContactId || '')
  const [opportunityId, setOpportunityId] = useState(initialData?.opportunity_id || initialOpportunityId || '')
  const [notes, setNotes] = useState(initialData?.notes || '')
  const [validUntil, setValidUntil] = useState(initialData?.valid_until ? new Date(initialData.valid_until).toISOString().split('T')[0] : '')
  const [overallDiscount, setOverallDiscount] = useState(initialData?.discount || 0)

  // Items State
  const [items, setItems] = useState<any[]>(
    initialData?.items?.map((i: any) => ({
      product_id: i.product?.id || i.product_id,
      product_name: i.product?.title || 'Sản phẩm',
      quantity: i.quantity,
      unit_price: i.unit_price,
      discount: i.discount,
      total_price: i.total_price
    })) || []
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [isProductListOpen, setIsProductListOpen] = useState(false)

  // Calculate Totals
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.quantity * item.unit_price) - item.discount, 0)
  }, [items])

  const tax = useMemo(() => {
    return (subtotal - overallDiscount) * 0.1 // 10% VAT
  }, [subtotal, overallDiscount])

  const total = useMemo(() => {
    return subtotal - overallDiscount + tax
  }, [subtotal, overallDiscount, tax])

  // Handlers
  const handleAddProduct = (product: any) => {
    // Check if already exists
    if (items.some(i => i.product_id === product.id)) {
      return
    }
    setItems([...items, {
      product_id: product.id,
      product_name: product.title,
      quantity: 1,
      unit_price: product.price || 0,
      discount: 0,
      total_price: product.price || 0
    }])
    setIsProductListOpen(false)
    setSearchTerm('')
  }

  const handleUpdateItem = (index: number, field: string, value: number) => {
    const newItems = [...items]
    newItems[index][field] = value
    
    // Recalculate item total
    const item = newItems[index]
    item.total_price = (item.quantity * item.unit_price) - item.discount
    setItems(newItems)
  }

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactId) {
      setError('Vui lòng chọn khách hàng')
      return
    }
    if (items.length === 0) {
      setError('Vui lòng thêm ít nhất 1 sản phẩm vào báo giá')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const payload = {
        contact_id: contactId,
        opportunity_id: opportunityId || undefined,
        subtotal,
        discount: overallDiscount,
        tax,
        total,
        notes,
        valid_until: validUntil || undefined,
        items
      }
      
      let resId = ''
      if (initialData?.id) {
        await updateQuotation(initialData.id, payload)
        resId = initialData.id
      } else {
        const res = await createQuotation(payload)
        resId = res.id
      }
      
      router.push(`/crm/quotations/${resId}`)
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi tạo báo giá')
      setIsSubmitting(false)
    }
  }

  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Col: Info */}
        <div className="space-y-6 bg-card/40 backdrop-blur-xl border border-border/50 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold border-b border-border/50 pb-4">Thông tin chung</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Khách hàng *</label>
              <select 
                value={contactId}
                onChange={e => setContactId(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
              >
                <option value="">-- Chọn khách hàng --</option>
                {contacts.map(c => (
                  <option key={c.id} value={c.id}>{c.name} {c.company ? `(${c.company})` : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Cơ hội (Lead) liên quan</label>
              <select 
                value={opportunityId}
                onChange={e => setOpportunityId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
              >
                <option value="">-- Không có --</option>
                {opportunities.filter(o => !contactId || o.contact_id === contactId).map(o => (
                  <option key={o.id} value={o.id}>{o.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Ngày hết hạn (Hiệu lực báo giá)</label>
              <input 
                type="date"
                value={validUntil}
                onChange={e => setValidUntil(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Notes */}
        <div className="space-y-6 bg-card/40 backdrop-blur-xl border border-border/50 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold border-b border-border/50 pb-4">Ghi chú & Điều khoản</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Ghi chú cho khách hàng</label>
              <textarea 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={6}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                placeholder="Ví dụ: Báo giá đã bao gồm chi phí vận chuyển lắp đặt..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Cart Section */}
      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6">
          <h2 className="text-lg font-semibold">Chi tiết Sản phẩm</h2>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProductListOpen(!isProductListOpen)}
              className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              <Plus className="w-4 h-4" /> Thêm sản phẩm
            </button>
            
            {isProductListOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="p-2 border-b border-border relative">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Tìm sản phẩm..."
                    className="w-full bg-transparent border-none focus:ring-0 pl-8 pr-2 py-1 text-sm outline-none"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredProducts.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">Không tìm thấy sản phẩm</div>
                  ) : (
                    filteredProducts.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleAddProduct(p)}
                        className="w-full text-left px-4 py-3 hover:bg-muted/50 border-b border-border/50 last:border-0 flex justify-between items-center transition-colors"
                      >
                        <span className="text-sm font-medium truncate pr-4">{p.title}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {p.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price) : '0 ₫'}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-background/50 border-b border-border/50">
              <tr>
                <th className="px-4 py-3 font-medium w-1/3">Tên sản phẩm</th>
                <th className="px-4 py-3 font-medium w-32 text-center">Số lượng</th>
                <th className="px-4 py-3 font-medium text-right">Đơn giá (VNĐ)</th>
                <th className="px-4 py-3 font-medium text-right">Giảm giá (VNĐ)</th>
                <th className="px-4 py-3 font-medium text-right">Thành tiền (VNĐ)</th>
                <th className="px-4 py-3 font-medium text-center w-16"></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    Chưa có sản phẩm nào. Hãy thêm sản phẩm vào báo giá.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={item.product_id} className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-3 font-medium">{item.product_name}</td>
                    <td className="px-4 py-3 text-center">
                      <input 
                        type="number" 
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1.5 text-center bg-background border border-border rounded-lg outline-none focus:border-accent"
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <input 
                        type="number" 
                        min="0"
                        value={item.unit_price}
                        onChange={(e) => handleUpdateItem(index, 'unit_price', parseInt(e.target.value) || 0)}
                        className="w-32 px-2 py-1.5 text-right bg-background border border-border rounded-lg outline-none focus:border-accent"
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <input 
                        type="number" 
                        min="0"
                        value={item.discount}
                        onChange={(e) => handleUpdateItem(index, 'discount', parseInt(e.target.value) || 0)}
                        className="w-32 px-2 py-1.5 text-right bg-background border border-border rounded-lg outline-none focus:border-accent text-red-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-accent">
                      {new Intl.NumberFormat('vi-VN').format(item.total_price)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end border-t border-border/50 pt-6">
          <div className="w-full max-w-sm space-y-4">
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Tổng phụ (trước thuế):</span>
              <span className="font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</span>
            </div>
            
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Chiết khấu thêm:</span>
              <input 
                type="number" 
                min="0"
                value={overallDiscount}
                onChange={(e) => setOverallDiscount(parseInt(e.target.value) || 0)}
                className="w-32 px-2 py-1 text-right bg-background border border-border rounded-lg outline-none focus:border-accent text-red-500"
              />
            </div>

            <div className="flex justify-between items-center text-muted-foreground">
              <span>Thuế VAT (10%):</span>
              <span className="font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tax)}</span>
            </div>

            <div className="flex justify-between items-center border-t border-border/50 pt-4 text-lg">
              <span className="font-semibold text-foreground">Tổng cộng:</span>
              <span className="font-bold text-accent">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-xl border border-border bg-background font-medium hover:bg-muted transition-colors"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            <Save className="w-5 h-5" />
          )}
          Lưu Báo Giá
        </button>
      </div>
    </form>
  )
}
