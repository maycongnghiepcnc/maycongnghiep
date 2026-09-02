import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="font-bold text-lg">Bảng điều khiển Portal</div>
          <div className="flex items-center gap-4">
            Xin chào, {user.email}!
            <form action={signOut}>
              <button className="bg-foreground py-2 px-4 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition">
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col max-w-4xl opacity-0 px-3 w-full mt-10">
        <h1 className="text-3xl font-bold mb-6">Quản lý Sản phẩm</h1>
        <p className="text-gray-600 mb-8">
          Chào mừng đến với Portal Máy Công Nghiệp. Bạn có thể quản lý sản phẩm, nội dung và cài đặt tại đây.
        </p>
        
        {/* Placeholder for future product list */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="border rounded-lg p-6 bg-gray-50 shadow-sm flex flex-col items-center justify-center min-h-[150px]">
             <span className="text-gray-400 font-medium">Danh sách sản phẩm sẽ hiển thị ở đây</span>
          </div>
        </div>
      </div>
    </div>
  )
}
