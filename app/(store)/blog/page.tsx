import Image from 'next/image'
import Link from 'next/link'

const posts = [
  {
    title: 'Bien choisir sa lingerie en dentelle',
    category: 'Guide',
    image: '/products/black-lace-set.png',
    excerpt:
      'Matière, coupe, maintien: quelques repères simples pour choisir une pièce raffinée et confortable.',
  },
  {
    title: 'Soie, satin, dentelle: quelles différences ?',
    category: 'Matières',
    image: '/products/ivory-silk-slip.png',
    excerpt:
      'Un guide court pour comprendre le toucher, l’entretien et le tombé des matières phares.',
  },
  {
    title: 'Préparer une commande spéciale',
    category: 'Conseil',
    image: '/products/white-bridal-set.png',
    excerpt:
      'Mariage, cadeau ou occasion intime: nos conseils pour composer une sélection harmonieuse.',
  },
]

export const metadata = {
  title: 'Journal — Lumière',
  description: 'Conseils lingerie, matières et inspirations par Lumière.',
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Journal
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">
          Conseils & inspirations
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Quelques repères pour choisir, porter et entretenir vos pièces préférées.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.title} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-5 text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {post.category}
            </p>
            <h2 className="mt-2 font-serif text-xl text-foreground">{post.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>

      <Link
        href="/boutique"
        className="mt-12 inline-flex h-11 items-center rounded-md bg-primary px-7 text-sm font-medium tracking-[0.05em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
      >
        Découvrir la boutique
      </Link>
    </div>
  )
}
