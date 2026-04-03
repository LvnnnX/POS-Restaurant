import { useState, useCallback } from 'react'
import { useUIStore } from '../../store/uiSlice'

export function CalculatorPanel() {
  const isCalculatorOpen = useUIStore((state) => state.isCalculatorOpen)
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
      if (isNaN(result)) return 'Error'
      
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
    <div className="border-t border-slate-200 bg-slate-50">
      <div className="bg-slate-800 text-white text-right text-2xl p-3 font-mono">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1 p-2">
        {buttons.flat().map((btn) => (
          <button
            key={btn}
            onClick={() => handleButton(btn)}
            className={`rounded-lg py-3 text-lg font-medium min-h-[44px] transition-colors ${
              btn === '='
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : btn === 'C'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : ['+', '-', '×', '÷'].includes(btn)
                ? 'bg-slate-400 hover:bg-slate-500 text-white'
                : 'bg-white hover:bg-slate-100'
            }`}
            aria-label={`Calculator ${btn}`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  )
}