import React from 'react';
import { ArrowRight, Settings, CheckCircle, Clock, CreditCard, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative w-full bg-[#0b1c3e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-16 flex flex-col md:flex-row items-center relative z-10 pb-40">
        
        {/* Left Content */}
        <div className="w-full md:w-[55%] flex flex-col gap-6 relative z-20">
          <div className="text-sm uppercase tracking-wider font-semibold text-gray-300">
            CUNG CẤP MÁY MÓC & GIẢI PHÁP SẢN XUẤT
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
            NỘI THẤT - CƠ KHÍ <br />
            <span className="text-orange-500">QUẢNG CÁO</span>
          </h1>
          
          <div className="text-gray-300 max-w-lg mt-2">
            <p>Tư vấn giải pháp - Cung cấp máy móc chính hãng - Hỗ trợ kỹ thuật trọn đời</p>
            <p className="mt-1">Đồng hành cùng xưởng sản xuất Việt nâng cao năng suất và lợi nhuận.</p>
          </div>

          {/* Features Grid in Hero */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-start gap-3">
              <div className="p-2 border border-gray-600 rounded-md"><Settings size={20} className="text-gray-300" /></div>
              <div>
                <div className="font-semibold text-sm">TƯ VẤN GIẢI PHÁP</div>
                <div className="text-xs text-gray-400 mt-1">Phù hợp quy mô <br/>và ngân sách</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 border border-gray-600 rounded-md"><CheckCircle size={20} className="text-gray-300" /></div>
              <div>
                <div className="font-semibold text-sm">MÁY MÓC CHÍNH HÃNG</div>
                <div className="text-xs text-gray-400 mt-1">Chất lượng - Bền bỉ <br/>Hiệu quả</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 border border-gray-600 rounded-md"><Clock size={20} className="text-gray-300" /></div>
              <div>
                <div className="font-semibold text-sm">HỖ TRỢ KỸ THUẬT 24/7</div>
                <div className="text-xs text-gray-400 mt-1">Bảo hành - Bảo trì tận nơi <br/>Nhanh chóng</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 border border-gray-600 rounded-md"><CreditCard size={20} className="text-gray-300" /></div>
              <div>
                <div className="font-semibold text-sm">TRẢ GÓP LINH HOẠT</div>
                <div className="text-xs text-gray-400 mt-1">Hỗ trợ trả góp <br/>thủ tục đơn giản</div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="bg-yellow-500 text-[#0b1c3e] font-bold px-6 py-3 flex items-center gap-2 hover:bg-yellow-400 transition">
              XEM SẢN PHẨM <ArrowRight size={18} />
            </button>
            <button className="border border-gray-400 text-white font-bold px-6 py-3 flex items-center gap-2 hover:bg-white/10 transition">
              TƯ VẤN GIẢI PHÁP <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Image / Graphic */}
        <div className="w-full md:w-[45%] mt-10 md:mt-0 relative flex justify-end">
          {/* We will use a placeholder image resembling a large CNC machine */}
          <div className="w-full max-w-lg aspect-square sm:aspect-video md:aspect-square bg-gradient-to-tr from-gray-800 to-gray-600 rounded-lg shadow-2xl overflow-hidden relative border-4 border-gray-700">
            <img 
              src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=1000" 
              alt="CNC Machine" 
              className="w-full h-full object-cover mix-blend-overlay opacity-80"
            />
            <div className="absolute inset-0 bg-blue-900/20"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl tracking-widest bg-black/50 px-4 py-2 border border-white/20">
              MAYMOC PRO
            </div>
          </div>
        </div>

      </div>

      {/* Floating Action Buttons (Zalo, Phone, Messenger) */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
        <button className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600">
          <span className="font-bold text-xs">Zalo</span>
        </button>
        <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700">
          <Phone size={20} />
        </button>
        <button className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600">
          {/* Messenger Icon Fallback */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.14 2 11.25c0 2.923 1.5 5.518 3.82 7.21v3.314c0 .408.455.65.803.42l3.414-2.223c.633.178 1.29.28 1.963.28 5.523 0 10-4.14 10-9.25S17.523 2 12 2zm1.09 11.23l-2.45-2.61-4.78 2.61 5.25-5.58 2.45 2.61 4.78-2.61-5.25 5.58z"/></svg>
        </button>
      </div>

    </div>
  );
}
