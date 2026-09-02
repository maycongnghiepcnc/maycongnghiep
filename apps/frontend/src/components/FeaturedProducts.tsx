import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      tag: 'BÁN CHẠY',
      tagColor: 'bg-red-500',
      title: 'Máy CNC Nesting 4 Đầu',
      code: 'SM-1325-R4',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 2,
      tag: 'BÁN CHẠY',
      tagColor: 'bg-red-500',
      title: 'Máy Dán Cạnh Tự Động',
      code: 'SM-468JP',
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 3,
      tag: 'MỚI',
      tagColor: 'bg-blue-600',
      title: 'Máy Cắt Fiber Laser CNC',
      code: 'LF-3015GA',
      image: 'https://images.unsplash.com/photo-1504917595217-d4f500a0eb89?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 4,
      tag: '',
      title: 'Máy Tiện CNC',
      code: 'CK-6132A',
      image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400&h=300'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 py-8 relative">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold uppercase text-gray-800 tracking-wide mx-auto lg:mx-0">
          SẢN PHẨM NỔI BẬT
        </h2>
        <a href="#" className="hidden lg:flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-blue-600 transition">
          Xem tất cả sản phẩm <ArrowRight size={14} />
        </a>
      </div>

      {/* Carousel Navigation Buttons */}
      <button className="absolute left-0 lg:-left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center shadow hover:bg-gray-700 z-10 hidden md:flex">
        <ChevronLeft size={20} />
      </button>
      <button className="absolute right-0 lg:-right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center shadow hover:bg-gray-700 z-10 hidden md:flex">
        <ChevronRight size={20} />
      </button>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 bg-white flex flex-col hover:shadow-lg transition group">
            {/* Tag */}
            <div className="h-6">
              {product.tag && (
                <span className={`${product.tagColor} text-white text-[10px] font-bold px-2 py-1 rounded inline-block`}>
                  {product.tag}
                </span>
              )}
            </div>
            
            {/* Image */}
            <div className="w-full h-40 mt-2 mb-4 overflow-hidden rounded flex items-center justify-center bg-gray-50">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-contain group-hover:scale-105 transition duration-300 mix-blend-multiply"
              />
            </div>

            {/* Title & Code */}
            <h3 className="font-bold text-sm text-gray-800 leading-tight mb-1">{product.title}</h3>
            <p className="text-xs text-gray-500 font-medium mb-4">{product.code}</p>

            {/* Actions */}
            <div className="mt-auto flex justify-between gap-2">
              <button className="flex-1 text-sm font-bold text-gray-700 hover:text-blue-600 transition text-left">
                Liên hệ
              </button>
              <button className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 text-center hover:bg-gray-50 transition font-medium">
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-6 lg:hidden">
        <a href="#" className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-blue-600 transition">
          Xem tất cả sản phẩm <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
