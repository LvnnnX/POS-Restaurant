import { Utensils, LogOut } from 'lucide-react'

export function Navbar() {
  const handleLogout = () => {
    console.log('Logout clicked')
    alert('Logout functionality placeholder')
  }

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-slate-800 to-slate-700 shadow-lg flex items-center justify-between px-6 border-b border-emerald-700"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-emerald-600/20 p-2 rounded-lg backdrop-blur-sm border border-emerald-500">
          <Utensils className="w-6 h-6 text-emerald-400" />
        </div>
        <span className="text-white text-xl font-bold">Warung Nusantara</span>
      </div>

      {/* Center: Admin Name */}
      <div className="text-emerald-300 text-sm font-medium">
        Admin: John Doe
      </div>

      {/* Right: Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2 min-h-[44px] min-w-[44px] transition-all duration-200 shadow-lg hover:shadow-xl"
        aria-label="Logout"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </nav>
  )
}
