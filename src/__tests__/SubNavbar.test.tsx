import { render, screen } from '@testing-library/react'
import { SubNavbar } from '../components/catalog/SubNavbar'
import { useUIStore } from '../store/uiSlice'
import { describe, it, expect, beforeEach } from 'vitest'

beforeEach(() => {
  useUIStore.setState({ breadcrumbs: [{ label: 'Home', path: '/' }] })
})

describe('SubNavbar', () => {
  it('renders breadcrumbs', () => {
    render(<SubNavbar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('has search input', () => {
    render(<SubNavbar />)
    expect(screen.getByRole('textbox', { name: /search products/i })).toBeInTheDocument()
  })
})
