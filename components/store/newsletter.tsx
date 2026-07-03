'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export function Newsletter() {
  const [email, setEmail] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    toast.success('Merci !', { description: 'Vous êtes inscrite. -10% arrivent dans votre boîte mail.' })
    setEmail('')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <div className="rounded-2xl bg-secondary px-6 py-14 text-center md:py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-secondary-foreground/70 uppercase">
          Le cercle Lumière
        </p>
        <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl leading-tight text-balance text-secondary-foreground md:text-4xl">
          Rejoignez-nous et recevez -10% sur votre première commande
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-secondary-foreground/80">
          Accès en avant-première aux nouvelles collections, offres privées et conseils de nos stylistes.
        </p>
        <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="h-12 flex-1 rounded-md border border-secondary-foreground/20 bg-background/70 px-4 text-sm outline-none focus:border-secondary-foreground"
          />
          <button
            type="submit"
            className="h-12 rounded-md bg-primary px-6 text-sm font-medium tracking-[0.05em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            S’inscrire
          </button>
        </form>
      </div>
    </section>
  )
}
