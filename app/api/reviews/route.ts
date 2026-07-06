import { NextRequest, NextResponse } from 'next/server'

function apiUrl() {
  return process.env.NEXT_PUBLIC_JSON_SERVER_URL || 'http://127.0.0.1:4000'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(`${apiUrl()}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const text = await response.text()
      return NextResponse.json({ error: text || 'Échec de la création de l\'avis' }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Review creation error:', error)
    return NextResponse.json({ error: 'Échec de la création de l\'avis' }, { status: 500 })
  }
}
