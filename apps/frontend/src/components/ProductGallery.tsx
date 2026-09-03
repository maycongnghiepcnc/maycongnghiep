'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  title: string;
  isFeatured?: boolean;
}

export default function ProductGallery({ images, title, isFeatured }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isLightboxOpen) return;
    
    if (e.key === 'Escape') {
      setIsLightboxOpen(false);
    } else if (e.key === 'ArrowLeft') {
      setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (e.key === 'ArrowRight') {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  }, [isLightboxOpen, images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling when lightbox is open
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown, isLightboxOpen]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full lg:w-1/2">
        <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden shadow-sm relative flex items-center justify-center text-gray-400">
          Không có hình ảnh
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/2">
      {/* Main Image */}
      <div 
        className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden shadow-sm relative cursor-pointer group"
        onClick={() => setIsLightboxOpen(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={images[activeIndex]} 
          alt={`${title} - ảnh ${activeIndex + 1}`} 
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        {/* Hover overlay to indicate it's clickable */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="bg-white/90 text-gray-900 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all transform scale-95 group-hover:scale-100 shadow-lg">
            <Maximize2 size={20} />
          </div>
        </div>

        {/* Feature Badge */}
        {isFeatured && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white font-semibold px-3 py-1 text-xs rounded-full shadow-lg z-10">
            Nổi bật
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4">
          {images.map((img: string, idx: number) => (
            <div 
              key={idx} 
              onClick={() => setActiveIndex(idx)}
              className={`aspect-[4/3] rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                idx === activeIndex 
                  ? 'border-orange-500 shadow-sm' 
                  : 'border-transparent hover:border-orange-300 opacity-70 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`${title} - ảnh ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Overlay */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all z-[110]"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X size={28} />
          </button>
          
          <div className="w-full h-full max-w-7xl max-h-screen p-4 sm:p-10 flex flex-col justify-center items-center relative">
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-[110] backdrop-blur-md"
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-[110] backdrop-blur-md"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="relative w-full h-[85vh] flex items-center justify-center" onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={images[activeIndex]} 
                alt={`${title} - phóng to ${activeIndex + 1}`} 
                className="max-w-full max-h-full object-contain rounded-md select-none cursor-default"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md z-[110]">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
