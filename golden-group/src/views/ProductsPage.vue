<template>
  <div class="products-page">
    <div class="container">
      <div class="page-header">
        <div class="page-title-row">
          <h1 class="page-title">
            {{ currentCategory ? currentCategory.name : 'جميع المنتجات' }}
          </h1>
          <span class="results-count">{{ filteredList.length }} منتج</span>
        </div>
        <div class="sort-bar">
          <div class="sort-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="8" y2="18"/>
            </svg>
          </div>
          <select v-model="productStore.sortBy" class="sort-select">
            <option value="featured">المميزة</option>
            <option value="price-low">السعر: الأقل</option>
            <option value="price-high">السعر: الأعلى</option>
            <option value="rating">التقييم</option>
            <option value="newest">الأحدث</option>
          </select>
        </div>
      </div>

      <div class="mobile-pills" v-if="isMobile">
        <button
          class="pill"
          :class="{ active: !productStore.selectedCategory }"
          @click="productStore.selectedCategory = null"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          الكل
        </button>
        <button
          v-for="cat in productStore.categories"
          :key="cat.id"
          class="pill"
          :class="{ active: productStore.selectedCategory === cat.id }"
          @click="productStore.selectedCategory = cat.id"
        >
          {{ cat.icon }} {{ cat.name }}
        </button>
      </div>

      <div class="products-layout">
        <aside class="filters-sidebar" v-if="!isMobile">
          <div class="filter-card">
            <h4 class="filter-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              تصفية حسب القسم
            </h4>
            <div class="filter-options">
              <label
                class="filter-option"
                :class="{ active: !productStore.selectedCategory }"
              >
                <input type="radio" :value="null" v-model="productStore.selectedCategory" name="category" />
                <span class="radio-dot"></span>
                <span class="option-icon">📋</span>
                <span class="option-text">الكل</span>
              </label>
              <label
                v-for="cat in productStore.categories"
                :key="cat.id"
                class="filter-option"
                :class="{ active: productStore.selectedCategory === cat.id }"
              >
                <input type="radio" :value="cat.id" v-model="productStore.selectedCategory" name="category" />
                <span class="radio-dot"></span>
                <span class="option-icon">{{ cat.icon }}</span>
                <span class="option-text">{{ cat.name }}</span>
              </label>
            </div>
          </div>

          <button
            v-if="productStore.selectedCategory"
            class="clear-filter-btn"
            @click="productStore.selectedCategory = null"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            مسح الفلتر
          </button>
        </aside>

        <div class="products-content">
          <div class="products-grid" v-if="filteredList.length > 0">
            <ProductCard
              v-for="product in filteredList"
              :key="product.id"
              :product="product"
            />
          </div>
          <div v-else class="no-results">
            <div class="no-results-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </div>
            <h3>لا توجد منتجات مطابقة</h3>
            <p>جرب تغيير الفلتر أو البحث عن منتج آخر</p>
            <button v-if="productStore.selectedCategory" class="reset-btn" @click="productStore.selectedCategory = null">
              عرض جميع المنتجات
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/product/ProductCard.vue'

const route = useRoute()
const productStore = useProductStore()
const isMobile = ref(window.innerWidth <= 1024)

const currentCategory = computed(() => {
  if (route.params.slug) {
    return productStore.categories.find(c => c.slug === route.params.slug)
  }
  return null
})

const filteredList = computed(() => productStore.filteredProducts)

function onResize() {
  isMobile.value = window.innerWidth <= 1024
}

onMounted(() => {
  if (route.params.slug) {
    productStore.selectedCategory = route.params.slug
  }
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

watch(() => route.params.slug, (newSlug) => {
  productStore.selectedCategory = newSlug || null
})
</script>

<style scoped>
.products-page {
  padding: 20px 0 40px;
}

.page-header {
  margin-bottom: 24px;
}

.page-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text-primary);
  font-family: 'Cairo', sans-serif;
}

.results-count {
  font-size: 0.85rem;
  color: var(--text-muted);
  background: var(--bg-input);
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

.sort-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-icon {
  display: flex;
  align-items: center;
  color: var(--text-muted);
}

.sort-select {
  padding: 10px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: 'Cairo', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left 12px center;
  padding-left: 32px;
}

.sort-select:hover {
  border-color: var(--color-gold);
}

.sort-select:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.15);
}

.mobile-pills {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 16px;
  margin-bottom: 16px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.mobile-pills::-webkit-scrollbar {
  display: none;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-family: 'Cairo', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pill:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.pill.active {
  background: var(--color-gold);
  color: var(--bg-primary);
  border-color: var(--color-gold);
  box-shadow: var(--shadow-gold);
}

.products-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
}

.filters-sidebar {
  position: sticky;
  top: calc(var(--header-height, 64px) + 20px);
  align-self: start;
}

.filter-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 20px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.filter-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.filter-option:hover {
  background: var(--bg-input);
  color: var(--text-primary);
}

.filter-option.active {
  background: rgba(212, 168, 67, 0.1);
  color: var(--color-gold);
}

.filter-option input {
  display: none;
}

.radio-dot {
  width: 18px;
  height: 18px;
  min-width: 18px;
  border: 2px solid var(--border-light);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
  position: relative;
}

.filter-option input:checked ~ .radio-dot {
  border-color: var(--color-gold);
}

.filter-option input:checked ~ .radio-dot::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: var(--color-gold);
  border-radius: var(--radius-full);
}

.option-icon {
  font-size: 1rem;
}

.option-text {
  font-weight: 500;
}

.clear-filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  background: transparent;
  border: 1px dashed var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-muted);
  font-family: 'Cairo', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.clear-filter-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.no-results {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-muted);
}

.no-results-icon {
  margin-bottom: 16px;
  opacity: 0.3;
}

.no-results h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.no-results p {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.reset-btn {
  padding: 10px 24px;
  background: var(--color-gold);
  color: var(--bg-primary);
  border: none;
  border-radius: var(--radius-md);
  font-family: 'Cairo', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.reset-btn:hover {
  box-shadow: var(--shadow-gold);
  transform: translateY(-2px);
}

@media (max-width: 1280px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .products-layout {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .page-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
