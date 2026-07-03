import { Clock, PackageCheck, ShieldCheck, Truck } from 'lucide-react'

const steps = [
  {
    icon: PackageCheck,
    title: 'Préparation discrète',
    text: 'Chaque pièce est vérifiée, pliée avec soin et emballée sans mention visible du contenu.',
  },
  {
    icon: Truck,
    title: 'Expédition suivie',
    text: 'La livraison est organisée après confirmation WhatsApp, avec suivi communiqué dès l’envoi.',
  },
  {
    icon: Clock,
    title: 'Délais indicatifs',
    text: 'Comptez généralement 2 à 5 jours ouvrés selon la ville et le transporteur choisi.',
  },
  {
    icon: ShieldCheck,
    title: 'Paiement souple',
    text: 'Les modalités de paiement sont confirmées avec vous avant l’expédition.',
  },
]

export const metadata = {
  title: 'Livraison — Lumière',
  description: 'Informations de livraison pour les commandes Lumière.',
}

export default function DeliveryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Service client
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">Livraison</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Nous privilégions une livraison discrète, soignée et confirmée avec vous
          directement par WhatsApp afin d’éviter toute erreur d’adresse, de taille
          ou de disponibilité.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {steps.map((step) => (
          <section key={step.title} className="rounded-lg border border-border bg-card p-6">
            <step.icon className="size-6 text-gold" />
            <h2 className="mt-4 font-serif text-xl">{step.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.text}
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
