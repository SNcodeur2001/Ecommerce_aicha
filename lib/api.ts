import {
  brands as fallbackBrands,
  categories as fallbackCategories,
  customers as fallbackCustomers,
  orders as fallbackOrders,
  products as fallbackProducts,
  promotions as fallbackPromotions,
  reviews as fallbackReviews,
} from './data'
import type {
  Brand,
  Category,
  Customer,
  Order,
  Product,
  Promotion,
  Review,
} from './types'

const API_URL = (process.env.NEXT_PUBLIC_JSON_SERVER_URL || 'http://127.0.0.1:4000').replace('http://localhost', 'http://127.0.0.1')

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 30 },
    })

    if (!response.ok) {
      return fallback
    }

    return (await response.json()) as T
  } catch {
    return fallback
  }
}

export function getProducts() {
  return fetchJson<Product[]>('/products', fallbackProducts)
}

export function getCategories() {
  return fetchJson<Category[]>('/categories', fallbackCategories)
}

export function getBrands() {
  return fetchJson<Brand[]>('/brands', fallbackBrands)
}

export function getReviews() {
  return fetchJson<Review[]>('/reviews', fallbackReviews)
}

export function getPromotions() {
  return fetchJson<Promotion[]>('/promotions', fallbackPromotions)
}

export function getCustomers() {
  return fetchJson<Customer[]>('/customers', fallbackCustomers)
}

export function getOrders() {
  return fetchJson<Order[]>('/orders', fallbackOrders)
}

export async function getProductBySlugFromApi(slug: string) {
  const products = await getProducts()
  return products.find((product) => product.slug === slug)
}

export async function getReviewsForProductFromApi(productId: string) {
  const reviews = await getReviews()
  return reviews.filter(
    (review) => review.productId === productId && review.status === 'published',
  )
}

export async function getRelatedProductsFromApi(product: Product, limit = 4) {
  const products = await getProducts()

  return products
    .filter((item) => item.id !== product.id && item.categorySlug === product.categorySlug)
    .concat(products.filter((item) => item.id !== product.id && item.categorySlug !== product.categorySlug))
    .slice(0, limit)
}

export async function getAdminData() {
  const [products, categories, brands, customers, orders, promotions, reviews] =
    await Promise.all([
      getProducts(),
      getCategories(),
      getBrands(),
      getCustomers(),
      getOrders(),
      getPromotions(),
      getReviews(),
    ])

  return { products, categories, brands, customers, orders, promotions, reviews }
}

export { API_URL }

export async function createReview(review: Omit<Review, 'id'> & { id?: string }) {
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    })

    if (!response.ok) {
      throw new Error('Failed to create review')
    }

    return (await response.json()) as Review
  } catch {
    return null
  }
}
