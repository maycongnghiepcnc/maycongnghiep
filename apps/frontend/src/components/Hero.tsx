import React from 'react';
import { ArrowRight, Settings, CheckCircle, Clock, CreditCard, Phone } from 'lucide-react';

interface HeroProps {
  heroBannerUrl?: string;
  mode?: string;
  landscapeUrl?: string;
  portraitUrl?: string;
  settings?: Record<string, string>;
}

export default function Hero({ heroBannerUrl, mode = 'standard', landscapeUrl, portraitUrl, settings = {} }: HeroProps) {
  const zaloLink = settings.company_zalo || "https://zalo.me/0987654321";
  const phone = settings.company_phone || "0987 654 321";
  const fbLink = settings.company_fb || "https://m.me/maycongnghiep";
  return (
    <>
      {mode === 'image_only' ? (
        <div className="relative w-full h-[85vh] md:h-[80vh] flex items-center bg-[#0b1221] overflow-hidden">
          {/* Desktop Image */}
          {landscapeUrl && (
            <img 
              src={landscapeUrl} 
              alt="Hero Banner Landscape" 
              className="hidden md:block w-full h-full object-cover object-center"
            />
          )}
          {/* Mobile Image */}
          {portraitUrl && (
            <img 
              src={portraitUrl} 
              alt="Hero Banner Portrait" 
              className="block md:hidden w-full h-full object-cover object-center"
            />
          )}
          {/* Fallback if no images provided but in image_only mode */}
          {!landscapeUrl && !portraitUrl && (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Chưa cấu hình ảnh Banner
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full min-h-[80vh] flex items-center text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroBannerUrl || "/hero.png"} 
              alt="CNC Machine Background" 
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c3e]/95 via-[#0b1c3e]/80 to-black/40"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-10 py-24 relative z-10 w-full">
            
            {/* Content */}
            <div className="w-full md:w-[65%] lg:w-[60%] flex flex-col gap-6 relative z-20">
              <div className="text-sm uppercase tracking-wider font-semibold text-gray-300">
                CUNG CẤP MÁY MÓC & GIẢI PHÁP SẢN XUẤT
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight drop-shadow-lg">
                NỘI THẤT - CƠ KHÍ <br />
                <span className="text-orange-500">QUẢNG CÁO</span>
              </h1>
              
              <div className="text-gray-200 max-w-lg mt-2 text-lg drop-shadow-md">
                <p>Tư vấn giải pháp - Cung cấp máy móc chính hãng - Hỗ trợ kỹ thuật trọn đời</p>
                <p className="mt-1">Đồng hành cùng xưởng sản xuất Việt nâng cao năng suất và lợi nhuận.</p>
              </div>

              {/* Features Grid in Hero */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl"><Settings size={22} className="text-white" /></div>
                  <div>
                    <div className="font-bold text-sm tracking-wide">TƯ VẤN GIẢI PHÁP</div>
                    <div className="text-xs text-gray-300 mt-1.5 leading-relaxed">Phù hợp quy mô <br/>và ngân sách</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl"><CheckCircle size={22} className="text-white" /></div>
                  <div>
                    <div className="font-bold text-sm tracking-wide">MÁY MÓC CHÍNH HÃNG</div>
                    <div className="text-xs text-gray-300 mt-1.5 leading-relaxed">Chất lượng - Bền bỉ <br/>Hiệu quả</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl"><Clock size={22} className="text-white" /></div>
                  <div>
                    <div className="font-bold text-sm tracking-wide">HỖ TRỢ KỸ THUẬT 24/7</div>
                    <div className="text-xs text-gray-300 mt-1.5 leading-relaxed">Bảo hành - Bảo trì tận nơi <br/>Nhanh chóng</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl"><CreditCard size={22} className="text-white" /></div>
                  <div>
                    <div className="font-bold text-sm tracking-wide">TRẢ GÓP LINH HOẠT</div>
                    <div className="text-xs text-gray-300 mt-1.5 leading-relaxed">Hỗ trợ trả góp <br/>thủ tục đơn giản</div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <button className="bg-yellow-500 text-[#0b1c3e] font-bold px-8 py-4 rounded-md shadow-xl flex items-center gap-2 hover:bg-yellow-400 hover:scale-105 transition-all duration-300">
                  XEM SẢN PHẨM <ArrowRight size={20} />
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-4 rounded-md shadow-xl flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                  TƯ VẤN GIẢI PHÁP <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons (Zalo, Phone, Messenger) */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50 items-end">
        {/* Zalo */}
        <a href={zaloLink} target="_blank" rel="noopener noreferrer" className="group flex items-center w-12 h-12 hover:w-[170px] bg-blue-500 text-white rounded-full shadow-xl hover:shadow-blue-500/50 hover:bg-blue-600 transition-all duration-300 overflow-hidden relative">
          <div className="absolute left-5 whitespace-nowrap font-bold text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {phone}
          </div>
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center absolute right-0 bg-blue-500 group-hover:bg-blue-600 rounded-full transition-colors z-10">
            <span className="font-bold text-[11px] uppercase tracking-wider">Zalo</span>
          </div>
        </a>

        {/* Phone */}
        <a href={`tel:${phone.replace(/\D/g,'')}`} className="group flex items-center w-12 h-12 hover:w-[170px] bg-red-500 text-white rounded-full shadow-xl hover:shadow-red-500/50 hover:bg-red-600 transition-all duration-300 overflow-hidden relative">
          <div className="absolute left-5 whitespace-nowrap font-bold text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {phone}
          </div>
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center absolute right-0 bg-red-500 group-hover:bg-red-600 rounded-full transition-colors z-10">
            <Phone size={20} className="group-hover:animate-bounce" />
          </div>
        </a>

        {/* Messenger */}
        <a href={fbLink} target="_blank" rel="noopener noreferrer" className="group flex items-center w-12 h-12 hover:w-[170px] bg-[#00B2FF] text-white rounded-full shadow-xl hover:shadow-[#00B2FF]/50 hover:bg-[#0099db] transition-all duration-300 overflow-hidden relative">
          <div className="absolute left-5 whitespace-nowrap font-bold text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            Chat ngay
          </div>
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center absolute right-0 bg-[#00B2FF] group-hover:bg-[#0099db] rounded-full transition-colors z-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.14 2 11.25c0 2.923 1.5 5.518 3.82 7.21v3.314c0 .408.455.65.803.42l3.414-2.223c.633.178 1.29.28 1.963.28 5.523 0 10-4.14 10-9.25S17.523 2 12 2zm1.09 11.23l-2.45-2.61-4.78 2.61 5.25-5.58 2.45 2.61 4.78-2.61-5.25 5.58z"/></svg>
          </div>
        </a>
      </div>
    </>
  );
}
