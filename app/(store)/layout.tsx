'use client'

import type { ReactNode } from 'react'
import { MenuProvider, useMenu } from '@/components/store/menu-context'
import { SiteHeader } from '@/components/store/site-header'
import { SiteFooter } from '@/components/store/site-footer'
import { WhatsAppFloat } from '@/components/store/whatsapp-float'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <MenuProvider>
      <StoreLayoutContent>{children}</StoreLayoutContent>
    </MenuProvider>
  )
}

function StoreLayoutContent({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <MainContent>{children}</MainContent>
    </>
  )
}

function MainContent({ children }: { children: ReactNode }) {
  const { open } = useMenu()
  
  return (
    <div className={cn('flex min-h-dvh flex-col transition-all duration-300 relative z-10', open && 'blur-sm pointer-events-none')}>
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
      <Toaster position="top-center" />
    </div>
  )
}
