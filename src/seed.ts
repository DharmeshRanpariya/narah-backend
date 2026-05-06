import { connect, model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { CategorySchema } from './modules/categories/schemas/category.schema'
import { ProductSchema } from './modules/products/schemas/product.schema'
import { AdminUserSchema } from './modules/auth/schemas/admin-user.schema'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/narah-store'

const Category = model('Category', CategorySchema)
const Product = model('Product', ProductSchema)
const AdminUser = model('AdminUser', AdminUserSchema)

const categories = [
  {
    name: 'Rings',
    description: 'Elegant rings crafted with precision and elegance',
    displayOrder: 1,
  },
  {
    name: 'Necklaces',
    description: 'Beautiful necklaces to complement any style',
    displayOrder: 2,
  },
  {
    name: 'Bracelets',
    description: 'Stunning bracelets for every occasion',
    displayOrder: 3,
  },
  {
    name: 'Earrings',
    description: 'Exquisite earrings that enhance your beauty',
    displayOrder: 4,
  },
  {
    name: 'Anklets',
    description: 'Delicate anklets for a perfect finish',
    displayOrder: 5,
  },
]

const productTemplates = [
  // Rings
  {
    name: 'Silver Sterling Ring - Classic Design',
    category: 'Rings',
    description: 'A timeless classic silver ring with intricate detailing',
    shortDescription: 'Classic sterling silver ring',
    price: 2500,
    salePrice: 1999,
    stockQuantity: 15,
    material: 'Sterling Silver',
    weight: '4.5g',
    image: 'https://images.pexels.com/photos/1927769/pexels-photo-1927769.jpeg',
  },
  {
    name: 'Engagement Ring - Diamond Style',
    category: 'Rings',
    description: 'Stunning engagement ring with elegant stone setting',
    shortDescription: 'Premium engagement ring',
    price: 15000,
    salePrice: 12999,
    stockQuantity: 8,
    material: 'Sterling Silver with CZ',
    weight: '5.2g',
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  },
  {
    name: 'Silver Band Ring - Minimalist',
    category: 'Rings',
    description: 'Sleek and modern silver band ring',
    shortDescription: 'Minimalist band ring',
    price: 1800,
    stockQuantity: 20,
    material: 'Sterling Silver',
    weight: '3.8g',
    image: 'https://images.pexels.com/photos/2959667/pexels-photo-2959667.jpeg',
  },
  {
    name: 'Gemstone Ring - Blue Stone',
    category: 'Rings',
    description: 'Beautiful ring with blue gemstone',
    shortDescription: 'Blue gemstone ring',
    price: 5500,
    salePrice: 4299,
    stockQuantity: 12,
    material: 'Sterling Silver',
    weight: '4.8g',
    image: 'https://images.pexels.com/photos/1927769/pexels-photo-1927769.jpeg',
  },
  {
    name: 'Twisted Silver Ring',
    category: 'Rings',
    description: 'Elegantly twisted silver ring design',
    shortDescription: 'Twisted design ring',
    price: 3200,
    salePrice: 2599,
    stockQuantity: 14,
    material: 'Sterling Silver',
    weight: '4.2g',
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  },
  {
    name: 'Stackable Silver Rings Set',
    category: 'Rings',
    description: 'Set of 3 elegant stackable rings',
    shortDescription: 'Stackable rings set',
    price: 4500,
    salePrice: 3499,
    stockQuantity: 10,
    material: 'Sterling Silver',
    weight: '3.5g',
    image: 'https://images.pexels.com/photos/2959667/pexels-photo-2959667.jpeg',
  },

  // Necklaces
  {
    name: 'Silver Pendant Necklace - Heart',
    category: 'Necklaces',
    description: 'Delicate heart-shaped pendant necklace',
    shortDescription: 'Heart pendant necklace',
    price: 3500,
    salePrice: 2799,
    stockQuantity: 16,
    material: 'Sterling Silver',
    weight: '6.5g',
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  },
  {
    name: 'Long Chain Necklace - Minimalist',
    category: 'Necklaces',
    description: 'Long elegant chain necklace for layering',
    shortDescription: 'Long chain necklace',
    price: 2800,
    stockQuantity: 18,
    material: 'Sterling Silver',
    weight: '7.2g',
    image: 'https://images.pexels.com/photos/1927769/pexels-photo-1927769.jpeg',
  },
  {
    name: 'Statement Necklace - Silver Links',
    category: 'Necklaces',
    description: 'Bold statement necklace with chunky silver links',
    shortDescription: 'Statement link necklace',
    price: 6500,
    salePrice: 5299,
    stockQuantity: 9,
    material: 'Sterling Silver',
    weight: '12.5g',
    image: 'https://images.pexels.com/photos/2959667/pexels-photo-2959667.jpeg',
  },
  {
    name: 'Geometric Pendant Necklace',
    category: 'Necklaces',
    description: 'Modern geometric design pendant necklace',
    shortDescription: 'Geometric pendant',
    price: 4200,
    salePrice: 3399,
    stockQuantity: 11,
    material: 'Sterling Silver',
    weight: '5.8g',
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  },
  {
    name: 'Pearl Pendant Necklace',
    category: 'Necklaces',
    description: 'Elegant necklace with pearl pendant',
    shortDescription: 'Pearl pendant necklace',
    price: 5800,
    salePrice: 4699,
    stockQuantity: 13,
    material: 'Sterling Silver with Pearl',
    weight: '8.2g',
    image: 'https://images.pexels.com/photos/1927769/pexels-photo-1927769.jpeg',
  },
  {
    name: 'Layered Necklace Set',
    category: 'Necklaces',
    description: 'Set of 2 layered necklaces for perfect styling',
    shortDescription: 'Layered necklace set',
    price: 5500,
    salePrice: 4199,
    stockQuantity: 10,
    material: 'Sterling Silver',
    weight: '9.5g',
    image: 'https://images.pexels.com/photos/2959667/pexels-photo-2959667.jpeg',
  },

  // Bracelets
  {
    name: 'Tennis Bracelet - Silver',
    category: 'Bracelets',
    description: 'Sparkling tennis bracelet with CZ stones',
    shortDescription: 'Tennis bracelet',
    price: 7500,
    salePrice: 5999,
    stockQuantity: 7,
    material: 'Sterling Silver with CZ',
    weight: '11.2g',
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  },
  {
    name: 'Bangle Bracelet - Smooth',
    category: 'Bracelets',
    description: 'Classic smooth silver bangle bracelet',
    shortDescription: 'Smooth bangle',
    price: 3800,
    salePrice: 2999,
    stockQuantity: 14,
    material: 'Sterling Silver',
    weight: '8.5g',
    image: 'https://images.pexels.com/photos/1927769/pexels-photo-1927769.jpeg',
  },
  {
    name: 'Beaded Bracelet - Silver Beads',
    category: 'Bracelets',
    description: 'Beautiful beaded bracelet with silver balls',
    shortDescription: 'Beaded bracelet',
    price: 2900,
    stockQuantity: 19,
    material: 'Sterling Silver',
    weight: '6.8g',
    image: 'https://images.pexels.com/photos/2959667/pexels-photo-2959667.jpeg',
  },
  {
    name: 'Link Bracelet - Chain Style',
    category: 'Bracelets',
    description: 'Elegant chain link bracelet',
    shortDescription: 'Chain link bracelet',
    price: 4600,
    salePrice: 3799,
    stockQuantity: 12,
    material: 'Sterling Silver',
    weight: '9.2g',
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  },
  {
    name: 'Charm Bracelet - Silver with Charms',
    category: 'Bracelets',
    description: 'Bracelet with removable charms',
    shortDescription: 'Charm bracelet',
    price: 5200,
    salePrice: 3999,
    stockQuantity: 9,
    material: 'Sterling Silver',
    weight: '10.5g',
    image: 'https://images.pexels.com/photos/1927769/pexels-photo-1927769.jpeg',
  },
  {
    name: 'Gemstone Bracelet - Mixed Stones',
    category: 'Bracelets',
    description: 'Bracelet with mixed colorful gemstones',
    shortDescription: 'Gemstone bracelet',
    price: 6800,
    salePrice: 5299,
    stockQuantity: 8,
    material: 'Sterling Silver with Gemstones',
    weight: '11.8g',
    image: 'https://images.pexels.com/photos/2959667/pexels-photo-2959667.jpeg',
  },

  // Earrings
  {
    name: 'Stud Earrings - Classic Silver',
    category: 'Earrings',
    description: 'Timeless silver stud earrings',
    shortDescription: 'Silver stud earrings',
    price: 1500,
    stockQuantity: 25,
    material: 'Sterling Silver',
    weight: '1.8g',
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  },
  {
    name: 'Drop Earrings - Elegant',
    category: 'Earrings',
    description: 'Beautiful drop earrings with stones',
    shortDescription: 'Drop earrings',
    price: 3200,
    salePrice: 2499,
    stockQuantity: 16,
    material: 'Sterling Silver with CZ',
    weight: '2.5g',
    image: 'https://images.pexels.com/photos/1927769/pexels-photo-1927769.jpeg',
  },
  {
    name: 'Hoop Earrings - Silver',
    category: 'Earrings',
    description: 'Classic silver hoop earrings',
    shortDescription: 'Silver hoop earrings',
    price: 2400,
    salePrice: 1899,
    stockQuantity: 20,
    material: 'Sterling Silver',
    weight: '3.2g',
    image: 'https://images.pexels.com/photos/2959667/pexels-photo-2959667.jpeg',
  },
  {
    name: 'Chandelier Earrings - Ornate',
    category: 'Earrings',
    description: 'Ornate chandelier style earrings',
    shortDescription: 'Chandelier earrings',
    price: 4500,
    salePrice: 3599,
    stockQuantity: 10,
    material: 'Sterling Silver',
    weight: '4.5g',
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  },
  {
    name: 'Pearl Earrings - Stud',
    category: 'Earrings',
    description: 'Elegant pearl stud earrings',
    shortDescription: 'Pearl stud earrings',
    price: 3800,
    salePrice: 2999,
    stockQuantity: 14,
    material: 'Sterling Silver with Pearl',
    weight: '2.8g',
    image: 'https://images.pexels.com/photos/1927769/pexels-photo-1927769.jpeg',
  },
  {
    name: 'Geometric Earrings - Modern',
    category: 'Earrings',
    description: 'Modern geometric design earrings',
    shortDescription: 'Geometric earrings',
    price: 2800,
    salePrice: 2199,
    stockQuantity: 17,
    material: 'Sterling Silver',
    weight: '2.2g',
    image: 'https://images.pexels.com/photos/2959667/pexels-photo-2959667.jpeg',
  },

  // Anklets
  {
    name: 'Silver Anklet - Chain',
    category: 'Anklets',
    description: 'Delicate silver chain anklet',
    shortDescription: 'Silver chain anklet',
    price: 2200,
    stockQuantity: 18,
    material: 'Sterling Silver',
    weight: '5.5g',
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  },
  {
    name: 'Beaded Anklet - Silver Beads',
    category: 'Anklets',
    description: 'Charming beaded silver anklet',
    shortDescription: 'Beaded anklet',
    price: 2600,
    salePrice: 1999,
    stockQuantity: 15,
    material: 'Sterling Silver',
    weight: '6.2g',
    image: 'https://images.pexels.com/photos/1927769/pexels-photo-1927769.jpeg',
  },
  {
    name: 'Charm Anklet - Adjustable',
    category: 'Anklets',
    description: 'Adjustable anklet with charm attachments',
    shortDescription: 'Charm anklet',
    price: 3400,
    salePrice: 2699,
    stockQuantity: 11,
    material: 'Sterling Silver',
    weight: '7.8g',
    image: 'https://images.pexels.com/photos/2959667/pexels-photo-2959667.jpeg',
  },
  {
    name: 'Gemstone Anklet',
    category: 'Anklets',
    description: 'Anklet with beautiful gemstones',
    shortDescription: 'Gemstone anklet',
    price: 4200,
    salePrice: 3299,
    stockQuantity: 9,
    material: 'Sterling Silver with Gemstones',
    weight: '8.5g',
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg',
  },
  {
    name: 'Link Anklet - Bold Style',
    category: 'Anklets',
    description: 'Bold link style anklet',
    shortDescription: 'Link anklet',
    price: 3100,
    salePrice: 2399,
    stockQuantity: 13,
    material: 'Sterling Silver',
    weight: '7.2g',
    image: 'https://images.pexels.com/photos/1927769/pexels-photo-1927769.jpeg',
  },
]

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    await connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await Category.deleteMany({})
    await Product.deleteMany({})
    await AdminUser.deleteMany({})
    console.log('✅ Data cleared')

    // Create admin user
    console.log('👤 Creating admin user...')
    const hashedPassword = await bcrypt.hash('admin@123', 10)
    const adminUser = await AdminUser.create({
      email: 'admin@gmail.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    })
    console.log('✅ Admin user created')
    console.log(`   Email: ${adminUser.email}`)
    console.log(`   Password: admin@123`)
    console.log(`   Role: ${adminUser.role}`)

    // Create categories
    console.log('📁 Creating categories...')
    const createdCategories = await Category.insertMany(categories)
    console.log(`✅ Created ${createdCategories.length} categories`)

    // Create products
    console.log('📦 Creating products...')
    const products = productTemplates.map((template: any) => {
      const category = createdCategories.find((c: any) => c.name === template.category)
      return {
        ...template,
        category: undefined,
        categoryId: category?._id,
        images: [
          {
            url: template.image,
            alt: template.name,
            isPrimary: true,
          },
        ],
        isActive: true,
        slug: template.name.toLowerCase().replace(/\s+/g, '-'),
        ratings: {
          average: Math.random() * 2 + 3.5, // 3.5 to 5.5
          count: Math.floor(Math.random() * 50) + 5,
        },
        tags: [template.category],
        lowStockThreshold: 5,
      }
    })

    const createdProducts = await Product.insertMany(products)
    console.log(`✅ Created ${createdProducts.length} products`)

    console.log('\n✨ Database seeding completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`   - Admin Users: 1`)
    console.log(`   - Categories: ${createdCategories.length}`)
    console.log(`   - Products: ${createdProducts.length}`)
    console.log('\n🎉 Your Narah store is ready with sample data!')
    console.log('\n🔐 Admin Login Credentials:')
    console.log(`   Email: admin@gmail.com`)
    console.log(`   Password: admin@123`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
