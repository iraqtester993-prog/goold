<template>
  <section class="featured-products">
    <div class="section-header">
      <h2 class="section-title">
        <span class="icon">🔥</span>
        {{ title }}
      </h2>
      <router-link to="/products" class="view-all">
        عرض الكل
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="flip-rtl">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </router-link>
    </div>
    <div class="products-grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<script setup>
import ProductCard from '../product/ProductCard.vue'

defineProps({
  title: { type: String, default: 'منتجات مميزة' },
  products: { type: Array, required: true }
})
</script>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
