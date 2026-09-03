import { getQuotationById } from '@/app/actions/quotations'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Building2, Mail, Phone, MapPin } from 'lucide-react'
import QuotationActions from './quotation-actions'

export default async function QuotationDetailPage({ params }: { params: { id: string } }) {
  // Fix Next.js 15+ async params
  const id = (await params).id
  const quote = await getQuotationById(id)

  if (!quote) {
    notFound()
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto pb-12">
      <div className="mb-6">
        <Link 
          href="/crm/quotations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-4">
              Báo Giá: {quote.code}
              <span className={`px-3 py-1 text-sm font-medium rounded-full border 
                ${quote.status === 'draft' ? 'bg-muted text-muted-foreground border-border' : 
                  quote.status === 'sent' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                  quote.status === 'accepted' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                  'bg-red-500/10 text-red-500 border-red-500/20'}`}
              >
                {quote.status === 'draft' ? 'Bản nháp' :
                 quote.status === 'sent' ? 'Đã gửi' :
                 quote.status === 'accepted' ? 'Đã chốt' : 'Từ chối'}
              </span>
            </h1>
            <div className="flex items-center gap-6 text-muted-foreground text-sm mt-4">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Ngày tạo: {new Date(quote.created_at).toLocaleDateString('vi-VN')}
              </span>
              {quote.valid_until && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-500" /> Hiệu lực đến: {new Date(quote.valid_until).toLocaleDateString('vi-VN')}
                </span>
              )}
            </div>
          </div>
          <Link
            href={`/crm/quotations/edit/${quote.id}`}
            className="flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted transition-colors shadow-sm"
          >
            Sửa báo giá
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Customer Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 border-b border-border/50 pb-2">Thông tin Khách hàng</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Họ tên</div>
                <div className="font-medium text-foreground text-lg">{quote.contact?.name}</div>
              </div>
              {quote.contact?.company && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Building2 className="w-4 h-4" /> {quote.contact.company}
                </div>
              )}
              {quote.contact?.email && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4" /> {quote.contact.email}
                </div>
              )}
              {quote.contact?.phone && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4" /> {quote.contact.phone}
                </div>
              )}
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 border-b border-border/50 pb-2">Tóm tắt Báo giá</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Tổng phụ:</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(quote.subtotal)}</span>
              </div>
              {quote.discount > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Chiết khấu thêm:</span>
                  <span className="text-red-500">-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(quote.discount)}</span>
                </div>
              )}
              {quote.tax > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Thuế VAT:</span>
                  <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(quote.tax)}</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-border/50 pt-3 mt-3">
                <span className="font-semibold">Tổng cộng:</span>
                <span className="text-xl font-bold text-accent">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(quote.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Preview & Actions */}
        <div className="lg:col-span-2">
          <QuotationActions quotation={quote} />
        </div>
      </div>
    </div>
  )
}
