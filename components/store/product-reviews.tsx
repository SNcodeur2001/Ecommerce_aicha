'use client'

import { useState } from 'react'
import type { Review } from '@/lib/types'
import { RatingStars } from './rating-stars'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { createReview } from '@/lib/api'

export function ProductReviews({
  productId,
  initialReviews,
}: {
  productId: string
  initialReviews: Review[]
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const count = reviews.length
  const average =
    count > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !comment.trim()) {
      toast.error('Veuillez remplir tous les champs.')
      return
    }
    setSubmitting(true)
    const reviewPayload = {
      productId,
      author: name.trim(),
      rating,
      title: title.trim() || 'Avis',
      comment: comment.trim(),
      date: new Date().toISOString(),
      status: 'published' as const,
    }
    const saved = await createReview(reviewPayload)
    if (saved) {
      setReviews((prev) => [saved, ...prev])
      setName('')
      setTitle('')
      setComment('')
      setRating(5)
      toast.success('Merci pour votre avis !')
    } else {
      toast.error('Impossible d\'enregistrer votre avis. Réessayez plus tard.')
    }
    setSubmitting(false)
  }

  return (
    <section className="border-t border-border pt-12">
      <h2 className="font-serif text-2xl text-foreground">Avis clients</h2>
      <div className="mt-2 flex items-center gap-3">
        <RatingStars rating={average} />
        <span className="text-sm text-muted-foreground">
          {average.toFixed(1)} sur 5 · {count} avis
        </span>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col gap-6">
          {reviews.length === 0 && (
            <li className="text-sm text-muted-foreground">
              Aucun avis pour le moment. Soyez la première à en laisser un.
            </li>
          )}
          {reviews.map((r) => (
            <li key={r.id} className="border-b border-border pb-6">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{r.author}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(r.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="mt-1">
                <RatingStars rating={r.rating} size={14} />
              </div>
              <p className="mt-2 font-medium text-sm text-foreground">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {r.comment}
              </p>
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-lg border border-border bg-card p-6"
        >
          <h3 className="font-serif text-lg text-card-foreground">
            Laisser un avis
          </h3>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="review-name">Votre nom</Label>
              <Input
                id="review-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Camille"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="review-title">Titre</Label>
              <Input
                id="review-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sublime !"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Note</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    aria-label={`Noter ${n} sur 5`}
                    className="p-0.5"
                  >
                    <RatingStars rating={n <= rating ? 1 : 0} max={1} size={20} />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="review-comment">Votre avis</Label>
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Partagez votre expérience..."
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Publication...' : 'Publier mon avis'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
