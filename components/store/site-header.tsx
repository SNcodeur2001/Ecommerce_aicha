'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart, useWishlist } from '@/lib/store'
import { getCategories } from '@/lib/api'
import type { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/boutique', label: 'Boutique' },
  { href: '/boutique?cat=ensembles', label: 'Ensembles' },
  { href: '/boutique?cat=nuisettes', label: 'Nuisettes' },
  { href: '/boutique?cat=mariee', label: 'Mariée' },
]

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const wishCount = useWishlist((s) => s.ids.length)

  // Measure header height and expose as CSS variable --site-header-height
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)

    async function loadCategories() {
      const categories = await getCategories()
      setCategories(categories)
    }

    loadCategories()

    function updateHeaderHeight() {
      const h = headerRef.current?.getBoundingClientRect().height || 0
      document.documentElement.style.setProperty('--site-header-height', `${Math.round(h)}px`)
    }

    updateHeaderHeight()

    const ro = new ResizeObserver(updateHeaderHeight)
    if (headerRef.current) ro.observe(headerRef.current)
    window.addEventListener('resize', updateHeaderHeight)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', updateHeaderHeight)
    }
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md transition-all duration-300 ease-out">
      <p className="bg-primary py-2 text-center text-xs tracking-[0.2em] text-primary-foreground uppercase">
        Livraison offerte dès 50.000 FCFA · Commande facile sur WhatsApp
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
              className="text-sm text-foreground/80 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-foreground"
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
                className="text-sm text-foreground/80 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-foreground"
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
          'fixed inset-0 z-50 bg-white/95 transition-opacity md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      >
        <div
          className={cn(
            'absolute top-0 left-0 h-full w-72 bg-white p-6 shadow-xl transition-transform',
            open ? 'translate-x-0' : '-translate-x-full',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-serif text-xl tracking-[0.15em]">LUMIÈRE</span>
            <button onClick={() => setOpen(false)} aria-label="Fermer le menu" className="text-black">
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              href="/boutique"
              onClick={() => setOpen(false)}
              className="border-b border-black py-3 text-sm text-black transition-colors duration-200 ease-out hover:text-foreground"
            >
              Toute la boutique
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/boutique?cat=${c.slug}`}
                onClick={() => setOpen(false)}
                className="border-b border-black py-3 text-sm text-black transition-colors duration-200 ease-out hover:text-foreground"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="border-b border-black py-3 text-sm text-black transition-colors duration-200 ease-out hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
