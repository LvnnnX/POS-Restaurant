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
    <div className="flex flex-col flex-shrink-0 bg-white">
      {/* Category Tabs */}
      <div className="h-14 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200 flex items-center px-4 gap-2 overflow-x-auto">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = selectedCategory === cat.id
          return (
            <button
              key={cat.id ?? 'home'}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium min-h-[42px] whitespace-nowrap transition-all duration-200 ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                  : 'bg-white/80 text-emerald-700 hover:bg-emerald-100 hover:shadow-md border border-emerald-200'
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

      {/* Search Bar */}
      <div className="h-12 bg-white border-b border-emerald-100 flex items-center justify-between px-4">
        {/* Left: Breadcrumb */}
        <div className="flex items-center">
          <span className="text-emerald-400 text-sm">Home</span>
          {selectedCategory && (
            <>
              <span className="text-emerald-400 mx-2">•</span>
              <span className="text-emerald-600 font-medium text-sm">
                {categories.find(c => c.id === selectedCategory)?.label || selectedCategory}
              </span>
            </>
          )}
        </div>

        {/* Right: Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value
              setInputValue(value)
              // Clear category selection when searching
              if (value.trim() && selectedCategory) {
                setSelectedCategory(null)
              }
            }}
            className="bg-emerald-50/50 border border-emerald-200 rounded-xl pl-9 pr-4 py-2 text-sm w-56 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 min-h-[40px] placeholder-emerald-400"
            aria-label="Search products"
          />
        </div>
      </div>
    </div>
  )
}