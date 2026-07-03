import Link from 'next/link'
import { AlertTriangle, Package, ReceiptText, TrendingUp, Users } from 'lucide-react'
import { getAdminData } from '@/lib/api'
import { formatPrice } from '@/lib/whatsapp'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function AdminOverviewPage() {
  const { products, customers, orders, reviews } = await getAdminData()
  const revenue = orders.reduce((sum, order) => sum + order.total, 0)
  const lowStock = products.filter((product) => product.stock > 0 && product.stock <= 10)
  const outOfStock = products.filter((product) => product.stock === 0)
  const pendingReviews = reviews.filter((review) => review.status === 'pending')
  const recentOrders = [...orders].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)

  const kpis = [
    { label: 'Produits', value: products.length, icon: Package },
    { label: 'Commandes', value: orders.length, icon: ReceiptText },
    { label: 'Clientes', value: customers.length, icon: Users },
    { label: 'Revenu mock', value: formatPrice(revenue), icon: TrendingUp },
  ]

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-4 md:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-lg border border-border bg-card p-5">
            <kpi.icon className="size-5 text-gold" />
            <p className="mt-4 text-sm text-muted-foreground">{kpi.label}</p>
            <p className="mt-1 font-serif text-3xl">{kpi.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border p-5">
            <h2 className="font-serif text-2xl">Commandes récentes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Les dernières références WhatsApp à traiter.
            </p>
          </div>
          <div className="p-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.reference}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{formatPrice(order.total)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-gold" />
              <h2 className="font-serif text-xl">Alertes stock</h2>
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              {lowStock.map((product) => (
                <Link
                  key={product.id}
                  href="/admin/inventaire"
                  className="flex justify-between rounded-md bg-muted/60 p-3 hover:bg-muted"
                >
                  <span>{product.name}</span>
                  <span>{product.stock}</span>
                </Link>
              ))}
              {outOfStock.map((product) => (
                <Link
                  key={product.id}
                  href="/admin/inventaire"
                  className="flex justify-between rounded-md bg-destructive/10 p-3 text-destructive"
                >
                  <span>{product.name}</span>
                  <span>Épuisé</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-serif text-xl">Avis à modérer</h2>
            <p className="mt-2 text-3xl font-semibold">{pendingReviews.length}</p>
            <Link
              href="/admin/avis"
              className="mt-4 inline-flex text-sm underline underline-offset-4"
            >
              Ouvrir la modération
            </Link>
          </div>
        </aside>
      </section>
    </div>
  )
}
