<template>
  <div class="product-detail" v-if="product">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/home" class="breadcrumb-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          الرئيسية
        </router-link>
        <span class="breadcrumb-sep">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
        <router-link to="/products" class="breadcrumb-link">المنتجات</router-link>
        <span class="breadcrumb-sep">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
        <router-link
          v-if="product.category"
          :to="`/category/${product.category}`"
          class="breadcrumb-link"
        >{{ product.categoryLabel }}</router-link>
        <span class="breadcrumb-sep" v-if="product.category">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
        <span class="breadcrumb-current">{{ product.name }}</span>
      </nav>

      <div class="detail-grid">
        <div class="gallery-section">
          <div class="main-image-wrapper" @click="openGallery">
            <img :src="activeImage" :alt="product.name" class="main-image" />
            <div class="image-badges">
              <span v-if="product.isNew" class="badge badge-new">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6m0 8v6m-6-10h6m8 0h-6"/></svg>
                جديد
              </span>
              <span v-if="discount > 0" class="badge badge-discount">-{{ discount }}%</span>
            </div>
            <button class="fav-btn-overlay" @click.stop="favoriteStore.toggle(product.id)">
              <svg width="20" height="20" viewBox="0 0 24 24"
                :fill="favoriteStore.isFavorite(product.id) ? '#ef4444' : 'none'"
                :stroke="favoriteStore.isFavorite(product.id) ? '#ef4444' : 'currentColor'"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
          <div class="thumbnails" v-if="product.images && product.images.length > 1">
            <button
              v-for="(img, idx) in product.images"
              :key="idx"
              class="thumbnail"
              :class="{ active: activeImageIndex === idx }"
              @click="activeImageIndex = idx"
            >
              <img :src="img" :alt="`${product.name} ${idx + 1}`" />
            </button>
          </div>
        </div>

        <div class="info-section">
          <span class="product-brand">{{ product.brand }}</span>
          <h1 class="product-name">{{ product.name }}</h1>

          <div class="product-rating">
            <div class="stars">
              <svg v-for="i in 5" :key="i" width="18" height="18" viewBox="0 0 24 24"
                :fill="i <= Math.round(product.rating) ? 'var(--color-gold)' : 'none'"
                :stroke="i <= Math.round(product.rating) ? 'var(--color-gold)' : 'var(--text-muted)'"
                stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <span class="rating-num">{{ product.rating }}</span>
            <span class="review-count">({{ product.reviews }} تقييم)</span>
          </div>

          <div class="price-card">
            <div class="price-row">
              <span class="current-price">{{ formatCurrency(product.price) }}</span>
              <span v-if="discount > 0" class="discount-pill">خصم {{ discount }}%</span>
            </div>
            <span v-if="product.originalPrice > product.price" class="original-price">
              {{ formatCurrency(product.originalPrice) }}
            </span>
          </div>

          <div class="installment-preview" v-if="lowestInstallment">
            <div class="installment-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            <div class="installment-text">
              <span class="installment-label">أقل قسط شهري</span>
              <span class="installment-value">{{ formatCurrency(lowestInstallment.monthlyPayment) }} / {{ lowestInstallment.months }} شهر</span>
            </div>
            <span v-if="lowestInstallment.interest === 0" class="no-interest-tag">بدون فوائد</span>
          </div>

          <div class="stock-status" :class="{ inStock: product.inStock }">
            <svg v-if="product.inStock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
            </svg>
            {{ product.inStock ? 'متوفر في المخزون' : 'غير متوفر' }}
          </div>

          <div class="action-buttons">
            <button class="btn-add-cart" @click="addToCart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              أضف للسلة
            </button>
            <button
              class="btn-favorite"
              :class="{ active: favoriteStore.isFavorite(product.id) }"
              @click="favoriteStore.toggle(product.id)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24"
                :fill="favoriteStore.isFavorite(product.id) ? '#ef4444' : 'none'"
                :stroke="favoriteStore.isFavorite(product.id) ? '#ef4444' : 'currentColor'"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="detail-sections">
        <div class="section-card" v-if="product.specs && Object.keys(product.specs).length">
          <h3 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="10" y1="4" x2="10" y2="20"/>
            </svg>
            المواصفات
          </h3>
          <div class="specs-grid">
            <div v-for="(value, key) in product.specs" :key="key" class="spec-item">
              <span class="spec-label">{{ specLabels[key] || key }}</span>
              <span class="spec-value">{{ value }}</span>
            </div>
          </div>
        </div>

        <div class="section-card" v-if="product.description">
          <h3 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            الوصف
          </h3>
          <p class="description-text">{{ product.description }}</p>
        </div>

        <div class="section-card" v-if="product.warranty">
          <h3 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            الضمان
          </h3>
          <div class="warranty-info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            {{ product.warranty }}
          </div>
        </div>

        <div class="section-card" v-if="product.attachments && product.attachments.length">
          <h3 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
            المحتويات في الصندوق
          </h3>
          <ul class="attachments-list">
            <li v-for="(item, idx) in product.attachments" :key="idx">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="section-card installment-calc-card" v-if="product.installmentOptions">
          <h3 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            حاسبة الأقساط
          </h3>

          <div class="calc-options">
            <div class="option-group">
              <label class="option-label">المدة</label>
              <div class="duration-buttons">
                <button
                  v-for="opt in product.installmentOptions"
                  :key="opt.months"
                  class="duration-btn"
                  :class="{ active: selectedMonths === opt.months }"
                  @click="selectedMonths = opt.months"
                >
                  {{ opt.months }} شهر
                </button>
              </div>
            </div>

            <div class="option-group" v-if="product.downPaymentOptions && product.downPaymentOptions.length">
              <label class="option-label">الدفعة المقدمة</label>
              <div class="downpayment-buttons">
                <button
                  v-for="dp in product.downPaymentOptions"
                  :key="dp"
                  class="dp-btn"
                  :class="{ active: selectedDownPayment === dp }"
                  @click="selectedDownPayment = dp"
                >
                  {{ formatCurrency(dp) }}
                </button>
              </div>
            </div>
          </div>

          <div class="calc-result" v-if="calcResult">
            <div class="result-row">
              <span class="result-label">القسط الشهري</span>
              <span class="result-value gold">{{ formatCurrency(calcResult.monthlyPayment) }}</span>
            </div>
            <div class="result-row">
              <span class="result-label">المدة</span>
              <span class="result-value">{{ calcResult.months }} شهر</span>
            </div>
            <div class="result-row">
              <span class="result-label">الدفعة المقدمة</span>
              <span class="result-value">{{ formatCurrency(selectedDownPayment) }}</span>
            </div>
            <div class="result-row total">
              <span class="result-label">الإجمالي</span>
              <span class="result-value">{{ formatCurrency(calcResult.monthlyPayment * calcResult.months + selectedDownPayment) }}</span>
            </div>
            <div class="result-row" v-if="calcResult.interest > 0">
              <span class="result-label">الفائدة</span>
              <span class="result-value interest">{{ calcResult.interest }}%</span>
            </div>
            <div class="result-row" v-else>
              <span class="result-label">الفائدة</span>
              <span class="result-value no-interest">بدون فوائد</span>
            </div>
          </div>
        </div>
      </div>

      <div class="related-section" v-if="relatedProducts.length > 0">
        <h2 class="related-title">منتجات مشابهة</h2>
        <div class="related-grid">
          <ProductCard
            v-for="rp in relatedProducts"
            :key="rp.id"
            :product="rp"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <div class="container">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
      <h2>المنتج غير موجود</h2>
      <router-link to="/products" class="back-link">العودة للمنتجات</router-link>
    </div>
  </div>

  <ImageGallery
    :visible="showGallery"
    :images="galleryImages"
    :startIndex="galleryStartIndex"
    @update:visible="showGallery = $event"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useCurrency } from '../composables/useCurrency'
import ProductCard from '../components/product/ProductCard.vue'
import ImageGallery from '../components/product/ImageGallery.vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const { formatCurrency } = useCurrency()

const product = computed(() => productStore.getProduct(route.params.id))

const activeImageIndex = ref(0)
const activeImage = computed(() => {
  if (!product.value) return ''
  const imgs = product.value.images
  if (imgs && imgs.length > 0) {
    return imgs[activeImageIndex.value] || product.value.image
  }
  return product.value.image
})

const selectedMonths = ref(3)
const selectedDownPayment = ref(0)

const showGallery = ref(false)
const galleryStartIndex = ref(0)

const galleryImages = computed(() => {
  if (!product.value) return []
  if (product.value.images && product.value.images.length > 0) {
    return product.value.images
  }
  return product.value.image ? [product.value.image] : []
})

function openGallery() {
  galleryStartIndex.value = activeImageIndex.value
  showGallery.value = true
}

const calcResult = computed(() => {
  if (!product.value) return null
  const option = product.value.installmentOptions.find(o => o.months === selectedMonths.value)
  return option || null
})

const lowestInstallment = computed(() => {
  if (!product.value || !product.value.installmentOptions) return null
  return [...product.value.installmentOptions].sort((a, b) => a.monthlyPayment - b.monthlyPayment)[0]
})

const discount = computed(() => {
  if (!product.value || !product.value.originalPrice || product.value.originalPrice <= product.value.price) return 0
  return Math.round((1 - product.value.price / product.value.originalPrice) * 100)
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.getProductsByCategory(product.value.category)
    .filter(p => p.id !== product.value.id)
    .slice(0, 4)
})

const specLabels = {
  storage: 'التخزين',
  ram: 'الذاكرة',
  screen: 'الشاشة',
  battery: 'البطارية',
  camera: 'الكاميرا',
  processor: 'المعالج',
  type: 'النوع',
  wireless: 'لاسلكي',
  anc: 'إلغاء الضوضاء'
}

function addToCart() {
  cartStore.addItem(product.value)
}
</script>

<style scoped>
.product-detail {
  padding: 20px 0 60px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 28px;
  font-size: 0.85rem;
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb-link:hover {
  color: var(--color-gold);
}

.breadcrumb-sep {
  color: var(--text-muted);
  opacity: 0.5;
  display: flex;
  align-items: center;
}

.breadcrumb-current {
  color: var(--text-primary);
  font-weight: 600;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 40px;
}

.gallery-section {
  position: sticky;
  top: calc(var(--header-height, 64px) + 20px);
  align-self: start;
}

.main-image-wrapper {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  cursor: pointer;
}

.main-image {
  width: 80%;
  height: 80%;
  object-fit: contain;
  transition: transform var(--transition-normal);
}

.main-image-wrapper:hover .main-image {
  transform: scale(1.05);
}

.image-badges {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
}

.badge-new {
  background: rgba(212, 168, 67, 0.15);
  color: var(--color-gold);
  backdrop-filter: blur(8px);
}

.badge-discount {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  backdrop-filter: blur(8px);
}

.fav-btn-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.fav-btn-overlay:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

[data-theme="dark"] .fav-btn-overlay {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.08);
}

.thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 4px 0;
}

.thumbnails::-webkit-scrollbar {
  display: none;
}

.thumbnail {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-fast);
  background: var(--bg-card);
  padding: 4px;
}

.thumbnail:hover {
  border-color: var(--border-color);
}

.thumbnail.active {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 2px rgba(212, 168, 67, 0.2);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.info-section {
  display: flex;
  flex-direction: column;
}

.product-brand {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-name {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 8px 0 14px;
  line-height: 1.35;
  font-family: 'Cairo', sans-serif;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
}

.stars {
  display: flex;
  gap: 2px;
}

.rating-num {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.review-count {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.price-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  margin-bottom: 16px;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
}

.current-price {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--color-gold);
  font-family: 'Cairo', sans-serif;
}

.discount-pill {
  padding: 4px 12px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: var(--radius-full);
}

.original-price {
  font-size: 1rem;
  color: var(--text-muted);
  text-decoration: line-through;
}

.installment-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(34, 197, 94, 0.06);
  border: 1px solid rgba(34, 197, 94, 0.15);
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.installment-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 197, 94, 0.1);
  border-radius: var(--radius-md);
}

.installment-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.installment-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.installment-value {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
}

.no-interest-tag {
  padding: 4px 10px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.stock-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #ef4444;
  margin-bottom: 20px;
  font-weight: 500;
}

.stock-status.inStock {
  color: #22c55e;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn-add-cart {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  background: var(--color-gold);
  color: var(--bg-primary);
  border: none;
  border-radius: var(--radius-lg);
  font-family: 'Cairo', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-add-cart:hover {
  box-shadow: var(--shadow-gold);
  transform: translateY(-2px);
}

.btn-add-cart:active {
  transform: translateY(0);
}

.btn-favorite {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-favorite:hover {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.btn-favorite.active {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}

.detail-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.detail-sections .installment-calc-card {
  grid-column: 1 / -1;
}

.section-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
  font-family: 'Cairo', sans-serif;
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
}

.spec-label {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.spec-value {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-primary);
}

.description-text {
  color: var(--text-secondary);
  line-height: 1.9;
  font-size: 0.95rem;
}

.warranty-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(34, 197, 94, 0.06);
  border: 1px solid rgba(34, 197, 94, 0.12);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
}

.attachments-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attachments-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  color: var(--text-primary);
}

.calc-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.duration-buttons {
  display: flex;
  gap: 10px;
}

.duration-btn {
  flex: 1;
  padding: 12px;
  background: var(--bg-input);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-family: 'Cairo', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
}

.duration-btn:hover {
  border-color: var(--border-color);
}

.duration-btn.active {
  border-color: var(--color-gold);
  background: rgba(212, 168, 67, 0.08);
  color: var(--color-gold);
}

.downpayment-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.dp-btn {
  padding: 10px 16px;
  background: var(--bg-input);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-family: 'Cairo', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.dp-btn:hover {
  border-color: var(--border-color);
}

.dp-btn.active {
  border-color: var(--color-gold);
  background: rgba(212, 168, 67, 0.08);
  color: var(--color-gold);
}

.calc-result {
  padding-top: 16px;
  border-top: 1px solid var(--border-light);
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.result-row.total {
  padding-top: 12px;
  margin-top: 4px;
  border-top: 1px solid var(--border-light);
  font-weight: 700;
}

.result-row.total .result-label {
  color: var(--text-primary);
  font-size: 0.95rem;
}

.result-row.total .result-value {
  color: var(--color-gold);
  font-size: 1.1rem;
  font-weight: 900;
}

.result-label {
  color: var(--text-secondary);
}

.result-value {
  font-weight: 600;
  color: var(--text-primary);
}

.result-value.gold {
  color: var(--color-gold);
  font-weight: 800;
}

.result-value.interest {
  color: #ef4444;
  font-weight: 600;
}

.result-value.no-interest {
  color: #22c55e;
  font-weight: 600;
}

.related-section {
  margin-top: 20px;
}

.related-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 20px;
  font-family: 'Cairo', sans-serif;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.not-found {
  text-align: center;
  padding: 100px 20px;
  color: var(--text-muted);
}

.not-found h2 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 16px 0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  background: var(--color-gold);
  color: var(--bg-primary);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  transition: all var(--transition-fast);
}

.back-link:hover {
  box-shadow: var(--shadow-gold);
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .gallery-section {
    position: static;
  }

  .detail-sections {
    grid-template-columns: 1fr;
  }

  .related-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .product-name {
    font-size: 1.3rem;
  }

  .current-price {
    font-size: 1.4rem;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }

  .related-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .duration-buttons {
    flex-wrap: wrap;
  }

  .duration-btn {
    flex: 0 0 calc(33.333% - 7px);
  }
}

@media (max-width: 480px) {
  .action-buttons {
    flex-direction: column;
  }

  .btn-favorite {
    width: 100%;
    height: 48px;
  }
}
</style>
