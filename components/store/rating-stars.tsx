import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RatingStars({
  rating,
  className,
  size = 14,
  max = 5,
}: {
  rating: number
  className?: string
  size?: number
  max?: number
}) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      aria-label={`Note ${rating} sur ${max}`}
    >
      {Array.from({ length: max }, (_, idx) => idx + 1).map((i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={cn(
            i <= Math.round(rating) ? 'fill-gold text-gold' : 'fill-transparent text-border',
          )}
        />
      ))}
    </div>
  )
}
