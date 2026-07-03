import { NextResponse } from 'next/server'
import { createSessionToken, verifyAdminPassword } from '@/lib/admin-auth'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ error: 'Identifiants requis' }, { status: 400 })
  }

  const user = await verifyAdminPassword(username, password)
  if (!user) {
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  const token = createSessionToken(user.username)
  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return response
}
