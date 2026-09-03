'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Send, FileDown, CheckCircle2, XCircle } from 'lucide-react'
import { sendQuotationEmail } from '@/app/actions/pdf'
import toast, { Toaster } from 'react-hot-toast'
import QuotationPDF from '@/components/pdf/QuotationPDF'
import { pdf } from '@react-pdf/renderer'

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full flex items-center justify-center bg-muted/20 border border-border/50 rounded-2xl">Đang tải bản xem trước...</div>
})

export default function QuotationActions({ quotation }: { quotation: any }) {
  const [isSending, setIsSending] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  
  const [emailTo, setEmailTo] = useState(quotation.contact?.email || '')
  const [subject, setSubject] = useState(`Báo giá ${quotation.code} từ Máy Công Nghiệp CNC`)
  const [message, setMessage] = useState(`Kính gửi ${quotation.contact?.name},\n\nChúng tôi xin gửi đính kèm file báo giá theo yêu cầu của Quý khách.`)

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    
    try {
      // 1. Generate PDF as Blob
      const blob = await pdf(<QuotationPDF quotation={quotation} />).toBlob()
      
      // 2. Convert Blob to Base64
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = async () => {
        const base64data = reader.result as string
        
        // 3. Send Email
        const res = await sendQuotationEmail(
          quotation.id,
          emailTo,
          subject,
          message,
          base64data,
          `Bao_Gia_${quotation.code}.pdf`
        )

        if (res.success) {
          toast.success('Đã gửi báo giá thành công!')
          setShowSendModal(false)
        } else {
          toast.error(res.error || 'Có lỗi khi gửi email')
        }
        setIsSending(false)
      }
    } catch (err: any) {
      toast.error('Lỗi tạo PDF: ' + err.message)
      setIsSending(false)
    }
  }

  return (
    <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <Toaster position="top-center" />
      <div className="p-4 border-b border-border/50 flex items-center justify-between bg-background/50">
        <h2 className="font-semibold text-foreground">Bản xem trước PDF</h2>
        <div className="flex gap-2">
          {/* Download button could be added here using PDFDownloadLink, but skipping for simplicity */}
          <button 
            onClick={() => setShowSendModal(true)}
            className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors shadow-md shadow-accent/20"
          >
            <Send className="w-4 h-4" /> Gửi cho Khách
          </button>
        </div>
      </div>
      
      <div className="h-[600px] w-full bg-gray-500/10">
        <PDFViewer width="100%" height="100%" className="border-none">
          <QuotationPDF quotation={quotation} />
        </PDFViewer>
      </div>

      {showSendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border/50 flex justify-between items-center">
              <h3 className="text-xl font-bold">Gửi Báo Giá</h3>
              <button onClick={() => setShowSendModal(false)} className="text-muted-foreground hover:text-foreground">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSendEmail} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Người nhận (Email)</label>
                <input 
                  type="email" 
                  value={emailTo}
                  onChange={e => setEmailTo(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Tiêu đề</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Nội dung email</label>
                <textarea 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={4}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowSendModal(false)}
                  className="px-4 py-2 rounded-xl border border-border bg-muted/50 hover:bg-muted font-medium"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  disabled={isSending || !emailTo}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-50"
                >
                  {isSending ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : <Send className="w-4 h-4" />}
                  Gửi đi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
