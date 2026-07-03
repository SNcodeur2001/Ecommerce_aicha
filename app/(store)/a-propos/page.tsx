import Image from 'next/image'
import Link from 'next/link'
import { Gem, HandHeart, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'La Maison — Lumière',
  description: 'Découvrez l’histoire et les valeurs de la maison Lumière, lingerie fine et raffinée.',
}

const values = [
  {
    icon: Gem,
    title: 'Matières nobles',
    text: 'Dentelle de Calais, soie mûrier et satins précieux, choisis pour leur douceur et leur tenue.',
  },
  {
    icon: HandHeart,
    title: 'Savoir-faire',
    text: 'Chaque pièce est pensée dans le détail, pour épouser les courbes et sublimer chaque femme.',
  },
  {
    icon: Sparkles,
    title: 'Confiance en soi',
    text: 'Plus qu’une lingerie, une invitation à célébrer sa féminité au quotidien.',
  },
]

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex h-[50vh] min-h-80 items-center justify-center overflow-hidden">
        <Image
          src="/products/editorial.png"
          alt="La maison Lumière"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative text-center text-background">
          <p className="text-xs tracking-[0.3em] uppercase">Depuis 2018</p>
          <h1 className="mt-3 font-serif text-4xl text-balance sm:text-5xl">
            La Maison Lumière
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="font-serif text-2xl text-foreground">Notre histoire</h2>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          Lumière est née d’une conviction simple : la lingerie fine ne devrait pas
          être réservée aux grandes occasions. Nous imaginons des pièces délicates,
          élégantes et confortables, pensées pour accompagner chaque femme dans son
          quotidien. De la sélection des matières à la coupe finale, tout est guidé
          par une exigence de qualité et un profond respect du corps féminin.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Nous avons choisi la proximité : chaque commande se fait directement avec
          nous, par WhatsApp, pour un conseil personnalisé et une relation de
          confiance. Comme chez une créatrice, mais à portée de message.
        </p>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col items-center text-center">
              <v.icon className="size-7 text-secondary" />
              <h3 className="mt-4 font-serif text-lg text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="font-serif text-2xl text-foreground text-balance">
          Prête à vous laisser séduire ?
        </h2>
        <Link
          href="/boutique"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-8 text-sm font-medium tracking-[0.05em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
        >
          Découvrir la collection
        </Link>
      </section>
    </div>
  )
}
