'use client'
import { createContext, useContext, useState } from 'react'

const MenuContext = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
} | null>(null)

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu() {
  const ctx = useContext(MenuContext)
  if (!ctx) throw new Error('useMenu must be used within MenuProvider')
  return ctx
}