export interface Product {
  id: string
  name: string
  price: number
  description: string
  sizes: string[]
  images: string[]
  category: 'jackets' | 'sweatshirts'
  isNew?: boolean
  isPopular?: boolean
  transformNote?: string
  materials?: string
  fit?: string
}

export interface CartItem {
  product: Product
  size: string
  quantity: number
}
