import { getCategories } from '@/lib/api'
import {
  ResourceManager,
  type ResourceItem,
} from '@/components/admin/resource-manager'

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return (
    <ResourceManager
      title="Catégories"
      description="Familles visibles dans la boutique et les filtres."
      resource="categories"
      idPrefix="c"
      initialItems={categories as unknown as ResourceItem[]}
      columns={[
        { key: 'name', label: 'Nom' },
        { key: 'slug', label: 'Slug' },
        { key: 'description', label: 'Description' },
      ]}
      fields={[
        { key: 'name', label: 'Nom' },
        { key: 'slug', label: 'Slug' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'image', label: 'Image' },
      ]}
    />
  )
}
