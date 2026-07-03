import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { getBrands, getCategories, getProducts } from '@/lib/api'
import { ProductCard } from '@/components/store/product-card'
import { Newsletter } from '@/components/store/newsletter'
import { RatingStars } from '@/components/store/rating-stars'

const testimonials = [
  {
    name: 'Amina K.',
    text: 'Une qualité exceptionnelle et un service client aux petits soins sur WhatsApp. Je ne commande plus ailleurs.',
  },
  {
    name: 'Léa M.',
    text: 'La soie est divine, l’emballage sublime et discret. On sent le soin apporté à chaque détail.',
  },
  {
    name: 'Sophie L.',
    text: 'Commande passée le soir, confirmée en quelques minutes. Élégance et efficacité.',
  },
]

export default async function HomePage() {
  const [products, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands(),
  ])
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4)
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4)
  const onSale = products.filter((p) => p.onSale)

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative w-full overflow-hidden animate-fade-in" style={{ height: `calc(100vh - var(--site-header-height, 5rem))`, minHeight: '520px' }}>
          <Image
            src="/products/hero.png"
            alt="Collection de lingerie fine Lumière"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-foreground/10 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto flex w-full max-w-7xl px-4 md:px-6">
              <div className="max-w-lg text-background animate-fade-up">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase">
                  Nouvelle collection · Été 2026
                </p>
                <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-balance md:text-6xl">
                  L’élégance se porte tout près du cœur
                </h1>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-background/90 md:text-base">
                  Dentelle française, soie et satin. Des pièces raffinées pour célébrer
                  votre féminité, à commander en un message.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/boutique"
                    className="flex h-12 items-center justify-center rounded-md bg-background px-7 text-sm font-medium tracking-[0.05em] text-foreground uppercase transition-opacity hover:opacity-90"
                  >
                    Découvrir la collection
                  </Link>
                  <Link
                    href="/boutique?cat=nuisettes"
                    className="flex h-12 items-center justify-center rounded-md border border-background/60 px-7 text-sm font-medium tracking-[0.05em] text-background uppercase transition-colors hover:bg-background/10"
                  >
                    Les nuisettes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Explorer
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Nos catégories</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.id} href={`/boutique?cat=${c.slug}`} className="group animate-fade-up">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-lg">
                <Image
                  src={c.image || '/placeholder.svg'}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                <span className="absolute inset-x-0 bottom-4 text-center font-serif text-lg text-background">
                  {c.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Fraîchement arrivé
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Nouvelle collection</h2>
          </div>
          <Link
            href="/boutique"
            className="hidden items-center gap-1.5 text-sm text-foreground transition-colors hover:text-muted-foreground sm:flex"
          >
            Tout voir <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      {onSale.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="grid overflow-hidden rounded-2xl bg-muted md:grid-cols-2">
            <div className="relative min-h-64 md:min-h-full">
              <Image
                src="/products/editorial.png"
                alt="Offre spéciale été"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-5 p-10 md:p-16">
              <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                Offre limitée
              </p>
              <h2 className="font-serif text-3xl leading-tight text-balance md:text-4xl">
                Soldes d’été jusqu’à -25% sur une sélection
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Profitez de nos pièces iconiques à prix doux. Utilisez le code
                <span className="mx-1 font-medium text-foreground">ETE20</span>
                pour -20% supplémentaires sur votre commande WhatsApp.
              </p>
              <Link
                href="/boutique"
                className="inline-flex h-12 w-fit items-center justify-center rounded-md bg-primary px-7 text-sm font-medium tracking-[0.05em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
              >
                Profiter des soldes
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Les préférés
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Meilleures ventes</h2>
          </div>
          <Link
            href="/boutique"
            className="hidden items-center gap-1.5 text-sm text-foreground transition-colors hover:text-muted-foreground sm:flex"
          >
            Tout voir <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {bestSellers.map((p) => (
            <div key={p.id} className="animate-fade-up">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Sélection
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Nos maisons</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {brands.map((b) => (
            <div
              key={b.id}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
            >
              <span className="font-serif text-xl">{b.name}</span>
              <p className="text-xs leading-relaxed text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Elles nous font confiance
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Témoignages</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col gap-4 rounded-lg border border-border bg-card p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
              >
                <Quote className="size-6 text-gold" />
                <blockquote className="text-sm leading-relaxed text-foreground">
                  {t.text}
                </blockquote>
                <figcaption className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-medium">{t.name}</span>
                  <RatingStars rating={5} size={13} />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
