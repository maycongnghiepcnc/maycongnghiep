'use client'

import { useEffect } from 'react'
import { setTenancyCookie } from './actions'

import Image from 'next/image'
import { Factory, ArrowRight } from 'lucide-react'

export function SetTenancyClient({ tenancyDetails }: { tenancyDetails: { id: string, name: string, logo: string | null }[] }) {
  useEffect(() => {
    if (tenancyDetails.length === 1) {
      setTenancyCookie(tenancyDetails[0].id)
    }
  }, [tenancyDetails])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {tenancyDetails.map((t) => (
        <button
          key={t.id}
          onClick={() => setTenancyCookie(t.id)}
          className="group relative flex flex-col items-center p-8 bg-card/60 hover:bg-card border border-border/50 hover:border-primary/50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-left overflow-hidden backdrop-blur-xl"
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="w-20 h-20 mb-6 rounded-2xl bg-background border border-border/50 flex items-center justify-center shadow-inner relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {t.logo ? (
              <Image src={t.logo} alt={t.name} fill className="object-contain p-2" />
            ) : (
              <Factory className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors" />
            )}
          </div>
          
          <div className="text-center z-10 w-full">
            <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">{t.name}</h3>
            <p className="text-xs text-muted-foreground font-mono">{t.id}</p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            Truy cập <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      ))}
    </div>
  )
}
