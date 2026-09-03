'use client'

import { useState } from 'react'
import { submitContactForm } from '@/app/actions/contact'
import toast from 'react-hot-toast'
import { Send, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    const res = await submitContactForm(formData)

    setIsPending(false)
    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success('Gửi yêu cầu liên hệ thành công! Chúng tôi sẽ sớm liên lạc lại với bạn.')
      e.currentTarget.reset()
    }
  }

  return (
    <div className="p-8 md:p-10">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Gửi lời nhắn</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Họ và tên *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            placeholder="Nhập họ và tên của bạn"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Số điện thoại *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Ví dụ: 0912345678"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">Nội dung lời nhắn</label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
            placeholder="Bạn cần chúng tôi tư vấn về máy CNC nào?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Đang gửi...
            </>
          ) : (
            <>
              Gửi yêu cầu
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
