import { getPromotions } from '@/lib/api'
import {
  ResourceManager,
  type ResourceItem,
} from '@/components/admin/resource-manager'
import { Badge } from '@/components/ui/badge'

export default async function AdminPromotionsPage() {
  const promotions = await getPromotions()

  return (
    <ResourceManager
      title="Promotions"
      description="Codes, remises et collections mises en avant."
      resource="promotions"
      idPrefix="promo"
      initialItems={promotions as unknown as ResourceItem[]}
      columns={[
        { key: 'title', label: 'Titre' },
        { key: 'code', label: 'Code' },
        { key: 'discount', label: 'Remise (%)' },
        { key: 'collection', label: 'Collection' },
        { key: 'active', label: 'Active' },
      ]}
      fields={[
        { key: 'title', label: 'Titre' },
        { key: 'code', label: 'Code' },
        { key: 'discount', label: 'Remise (%)', type: 'number' },
        { key: 'active', label: 'Active', type: 'boolean' },
        { key: 'collection', label: 'Collection' },
      ]}
    />
  )
}
