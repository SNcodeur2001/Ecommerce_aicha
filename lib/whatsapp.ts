import { WHATSAPP_NUMBER } from './data'
import type { CartItem } from './store'

function formatPrice(n: number) {
  return `${n} €`
}

export function productOrderLink(opts: {
  name: string
  size: string
  color: string
  price: number
}) {
  const message = `Bonjour Lumière ! Je souhaite commander :

• Produit : ${opts.name}
• Taille : ${opts.size}
• Couleur : ${opts.color}
• Prix : ${formatPrice(opts.price)}

Merci de me confirmer la disponibilité.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function cartOrderLink(items: CartItem[]) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const lines = items
    .map(
      (i) =>
        `• ${i.name} — ${i.size} / ${i.color} × ${i.quantity} — ${formatPrice(
          i.price * i.quantity,
        )}`,
    )
    .join('\n')
  const message = `Bonjour Lumière ! Je souhaite passer la commande suivante :

${lines}

Total : ${formatPrice(total)}

Merci de me confirmer la disponibilité et les modalités de livraison.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function simpleContactLink(text = 'Bonjour Lumière ! J’ai une question.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export { formatPrice }
