'use client'

import { useState } from 'react'
import { Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/lib/types'
import { useCart, useWishlist } from '@/lib/store'
import { productOrderLink } from '@/lib/whatsapp'
import { cn, normalizeImages } from '@/lib/utils'
import { WhatsAppIcon } from './whatsapp-icon'

export function ProductPurchase({
  product,
  compact = false,
}: {
  product: Product
  compact?: boolean
}) {
  const images = normalizeImages(product.images)
  const [size, setSize] = useState(product.sizes[0])
  const [color, setColor] = useState(product.colors[0]?.name ?? '')
  const [qty, setQty] = useState(1)
  const addItem = useCart((s) => s.addItem)
  const ids = useWishlist((s) => s.ids)
  const toggleWish = useWishlist((s) => s.toggle)
  const isWished = ids.includes(product.id)
  const outOfStock = product.stock === 0

  const waLink = productOrderLink({
    name: product.name,
    size,
    color,
    price: product.price,
  })

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: images[0],
      price: product.price,
      size,
      color,
      quantity: qty,
    })
    toast.success('Ajouté au panier', {
      description: `${product.name} — ${size} / ${color}`,
    })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Size */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-[0.12em] uppercase">Taille</span>
          <button className="text-xs text-muted-foreground underline underline-offset-2">
            Guide des tailles
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                'min-w-11 rounded-md border px-3 py-2 text-sm transition-colors',
                size === s
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-foreground',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <span className="mb-2 block text-xs font-semibold tracking-[0.12em] uppercase">
          Couleur : <span className="font-normal text-muted-foreground">{color}</span>
        </span>
        <div className="flex flex-wrap gap-2.5">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              aria-label={c.name}
              className={cn(
                'size-8 rounded-full border transition-all',
                color === c.name
                  ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background'
                  : 'border-border',
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Quantity */}
      {!compact && (
        <div>
          <span className="mb-2 block text-xs font-semibold tracking-[0.12em] uppercase">
            Quantité
          </span>
          <div className="inline-flex items-center rounded-md border border-border">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex size-10 items-center justify-center transition-colors hover:bg-muted"
              aria-label="Diminuer"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-10 text-center text-sm">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="flex size-10 items-center justify-center transition-colors hover:bg-muted"
              aria-label="Augmenter"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-1 flex flex-col gap-3">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex h-12 items-center justify-center gap-2.5 rounded-md bg-[#25D366] text-sm font-medium tracking-[0.05em] text-white uppercase transition-opacity hover:opacity-90',
            outOfStock && 'pointer-events-none opacity-50',
          )}
        >
          <WhatsAppIcon className="size-5" />
          Commander sur WhatsApp
        </a>
        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md border border-primary bg-background text-sm font-medium tracking-[0.05em] uppercase transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <ShoppingBag className="size-4" />
            {outOfStock ? 'Épuisé' : 'Ajouter au panier'}
          </button>
          <button
            onClick={() => toggleWish(product.id)}
            aria-label="Favoris"
            className="flex size-12 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted"
          >
            <Heart className={cn('size-5', isWished && 'fill-secondary text-secondary')} />
          </button>
        </div>
      </div>
    </div>
  )
}
