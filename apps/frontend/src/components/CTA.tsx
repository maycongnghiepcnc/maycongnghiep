import React from 'react';
import Link from 'next/link';
import { PhoneCall, ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden bg-[#0b1221]">
      {/* Background with abstract dark shapes */}
      <div className="absolute inset-0 bg-[#0b1c3e]/20 z-0 border-t border-white/5"></div>
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
      
      {/* Subtle Glowing orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900 rounded-full mix-blend-screen filter blur-[150px] opacity-30 z-0 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0b1c3e] rounded-full mix-blend-screen filter blur-[150px] opacity-40 z-0 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-10 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
          Sẵn sàng tối ưu hóa dây chuyền sản xuất cùng <span className="text-yellow-500">YUJI VINA</span>?
        </h2>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
          Hãy để các chuyên gia của chúng tôi tư vấn giải pháp máy móc CNC phù hợp nhất với quy mô và ngân sách của bạn. Nâng cao năng suất - Tối đa hóa lợi nhuận ngay hôm nay!
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/lien-he"
            className="w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-[#0b1221] font-bold rounded-xl shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 group"
          >
            <PhoneCall size={20} className="group-hover:animate-bounce" />
            LIÊN HỆ TƯ VẤN NGAY
          </Link>
          
          <Link 
            href="/san-pham"
            className="w-full sm:w-auto px-8 py-4 bg-[#0b1c3e] hover:bg-[#132a5a] border border-blue-900/50 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 group"
          >
            XEM DANH MỤC SẢN PHẨM
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-gray-500 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ 24/7
        </div>
      </div>
    </section>
  );
}
