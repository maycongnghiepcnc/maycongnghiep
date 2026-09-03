import React from 'react';
import Link from 'next/link';
import { Monitor, Cpu, Printer, Wrench, ArrowRight, LayoutGrid } from 'lucide-react';

interface Category {
  title: string;
  slug: string;
  summary: string | null;
}

interface FeatureRowProps {
  categories?: Category[];
}

export default function FeatureRow({ categories = [] }: FeatureRowProps) {
  if (!categories || categories.length === 0) {
    return null; // Do not render if no featured categories exist
  }

  // Predefined icons to cycle through if no custom icons are set
  const ICONS = [Monitor, Cpu, Printer, Wrench, LayoutGrid];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 relative z-30 -mt-24 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {categories.map((cat, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <Link 
              key={cat.slug} 
              href={`/san-pham/${cat.slug}`}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col group relative overflow-hidden"
            >
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 -z-10 transition-transform group-hover:scale-110"></div>
              
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#0b1c3e] flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-[#0b1c3e] transition-colors duration-300 shadow-sm">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 mb-3 uppercase line-clamp-2">{cat.title}</h3>
              
              <p className="text-sm text-gray-500 mb-6 flex-grow line-clamp-3 leading-relaxed">
                {cat.summary || 'Khám phá danh mục sản phẩm chất lượng cao từ YUJI VINA, giải pháp tối ưu cho sản xuất.'}
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 text-sm font-bold flex items-center gap-2 text-[#0b1c3e] group-hover:text-yellow-500 transition-colors">
                Xem chi tiết <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>
          );
        })}

      </div>
    </div>
  );
}
