import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('products', () => {
  const products = ref([
    {
      id: 1,
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      price: 1500000,
      originalPrice: 1800000,
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
      images: [
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600',
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400'
      ],
      category: 'phones',
      categoryLabel: 'هواتف',
      brand: 'Samsung',
      description: 'هاتف سامسونج جالكسي S24 ألترا - أحدث إصدار مع كاميرا متطورة ومعالج قوي',
      specs: { storage: '256GB', ram: '12GB', screen: '6.8 inch', battery: '5000 mAh', camera: '200 MP' },
      rating: 4.8,
      reviews: 245,
      inStock: true,
      featured: true,
      bestSeller: true,
      isNew: true,
      warranty: '24 شهر ضمان رسمي',
      attachments: ['شاحن سلكي', 'كابل USB-C', 'دلة', 'غطاء حماية'],
      installmentOptions: [
        { months: 3, monthlyPayment: 500000, interest: 0, downPayment: 0 },
        { months: 6, monthlyPayment: 275000, interest: 10, downPayment: 300000 },
        { months: 12, monthlyPayment: 145000, interest: 15, downPayment: 500000 }
      ],
      downPaymentOptions: [300000, 500000, 750000]
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max',
      slug: 'iphone-15-pro-max',
      price: 1800000,
      originalPrice: 2000000,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600'
      ],
      category: 'phones',
      categoryLabel: 'هواتف',
      brand: 'Apple',
      description: 'آيفون 15 برو ماكس - تصميم تيتانيوم مع شريحة A17 Pro',
      specs: { storage: '256GB', ram: '8GB', screen: '6.7 inch', battery: '4441 mAh', camera: '48 MP' },
      rating: 4.9,
      reviews: 312,
      inStock: true,
      featured: true,
      bestSeller: true,
      isNew: true,
      warranty: '12 شهر ضمان Apple',
      attachments: ['شاحن USB-C', 'كابل USB-C'],
      installmentOptions: [
        { months: 3, monthlyPayment: 600000, interest: 0, downPayment: 0 },
        { months: 6, monthlyPayment: 330000, interest: 10, downPayment: 350000 },
        { months: 12, monthlyPayment: 172500, interest: 15, downPayment: 600000 }
      ],
      downPaymentOptions: [350000, 600000, 900000]
    },
    {
      id: 3,
      name: 'MacBook Pro M3',
      slug: 'macbook-pro-m3',
      price: 2500000,
      originalPrice: 2800000,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'
      ],
      category: 'laptops',
      categoryLabel: 'لابتوب',
      brand: 'Apple',
      description: 'ماك بوك برو M3 - أداء خارق للمحترفين',
      specs: { storage: '512GB', ram: '16GB', screen: '14 inch', processor: 'Apple M3' },
      rating: 4.9,
      reviews: 178,
      inStock: true,
      featured: true,
      bestSeller: false,
      isNew: true,
      warranty: '12 شهر ضمان Apple',
      attachments: ['شاحن MagSafe', 'كابل USB-C'],
      installmentOptions: [
        { months: 3, monthlyPayment: 833333, interest: 0, downPayment: 0 },
        { months: 6, monthlyPayment: 458333, interest: 10, downPayment: 500000 },
        { months: 12, monthlyPayment: 239583, interest: 15, downPayment: 800000 }
      ],
      downPaymentOptions: [500000, 800000, 1200000]
    },
    {
      id: 4,
      name: 'Sony WH-1000XM5',
      slug: 'sony-wh-1000xm5',
      price: 450000,
      originalPrice: 550000,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
      images: [
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800'
      ],
      category: 'audio',
      categoryLabel: 'سماعات',
      brand: 'Sony',
      description: 'سماعات سوني اللاسلكية مع إلغاء الضوضاء',
      specs: { type: 'Over-ear', wireless: true, anc: true, battery: '30 ساعة' },
      rating: 4.7,
      reviews: 89,
      inStock: true,
      featured: false,
      bestSeller: true,
      isNew: false,
      warranty: '12 شهر ضمان',
      attachments: ['كابل صوت', 'حقيبة حمل', 'كابل شحن'],
      installmentOptions: [
        { months: 3, monthlyPayment: 150000, interest: 0, downPayment: 0 },
        { months: 6, monthlyPayment: 82500, interest: 10, downPayment: 100000 },
        { months: 12, monthlyPayment: 43125, interest: 15, downPayment: 150000 }
      ],
      downPaymentOptions: [100000, 150000, 200000]
    },
    {
      id: 5,
      name: 'iPad Pro M2',
      slug: 'ipad-pro-m2',
      price: 1200000,
      originalPrice: 1400000,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      images: [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800'
      ],
      category: 'tablets',
      categoryLabel: 'لوحات',
      brand: 'Apple',
      description: 'آيباد برو M2 - الشاشة الأقوى للإنتاجية',
      specs: { storage: '128GB', ram: '8GB', screen: '11 inch' },
      rating: 4.8,
      reviews: 156,
      inStock: true,
      featured: true,
      bestSeller: false,
      isNew: false,
      warranty: '12 شهر ضمان Apple',
      attachments: ['شاحن USB-C', 'كابل USB-C'],
      installmentOptions: [
        { months: 3, monthlyPayment: 400000, interest: 0, downPayment: 0 },
        { months: 6, monthlyPayment: 220000, interest: 10, downPayment: 250000 },
        { months: 12, monthlyPayment: 115000, interest: 15, downPayment: 400000 }
      ],
      downPaymentOptions: [250000, 400000, 600000]
    },
    {
      id: 6,
      name: 'Dell XPS 15',
      slug: 'dell-xps-15',
      price: 1800000,
      originalPrice: 2100000,
      image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
      images: [
        'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800'
      ],
      category: 'laptops',
      categoryLabel: 'لابتوب',
      brand: 'Dell',
      description: 'ديل XPS 15 - لابتوب راقي للأعمال والتصميم',
      specs: { storage: '512GB', ram: '16GB', screen: '15.6 inch' },
      rating: 4.6,
      reviews: 98,
      inStock: true,
      featured: false,
      bestSeller: true,
      isNew: false,
      warranty: '12 شهر ضمان Dell',
      attachments: ['شاحن', 'كابل كهرباء'],
      installmentOptions: [
        { months: 3, monthlyPayment: 600000, interest: 0, downPayment: 0 },
        { months: 6, monthlyPayment: 330000, interest: 10, downPayment: 350000 },
        { months: 12, monthlyPayment: 172500, interest: 15, downPayment: 600000 }
      ],
      downPaymentOptions: [350000, 600000, 900000]
    },
    {
      id: 7,
      name: 'AirPods Pro 2',
      slug: 'airpods-pro-2',
      price: 300000,
      originalPrice: 350000,
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400',
      images: [
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800'
      ],
      category: 'audio',
      categoryLabel: 'سماعات',
      brand: 'Apple',
      description: 'AirPods Pro 2 مع إلغاء الضوضاء النشط',
      specs: { type: 'In-ear', wireless: true, anc: true },
      rating: 4.8,
      reviews: 267,
      inStock: true,
      featured: true,
      bestSeller: true,
      isNew: false,
      warranty: '12 شهر ضمان Apple',
      attachments: ['سماعات أذن بديلة', 'كابل Lightning'],
      installmentOptions: [
        { months: 3, monthlyPayment: 100000, interest: 0, downPayment: 0 },
        { months: 6, monthlyPayment: 55000, interest: 10, downPayment: 60000 },
        { months: 12, monthlyPayment: 28750, interest: 15, downPayment: 100000 }
      ],
      downPaymentOptions: [60000, 100000, 150000]
    },
    {
      id: 8,
      name: 'Samsung Galaxy Tab S9',
      slug: 'samsung-galaxy-tab-s9',
      price: 900000,
      originalPrice: 1050000,
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400',
      images: [
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800'
      ],
      category: 'tablets',
      categoryLabel: 'لوحات',
      brand: 'Samsung',
      description: 'تابلت سامسونج جالكسي تاب S9 مع قلم S Pen',
      specs: { storage: '128GB', ram: '8GB', screen: '11 inch' },
      rating: 4.6,
      reviews: 134,
      inStock: true,
      featured: false,
      bestSeller: false,
      isNew: true,
      warranty: '24 شهر ضمان Samsung',
      attachments: ['قلم S Pen', 'شاحن USB-C'],
      installmentOptions: [
        { months: 3, monthlyPayment: 300000, interest: 0, downPayment: 0 },
        { months: 6, monthlyPayment: 165000, interest: 10, downPayment: 180000 },
        { months: 12, monthlyPayment: 86250, interest: 15, downPayment: 300000 }
      ],
      downPaymentOptions: [180000, 300000, 450000]
    }
  ])

  const categories = ref([
    { id: 'phones', name: 'هواتف', icon: '📱', slug: 'phones' },
    { id: 'laptops', name: 'لابتوب', icon: '💻', slug: 'laptops' },
    { id: 'tablets', name: 'لوحات', icon: '📟', slug: 'tablets' },
    { id: 'audio', name: 'سماعات', icon: '🎧', slug: 'audio' },
    { id: 'watches', name: 'ساعات', icon: '⌚', slug: 'watches' },
    { id: 'accessories', name: 'ملحقات', icon: '🔌', slug: 'accessories' }
  ])

  const loading = ref(false)
  const searchQuery = ref('')
  const selectedCategory = ref(null)
  const sortBy = ref('featured')

  const filteredProducts = computed(() => {
    let result = [...products.value]
    if (selectedCategory.value) {
      result = result.filter(p => p.category === selectedCategory.value)
    }
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryLabel.includes(q)
      )
    }
    switch (sortBy.value) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'newest': result.sort((a, b) => b.isNew - a.isNew); break
      default: result.sort((a, b) => b.featured - a.featured)
    }
    return result
  })

  const featuredProducts = computed(() => products.value.filter(p => p.featured))
  const bestSellers = computed(() => products.value.filter(p => p.bestSeller))
  const newProducts = computed(() => products.value.filter(p => p.isNew))

  function getProduct(id) {
    return products.value.find(p => p.id === parseInt(id))
  }

  function getProductsByCategory(category) {
    return products.value.filter(p => p.category === category)
  }

  return {
    products, categories, loading, searchQuery, selectedCategory, sortBy,
    filteredProducts, featuredProducts, bestSellers, newProducts,
    getProduct, getProductsByCategory
  }
})
