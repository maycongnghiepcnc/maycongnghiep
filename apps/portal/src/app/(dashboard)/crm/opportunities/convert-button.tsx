'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import { convertOpportunityToSale } from '@/app/actions/sales'
import { useRouter } from 'next/navigation'

export function ConvertToSaleButton({ 
  opportunityId, 
  title, 
  amount 
}: { 
  opportunityId: string, 
  title: string, 
  amount: number 
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleConvert = async () => {
    if (!confirm('Bạn có chắc chắn muốn chốt đơn hàng từ cơ hội này?')) return

    setIsLoading(true)
    const result = await convertOpportunityToSale(opportunityId, amount, title)
    setIsLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Đã tạo đơn hàng thành công!')
      router.push('/crm/sales')
    }
  }

  return (
    <button
      onClick={handleConvert}
      disabled={isLoading}
      className="p-2 text-green-500 hover:text-green-600 hover:bg-green-500/10 rounded-lg transition-colors disabled:opacity-50"
      title="Tạo đơn hàng"
    >
      <ShoppingBag className="w-4 h-4" />
    </button>
  )
}
