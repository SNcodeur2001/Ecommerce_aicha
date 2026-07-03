import type {
  Brand,
  Category,
  Customer,
  Order,
  Product,
  Promotion,
  Review,
} from './types'

export const WHATSAPP_NUMBER = '15550000000' // placeholder — replace with the real number

export const categories: Category[] = [
  {
    id: 'c1',
    name: 'Ensembles',
    slug: 'ensembles',
    description: 'Ensembles soutien-gorge et culotte assortis, dentelle et raffinement.',
    image: '/products/black-lace-set.png',
  },
  {
    id: 'c2',
    name: 'Nuisettes',
    slug: 'nuisettes',
    description: 'Nuisettes et babydolls en soie et satin pour des nuits élégantes.',
    image: '/products/blush-babydoll.png',
  },
  {
    id: 'c3',
    name: 'Body & Teddies',
    slug: 'body',
    description: 'Bodies sculptants et teddies séduisants pour sublimer la silhouette.',
    image: '/products/red-lace-teddy.png',
  },
  {
    id: 'c4',
    name: 'Peignoirs',
    slug: 'peignoirs',
    description: 'Peignoirs et kimonos en satin, la touche finale du glamour.',
    image: '/products/black-satin-robe.png',
  },
  {
    id: 'c5',
    name: 'Mariée',
    slug: 'mariee',
    description: 'Lingerie de mariée en dentelle blanche, pour le plus beau des jours.',
    image: '/products/white-bridal-set.png',
  },
]

export const brands: Brand[] = [
  {
    id: 'b1',
    name: 'Lumière Signature',
    slug: 'lumiere-signature',
    description: 'Notre collection maison, dessinée et confectionnée avec exigence.',
  },
  {
    id: 'b2',
    name: 'Maison Noir',
    slug: 'maison-noir',
    description: 'Pièces audacieuses en dentelle française et soie.',
  },
  {
    id: 'b3',
    name: 'Rose Éternel',
    slug: 'rose-eternel',
    description: 'Douceur et romantisme, tons poudrés et matières délicates.',
  },
  {
    id: 'b4',
    name: 'Velvet Atelier',
    slug: 'velvet-atelier',
    description: 'Le luxe discret du satin et du velours.',
  },
]

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Ensemble Dentelle Noir Séduction',
    slug: 'ensemble-dentelle-noir-seduction',
    price: 89,
    compareAtPrice: 119,
    description:
      'Un ensemble en fine dentelle de Calais, alliant élégance et audace. Le soutien-gorge balconnet met en valeur la poitrine tandis que la culotte assortie épouse délicatement les courbes.',
    material: '90% Polyamide, 10% Élasthanne — Dentelle de Calais',
    care: 'Lavage à la main à 30°C. Ne pas sécher au sèche-linge. Ne pas repasser la dentelle.',
    images: ['/products/black-lace-set.png', '/products/nude-bralette.png'],
    categorySlug: 'ensembles',
    brandSlug: 'maison-noir',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir', hex: '#1a1a1a' },
      { name: 'Nude', hex: '#d8b9a3' },
    ],
    stock: 24,
    rating: 4.8,
    reviewCount: 42,
    featured: true,
    bestSeller: true,
    isNew: false,
    onSale: true,
    createdAt: '2025-05-12',
  },
  {
    id: 'p2',
    name: 'Nuisette Soie Blush Rêverie',
    slug: 'nuisette-soie-blush-reverie',
    price: 74,
    description:
      'Une nuisette fluide en soie rose poudré, ornée de fines bretelles réglables et d’une bordure en dentelle. Le tomber parfait pour des nuits pleines de douceur.',
    material: '100% Soie mûrier',
    care: 'Nettoyage à sec recommandé, ou lavage à la main à froid.',
    images: ['/products/blush-babydoll.png', '/products/ivory-silk-slip.png'],
    categorySlug: 'nuisettes',
    brandSlug: 'rose-eternel',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Blush', hex: '#e7b7bd' },
      { name: 'Ivoire', hex: '#f2ece0' },
    ],
    stock: 18,
    rating: 4.9,
    reviewCount: 67,
    featured: true,
    bestSeller: true,
    isNew: true,
    onSale: false,
    createdAt: '2025-06-02',
  },
  {
    id: 'p3',
    name: 'Body Dentelle Rouge Passion',
    slug: 'body-dentelle-rouge-passion',
    price: 98,
    description:
      'Un body en dentelle rouge profond, transparent et sensuel. Coupe échancrée dans le dos et fermeture pressionnée pour un maintien parfait.',
    material: '88% Polyamide, 12% Élasthanne',
    care: 'Lavage à la main à 30°C. Séchage à plat.',
    images: ['/products/red-lace-teddy.png', '/products/black-lace-set.png'],
    categorySlug: 'body',
    brandSlug: 'maison-noir',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Rouge', hex: '#8f1d1d' },
      { name: 'Noir', hex: '#1a1a1a' },
    ],
    stock: 12,
    rating: 4.7,
    reviewCount: 29,
    featured: true,
    bestSeller: false,
    isNew: true,
    onSale: false,
    createdAt: '2025-06-18',
  },
  {
    id: 'p4',
    name: 'Nuisette Ivoire Éclat de Soie',
    slug: 'nuisette-ivoire-eclat-de-soie',
    price: 82,
    description:
      'Une combinaison-nuisette ivoire au tombé impeccable, coupe biais et dentelle délicate. Intemporelle et raffinée.',
    material: '100% Soie',
    care: 'Nettoyage à sec.',
    images: ['/products/ivory-silk-slip.png', '/products/blush-babydoll.png'],
    categorySlug: 'nuisettes',
    brandSlug: 'lumiere-signature',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Ivoire', hex: '#f2ece0' }],
    stock: 7,
    rating: 4.6,
    reviewCount: 21,
    featured: false,
    bestSeller: true,
    isNew: false,
    onSale: false,
    createdAt: '2025-04-22',
  },
  {
    id: 'p5',
    name: 'Ensemble Nude Douceur Absolue',
    slug: 'ensemble-nude-douceur-absolue',
    price: 68,
    compareAtPrice: 85,
    description:
      'Un ensemble bralette sans armatures en dentelle nude, associé à une culotte taille haute. Le confort absolu sans compromis sur l’élégance.',
    material: '92% Polyamide, 8% Élasthanne',
    care: 'Lavage à la main à froid.',
    images: ['/products/nude-bralette.png', '/products/black-lace-set.png'],
    categorySlug: 'ensembles',
    brandSlug: 'rose-eternel',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Nude', hex: '#d8b9a3' },
      { name: 'Noir', hex: '#1a1a1a' },
    ],
    stock: 31,
    rating: 4.5,
    reviewCount: 38,
    featured: false,
    bestSeller: true,
    isNew: false,
    onSale: true,
    createdAt: '2025-03-30',
  },
  {
    id: 'p6',
    name: 'Peignoir Satin Nuit Étoilée',
    slug: 'peignoir-satin-nuit-etoilee',
    price: 79,
    description:
      'Un kimono en satin noir fluide, ceinturé à la taille. La pièce parfaite pour prolonger l’élégance au-delà de la nuit.',
    material: '100% Satin de polyester',
    care: 'Lavage en machine à 30°C, cycle délicat.',
    images: ['/products/black-satin-robe.png', '/products/ivory-silk-slip.png'],
    categorySlug: 'peignoirs',
    brandSlug: 'velvet-atelier',
    sizes: ['S/M', 'L/XL'],
    colors: [
      { name: 'Noir', hex: '#1a1a1a' },
      { name: 'Ivoire', hex: '#f2ece0' },
    ],
    stock: 15,
    rating: 4.8,
    reviewCount: 33,
    featured: true,
    bestSeller: false,
    isNew: true,
    onSale: false,
    createdAt: '2025-06-25',
  },
  {
    id: 'p7',
    name: 'Ensemble Mariée Dentelle Blanche',
    slug: 'ensemble-mariee-dentelle-blanche',
    price: 129,
    description:
      'Un ensemble de mariée en dentelle blanche immaculée avec porte-jarretelles assorti. L’élégance ultime pour le plus beau jour.',
    material: '95% Polyamide, 5% Élasthanne — Dentelle brodée',
    care: 'Lavage à la main exclusivement.',
    images: ['/products/white-bridal-set.png', '/products/ivory-silk-slip.png'],
    categorySlug: 'mariee',
    brandSlug: 'lumiere-signature',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [{ name: 'Blanc', hex: '#f7f4ee' }],
    stock: 9,
    rating: 5.0,
    reviewCount: 18,
    featured: true,
    bestSeller: false,
    isNew: true,
    onSale: false,
    createdAt: '2025-06-10',
  },
  {
    id: 'p8',
    name: 'Ensemble Émeraude Sensation',
    slug: 'ensemble-emeraude-sensation',
    price: 92,
    description:
      'Un ensemble soutien-gorge et string en dentelle vert émeraude, une couleur audacieuse et sophistiquée pour se démarquer.',
    material: '90% Polyamide, 10% Élasthanne',
    care: 'Lavage à la main à froid.',
    images: ['/products/emerald-set.png', '/products/nude-bralette.png'],
    categorySlug: 'ensembles',
    brandSlug: 'maison-noir',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Émeraude', hex: '#1f5c4a' }],
    stock: 0,
    rating: 4.6,
    reviewCount: 14,
    featured: false,
    bestSeller: false,
    isNew: true,
    onSale: false,
    createdAt: '2025-06-28',
  },
]

export const reviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    author: 'Amina K.',
    rating: 5,
    title: 'Sublime et confortable',
    comment:
      'La dentelle est d’une qualité exceptionnelle, la coupe est parfaite. Je recommande vivement !',
    date: '2025-06-15',
    status: 'published',
  },
  {
    id: 'r2',
    productId: 'p1',
    author: 'Sophie L.',
    rating: 4,
    title: 'Très joli',
    comment: 'Magnifique ensemble, taille un peu petit, prenez une taille au-dessus.',
    date: '2025-06-01',
    status: 'published',
  },
  {
    id: 'r3',
    productId: 'p2',
    author: 'Léa M.',
    rating: 5,
    title: 'Douce comme un rêve',
    comment: 'La soie est incroyable, on dirait une caresse. Coup de cœur absolu.',
    date: '2025-06-20',
    status: 'published',
  },
  {
    id: 'r4',
    productId: 'p3',
    author: 'Nadia B.',
    rating: 5,
    title: 'Parfait pour une occasion spéciale',
    comment: 'Le rouge est somptueux, très bonne tenue. Livraison rapide.',
    date: '2025-06-22',
    status: 'pending',
  },
  {
    id: 'r5',
    productId: 'p7',
    author: 'Clara D.',
    rating: 5,
    title: 'Parfait pour mon mariage',
    comment: 'Exactement ce que je cherchais, la dentelle est magnifique.',
    date: '2025-06-25',
    status: 'published',
  },
]

export const promotions: Promotion[] = [
  {
    id: 'promo1',
    title: 'Soldes d’Été',
    code: 'ETE20',
    discount: 20,
    active: true,
    collection: 'Ensembles sélectionnés',
  },
  {
    id: 'promo2',
    title: 'Nouvelle Cliente',
    code: 'BIENVENUE10',
    discount: 10,
    active: true,
    collection: 'Toute la boutique',
  },
  {
    id: 'promo3',
    title: 'Collection Mariée',
    code: 'MARIEE15',
    discount: 15,
    active: false,
    collection: 'Lingerie de mariée',
  },
]

export const customers: Customer[] = [
  {
    id: 'u1',
    name: 'Amina Kaddour',
    phone: '+212 6 12 34 56 78',
    email: 'amina.k@email.com',
    city: 'Casablanca',
    orders: 5,
    totalSpent: 428,
    joined: '2024-11-02',
  },
  {
    id: 'u2',
    name: 'Sophie Lemaire',
    phone: '+33 6 22 33 44 55',
    email: 'sophie.l@email.com',
    city: 'Paris',
    orders: 3,
    totalSpent: 246,
    joined: '2025-01-18',
  },
  {
    id: 'u3',
    name: 'Léa Martin',
    phone: '+212 6 98 76 54 32',
    email: 'lea.m@email.com',
    city: 'Rabat',
    orders: 8,
    totalSpent: 712,
    joined: '2024-08-24',
  },
  {
    id: 'u4',
    name: 'Nadia Benali',
    phone: '+212 6 55 44 33 22',
    email: 'nadia.b@email.com',
    city: 'Marrakech',
    orders: 2,
    totalSpent: 190,
    joined: '2025-03-11',
  },
]

export const orders: Order[] = [
  {
    id: 'o1',
    reference: 'WA-1048',
    customerName: 'Amina Kaddour',
    customerPhone: '+212 6 12 34 56 78',
    items: [
      { productId: 'p1', name: 'Ensemble Dentelle Noir Séduction', size: 'M', color: 'Noir', price: 89, quantity: 1 },
    ],
    total: 89,
    status: 'delivered',
    channel: 'whatsapp',
    date: '2025-06-28',
  },
  {
    id: 'o2',
    reference: 'WA-1049',
    customerName: 'Léa Martin',
    customerPhone: '+212 6 98 76 54 32',
    items: [
      { productId: 'p2', name: 'Nuisette Soie Blush Rêverie', size: 'S', color: 'Blush', price: 74, quantity: 1 },
      { productId: 'p6', name: 'Peignoir Satin Nuit Étoilée', size: 'S/M', color: 'Noir', price: 79, quantity: 1 },
    ],
    total: 153,
    status: 'shipped',
    channel: 'whatsapp',
    date: '2025-07-01',
  },
  {
    id: 'o3',
    reference: 'WA-1050',
    customerName: 'Sophie Lemaire',
    customerPhone: '+33 6 22 33 44 55',
    items: [
      { productId: 'p7', name: 'Ensemble Mariée Dentelle Blanche', size: 'S', color: 'Blanc', price: 129, quantity: 1 },
    ],
    total: 129,
    status: 'confirmed',
    channel: 'whatsapp',
    date: '2025-07-02',
  },
  {
    id: 'o4',
    reference: 'WA-1051',
    customerName: 'Nadia Benali',
    customerPhone: '+212 6 55 44 33 22',
    items: [
      { productId: 'p3', name: 'Body Dentelle Rouge Passion', size: 'M', color: 'Rouge', price: 98, quantity: 1 },
    ],
    total: 98,
    status: 'pending',
    channel: 'whatsapp',
    date: '2025-07-03',
  },
  {
    id: 'o5',
    reference: 'WA-1052',
    customerName: 'Amina Kaddour',
    customerPhone: '+212 6 12 34 56 78',
    items: [
      { productId: 'p5', name: 'Ensemble Nude Douceur Absolue', size: 'S', color: 'Nude', price: 68, quantity: 2 },
    ],
    total: 136,
    status: 'pending',
    channel: 'whatsapp',
    date: '2025-07-03',
  },
]

// Helpers
export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getReviewsForProduct(productId: string) {
  return reviews.filter((r) => r.productId === productId && r.status === 'published')
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .concat(products.filter((p) => p.id !== product.id && p.categorySlug !== product.categorySlug))
    .slice(0, limit)
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export const materials = [
  'Dentelle de Calais',
  'Soie mûrier',
  'Satin',
  'Polyamide',
  'Coton',
]

export const allColors = [
  { name: 'Noir', hex: '#1a1a1a' },
  { name: 'Blush', hex: '#e7b7bd' },
  { name: 'Nude', hex: '#d8b9a3' },
  { name: 'Ivoire', hex: '#f2ece0' },
  { name: 'Rouge', hex: '#8f1d1d' },
  { name: 'Blanc', hex: '#f7f4ee' },
  { name: 'Émeraude', hex: '#1f5c4a' },
]

export const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'S/M', 'L/XL']
