
import { LayoutDashboard, Box, BarChart3 } from "lucide-react";
import Link from "next/link";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r">
        <div className="p-6 font-bold text-xl border-b">Admin Panel</div>
        <nav className="p-4 space-y-2">
          {/* Navigation Links */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
            </Link>
          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              <Box className="w-5 h-5" />
            Products
            </Link>
          <Link
            href="/dashboard/analytics" 
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            <BarChart3 className="w-5 h-5" /> 
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top header (optional) */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Welcome to your dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your app easily</p>
        </div>

        {/* Actual Page Content */}
        <div className="bg-white rounded-xl shadow p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
