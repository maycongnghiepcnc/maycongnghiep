import { login } from './actions'
import { Mail, ArrowRight, Factory, AlertCircle, CheckCircle2 } from 'lucide-react'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const resolvedSearchParams = await searchParams
  const message = resolvedSearchParams.message

  // Determine if it's an error message based on the content (simple heuristic)
  const isError = message && message.toLowerCase().includes('không thể')

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Industrial Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-background to-background z-0"></div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] z-0"></div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-8 overflow-hidden relative">
          
          {/* Subtle top border highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-primary/50 rounded-2xl border border-border/50 flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <Factory className="w-8 h-8 text-accent relative z-10" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">CNC Portal</h1>
            <p className="text-muted-foreground text-sm font-medium">Hệ thống quản lý nội dung công nghiệp</p>
          </div>

          <form action={login} className="space-y-6">
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

            <button
              type="submit"
              className="w-full group relative flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold py-3 px-4 rounded-xl hover:bg-accent/90 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
              <span className="relative z-10">Đăng nhập</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 border backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500 ${isError ? 'bg-destructive/10 border-destructive/20 text-red-400' : 'bg-accent/10 border-accent/20 text-green-400'}`}>
              {isError ? (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium leading-relaxed">
                {message}
              </p>
            </div>
          )}
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} Máy Công Nghiệp CNC. Bảo lưu mọi quyền.
        </p>
      </div>
    </div>
  )
}
