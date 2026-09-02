import { Package, PackageSearch, Users, Activity } from 'lucide-react'

export default async function DashboardOverview() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Tổng quan</h1>
        <p className="text-muted-foreground text-sm">
          Chào mừng đến với Portal Quản lý. Theo dõi hoạt động và các chỉ số hệ thống tại đây.
        </p>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-lg flex flex-col hover:border-accent/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Tổng Sản Phẩm</span>
            <div className="p-2 bg-primary/20 rounded-lg text-primary-foreground">
              <Package className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground">1,248</div>
          <div className="text-xs text-accent mt-2 flex items-center gap-1 font-medium">
            +12% <span className="text-muted-foreground">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-lg flex flex-col hover:border-accent/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Danh Mục</span>
            <div className="p-2 bg-primary/20 rounded-lg text-primary-foreground">
              <PackageSearch className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground">24</div>
          <div className="text-xs text-muted-foreground mt-2 font-medium">
            3 danh mục mới trong tuần
          </div>
        </div>

        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-lg flex flex-col hover:border-accent/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Lượt Xem</span>
            <div className="p-2 bg-primary/20 rounded-lg text-primary-foreground">
              <Activity className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground">45.2K</div>
          <div className="text-xs text-accent mt-2 flex items-center gap-1 font-medium">
            +8.4% <span className="text-muted-foreground">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-lg flex flex-col hover:border-accent/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Tài Khoản</span>
            <div className="p-2 bg-primary/20 rounded-lg text-primary-foreground">
              <Users className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground">12</div>
          <div className="text-xs text-muted-foreground mt-2 font-medium">
            2 quản trị viên đang online
          </div>
        </div>
      </div>

      {/* Main Feature Area */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-lg min-h-[400px]">
          <h2 className="text-lg font-bold mb-4">Hoạt động gần đây</h2>
          <div className="flex items-center justify-center h-[300px] border border-dashed border-border rounded-xl">
             <span className="text-muted-foreground font-medium">Biểu đồ dữ liệu sẽ hiển thị ở đây</span>
          </div>
        </div>
        
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold mb-4">Lối tắt</h2>
          <div className="flex flex-col gap-3">
            <button className="w-full text-left p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent hover:bg-accent/5 transition-all text-sm font-medium">
              + Thêm Sản Phẩm Mới
            </button>
            <button className="w-full text-left p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent hover:bg-accent/5 transition-all text-sm font-medium">
              + Tạo Danh Mục Mới
            </button>
            <button className="w-full text-left p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent hover:bg-accent/5 transition-all text-sm font-medium">
              ⚙️ Chỉnh sửa cấu hình chung
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
