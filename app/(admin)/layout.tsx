import type { ReactNode } from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { ExternalLink } from 'lucide-react'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Toaster } from '@/components/ui/sonner'
import { verifySessionToken } from '@/lib/admin-auth'
import LogoutButton from '@/components/admin/logout-button'

export const metadata = {
  title: 'Admin — Lumière',
  description: 'Backoffice Lumière pour gérer la boutique.',
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('admin_session')?.value
  const username = sessionToken ? verifySessionToken(sessionToken) : null

  if (!username) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-dvh bg-muted/30 lg:flex">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Backoffice
            </p>
            <h1 className="font-serif text-xl">Gestion boutique</h1>
          </div>
          <Link
            href="/"
            className="flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm transition-colors hover:bg-muted"
          >
            Voir la boutique
            <ExternalLink className="size-4" />
          </Link>
          <div className="ml-4">
            <LogoutButton />
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}
