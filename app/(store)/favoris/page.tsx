'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useWishlist } from '@/lib/store'
import { getProducts } from '@/lib/api'
import type { Product } from '@/lib/types'
import { productOrderLink } from '@/lib/whatsapp'
import { ProductCard } from '@/components/store/product-card'
import { WhatsAppIcon } from '@/components/store/whatsapp-icon'

export default function WishlistPage() {
  const ids = useWishlist((s) => s.ids)
  const [mounted, setMounted] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setMounted(true)

    async function loadProducts() {
      const products = await getProducts()
      setProducts(products)
    }

    loadProducts()
  }, [])

  const wished = products.filter((p) => ids.includes(p.id))

  if (!mounted) {
    return <div className="mx-auto max-w-6xl px-4 py-16" />
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl text-foreground">Mes favoris</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {wished.length} article{wished.length > 1 ? 's' : ''} enregistré
        {wished.length > 1 ? 's' : ''}
      </p>

      {wished.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <Heart className="size-12 text-muted-foreground" />
          <h2 className="mt-6 font-serif text-2xl text-foreground">
            Aucun favori pour le moment
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cliquez sur le cœur d’un article pour le retrouver ici.
          </p>
          <Link
            href="/boutique"
            className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-8 text-sm font-medium tracking-[0.05em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            Explorer la boutique
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {wished.map((p) => (
            <div key={p.id} className="flex flex-col gap-3">
              <ProductCard product={p} />
              <a
                href={productOrderLink({
                  name: p.name,
                  size: p.sizes[0],
                  color: p.colors[0]?.name ?? '',
                  price: p.price,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center gap-2 rounded-md bg-[#25D366] px-3 text-xs font-medium tracking-[0.05em] text-white uppercase transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon className="size-4" />
                Commander
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
