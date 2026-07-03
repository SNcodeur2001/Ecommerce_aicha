'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BadgePercent,
  Boxes,
  ChartNoAxesCombined,
  FolderTree,
  MessageSquareText,
  Package,
  ReceiptText,
  Tags,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin', label: 'Vue d’ensemble', icon: ChartNoAxesCombined },
  { href: '/admin/produits', label: 'Produits', icon: Package },
  { href: '/admin/categories', label: 'Catégories', icon: FolderTree },
  { href: '/admin/marques', label: 'Marques', icon: Tags },
  { href: '/admin/commandes', label: 'Commandes', icon: ReceiptText },
  { href: '/admin/clientes', label: 'Clientes', icon: Users },
  { href: '/admin/promotions', label: 'Promotions', icon: BadgePercent },
  { href: '/admin/inventaire', label: 'Inventaire', icon: Boxes },
  { href: '/admin/avis', label: 'Avis', icon: MessageSquareText },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="border-b border-border bg-card lg:sticky lg:top-0 lg:h-dvh lg:w-72 lg:border-r lg:border-b-0">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Link href="/admin" className="font-serif text-2xl tracking-[0.15em]">
          LUMIÈRE
        </Link>
      </div>
      <nav className="flex gap-2 overflow-x-auto px-3 py-3 lg:flex-col lg:overflow-visible">
        {links.map((link) => {
          const active =
            link.href === '/admin' ? pathname === link.href : pathname.startsWith(link.href)

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex h-10 shrink-0 items-center gap-3 rounded-md px-3 text-sm transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>
      <div className="hidden px-5 py-4 text-xs text-muted-foreground lg:block">
        Backoffice mock branché sur JSON Server.
      </div>
    </aside>
  )
}
