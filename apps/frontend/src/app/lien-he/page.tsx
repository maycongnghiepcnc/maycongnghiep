import Header from '@/components/Header'
import { Toaster } from 'react-hot-toast'
import { MapPin, Phone, Mail } from 'lucide-react'
import ContactForm from './ContactForm'
import { supabase } from '@/utils/supabase'

export default async function ContactPage() {
  const { data: settingsData } = await supabase
    .from('system_settings')
    .select('key, value')
    .in('key', ['company_address', 'company_phone', 'company_email']);
    
  const settings = (settingsData || []).reduce((acc: any, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  const address = settings.company_address || "123 Đường Công Nghiệp, Khu Công Nghiệp ABC, TP. Hồ Chí Minh";
  const phone = settings.company_phone || "0987 654 321";
  const email = settings.company_email || "contact@maycongnghiep.com";

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
                      {address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-full shrink-0">
                    <Phone className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-200 mb-1">Điện thoại</h3>
                    <p className="text-white/90 font-semibold">{phone}</p>
                    <p className="text-white/90 text-sm mt-1">Hotline 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-full shrink-0">
                    <Mail className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-200 mb-1">Email</h3>
                    <p className="text-white/90">{email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-blue-200 text-sm">
                Thời gian làm việc:<br />
                Thứ 2 - Thứ 7: 8:00 AM - 5:30 PM<br />
                Chủ nhật: Nghỉ
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </main>

      <footer className="w-full text-center py-6 text-gray-500 bg-[#0b1221] text-xs mt-auto">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH YUJI VINA (YUJI VINA). Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}
