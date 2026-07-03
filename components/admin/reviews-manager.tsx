'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { Review } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RatingStars } from '@/components/store/rating-stars'

function apiUrl() {
  return process.env.NEXT_PUBLIC_JSON_SERVER_URL || 'http://localhost:4000'
}

export function ReviewsManager({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews)

  async function updateReview(review: Review, status: Review['status']) {
    const next = { ...review, status }
    setReviews((current) => current.map((item) => (item.id === review.id ? next : item)))

    try {
      const response = await fetch(`${apiUrl()}/reviews/${review.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error('Review update failed')
      toast.success('Avis mis à jour')
    } catch {
      toast.warning('JSON Server indisponible: avis modifié localement')
    }
  }

  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="border-b border-border p-5">
        <h2 className="font-serif text-2xl">Avis clients</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Modération des avis publiés ou en attente.
        </p>
      </div>
      <div className="grid gap-4 p-5 md:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-lg border border-border p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{review.author}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Produit {review.productId} · {review.date}
                </p>
              </div>
              <Badge variant={review.status === 'published' ? 'default' : 'secondary'}>
                {review.status === 'published' ? 'Publié' : 'En attente'}
              </Badge>
            </div>
            <div className="mt-3">
              <RatingStars rating={review.rating} size={14} />
            </div>
            <h3 className="mt-3 font-serif text-lg">{review.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {review.comment}
            </p>
            <div className="mt-5 flex gap-2">
              <Button
                variant="outline"
                onClick={() => updateReview(review, 'published')}
                disabled={review.status === 'published'}
              >
                Publier
              </Button>
              <Button
                variant="outline"
                onClick={() => updateReview(review, 'pending')}
                disabled={review.status === 'pending'}
              >
                Mettre en attente
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
