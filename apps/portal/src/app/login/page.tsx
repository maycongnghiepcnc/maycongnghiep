import { login } from './actions'
import { Factory, AlertCircle, CheckCircle2 } from 'lucide-react'
import { LoginForm } from './login-form'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const resolvedSearchParams = await searchParams
  const message = resolvedSearchParams.message

  const isError = Boolean(message && (
    message.toLowerCase().includes('không thể') ||
    message.toLowerCase().includes('thất bại')
  ))

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
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Admin Portal</h1>
            <p className="text-muted-foreground text-sm font-medium">Hệ thống quản lý nội dung công nghiệp</p>
          </div>

          <LoginForm initialMessage={message} isError={isError} />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} Máy Công Nghiệp CNC. Bảo lưu mọi quyền.
        </p>
      </div>
    </div>
  )
}
