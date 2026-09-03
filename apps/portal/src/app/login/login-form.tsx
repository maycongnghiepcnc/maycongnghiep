'use client'

import { useState } from 'react'
import { Mail, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react'
import { login, loginWithPassword } from './actions'
import { SubmitButton } from './submit-button'

export function LoginForm({
  initialMessage,
  isError
}: {
  initialMessage?: string
  isError?: boolean
}) {
  const [mode, setMode] = useState<'email' | 'password'>('email')

  return (
    <>
      <form action={mode === 'email' ? login : loginWithPassword} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80 ml-1" htmlFor="email">
            Địa chỉ Email
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <input
              className="w-full rounded-xl bg-background/50 border border-border/50 px-10 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
              name="email"
              type="email"
              placeholder="admin@maycongnghiep.com"
              required
            />
          </div>
        </div>

        {mode === 'password' && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-sm font-medium text-foreground/80 ml-1" htmlFor="password">
              Mật khẩu
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
                <KeyRound className="w-5 h-5" />
              </div>
              <input
                className="w-full rounded-xl bg-background/50 border border-border/50 px-10 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
        )}

        <SubmitButton />
        
        <div className="flex justify-center mt-4">
          <button 
            type="button" 
            onClick={() => setMode(mode === 'email' ? 'password' : 'email')}
            className="text-sm text-accent hover:underline"
          >
            {mode === 'email' ? 'Đăng nhập bằng mật khẩu' : 'Đăng nhập bằng Email OTP'}
          </button>
        </div>
      </form>

      {initialMessage && (
        <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 border backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500 ${isError ? 'bg-destructive/10 border-destructive/20 text-red-400' : 'bg-accent/10 border-accent/20 text-green-400'}`}>
          {isError ? (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <p className="text-sm font-medium leading-relaxed">
            {initialMessage}
          </p>
        </div>
      )}
    </>
  )
}
