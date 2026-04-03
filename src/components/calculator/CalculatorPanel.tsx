import { useState, useCallback } from 'react'
import { useUIStore } from '../../store/uiSlice'
import { X } from 'lucide-react'

export function CalculatorPanel() {
  const isCalculatorOpen = useUIStore((state) => state.isCalculatorOpen)
  const toggleCalculator = useUIStore((state) => state.toggleCalculator)
  const [display, setDisplay] = useState('0')

  // Safe calculation without eval
  const calculate = useCallback((expr: string): string => {
    try {
      // Replace symbols for calculation
      const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/[^0-9+\-*/.]/g, '')
      
      // Simple parser: evaluate left-to-right (basic operations)
      const tokens = sanitized.split(/([+\-*/])/).filter(t => t)
      if (tokens.length === 0) return '0'
      
      let result = parseFloat(tokens[0])
      if (isNaN(result)) return '0'
      
      for (let i = 1; i < tokens.length; i += 2) {
        const op = tokens[i]
        const num = parseFloat(tokens[i + 1])
        if (isNaN(num)) continue
        
        switch (op) {
          case '+': result += num; break
          case '-': result -= num; break
          case '*': result *= num; break
          case '/': result = num !== 0 ? result / num : 0; break
        }
      }
      
      // Round to 2 decimal places
      return String(Math.round(result * 100) / 100)
    } catch {
      return 'Error'
    }
  }, [])

  const handleButton = (value: string) => {
    if (value === 'C') {
      setDisplay('0')
    } else if (value === '=') {
      setDisplay(calculate(display))
    } else if (['+', '-', '*', '/'].includes(value)) {
      // Add operator with display symbol
      const symbols: Record<string, string> = { '*': '×', '/': '÷' }
      setDisplay(display + (symbols[value] || value))
    } else {
      // Add digit
      setDisplay(display === '0' ? value : display + value)
    }
  }

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['C', '0', '=', '+']
  ]

  if (!isCalculatorOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleCalculator}
      />
      
      {/* Calculator Overlay */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden min-w-[280px]">
        {/* Header */}
        <div className="bg-emerald-600 text-white px-4 py-2 flex items-center justify-between">
          <h3 className="text-lg font-medium">Calculator</h3>
          <button 
            onClick={toggleCalculator}
            className="text-white hover:bg-emerald-700 rounded-full p-1 transition-colors"
            aria-label="Close calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Display */}
        <div className="bg-slate-800 text-white text-right text-2xl p-4 font-mono">
          {display}
        </div>
        
        {/* Buttons */}
        <div className="grid grid-cols-4 gap-1 p-3">
          {buttons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => handleButton(btn)}
              className={`rounded-lg py-3 text-lg font-medium min-h-[44px] transition-colors ${
                btn === '='
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : btn === 'C'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : ['+', '-', '×', '÷'].includes(btn)
                  ? 'bg-slate-600 hover:bg-slate-700 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
              aria-label={`Calculator ${btn}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}