import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/store/site-header'
import { SiteFooter } from '@/components/store/site-footer'
import { WhatsAppFloat } from '@/components/store/whatsapp-float'
import { Toaster } from '@/components/ui/sonner'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
      <Toaster position="top-center" />
    </div>
  )
}
