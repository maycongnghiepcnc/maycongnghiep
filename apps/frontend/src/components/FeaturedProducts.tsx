import React from 'react';
import Link from 'next/link';
import { ArrowRight, Settings, Zap, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export interface FeaturedProduct {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  categorySlug: string;
}

export default function FeaturedProducts({ products = [] }: { products?: FeaturedProduct[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="w-full bg-[#050a15] py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent opacity-50"></div>
      <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-yellow-500 w-5 h-5 fill-yellow-500/20" />
              <span className="text-blue-400 font-semibold tracking-wider text-sm uppercase">Công Nghệ Mới Nhất</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold uppercase text-white tracking-wide">
              SẢN PHẨM NỔI BẬT
            </h2>
          </div>
          <Link href="/san-pham" className="group flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/10">
            Khám phá tất cả <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              href={`/san-pham/${product.categorySlug}/${product.slug}`} 
              key={product.id} 
              className="group relative flex flex-col bg-[#0b1221] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] bg-[#0f172a] relative overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] to-transparent opacity-60 z-10"></div>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain group-hover:scale-110 transition duration-700 relative z-0 filter drop-shadow-2xl"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="bg-yellow-500 text-[#0b1221] text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-lg">
                    Nổi bật
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow relative z-20">
                <h3 className="font-bold text-lg text-white leading-tight mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {product.title}
                </h3>
                
                <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                  {product.summary || 'Giải pháp gia công CNC chất lượng cao, tối ưu hóa năng suất và chi phí cho xưởng của bạn.'}
                </p>

                {/* Footer specs / actions */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 
                    <span>Chính hãng</span>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-blue-500 rounded-tl-xl transition-all duration-500 z-30"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-transparent group-hover:border-blue-500 rounded-tr-xl transition-all duration-500 z-30"></div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}
