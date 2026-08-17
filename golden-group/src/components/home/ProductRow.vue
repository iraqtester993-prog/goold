<template>
  <section class="product-row-section">
    <div class="section-header">
      <h3 class="section-title">{{ title }}</h3>
      <router-link to="/products" class="view-all">
        عرض الكل
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </router-link>
    </div>
    <div class="products-scroll" ref="scrollContainer">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup>
import ProductCard from '../product/ProductCard.vue'

defineProps({
  title: { type: String, required: true },
  products: { type: Array, required: true }
})
</script>

<style scoped>
.product-row-section {
  margin-bottom: 28px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.view-all {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-gold);
  text-decoration: none;
}

.products-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 4px 0;
}

.products-scroll::-webkit-scrollbar {
  display: none;
}

.products-scroll > :deep(.product-card) {
  min-width: 160px;
  max-width: 160px;
  scroll-snap-align: start;
  flex-shrink: 0;
}
</style>
