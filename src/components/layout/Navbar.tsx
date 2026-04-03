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
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-emerald-800 to-teal-700 shadow-lg flex items-center justify-between px-6"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
          <Utensils className="w-6 h-6 text-white" />
        </div>
        <span className="text-white text-xl font-bold">Restaurant POS</span>
      </div>

      {/* Center: Admin Name */}
      <div className="text-emerald-100 text-sm font-medium">
        Admin: John Doe
      </div>

      {/* Right: Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2 min-h-[44px] min-w-[44px] transition-all duration-200 shadow-lg hover:shadow-xl"
        aria-label="Logout"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </nav>
  )
}
