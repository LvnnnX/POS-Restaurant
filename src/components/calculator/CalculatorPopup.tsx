import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CalculatorPanel } from './CalculatorPanel'

type CalculatorPopupProps = {
  // Element to anchor the popup to (trigger button). This should be a ref to the button.
  anchorRef: React.RefObject<HTMLElement>
  // Whether the popup is visible
  open: boolean
  // Callback to close the popup
  onClose: () => void
}

/**
 * CalculatorPopup
 * A positioned popup that renders the existing CalculatorPanel above a trigger button.
 * - Positioned absolutely above the trigger (not a modal)
 * - Should not take up layout space in the left column
 * - Basic ARIA: role="dialog", labelled by a title, Escape to close
 * - Keyboard focus is directed to the close button and cycles within when open
 */
export default function CalculatorPopup({ anchorRef, open, onClose }: CalculatorPopupProps) {
  const popupRef = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState<{ left: number; top: number }>({ left: 0, top: 0 })

  // Position the popup above the anchor element
  useLayoutEffect(() => {
    if (!open) return
    const anchor = anchorRef.current
    if (!anchor || !popupRef.current) return

    const anchorRect = anchor.getBoundingClientRect()
    // We compute left/top relative to document (page scroll offset)
    const left = anchorRect.left + window.scrollX
    // We subtract the popup height to place it above the button
    const popupHeight = popupRef.current.offsetHeight || 260
    const top = anchorRect.top + window.scrollY - popupHeight - 8

    setCoords({ left, top })
  }, [open, anchorRef.current])

  // Update position on resize/scroll while open
  useEffect(() => {
    if (!open) return
    const update = () => {
      const anchor = anchorRef.current
      const popup = popupRef.current
      if (!anchor || !popup) return
      const r = anchor.getBoundingClientRect()
      const left = r.left + window.scrollX
      const height = popup.offsetHeight
      const top = r.top + window.scrollY - height - 8
      setCoords({ left, top })
    }
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open, anchorRef.current])

  // Basic focus management: focus the close button on open
  useEffect(() => {
    if (open && popupRef.current) {
      const closeBtn = popupRef.current.querySelector('.calculator-popup-close') as HTMLElement | null
      if (closeBtn) closeBtn.focus()
    }
  }, [open])

  // Keyboard handling: Escape to close, and a simple focus trap inside the popup
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
    // Simple focus trap: cycle among focusable elements inside the popup
    if (e.key === 'Tab') {
      const focusables = popupRef.current?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]')
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    }
  }

  // If not open, render nothing
  if (!open) return null

  // Inline styles to ensure absolute positioning with tokens-like fallbacks
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: coords.left,
    top: coords.top,
    width: 320,
    // Design-system-friendly neutrals with fallbacks
    background: 'var(--surface, #1f2937)',
    border: '1px solid var(--border, #374151)',
    borderRadius: 'var(--radius-md, 8px)',
    boxShadow: 'var(--shadow-lg, 0 8px 20px rgba(0,0,0,.25))',
    overflow: 'hidden',
    zIndex: 9999,
  }
  const headerStyle: React.CSSProperties = {
    padding: '8px 12px',
    background: 'linear-gradient(90deg, rgba(2,132,199,0.25), rgba(34,197,94,0.25))',
    color: '#fff',
  }
  const closeStyle: React.CSSProperties = {
    position: 'absolute',
    top: 6,
    right: 6,
    border: 'none',
    background: 'transparent',
    color: '#fff',
    fontSize: 14,
    cursor: 'pointer',
  }

  return (
    <div
      ref={popupRef}
      className="calculator-popup-root"
      style={containerStyle}
      role="dialog"
      aria-label="Calculator popup"
      aria-labelledby="calculator-popup-title"
      data-testid="calculator-popup"
      onKeyDown={onKeyDown}
    >
      <button className="calculator-popup-close" aria-label="Close calculator" onClick={onClose} style={closeStyle} data-testid="calc-close">
        ×
      </button>
      <div id="calculator-popup-title" style={{ ...headerStyle, fontWeight: 600 }}>
        Calculator
      </div>
      {/* Render existing CalculatorPanel to preserve behavior/logic */}
      <div className="p-2" style={{ padding: 12 }}>
        <CalculatorPanel />
      </div>
    </div>
  )
}
