import Link from 'next/link'
import { Instagram, Facebook, Truck, RefreshCw, ShieldCheck, MessageCircle } from 'lucide-react'

const columns = [
  {
    title: 'Boutique',
    links: [
      { href: '/boutique?cat=ensembles', label: 'Ensembles' },
      { href: '/boutique?cat=nuisettes', label: 'Nuisettes' },
      { href: '/boutique?cat=body', label: 'Body & Teddies' },
      { href: '/boutique?cat=mariee', label: 'Mariée' },
    ],
  },
  {
    title: 'Aide',
    links: [
      { href: '/livraison', label: 'Livraison' },
      { href: '/retours', label: 'Retours & échanges' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'La Maison',
    links: [
      { href: '/a-propos', label: 'À propos' },
      { href: '/blog', label: 'Journal' },
      { href: '/boutique', label: 'Nouveautés' },
      { href: '/favoris', label: 'Mes favoris' },
    ],
  },
]

const perks = [
  { icon: Truck, title: 'Livraison soignée', text: 'Emballage discret et élégant, partout.' },
  { icon: RefreshCw, title: 'Retours 14 jours', text: 'Échange facile sous conditions d’hygiène.' },
  { icon: ShieldCheck, title: 'Paiement à la livraison', text: 'Réglez en toute confiance.' },
  { icon: MessageCircle, title: 'Conseil personnalisé', text: 'Une styliste sur WhatsApp.' },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-6 border-b border-border py-10 md:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title} className="flex flex-col gap-2">
              <p.icon className="size-5 text-gold" />
              <h4 className="text-sm font-medium">{p.title}</h4>
              <p className="text-xs leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <span className="font-serif text-2xl tracking-[0.15em]">LUMIÈRE</span>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Lingerie fine et élégante. Des pièces confectionnées avec soin pour
              célébrer chaque femme, en toute confidentialité.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="#"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-background"
              >
                <Instagram className="size-4" />
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-background"
              >
                <Facebook className="size-4" />
              </Link>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold tracking-[0.15em] uppercase text-foreground">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Lumière. Tous droits réservés.</p>
          <p>Confectionné avec délicatesse.</p>
        </div>
      </div>
    </footer>
  )
}
