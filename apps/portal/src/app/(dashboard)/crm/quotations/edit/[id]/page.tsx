import { getContacts, getOpportunities } from '@/app/actions/crm'
import { getProducts } from '@/app/actions/products'
import { getQuotationById } from '@/app/actions/quotations'
import QuotationForm from '../../create/quotation-form'
import { notFound } from 'next/navigation'

export default async function EditQuotationPage({
  params,
}: {
  params: { id: string }
}) {
  const id = (await params).id
  
  const [contacts, opportunities, products, quote] = await Promise.all([
    getContacts(),
    getOpportunities(),
    getProducts(),
    getQuotationById(id)
  ])

  if (!quote) {
    notFound()
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Chỉnh Sửa Báo Giá {quote.code}</h1>
        <p className="text-muted-foreground text-sm">
          Cập nhật thông tin chi tiết và danh sách sản phẩm trong báo giá.
        </p>
      </div>

      <QuotationForm 
        contacts={contacts} 
        opportunities={opportunities} 
        products={products}
        initialData={quote}
      />
    </div>
  )
}
