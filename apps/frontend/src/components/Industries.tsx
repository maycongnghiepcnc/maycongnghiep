import React from 'react';
import { ArrowRight, Box, Building, MonitorPlay, Settings } from 'lucide-react';

export default function Industries() {
  const industries = [
    {
      id: 1,
      title: 'NỘI THẤT GỖ CÔNG NGHIỆP',
      desc: 'Giải pháp máy móc đồng bộ cho xưởng nội thất hiện đại',
      icon: <Box size={32} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1610884617578-83b3e6480e60?auto=format&fit=crop&q=80&w=600&h=400'
    },
    {
      id: 2,
      title: 'XÂY DỰNG',
      desc: 'Máy móc hỗ trợ gia công, kết cấu thép, cửa, lan can, vách...',
      icon: <Building size={32} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1541888087625-f814d1f274a4?auto=format&fit=crop&q=80&w=600&h=400'
    },
    {
      id: 3,
      title: 'QUẢNG CÁO',
      desc: 'Giải pháp máy cắt, khắc, in UV... cho ngành bảng hiệu',
      icon: <MonitorPlay size={32} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&q=80&w=600&h=400'
    },
    {
      id: 4,
      title: 'CƠ KHÍ',
      desc: 'Giải pháp gia công cơ khí chính xác, tối ưu hiệu suất xưởng',
      icon: <Settings size={32} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=600&h=400'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 py-12">
      <div className="flex justify-center items-end mb-8">
        <h2 className="text-2xl font-bold uppercase text-gray-800 tracking-wide text-center relative pb-3 border-b-2 border-gray-300">
          GIẢI PHÁP THEO NGÀNH
          <div className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-16 border-b-2 border-blue-600"></div>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {industries.map((ind) => (
          <div key={ind.id} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
            <img 
              src={ind.image} 
              alt={ind.title} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
            
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="mb-3">
                <div className="w-12 h-12 border border-white/30 rounded flex items-center justify-center bg-black/20 backdrop-blur-sm mb-3">
                  {ind.icon}
                </div>
                <h3 className="text-white font-bold text-sm tracking-wider mb-1">{ind.title}</h3>
                <p className="text-gray-300 text-xs leading-relaxed">{ind.desc}</p>
              </div>
              <button className="flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-white mt-2 group-hover:translate-x-1 transition w-max px-3 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                Xem giải pháp <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
