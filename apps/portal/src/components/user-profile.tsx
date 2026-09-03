'use client'

import { useState } from 'react'
import { LogOut, KeyRound, Loader2, User } from 'lucide-react'
import { signOut, setPassword } from '@/app/actions/auth'
import toast from 'react-hot-toast'

export function UserProfile({ email }: { email: string }) {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPasswordInput] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!')
      return
    }

    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!')
      return
    }

    setIsPending(true)
    
    try {
      const res = await setPassword(password)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success('Thiết lập mật khẩu thành công!')
        setShowPasswordModal(false)
        setPasswordInput('')
        setConfirmPassword('')
      }
    } catch (error) {
      toast.error('Lỗi kết nối')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="p-4 border-t border-border/50 bg-background/50 relative">
      <div className="flex flex-col gap-3">
        {/* User Info (Clickable for menu) */}
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="px-2 py-2 text-left rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between group"
        >
          <div className="overflow-hidden">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 group-hover:text-foreground transition-colors">Tài khoản</p>
            <p className="text-sm text-foreground font-medium truncate flex items-center gap-2">
              <User className="w-4 h-4 text-accent shrink-0" />
              <span className="truncate">{email}</span>
            </p>
          </div>
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-card border border-border/50 rounded-xl shadow-lg p-1 animate-in slide-in-from-bottom-2 fade-in duration-200 z-50">
            <button
              onClick={() => {
                setShowMenu(false)
                setShowPasswordModal(true)
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent/10 hover:text-accent transition-colors text-left"
            >
              <KeyRound className="w-4 h-4" />
              Thiết lập Mật khẩu
            </button>
            <div className="h-px bg-border/50 my-1"></div>
            <form action={signOut}>
              <button 
                type="submit"
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border/50 rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-in zoom-in-95 duration-200 relative">
            <h3 className="text-lg font-bold text-foreground mb-1">Thiết lập Mật khẩu</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Tạo mật khẩu để đăng nhập bằng Email và Password cho những lần sau.
            </p>
            
            <form onSubmit={handleSetPassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Mật khẩu mới</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-foreground"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-2 px-4 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20 disabled:opacity-50"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
