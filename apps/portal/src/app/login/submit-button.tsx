'use client'

import { useFormStatus } from 'react-dom'
import { ArrowRight, Loader2 } from 'lucide-react'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full group relative flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold py-3 px-4 rounded-xl hover:bg-accent/90 transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {!pending && (
        <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
      )}
      <span className="relative z-10">
        {pending ? 'Đang gửi...' : 'Đăng nhập'}
      </span>
      {pending ? (
        <Loader2 className="w-4 h-4 relative z-10 animate-spin" />
      ) : (
        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
      )}
    </button>
  )
}
