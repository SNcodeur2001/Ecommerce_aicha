import { MessageCircle } from 'lucide-react'
import { simpleContactLink } from '@/lib/whatsapp'

export function WhatsAppFloat() {
  return (
    <a
      href={simpleContactLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
