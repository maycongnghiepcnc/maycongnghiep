import Link from 'next/link'
import { Plus, Building2, Phone, Mail, Trash2 } from 'lucide-react'
import { getContacts, deleteContact } from '@/app/actions/crm'
import { ConvertToCustomerButton } from './convert-button'

const statusMap: Record<string, { label: string, color: string }> = {
  new: { label: 'Mới', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  contacted: { label: 'Đã liên hệ', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  qualified: { label: 'Tiềm năng', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  customer: { label: 'Khách hàng', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  lost: { label: 'Từ chối', color: 'bg-muted text-muted-foreground border-border' },
}

export default async function ContactsPage() {
  const contacts = await getContacts()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Liên hệ & Khách hàng</h1>
          <p className="text-muted-foreground text-sm">
            Quản lý danh sách liên hệ, khách hàng tiềm năng và đối tác.
          </p>
        </div>
        <Link 
          href="/crm/contacts/create"
          className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold py-2.5 px-4 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
        >
          <Plus className="w-5 h-5" />
          Thêm liên hệ
        </Link>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-background/50 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Họ và Tên</th>
                <th className="px-6 py-4 font-medium">Thông tin liên lạc</th>
                <th className="px-6 py-4 font-medium">Công ty / Chức vụ</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Chưa có liên hệ nào trong hệ thống.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground space-y-1">
                      {contact.phone && (
                        <div className="flex items-center gap-2 text-xs">
                          <Phone className="w-3 h-3" /> {contact.phone}
                        </div>
                      )}
                      {contact.email && (
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="w-3 h-3" /> {contact.email}
                        </div>
                      )}
                      {!contact.phone && !contact.email && '—'}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex flex-col gap-1">
                        {contact.company ? (
                          <span className="flex items-center gap-1.5 font-medium text-foreground">
                            <Building2 className="w-3.5 h-3.5" /> {contact.company}
                          </span>
                        ) : '—'}
                        {contact.job_title && <span className="text-xs">{contact.job_title}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusMap[contact.status || 'new']?.color}`}>
                        {statusMap[contact.status || 'new']?.label}
                      </span>
                    </td>
                      <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {contact.status !== 'customer' && (
                          <ConvertToCustomerButton contactId={contact.id} />
                        )}
                        <Link
                          href={`/crm/quotations/create?contact_id=${contact.id}`}
                          className="p-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Tạo báo giá"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                        </Link>
                        <Link
                          href={`/crm/contacts/edit/${contact.id}`}
                          className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                          title="Sửa liên hệ"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                        </Link>
                        <form action={async () => {
                          'use server'
                          await deleteContact(contact.id)
                        }}>
                          <button 
                            type="submit"
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            title="Xóa liên hệ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
