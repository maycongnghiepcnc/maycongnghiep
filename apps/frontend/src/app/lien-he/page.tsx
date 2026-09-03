'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { submitContactForm } from '@/app/actions/contact'
import toast, { Toaster } from 'react-hot-toast'
import { Send, Loader2, MapPin, Phone, Mail } from 'lucide-react'

export default function ContactPage() {
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
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans w-full">
      <Header />
      <Toaster position="top-center" />
      
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn. Hãy để lại thông tin, đội ngũ tư vấn sẽ liên hệ lại trong thời gian sớm nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Contact Info Sidebar */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-8 md:p-10 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-6">Thông tin liên hệ</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-full shrink-0">
                    <MapPin className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-200 mb-1">Địa chỉ</h3>
                    <p className="text-white/90 leading-relaxed">
                      123 Đường Công Nghiệp, Khu Công Nghiệp ABC, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-full shrink-0">
                    <Phone className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-200 mb-1">Điện thoại</h3>
                    <p className="text-white/90">0987 654 321</p>
                    <p className="text-white/90">0123 456 789 (Hotline 24/7)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-full shrink-0">
                    <Mail className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-200 mb-1">Email</h3>
                    <p className="text-white/90">contact@maycongnghiep.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-blue-200 text-sm">
                Thời gian làm việc:<br/>
                Thứ 2 - Thứ 7: 8:00 AM - 5:30 PM<br/>
                Chủ nhật: Nghỉ
              </p>
            </div>
          </div>

          {/* Contact Form */}
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
        </div>
      </main>

      <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH Máy Công Nghiệp CNC (YUJI VINA). Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}
