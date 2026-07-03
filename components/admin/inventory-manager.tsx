'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { Product } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function apiUrl() {
  return process.env.NEXT_PUBLIC_JSON_SERVER_URL || 'http://localhost:4000'
}

function stockBadge(stock: number) {
  if (stock === 0) {
    return <Badge variant="destructive">Rupture</Badge>
  }

  if (stock <= 10) {
    return <Badge variant="secondary">Stock bas</Badge>
  }

  return <Badge variant="outline">OK</Badge>
}

export function InventoryManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts)

  async function updateStock(product: Product, value: string) {
    const stock = Math.max(0, Number(value) || 0)
    const next = { ...product, stock }
    setProducts((current) => current.map((item) => (item.id === product.id ? next : item)))

    try {
      const response = await fetch(`${apiUrl()}/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock }),
      })
      if (!response.ok) throw new Error('Stock update failed')
      toast.success('Stock mis à jour')
    } catch {
      toast.warning('JSON Server indisponible: stock modifié localement')
    }
  }

  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="border-b border-border p-5">
        <h2 className="font-serif text-2xl">Inventaire</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Niveaux de stock, alertes bas stock et ruptures.
        </p>
      </div>
      <div className="p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>État</TableHead>
              <TableHead className="text-right">Mise à jour</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.categorySlug}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{stockBadge(product.stock)}</TableCell>
                <TableCell>
                  <form
                    className="ml-auto flex max-w-40 gap-2"
                    onSubmit={(event) => {
                      event.preventDefault()
                      const data = new FormData(event.currentTarget)
                      updateStock(product, String(data.get('stock') || product.stock))
                    }}
                  >
                    <Input
                      name="stock"
                      type="number"
                      min={0}
                      defaultValue={product.stock}
                      className="h-9"
                    />
                    <Button type="submit" variant="outline">
                      OK
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
