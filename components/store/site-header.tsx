'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart, useWishlist } from '@/lib/store'
import { getCategories } from '@/lib/api'
import type { Category } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useMenu } from '@/components/store/menu-context'

const navLinks = [
  { href: '/boutique', label: 'Boutique' },
  { href: '/boutique?cat=ensembles', label: 'Ensembles' },
  { href: '/boutique?cat=nuisettes', label: 'Nuisettes' },
  { href: '/boutique?cat=mariee', label: 'Mariée' },
]

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const { open, setOpen } = useMenu()
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const wishCount = useWishlist((s) => s.ids.length)

  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)

    async function loadCategories() {
      const categories = await getCategories()
      setCategories(categories)
    }

    loadCategories()
  }, [])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
    >
      {/* TOP BAR */}
      <p className="bg-primary py-2 text-center text-xs uppercase tracking-[0.2em] text-primary-foreground">
        Livraison offerte dès 50.000 FCFA · Commande WhatsApp
      </p>

      {/* HEADER */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

        <button className="md:hidden" onClick={() => setOpen(true)}>
          <Menu className="size-5" />
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.slice(0, 2).map((l) => (
            <Link key={l.label} href={l.href} className="text-sm text-black/70 hover:text-black">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="font-serif text-2xl tracking-[0.15em] md:text-3xl">
          LUMIÈRE
        </Link>

        <div className="flex items-center gap-5">
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.slice(2).map((l) => (
              <Link key={l.label} href={l.href} className="text-sm text-black/70 hover:text-black">
                {l.label}
              </Link>
            ))}
          </nav>

          <Search className="hidden sm:block size-5 text-black/70" />

          <Link href="/favoris" className="relative">
            <Heart className="size-5 text-black/70" />
            {mounted && wishCount > 0 && (
              <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {wishCount}
              </span>
            )}
          </Link>

          <Link href="/panier" className="relative">
            <ShoppingBag className="size-5 text-black/70" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>
</div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setOpen(false)}
      >
        {/* BACKDROP */}
        <div className="absolute inset-0 bg-black/25" />

        {/* PANEL */}
        <div
          className={cn(
            'absolute left-0 top-0 h-full w-[88vw] max-w-[360px] shadow-2xl transition-transform duration-300 ease-out',
            open ? 'translate-x-0' : '-translate-x-full'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* GLASS LAYER */}
          <div className="h-full w-full bg-white/70 backdrop-blur-2xl border-r border-white/20">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-6">
              <span className="font-serif text-xl tracking-[0.15em]">
                LUMIÈRE
              </span>
              <button onClick={() => setOpen(false)}>
                <X className="size-5" />
              </button>
            </div>

            {/* NAV */}
            <nav className="flex flex-col px-6 pt-4">
              <Link
                href="/boutique"
                onClick={() => setOpen(false)}
                className="flex h-14 items-center border-b border-black/10 text-[15px] font-semibold tracking-wide hover:text-black"
              >
                Toute la boutique
              </Link>

              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/boutique?cat=${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex h-14 items-center border-b border-black/10 text-[15px] font-semibold tracking-wide hover:text-black"
                >
                  {c.name}
                </Link>
              ))}

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex h-14 items-center border-b border-black/10 text-[15px] font-semibold tracking-wide hover:text-black"
              >
                Contact
              </Link>
            </nav>

          </div>
        </div>
      </div>
    </header>
  )
}