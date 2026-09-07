import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SetTenancyClient } from './SetTenancyClient'

export const dynamic = 'force-dynamic'

export default async function SelectTenancyPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenancies')
    .eq('id', user.id)
    .single()

  const tenancies = profile?.tenancies || ['maycongnghiep']

  // Fetch site names and logos for these tenancies
  const { data: settings } = await supabase
    .from('system_settings')
    .select('tenancy, key, value')
    .in('tenancy', tenancies)
    .in('key', ['site_name', 'site_logo'])

  const tenancyDetails = tenancies.map((t: string) => {
    const nameSetting = settings?.find(s => s.tenancy === t && s.key === 'site_name')
    const logoSetting = settings?.find(s => s.tenancy === t && s.key === 'site_logo')
    return {
      id: t,
      name: nameSetting?.value || (t === 'maycongnghiep' ? 'Máy Công Nghiệp' : t === 'duckhacvitinh' ? 'Đục Khắc Vi Tính' : t),
      logo: logoSetting?.value || null
    }
  })

  // Admin users might have many tenancies. 
  // If they only have one, we can auto-select it via the client component.
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      </div>
      
      <div className="w-full max-w-3xl p-8 z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 text-foreground tracking-tight">Chọn Phân Hệ Quản Trị</h1>
          <p className="text-muted-foreground">Tài khoản của bạn được cấp quyền truy cập nhiều phân hệ. Vui lòng chọn một hệ thống để tiếp tục.</p>
        </div>
        <SetTenancyClient tenancyDetails={tenancyDetails} />
      </div>
    </div>
  )
}
