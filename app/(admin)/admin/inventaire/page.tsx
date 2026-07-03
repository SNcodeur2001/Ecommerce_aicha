import { getProducts } from '@/lib/api'
import { InventoryManager } from '@/components/admin/inventory-manager'

export default async function AdminInventoryPage() {
  const products = await getProducts()

  return <InventoryManager initialProducts={products} />
}
