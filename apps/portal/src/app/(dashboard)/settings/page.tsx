import { getSetting } from '@/app/actions/settings'
import { SettingsForm } from './settings-form'

export default async function SettingsPage() {
  const [
    adminEmail, 
    companyName, 
    companyAddress, 
    companyPhone, 
    companyEmail, 
    companyZalo, 
    companyFb,
    homeHeroBanner
  ] = await Promise.all([
    getSetting('admin_email'),
    getSetting('company_name'),
    getSetting('company_address'),
    getSetting('company_phone'),
    getSetting('company_email'),
    getSetting('company_zalo'),
    getSetting('company_fb'),
    getSetting('home_hero_banner')
  ])

  const initialSettings = {
    admin_email: adminEmail || '',
    company_name: companyName || '',
    company_address: companyAddress || '',
    company_phone: companyPhone || '',
    company_email: companyEmail || '',
    company_zalo: companyZalo || '',
    company_fb: companyFb || '',
    home_hero_banner: homeHeroBanner || ''
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Cài đặt Hệ thống</h1>
        <p className="text-muted-foreground text-sm">
          Quản lý các cấu hình chung của toàn hệ thống và thông tin công ty.
        </p>
      </div>

      <SettingsForm initialSettings={initialSettings} />
    </div>
  )
}
