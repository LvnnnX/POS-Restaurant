import { useState, useCallback } from 'react'

export function CalculatorPanel() {
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

  return (
    <div className="h-full flex flex-col bg-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 flex-shrink-0">
        <h3 className="text-lg font-medium">Calculator</h3>
      </div>
      
      {/* Display */}
      <div className="bg-slate-900 text-emerald-400 text-right text-2xl p-4 font-mono border-b border-slate-700 flex-shrink-0">
        {display}
      </div>
      
      {/* Buttons */}
      <div className="flex-1 grid grid-cols-4 gap-1 p-3">
        {buttons.flat().map((btn) => (
          <button
            key={btn}
            onClick={() => handleButton(btn)}
            className={`rounded-lg text-lg font-medium min-h-[44px] transition-colors ${
              btn === '='
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg'
                : btn === 'C'
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                : ['+', '-', '×', '÷'].includes(btn)
                ? 'bg-slate-700 hover:bg-slate-600 text-emerald-400 shadow-lg'
                : 'bg-slate-600 hover:bg-slate-500 text-white shadow-lg'
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