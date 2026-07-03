import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Comment commander ?',
    answer:
      'Choisissez une pièce, sélectionnez la taille et la couleur, puis cliquez sur Commander sur WhatsApp. Le message sera prérempli avec les détails du produit.',
  },
  {
    question: 'Puis-je commander plusieurs articles ?',
    answer:
      'Oui. Ajoutez les articles au panier, ajustez les quantités, puis finalisez la commande sur WhatsApp avec le récapitulatif complet.',
  },
  {
    question: 'Comment choisir ma taille ?',
    answer:
      'Chaque fiche produit indique les tailles disponibles. En cas de doute, écrivez-nous sur WhatsApp pour un conseil personnalisé.',
  },
  {
    question: 'Les colis sont-ils discrets ?',
    answer:
      'Oui, les commandes sont préparées dans un emballage sobre, sans mention visible du contenu.',
  },
  {
    question: 'Les articles épuisés peuvent-ils revenir ?',
    answer:
      'Certains modèles reviennent en petite quantité. Contactez-nous pour être prévenue lors d’un réassort.',
  },
]

export const metadata = {
  title: 'FAQ — Lumière',
  description: 'Questions fréquentes sur les commandes Lumière.',
}

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Questions fréquentes
        </p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">FAQ</h1>
      </div>

      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
