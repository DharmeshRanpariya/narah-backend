/**
 * ADDITIVE seed — does NOT delete any existing data.
 * Upserts the 6 premium showcase categories + 6 showcase products by name.
 * Safe to re-run (idempotent). Run with: npm run seed:luxury
 *
 * Unlike src/seed.ts (which wipes all collections), this script only inserts
 * documents that don't already exist, so curated catalog data is preserved.
 */
import { connect, model, disconnect } from 'mongoose'
import { CategorySchema } from './modules/categories/schemas/category.schema'
import { ProductSchema } from './modules/products/schemas/product.schema'

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://narahsilver:narahsilver%40123@cluster0.nfvo4az.mongodb.net/narah-store?retryWrites=true&w=majority&appName=Cluster0'

const Category = model('Category', CategorySchema)
const Product = model('Product', ProductSchema)

const categories = [
  { name: 'Rings', description: 'Solitaires, bands and statement rings crafted to perfection.', displayOrder: 1 },
  { name: 'Necklaces', description: 'From delicate chains to bridal necklaces in pure gold.', displayOrder: 2 },
  { name: 'Earrings', description: 'Studs, drops and chandeliers that catch every light.', displayOrder: 3 },
  { name: 'Bracelets', description: 'Tennis bracelets, bangles and sculptural gold cuffs.', displayOrder: 4 },
  { name: 'Pendants', description: 'Diamond and pearl pendants framed in fine gold.', displayOrder: 5 },
  { name: 'Wedding Collection', description: 'Complete bridal ensembles for your most important day.', displayOrder: 6 },
]

interface ProductTemplate {
  name: string
  category: string
  description: string
  shortDescription: string
  price: number
  salePrice?: number
  stockQuantity: number
  material: string
  weight: string
  image: string
}

const productTemplates: ProductTemplate[] = [
  {
    name: 'Diamond Solitaire Ring',
    category: 'Rings',
    description:
      'A flawless brilliant-cut diamond solitaire set in 18k white gold. The four-prong setting maximises light return for unmatched sparkle. IGI certified and conflict-free.',
    shortDescription: 'Brilliant-cut solitaire in 18k white gold.',
    price: 45000,
    stockQuantity: 12,
    material: '18k White Gold, IGI Certified Diamond',
    weight: '3.2g',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Gold Wedding Necklace',
    category: 'Necklaces',
    description:
      'Hand-finished 22k gold bridal necklace with intricate filigree detailing. A timeless heirloom piece designed to be passed down for generations.',
    shortDescription: 'Hand-finished 22k gold bridal necklace.',
    price: 85000,
    stockQuantity: 8,
    material: '22k Yellow Gold',
    weight: '28.5g',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Luxury Diamond Earrings',
    category: 'Earrings',
    description:
      'Pavé diamond drop earrings that shimmer with every movement. Crafted in 18k gold and certified for brilliance, clarity and ethical sourcing.',
    shortDescription: 'Pavé diamond drops in 18k gold.',
    price: 35000,
    stockQuantity: 15,
    material: '18k Gold, Pavé Diamonds',
    weight: '4.6g',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Gold Bracelet',
    category: 'Bracelets',
    description:
      'A sculptural 18k gold cuff with a mirror-polished finish. Bold yet refined, it makes a statement on its own or stacked.',
    shortDescription: 'Sculptural 18k gold cuff.',
    price: 25000,
    stockQuantity: 18,
    material: '18k Yellow Gold',
    weight: '14.2g',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Pearl Pendant',
    category: 'Pendants',
    description:
      'A lustrous South Sea pearl framed in delicate 18k gold, suspended on a fine cable chain. Understated elegance for everyday luxury.',
    shortDescription: 'South Sea pearl framed in 18k gold.',
    price: 18000,
    stockQuantity: 20,
    material: '18k Gold, South Sea Pearl',
    weight: '5.1g',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Premium Bridal Set',
    category: 'Wedding Collection',
    description:
      'A complete bridal ensemble — necklace, matching earrings and ring — in 22k gold with diamond accents. The ultimate expression of celebration.',
    shortDescription: 'Necklace, earrings and ring bridal ensemble.',
    price: 125000,
    stockQuantity: 5,
    material: '22k Gold with Diamond Accents',
    weight: '46.0g',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80',
  },
]

async function seed() {
  console.log('🔄 Connecting to MongoDB (additive seed — no data will be deleted)...')
  await connect(MONGODB_URI)
  console.log('✅ Connected')

  // --- Categories: upsert by name, never delete existing ---
  const categoryIdByName = new Map<string, string>()
  let catAdded = 0
  for (const cat of categories) {
    const existing = await Category.findOne({ name: cat.name })
    if (existing) {
      categoryIdByName.set(cat.name, String(existing._id))
      console.log(`   = category exists: ${cat.name}`)
    } else {
      const created = await Category.create(cat)
      categoryIdByName.set(cat.name, String(created._id))
      catAdded++
      console.log(`   + category added: ${cat.name}`)
    }
  }

  // --- Products: insert only if a product with the same name doesn't exist ---
  let prodAdded = 0
  let prodSkipped = 0
  for (const t of productTemplates) {
    const exists = await Product.findOne({ name: t.name })
    if (exists) {
      prodSkipped++
      console.log(`   = product exists, skipping: ${t.name}`)
      continue
    }
    const categoryId = categoryIdByName.get(t.category)
    if (!categoryId) {
      console.warn(`   ! no category for product ${t.name} (${t.category}), skipping`)
      continue
    }
    await Product.create({
      name: t.name,
      categoryId,
      description: t.description,
      shortDescription: t.shortDescription,
      price: t.price,
      stockQuantity: t.stockQuantity,
      lowStockThreshold: 5,
      material: t.material,
      weight: t.weight,
      images: [{ url: t.image, alt: t.name, isPrimary: true }],
      tags: [t.category],
      ratings: { average: 4.8, count: 42 },
      isActive: true,
      slug: t.name.toLowerCase().replace(/\s+/g, '-'),
    })
    prodAdded++
    console.log(`   + product added: ${t.name} (₹${t.price.toLocaleString('en-IN')})`)
  }

  console.log('\n✨ Additive seed complete.')
  console.log(`   Categories added: ${catAdded} (existing untouched)`)
  console.log(`   Products added: ${prodAdded}, skipped (already present): ${prodSkipped}`)

  await disconnect()
  process.exit(0)
}

seed().catch(async (err) => {
  console.error('❌ Additive seed failed:', err)
  await disconnect().catch(() => undefined)
  process.exit(1)
})
