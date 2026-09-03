import React from 'react';
import { ShieldCheck, Lightbulb, Wrench } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Chất Lượng Chính Hãng',
      description: 'Máy móc nhập khẩu trực tiếp 100%, đầy đủ chứng nhận CO/CQ. Cam kết độ bền bỉ và hiệu suất hoạt động vượt trội cho nhà máy của bạn.',
      color: 'from-blue-500 to-indigo-600',
      shadow: 'group-hover:shadow-blue-500/20'
    },
    {
      icon: Lightbulb,
      title: 'Giải Pháp Tối Ưu',
      description: 'Không chỉ cung cấp thiết bị, chúng tôi thiết kế và tư vấn dây chuyền sản xuất đồng bộ, giúp tối đa hoá lợi nhuận và giảm thiểu chi phí hao phí.',
      color: 'from-amber-400 to-orange-500',
      shadow: 'group-hover:shadow-orange-500/20'
    },
    {
      icon: Wrench,
      title: 'Hỗ Trợ Kỹ Thuật 24/7',
      description: 'Đội ngũ kỹ sư tận tâm luôn sẵn sàng đồng hành. Bảo trì tận nơi, khắc phục sự cố nhanh chóng, đảm bảo dây chuyền luôn vận hành xuyên suốt.',
      color: 'from-emerald-400 to-teal-500',
      shadow: 'group-hover:shadow-teal-500/20'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0b1221]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-orange-900/10 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-yellow-500 tracking-widest uppercase mb-3">
            Giá trị cốt lõi
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Tại Sao Nên Chọn <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">YUJI VINA</span>?
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Chúng tôi không chỉ là nhà cung cấp thiết bị, mà còn là đối tác chiến lược giúp doanh nghiệp của bạn bứt phá trong kỷ nguyên sản xuất mới.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div 
              key={idx} 
              className={`group relative bg-[#0f192e] rounded-3xl p-8 md:p-10 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-3 shadow-xl ${reason.shadow}`}
            >
              {/* Subtle hover glow at the top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                <reason.icon size={32} strokeWidth={1.5} />
              </div>
              
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                {reason.title}
              </h4>
              
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
