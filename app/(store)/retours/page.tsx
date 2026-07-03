import Link from 'next/link'
import { CheckCircle2, HeartHandshake, RotateCcw, Sparkles } from 'lucide-react'

const rules = [
  {
    icon: CheckCircle2,
    title: 'Délai de 14 jours',
    text: 'Un échange peut être demandé dans les 14 jours suivant la réception.',
  },
  {
    icon: Sparkles,
    title: 'Article intact',
    text: 'Pour des raisons d’hygiène, l’article doit être non porté, non lavé et dans son emballage.',
  },
  {
    icon: RotateCcw,
    title: 'Échange accompagné',
    text: 'Nous vous aidons à choisir une autre taille, couleur ou pièce disponible.',
  },
  {
    icon: HeartHandshake,
    title: 'Contact WhatsApp',
    text: 'Chaque demande est traitée directement par message pour garder un suivi clair.',
  },
]

export const metadata = {
  title: 'Retours & échanges — Lumière',
  description: 'Conditions de retours et échanges Lumière.',
}

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Après commande
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">
          Retours & échanges
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Votre confort compte. Si une taille ne convient pas, contactez-nous
          rapidement pour organiser une solution adaptée aux conditions d’hygiène.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {rules.map((rule) => (
          <section key={rule.title} className="rounded-lg border border-border bg-card p-6">
            <rule.icon className="size-6 text-gold" />
            <h2 className="mt-4 font-serif text-xl">{rule.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {rule.text}
            </p>
          </section>
        ))}
      </div>

      <Link
        href="/contact"
        className="mt-10 inline-flex h-11 items-center rounded-md bg-primary px-7 text-sm font-medium tracking-[0.05em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
      >
        Demander un échange
      </Link>
    </div>
  )
}
