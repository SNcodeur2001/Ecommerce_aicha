import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Truck, RefreshCw, ShieldCheck } from 'lucide-react'
import {
  getBrands,
  getProductBySlugFromApi,
  getProducts,
  getRelatedProductsFromApi,
  getReviewsForProductFromApi,
} from '@/lib/api'
import { formatPrice } from '@/lib/whatsapp'
import { RatingStars } from '@/components/store/rating-stars'
import { ProductGallery } from '@/components/store/product-gallery'
import { ProductPurchase } from '@/components/store/product-purchase'
import { ProductReviews } from '@/components/store/product-reviews'
import { ProductCard } from '@/components/store/product-card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlugFromApi(slug)
  if (!product) notFound()

  const brands = await getBrands()
  const brand = brands.find((b) => b.slug === product.brandSlug)
  const reviews = await getReviewsForProductFromApi(product.id)
  const related = await getRelatedProductsFromApi(product)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Accueil
        </Link>
        <ChevronRight className="size-3" />
        <Link href="/boutique" className="hover:text-foreground">
          Boutique
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col">
          {brand && (
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              {brand.name}
            </span>
          )}
          <h1 className="mt-2 font-serif text-3xl leading-tight text-foreground text-balance sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <RatingStars rating={product.rating} />
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} ({product.reviewCount} avis)
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="font-serif text-2xl text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <Badge className="bg-secondary text-secondary-foreground">
                  -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                </Badge>
              </>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-3 text-xs">
            {product.stock === 0 ? (
              <span className="text-destructive">Épuisé — bientôt de retour</span>
            ) : product.stock <= 10 ? (
              <span className="text-secondary">
                Plus que {product.stock} en stock
              </span>
            ) : (
              <span className="text-emerald-700">En stock</span>
            )}
          </div>

          <div className="mt-6">
            <ProductPurchase product={product} />
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="size-5 text-muted-foreground" />
              <span className="text-[11px] leading-tight text-muted-foreground">
                Livraison soignée
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <RefreshCw className="size-5 text-muted-foreground" />
              <span className="text-[11px] leading-tight text-muted-foreground">
                Échange facile
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="size-5 text-muted-foreground" />
              <span className="text-[11px] leading-tight text-muted-foreground">
                Paiement sécurisé
              </span>
            </div>
          </div>

          {/* Details accordion */}
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="material">
              <AccordionTrigger>Matière & composition</AccordionTrigger>
              <AccordionContent>{product.material}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Entretien</AccordionTrigger>
              <AccordionContent>{product.care}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="delivery">
              <AccordionTrigger>Livraison & retours</AccordionTrigger>
              <AccordionContent>
                Commande via WhatsApp pour un accompagnement personnalisé. Livraison
                discrète sous 2 à 5 jours. Échange possible sous 14 jours sur les
                articles non portés.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <ProductReviews productId={product.id} initialReviews={reviews} />
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-foreground">
            Vous aimerez aussi
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
