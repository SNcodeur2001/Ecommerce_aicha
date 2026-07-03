'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' })
      if (!res.ok) throw new Error('Erreur lors de la déconnexion')
      toast.success('Déconnecté')
      window.location.assign('/admin/login')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Impossible de se déconnecter')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="ghost" onClick={handleLogout} disabled={loading}>
      {loading ? 'Déconnexion...' : 'Se déconnecter'}
    </Button>
  )
}
