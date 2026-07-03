import { getCustomers } from '@/lib/api'
import { formatPrice } from '@/lib/whatsapp'
import {
  ResourceManager,
  type ResourceItem,
} from '@/components/admin/resource-manager'

export default async function AdminCustomersPage() {
  const customers = await getCustomers()

  return (
    <ResourceManager
      title="Clientes"
      description="Profils, contacts et valeur client."
      resource="customers"
      idPrefix="u"
      initialItems={customers as unknown as ResourceItem[]}
      columns={[
        { key: 'name', label: 'Nom' },
        { key: 'phone', label: 'Téléphone' },
        { key: 'city', label: 'Ville' },
        { key: 'orders', label: 'Commandes' },
        { key: 'totalSpent', label: 'Total dépensé' },
      ]}
      fields={[
        { key: 'name', label: 'Nom' },
        { key: 'phone', label: 'Téléphone' },
        { key: 'email', label: 'Email' },
        { key: 'city', label: 'Ville' },
        { key: 'orders', label: 'Commandes', type: 'number' },
        { key: 'totalSpent', label: 'Total dépensé', type: 'number' },
        { key: 'joined', label: 'Date inscription' },
      ]}
    />
  )
}
