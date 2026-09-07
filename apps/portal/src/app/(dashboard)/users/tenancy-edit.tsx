'use client'

import { useState } from 'react'
import { updateUserTenancies } from '@/app/actions/users'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

export function TenancyEdit({ userId, initialTenancies, currentUserRole }: { userId: string, initialTenancies: string[], currentUserRole: string | null }) {
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<string[]>(initialTenancies || [])
  const [isEditing, setIsEditing] = useState(false)

  if (currentUserRole !== 'super_admin') {
    return <div className="text-xs text-muted-foreground mt-1">Tenancies: {initialTenancies?.join(', ')}</div>
  }

  const allTenancies = ['maycongnghiep', 'duckhacvitinh']

  const handleToggle = (t: string) => {
    setSelected(prev => 
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    )
  }

  const handleSave = async () => {
    if (selected.length === 0) {
      toast.error('Phải chọn ít nhất 1 tenancy!')
      return
    }
    
    setLoading(true)
    try {
      const res = await updateUserTenancies(userId, selected)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success('Đã cập nhật tenancy!')
        setIsEditing(false)
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  if (!isEditing) {
    return (
      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
        <span>Tenancies: {initialTenancies?.join(', ') || 'None'}</span>
        <button 
          onClick={() => setIsEditing(true)}
          className="text-accent hover:underline text-[10px] font-medium uppercase"
        >
          Sửa
        </button>
      </div>
    )
  }

  return (
    <div className="mt-2 bg-background border border-border/50 rounded-lg p-3 max-w-sm">
      <div className="text-xs font-semibold mb-2">Chọn Tenancy:</div>
      <div className="flex flex-col gap-2 mb-3">
        {allTenancies.map(t => (
          <label key={t} className="flex items-center gap-2 text-xs cursor-pointer">
            <input 
              type="checkbox" 
              checked={selected.includes(t)}
              onChange={() => handleToggle(t)}
              className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-accent"
            />
            {t}
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-accent text-accent-foreground px-3 py-1 rounded text-xs font-medium flex items-center gap-1 hover:bg-accent/90"
        >
          {loading && <Loader2 className="w-3 h-3 animate-spin" />}
          Lưu
        </button>
        <button 
          onClick={() => {
            setSelected(initialTenancies || [])
            setIsEditing(false)
          }}
          disabled={loading}
          className="bg-muted text-muted-foreground px-3 py-1 rounded text-xs font-medium hover:bg-muted/80"
        >
          Hủy
        </button>
      </div>
    </div>
  )
}
