import Link from 'next/link'
import { Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import { simpleContactLink } from '@/lib/whatsapp'
import { WhatsAppIcon } from '@/components/store/whatsapp-icon'

export const metadata = {
  title: 'Contact — Lumière',
  description: 'Contactez la maison Lumière par WhatsApp ou email pour toute question.',
}

const infos = [
  { icon: MessageCircle, label: 'WhatsApp', value: 'Réponse sous quelques minutes' },
  { icon: Mail, label: 'Email', value: 'bonjour@lumiere-lingerie.com' },
  { icon: MapPin, label: 'Boutique', value: 'Sur rendez-vous · Casablanca' },
  { icon: Clock, label: 'Horaires', value: 'Lun — Sam · 9h à 20h' },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Nous contacter
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground text-balance">
          Une question ? Écrivez-nous
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
          Notre équipe vous conseille avec plaisir sur les tailles, les matières et
          votre commande. La façon la plus rapide de nous joindre est WhatsApp.
        </p>
        <a
          href={simpleContactLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-12 items-center gap-2.5 rounded-md bg-[#25D366] px-8 text-sm font-medium tracking-[0.05em] text-white uppercase transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon className="size-5" />
          Discuter sur WhatsApp
        </a>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {infos.map((info) => (
          <div
            key={info.label}
            className="flex items-start gap-4 rounded-lg border border-border bg-card p-6"
          >
            <info.icon className="size-5 shrink-0 text-secondary" />
            <div>
              <h2 className="text-sm font-semibold text-card-foreground">
                {info.label}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{info.value}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        Vous cherchez une pièce en particulier ?{' '}
        <Link
          href="/boutique"
          className="text-foreground underline underline-offset-2"
        >
          Parcourez la boutique
        </Link>
        .
      </p>
    </div>
  )
}
