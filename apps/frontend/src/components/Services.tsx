import React from 'react';
import { Settings, Wrench, Laptop, PackageOpen, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 1,
      icon: Laptop,
      title: 'Tư Vấn Setup Nhà Xưởng',
      description: 'Lên phương án layout, thiết kế dây chuyền sản xuất đồng bộ, tự động hóa từ A-Z giúp tiết kiệm tối đa diện tích và chi phí vận hành.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverBorder: 'hover:border-blue-500'
    },
    {
      id: 2,
      icon: Settings,
      title: 'Chuyển Giao Công Nghệ',
      description: 'Đào tạo phần mềm, hướng dẫn vận hành máy móc chi tiết tận nơi. Đảm bảo nhân sự của xưởng thành thạo ngay sau khi bàn giao.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      hoverBorder: 'hover:border-orange-500'
    },
    {
      id: 3,
      icon: Wrench,
      title: 'Bảo Trì & Sửa Chữa CNC',
      description: 'Khắc phục sự cố 24/7, đại tu máy cũ, nâng cấp hệ thống điều khiển. Bảo trì định kỳ giúp máy móc hoạt động bền bỉ, không bị gián đoạn.',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      hoverBorder: 'hover:border-emerald-500'
    },
    {
      id: 4,
      icon: PackageOpen,
      title: 'Cung Cấp Vật Tư & Phụ Kiện',
      description: 'Phân phối linh kiện chính hãng, dao cụ CNC, dầu mỡ bôi trơn, phụ tùng thay thế với giá cả cạnh tranh, luôn có sẵn tại kho.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      hoverBorder: 'hover:border-purple-500'
    }
  ];

  return (
    <section className="py-24 bg-[#0b1c3e] relative">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-yellow-500 tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-1 bg-yellow-500 rounded-full"></span>
              Dịch Vụ Chuyên Nghiệp
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Giải Pháp Toàn Diện Cho <br /> Ngành Gia Công Sản Xuất
            </h3>
          </div>
          
          <button className="hidden md:flex items-center gap-2 text-yellow-500 font-semibold hover:text-yellow-400 transition-colors group">
            Xem tất cả dịch vụ 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-[#0b1221] rounded-2xl p-8 border border-white/5 shadow-lg hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 group cursor-pointer hover:border-white/20 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Card glowing accent on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className={`w-14 h-14 rounded-xl ${service.bgColor} bg-opacity-10 ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              
              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h4>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                {service.description}
              </p>
              
              <div className={`text-sm font-semibold ${service.color} flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}>
                Tìm hiểu thêm <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
        
        <button className="md:hidden mt-10 w-full flex items-center justify-center gap-2 text-yellow-500 font-semibold bg-white/5 py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
          Xem tất cả dịch vụ 
          <ArrowRight size={18} />
        </button>

      </div>
    </section>
  );
}
