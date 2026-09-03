import { getContacts, getOpportunities } from '@/app/actions/crm'
import { getProducts } from '@/app/actions/products'
import QuotationForm from './quotation-form'

export default async function CreateQuotationPage({
  searchParams,
}: {
  searchParams: { contact_id?: string, opportunity_id?: string }
}) {
  const [contacts, opportunities, products] = await Promise.all([
    getContacts(),
    getOpportunities(),
    getProducts()
  ])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Tạo Báo Giá Mới</h1>
        <p className="text-muted-foreground text-sm">
          Thiết lập báo giá cho khách hàng và thêm sản phẩm vào giỏ hàng báo giá.
        </p>
      </div>

      <QuotationForm 
        contacts={contacts} 
        opportunities={opportunities} 
        products={products}
        initialContactId={searchParams.contact_id}
        initialOpportunityId={searchParams.opportunity_id}
      />
    </div>
  )
}
