import { createContext, useContext, useState, ReactNode } from 'react'
import { CartItem, Product } from '../types'

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, size: string) => void
  removeItem: (productId: string, size: string) => void
  updateQty: (productId: string, size: string, qty: number) => void
  clearCart: () => void
  totalCount: number
  totalPrice: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (product: Product, size: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size
      )
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { product, size, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (productId: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size === size))
    )
  }

  const updateQty = (productId: string, size: string, qty: number) => {
    if (qty < 1) {
      removeItem(productId, size)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.size === size
          ? { ...i, quantity: qty }
          : i
      )
    )
  }

  const totalCount = items.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = items.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0
  )

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalCount,
        totalPrice,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
