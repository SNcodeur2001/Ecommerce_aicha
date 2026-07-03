'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/whatsapp'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { RatingStars } from './rating-stars'
import { ProductPurchase } from './product-purchase'

export function QuickView({
  product,
  open,
  onOpenChange,
}: {
  product: Product
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl sm:max-w-3xl p-0 overflow-hidden">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-[3/4] bg-muted">
            <Image
              src={product.images[0] || '/placeholder.svg'}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div>
              <RatingStars rating={product.rating} size={13} />
              <DialogTitle className="mt-2 font-serif text-xl leading-snug">
                {product.name}
              </DialogTitle>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-medium">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <ProductPurchase product={product} compact />
            <Link
              href={`/produit/${product.slug}`}
              className="text-center text-xs tracking-[0.1em] text-muted-foreground uppercase underline underline-offset-4 hover:text-foreground"
            >
              Voir tous les détails
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
