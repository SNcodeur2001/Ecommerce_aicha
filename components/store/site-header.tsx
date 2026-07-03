'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart, useWishlist } from '@/lib/store'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/boutique', label: 'Boutique' },
  { href: '/boutique?cat=ensembles', label: 'Ensembles' },
  { href: '/boutique?cat=nuisettes', label: 'Nuisettes' },
  { href: '/boutique?cat=mariee', label: 'Mariée' },
  { href: '/a-propos', label: 'Maison' },
]

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const wishCount = useWishlist((s) => s.ids.length)

  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <p className="bg-primary py-2 text-center text-xs tracking-[0.2em] text-primary-foreground uppercase">
        Livraison offerte dès 120 € · Commande facile sur WhatsApp
      </p>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <button
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu className="size-5" />
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.slice(0, 3).map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.15em] text-foreground md:text-3xl"
        >
          LUMIÈRE
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.slice(3).map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/boutique" aria-label="Rechercher" className="hidden sm:block">
            <Search className="size-5 text-foreground/80 transition-colors hover:text-foreground" />
          </Link>
          <Link href="/favoris" aria-label="Favoris" className="relative">
            <Heart className="size-5 text-foreground/80 transition-colors hover:text-foreground" />
            {mounted && wishCount > 0 && (
              <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-secondary-foreground">
                {wishCount}
              </span>
            )}
          </Link>
          <Link href="/panier" aria-label="Panier" className="relative">
            <ShoppingBag className="size-5 text-foreground/80 transition-colors hover:text-foreground" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-foreground/40 transition-opacity md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      >
        <div
          className={cn(
            'absolute top-0 left-0 h-full w-72 bg-background p-6 shadow-xl transition-transform',
            open ? 'translate-x-0' : '-translate-x-full',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-serif text-xl tracking-[0.15em]">LUMIÈRE</span>
            <button onClick={() => setOpen(false)} aria-label="Fermer le menu">
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              href="/boutique"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm"
            >
              Toute la boutique
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/boutique?cat=${c.slug}`}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/a-propos"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm"
            >
              La Maison
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
