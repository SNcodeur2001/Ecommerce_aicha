'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, Heart } from 'lucide-react'
import type { Product } from '@/lib/types'
import { useWishlist } from '@/lib/store'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/whatsapp'
import { RatingStars } from './rating-stars'
import { QuickView } from './quick-view'

export function ProductCard({ product }: { product: Product }) {
  const ids = useWishlist((s) => s.ids)
  const toggle = useWishlist((s) => s.toggle)
  const [quickOpen, setQuickOpen] = useState(false)
  const isWished = ids.includes(product.id)
  const outOfStock = product.stock === 0

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
        <Link href={`/produit/${product.slug}`}>
          <Image
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.1em] uppercase">
              Nouveau
            </span>
          )}
          {product.onSale && product.compareAtPrice && (
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium tracking-[0.1em] text-secondary-foreground uppercase">
              -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
            </span>
          )}
          {outOfStock && (
            <span className="rounded-full bg-foreground/80 px-2.5 py-1 text-[10px] font-medium tracking-[0.1em] text-background uppercase">
              Épuisé
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggle(product.id)}
          aria-label={isWished ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-background/90 shadow-sm transition-transform hover:scale-110"
        >
          <Heart
            className={cn(
              'size-4 transition-colors',
              isWished ? 'fill-secondary text-secondary' : 'text-foreground',
            )}
          />
        </button>

        {/* Quick view */}
        <button
          onClick={() => setQuickOpen(true)}
          className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-md bg-background/95 py-2.5 text-xs font-medium tracking-[0.1em] uppercase opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="size-3.5" />
          Aperçu rapide
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <RatingStars rating={product.rating} size={12} />
        <Link
          href={`/produit/${product.slug}`}
          className="mt-0.5 font-serif text-base leading-snug text-foreground transition-colors hover:text-foreground/70"
        >
          {product.name}
        </Link>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="text-sm font-medium">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      <QuickView product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </div>
  )
}
