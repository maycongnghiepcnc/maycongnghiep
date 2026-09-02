'use client'

import { useState } from 'react'
import { UserCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { convertContactToCustomer } from '@/app/actions/customers'
import { useRouter } from 'next/navigation'

export function ConvertToCustomerButton({ contactId }: { contactId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleConvert = async () => {
    if (!confirm('Bạn có chắc chắn muốn chuyển liên hệ này thành Khách hàng?')) return

    setIsLoading(true)
    const result = await convertContactToCustomer(contactId)
    setIsLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Đã chuyển thành khách hàng thành công!')
      router.push('/crm/customers')
    }
  }

  return (
    <button
      onClick={handleConvert}
      disabled={isLoading}
      className="p-2 text-green-500 hover:text-green-600 hover:bg-green-500/10 rounded-lg transition-colors disabled:opacity-50"
      title="Chuyển thành Khách hàng"
    >
      <UserCheck className="w-4 h-4" />
    </button>
  )
}
