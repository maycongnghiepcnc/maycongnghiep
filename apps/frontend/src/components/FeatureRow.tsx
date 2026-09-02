import React from 'react';
import { Monitor, Cpu, Printer, Wrench, ArrowRight } from 'lucide-react';

export default function FeatureRow() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 relative z-30 -mt-24 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white rounded-lg shadow-xl overflow-hidden border">
        
        {/* Feature 1 */}
        <div className="p-6 flex gap-4 items-start border-b md:border-b-0 lg:border-r hover:bg-gray-50 transition cursor-pointer">
          <Monitor size={36} strokeWidth={1.5} className="text-gray-700 flex-shrink-0" />
          <div className="flex flex-col h-full">
            <h3 className="font-bold text-sm mb-1">MÁY CHO NỘI THẤT</h3>
            <p className="text-xs text-gray-500 mb-3 flex-grow">Máy chế biến gỗ công nghiệp, tối ưu năng suất & chất lượng</p>
            <div className="text-xs font-semibold flex items-center gap-1 group">
              Xem thêm <ArrowRight size={12} className="group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="p-6 flex gap-4 items-start border-b md:border-b-0 lg:border-r hover:bg-gray-50 transition cursor-pointer">
          <Cpu size={36} strokeWidth={1.5} className="text-gray-700 flex-shrink-0" />
          <div className="flex flex-col h-full">
            <h3 className="font-bold text-sm mb-1">MÁY CHO CƠ KHÍ</h3>
            <p className="text-xs text-gray-500 mb-3 flex-grow">Máy gia công kim loại chính xác, bền bỉ, hiệu suất cao</p>
            <div className="text-xs font-semibold flex items-center gap-1 group">
              Xem thêm <ArrowRight size={12} className="group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="p-6 flex gap-4 items-start border-b md:border-b-0 lg:border-r hover:bg-gray-50 transition cursor-pointer">
          <Printer size={36} strokeWidth={1.5} className="text-gray-700 flex-shrink-0" />
          <div className="flex flex-col h-full">
            <h3 className="font-bold text-sm mb-1">MÁY CHO QUẢNG CÁO</h3>
            <p className="text-xs text-gray-500 mb-3 flex-grow">Máy cắt, khắc, in UV, CNC... cho ngành bảng hiệu</p>
            <div className="text-xs font-semibold flex items-center gap-1 group">
              Xem thêm <ArrowRight size={12} className="group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="p-6 flex gap-4 items-start hover:bg-gray-50 transition cursor-pointer">
          <Wrench size={36} strokeWidth={1.5} className="text-gray-700 flex-shrink-0" />
          <div className="flex flex-col h-full">
            <h3 className="font-bold text-sm mb-1">THIẾT BỊ PHỤ TRỢ</h3>
            <p className="text-xs text-gray-500 mb-3 flex-grow">Phụ kiện, linh kiện, dao cụ, giúp xưởng vận hành hiệu quả</p>
            <div className="text-xs font-semibold flex items-center gap-1 group">
              Xem thêm <ArrowRight size={12} className="group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
