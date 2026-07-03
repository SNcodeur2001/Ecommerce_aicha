'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { allSizes, allColors } from '@/lib/data'
import type { Brand, Category, Product } from '@/lib/types'
import { ProductCard } from './product-card'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const PER_PAGE = 6
const priceBands = [
  { label: 'Moins de 75 €', min: 0, max: 74.99 },
  { label: '75 € – 100 €', min: 75, max: 100 },
  { label: 'Plus de 100 €', min: 100.01, max: Infinity },
]

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'

export function Catalog({
  products,
  categories,
  brands,
}: {
  products: Product[]
  categories: Category[]
  brands: Brand[]
}) {
  const params = useSearchParams()
  const initialCat = params.get('cat') ?? ''

  const [search, setSearch] = useState('')
  const [cat, setCat] = useState<string>(initialCat)
  const [brand, setBrand] = useState<string>('')
  const [size, setSize] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [band, setBand] = useState<number | null>(null)
  const [sort, setSort] = useState<Sort>('featured')
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
      if (cat && p.categorySlug !== cat) return false
      if (brand && p.brandSlug !== brand) return false
      if (size && !p.sizes.includes(size)) return false
      if (color && !p.colors.some((c) => c.name === color)) return false
      if (band !== null) {
        const b = priceBands[band]
        if (p.price < b.min || p.price > b.max) return false
      }
      return true
    })

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'newest':
          return b.createdAt.localeCompare(a.createdAt)
        case 'rating':
          return b.rating - a.rating
        default:
          return Number(b.featured) - Number(a.featured)
      }
    })
    return list
  }, [search, cat, brand, size, color, band, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const paged = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const activeCount =
    (cat ? 1 : 0) + (brand ? 1 : 0) + (size ? 1 : 0) + (color ? 1 : 0) + (band !== null ? 1 : 0)

  function reset() {
    setCat('')
    setBrand('')
    setSize('')
    setColor('')
    setBand(null)
    setSearch('')
    setPage(1)
  }

  const Filters = (
    <div className="flex flex-col gap-8">
      <FilterGroup title="Catégorie">
        <div className="flex flex-col gap-2">
          <RadioRow label="Toutes" checked={cat === ''} onClick={() => { setCat(''); setPage(1) }} />
          {categories.map((c) => (
            <RadioRow
              key={c.id}
              label={c.name}
              checked={cat === c.slug}
              onClick={() => { setCat(c.slug); setPage(1) }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Marque">
        <div className="flex flex-col gap-2">
          <RadioRow label="Toutes" checked={brand === ''} onClick={() => { setBrand(''); setPage(1) }} />
          {brands.map((b) => (
            <RadioRow
              key={b.id}
              label={b.name}
              checked={brand === b.slug}
              onClick={() => { setBrand(b.slug); setPage(1) }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Prix">
        <div className="flex flex-col gap-2">
          <RadioRow label="Tous les prix" checked={band === null} onClick={() => { setBand(null); setPage(1) }} />
          {priceBands.map((b, i) => (
            <RadioRow
              key={b.label}
              label={b.label}
              checked={band === i}
              onClick={() => { setBand(i); setPage(1) }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Taille">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => { setSize(size === s ? '' : s); setPage(1) }}
              className={cn(
                'rounded-md border px-3 py-1.5 text-xs transition-colors',
                size === s ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-foreground',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Couleur">
        <div className="flex flex-wrap gap-2.5">
          {allColors.map((c) => (
            <button
              key={c.name}
              onClick={() => { setColor(color === c.name ? '' : c.name); setPage(1) }}
              aria-label={c.name}
              title={c.name}
              className={cn(
                'size-7 rounded-full border transition-all',
                color === c.name ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background' : 'border-border',
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </FilterGroup>

      {activeCount > 0 && (
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          <X className="size-3.5" /> Réinitialiser les filtres
        </button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl md:text-4xl">La Boutique</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {filtered.length} pièce{filtered.length > 1 ? 's' : ''} pour sublimer votre garde-robe
        </p>
      </div>

      {/* Search + sort */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="Rechercher une pièce…"
          className="h-11 w-full rounded-md border border-border bg-background px-4 text-sm outline-none focus:border-foreground sm:max-w-xs"
        />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex h-11 items-center gap-2 rounded-md border border-border px-4 text-sm lg:hidden"
          >
            <SlidersHorizontal className="size-4" /> Filtres
            {activeCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {activeCount}
              </span>
            )}
          </button>
          <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
            <SelectTrigger className="h-11 w-48">
              <SelectValue placeholder="Trier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Recommandés</SelectItem>
              <SelectItem value="newest">Nouveautés</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
              <SelectItem value="rating">Mieux notés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Desktop filters */}
        <aside className="hidden lg:block">{Filters}</aside>

        {/* Mobile filters */}
        {filtersOpen && (
          <div className="rounded-lg border border-border p-6 lg:hidden">{Filters}</div>
        )}

        {/* Products */}
        <div>
          {paged.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-24 text-center">
              <p className="font-serif text-xl">Aucune pièce trouvée</p>
              <p className="text-sm text-muted-foreground">Essayez de modifier vos filtres.</p>
              <button onClick={reset} className="mt-2 text-sm underline underline-offset-4">
                Réinitialiser
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
              {paged.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={cn(
                    'flex size-10 items-center justify-center rounded-md border text-sm transition-colors',
                    current === i + 1
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-foreground',
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase">{title}</h3>
      {children}
    </div>
  )
}

function RadioRow({
  label,
  checked,
  onClick,
}: {
  label: string
  checked: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 text-left text-sm transition-colors',
        checked ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <span
        className={cn(
          'flex size-4 items-center justify-center rounded-full border',
          checked ? 'border-primary' : 'border-border',
        )}
      >
        {checked && <span className="size-2 rounded-full bg-primary" />}
      </span>
      {label}
    </button>
  )
}
