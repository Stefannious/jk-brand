import { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '../types'

interface WishlistContextValue {
  items: Product[]
  toggle: (product: Product) => void
  has: (id: string) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  const toggle = (product: Product) => {
    setItems(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    )
  }

  const has = (id: string) => items.some(p => p.id === id)

  return (
    <WishlistContext.Provider value={{ items, toggle, has, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be inside WishlistProvider')
  return ctx
}
