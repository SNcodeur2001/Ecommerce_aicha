import { getOrders } from '@/lib/api'
import { OrdersManager } from '@/components/admin/orders-manager'

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  return <OrdersManager initialOrders={orders} />
}
