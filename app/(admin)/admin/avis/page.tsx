import { getReviews } from '@/lib/api'
import { ReviewsManager } from '@/components/admin/reviews-manager'

export default async function AdminReviewsPage() {
  const reviews = await getReviews()

  return <ReviewsManager initialReviews={reviews} />
}
