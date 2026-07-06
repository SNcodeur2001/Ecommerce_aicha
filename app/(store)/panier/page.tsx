'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/store'
import { cartOrderLink, formatPrice } from '@/lib/whatsapp'
import { WhatsAppIcon } from '@/components/store/whatsapp-icon'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function CartPage() {
  const items = useCart((s) => s.items)
  const updateQuantity = useCart((s) => s.updateQuantity)
  const removeItem = useCart((s) => s.removeItem)
  const [mounted, setMounted] = useState(false)
    // eslint-disable-next-line
  useEffect(() => setMounted(true), [])

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

  if (!mounted) {
    return <div className="mx-auto max-w-5xl px-4 py-16" />
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center">
        <ShoppingBag className="size-12 text-muted-foreground" />
        <h1 className="mt-6 font-serif text-2xl text-foreground">
          Votre panier est vide
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Découvrez nos collections et laissez-vous séduire.
        </p>
        <Link
          href="/boutique"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-8 text-sm font-medium tracking-[0.05em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
        >
          Découvrir la boutique
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl text-foreground">Mon panier</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {items.length} article{items.length > 1 ? 's' : ''}
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col gap-6">
          {items.map((item) => (
            <li
              key={`${item.productId}-${item.size}-${item.color}`}
              className="flex gap-4 border-b border-border pb-6"
            >
              <Link
                href={`/produit/${item.slug}`}
                className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-md bg-muted"
              >
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link
                      href={`/produit/${item.slug}`}
                      className="font-medium text-foreground hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Taille {item.size} · {item.color}
                    </p>
                  </div>
                  <span className="font-medium text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="inline-flex items-center rounded-md border border-border">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          item.quantity - 1,
                        )
                      }
                      className="flex size-9 items-center justify-center hover:bg-muted"
                      aria-label="Diminuer"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          item.quantity + 1,
                        )
                      }
                      className="flex size-9 items-center justify-center hover:bg-muted"
                      aria-label="Augmenter"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      removeItem(item.productId, item.size, item.color)
                    }
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                    Retirer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="font-serif text-lg text-card-foreground">Récapitulatif</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Livraison</span>
              <span className="text-muted-foreground">Calculée sur WhatsApp</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-medium">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>
          </div>

          <a
            href={cartOrderLink(items)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex h-12 items-center justify-center gap-2.5 rounded-md bg-[#25D366] text-sm font-medium tracking-[0.05em] text-white uppercase transition-opacity hover:opacity-90"
          >
            <WhatsAppIcon className="size-5" />
            Finaliser sur WhatsApp
          </a>
          <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
            Votre commande sera confirmée par message. Aucun paiement en ligne
            requis.
          </p>

          <Link
            href="/boutique"
            className="mt-4 block text-center text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Continuer mes achats
          </Link>
        </aside>
      </div>
    </div>
  )
}
