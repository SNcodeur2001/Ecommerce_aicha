import { Suspense } from 'react'
import { Catalog } from '@/components/store/catalog'

export default function BoutiquePage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <Catalog />
    </Suspense>
  )
}
