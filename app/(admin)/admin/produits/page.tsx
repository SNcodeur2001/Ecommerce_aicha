import { getProducts } from '@/lib/api'
import { formatPrice } from '@/lib/whatsapp'
import {
  ResourceManager,
  type ResourceItem,
} from '@/components/admin/resource-manager'
import { Badge } from '@/components/ui/badge'

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <ResourceManager
      title="Produits"
      description="Catalogue, prix, stocks, images et mise en avant."
      resource="products"
      idPrefix="p"
      initialItems={products as unknown as ResourceItem[]}
      columns={[
        { key: 'name', label: 'Produit' },
        { key: 'price', label: 'Prix' },
        { key: 'categorySlug', label: 'Catégorie' },
        { key: 'stock', label: 'Stock' },
        { key: 'featured', label: 'Mis en avant' },
      ]}
      fields={[
        { key: 'name', label: 'Nom' },
        { key: 'slug', label: 'Slug' },
        { key: 'price', label: 'Prix', type: 'number' },
        { key: 'compareAtPrice', label: 'Prix barré', type: 'number' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'material', label: 'Matière' },
        { key: 'care', label: 'Entretien', type: 'textarea' },
        { key: 'images', label: 'Images', type: 'csv', placeholder: '/products/image.png, /products/autre.png' },
        { key: 'categorySlug', label: 'Catégorie slug' },
        { key: 'brandSlug', label: 'Marque slug' },
        { key: 'sizes', label: 'Tailles', type: 'csv', placeholder: 'XS, S, M, L' },
        { key: 'colors', label: 'Couleurs', type: 'colors', placeholder: 'Noir:#111111, Nude:#d8b9a3' },
        { key: 'stock', label: 'Stock', type: 'number' },
        { key: 'rating', label: 'Note', type: 'number' },
        { key: 'reviewCount', label: 'Nombre avis', type: 'number' },
        { key: 'featured', label: 'Mis en avant', type: 'boolean' },
        { key: 'bestSeller', label: 'Meilleure vente', type: 'boolean' },
        { key: 'isNew', label: 'Nouveauté', type: 'boolean' },
        { key: 'onSale', label: 'Promotion', type: 'boolean' },
        { key: 'createdAt', label: 'Date création' },
      ]}
    />
  )
}
