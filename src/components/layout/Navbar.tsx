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
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900 shadow-lg flex items-center justify-between px-6"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Utensils className="w-6 h-6 text-white" />
        <span className="text-white text-xl font-bold">Restaurant POS</span>
      </div>

      {/* Center: Admin Name */}
      <div className="text-slate-300 text-sm">
        Admin: John Doe
      </div>

      {/* Right: Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 min-h-[44px] min-w-[44px] transition-colors"
        aria-label="Logout"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </nav>
  )
}
