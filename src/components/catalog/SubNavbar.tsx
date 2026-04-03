import { useState, useEffect } from 'react'
import { Search, Home, Utensils, Coffee, Cake, Sandwich, Beef } from 'lucide-react'
import { useCatalogStore } from '../../store/catalogSlice'
import { SEARCH_DEBOUNCE_MS } from '../../types/constants'

const categories = [
  { id: null, label: 'All', icon: Home },
  { id: 'Appetizers', label: 'Appetizers', icon: Utensils },
  { id: 'Mains', label: 'Mains', icon: Beef },
  { id: 'Burgers', label: 'Burgers', icon: Sandwich },
  { id: 'Drinks', label: 'Drinks', icon: Coffee },
  { id: 'Desserts', label: 'Desserts', icon: Cake },
]

export function SubNavbar() {
  const searchQuery = useCatalogStore((state) => state.searchQuery)
  const selectedCategory = useCatalogStore((state) => state.selectedCategory)
  const setSearchQuery = useCatalogStore((state) => state.setSearchQuery)
  const setSelectedCategory = useCatalogStore((state) => state.setSelectedCategory)
  const [inputValue, setInputValue] = useState('')

  // Sync input with store on mount
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue)
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [inputValue, setSearchQuery])

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    // Clear search when selecting a category
    if (categoryId !== null) {
      setInputValue('')
      setSearchQuery('')
    }
  }

  return (
    <div className="flex flex-col flex-shrink-0">
      {/* Category Tabs */}
      <div className="h-12 bg-slate-100 border-b border-slate-200 flex items-center px-2 gap-1 overflow-x-auto">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = selectedCategory === cat.id
          return (
            <button
              key={cat.id ?? 'home'}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium min-h-[40px] whitespace-nowrap transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
              aria-label={`Category ${cat.label}`}
              aria-pressed={isActive}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Breadcrumb + Search */}
      <nav
        role="navigation"
        aria-label="Catalog navigation"
        className="h-12 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-4"
      >
        {/* Left: Breadcrumb showing current category */}
        <div className="flex items-center">
          <span className="text-slate-400 text-sm">Home</span>
          {selectedCategory && (
            <>
              <span className="text-slate-400 mx-1">&gt;</span>
              <span className="text-slate-500 font-medium text-sm">
                {categories.find(c => c.id === selectedCategory)?.label || selectedCategory}
              </span>
            </>
          )}
        </div>

        {/* Right: Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value
              setInputValue(value)
              // Clear category selection when searching
              if (value.trim() && selectedCategory) {
                setSelectedCategory(null)
              }
            }}
            className="bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
            aria-label="Search products"
          />
        </div>
      </nav>
    </div>
  )
}