'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { Order, OrderStatus } from '@/lib/types'
import { formatPrice } from '@/lib/whatsapp'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const statuses: OrderStatus[] = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'canceled',
]

function apiUrl() {
  return process.env.NEXT_PUBLIC_JSON_SERVER_URL || 'http://localhost:4000'
}

export function OrdersManager({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders)
  const [selected, setSelected] = useState<Order | null>(initialOrders[0] || null)

  async function updateStatus(order: Order, status: OrderStatus) {
    const next = { ...order, status }
    setOrders((current) => current.map((item) => (item.id === order.id ? next : item)))
    setSelected((current) => (current?.id === order.id ? next : current))

    try {
      const response = await fetch(`${apiUrl()}/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error('Status update failed')
      toast.success('Statut mis à jour')
    } catch {
      toast.warning('JSON Server indisponible: statut changé localement')
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <section className="rounded-lg border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="font-serif text-2xl">Commandes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Suivi des commandes WhatsApp et changement de statut.
          </p>
        </div>
        <div className="p-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Détail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.reference}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{formatPrice(order.total)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" onClick={() => setSelected(order)}>
                      Ouvrir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <aside className="h-fit rounded-lg border border-border bg-card p-5">
        {selected ? (
          <>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {selected.reference}
            </p>
            <h3 className="mt-2 font-serif text-2xl">{selected.customerName}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{selected.customerPhone}</p>

            <div className="mt-6 flex flex-col gap-3">
              {selected.items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="rounded-md bg-muted/60 p-3 text-sm"
                >
                  <div className="flex justify-between gap-3">
                    <span>{item.name}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.size} / {item.color} × {item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-between border-t border-border pt-4 font-medium">
              <span>Total</span>
              <span>{formatPrice(selected.total)}</span>
            </div>

            <label className="mt-6 block text-xs font-semibold tracking-[0.12em] uppercase">
              Statut
            </label>
            <select
              value={selected.status}
              onChange={(event) =>
                updateStatus(selected, event.target.value as OrderStatus)
              }
              className="mt-2 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Sélectionnez une commande.</p>
        )}
      </aside>
    </div>
  )
}
