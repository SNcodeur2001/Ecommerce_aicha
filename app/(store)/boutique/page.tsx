import { Suspense } from 'react'
import { Catalog } from '@/components/store/catalog'
import { getBrands, getCategories, getProducts } from '@/lib/api'

export default async function BoutiquePage() {
  const [products, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands(),
  ])

  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <Catalog products={products} categories={categories} brands={brands} />
    </Suspense>
  )
}
