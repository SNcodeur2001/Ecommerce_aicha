import { getBrands } from '@/lib/api'
import {
  ResourceManager,
  type ResourceItem,
} from '@/components/admin/resource-manager'

export default async function AdminBrandsPage() {
  const brands = await getBrands()

  return (
    <ResourceManager
      title="Marques"
      description="Maisons et collections utilisées dans le catalogue."
      resource="brands"
      idPrefix="b"
      initialItems={brands as unknown as ResourceItem[]}
      columns={[
        { key: 'name', label: 'Nom' },
        { key: 'slug', label: 'Slug' },
        { key: 'description', label: 'Description' },
      ]}
      fields={[
        { key: 'name', label: 'Nom' },
        { key: 'slug', label: 'Slug' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ]}
    />
  )
}
