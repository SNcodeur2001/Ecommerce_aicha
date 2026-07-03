export type Category = {
  id: string
  name: string
  slug: string
  description: string
  image: string
}

export type Brand = {
  id: string
  name: string
  slug: string
  description: string
}

export type Review = {
  id: string
  productId: string
  author: string
  rating: number
  title: string
  comment: string
  date: string
  status: 'published' | 'pending'
}

export type Promotion = {
  id: string
  title: string
  code: string
  discount: number
  active: boolean
  collection: string
}

export type Product = {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  description: string
  material: string
  care: string
  images: string[]
  categorySlug: string
  brandSlug: string
  sizes: string[]
  colors: { name: string; hex: string }[]
  stock: number
  rating: number
  reviewCount: number
  featured: boolean
  bestSeller: boolean
  isNew: boolean
  onSale: boolean
  createdAt: string
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'canceled'

export type OrderItem = {
  productId: string
  name: string
  size: string
  color: string
  price: number
  quantity: number
}

export type Order = {
  id: string
  reference: string
  customerName: string
  customerPhone: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  channel: 'whatsapp'
  date: string
}

export type Customer = {
  id: string
  name: string
  phone: string
  email: string
  city: string
  orders: number
  totalSpent: number
  joined: string
}
