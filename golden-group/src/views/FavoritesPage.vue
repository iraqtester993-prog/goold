<template>
  <div class="favorites-page">
    <div class="container">
      <h1 class="page-title">المفضلة</h1>

      <div v-if="favoriteProducts.length > 0" class="favorites-grid">
        <ProductCard
          v-for="product in favoriteProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">❤️</div>
        <h3>المفضلة فارغة</h3>
        <p>أضف منتجاتك المفضلة للرجوع إليها لاحقاً</p>
        <router-link to="/products" class="browse-btn">
          تصفح المنتجات
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/product/ProductCard.vue'

const favoriteStore = useFavoriteStore()
const productStore = useProductStore()

const favoriteProducts = computed(() =>
  favoriteStore.items
    .map(id => productStore.getProduct(id))
    .filter(Boolean)
)
</script>

<style scoped>
.favorites-page {
  padding: 16px 0;
}

.container {
  padding: 0 16px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (min-width: 640px) {
  .favorites-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}

@media (min-width: 1024px) {
  .favorites-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.empty-state {
  text-align: center;
  padding: 80px 24px;
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-state h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-state p {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.browse-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  background: var(--color-gold-gradient);
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-gold);
}

.browse-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
</style>
