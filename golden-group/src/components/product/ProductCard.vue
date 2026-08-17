<template>
  <div class="product-card" @click="$router.push(`/products/${product.id}`)">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" loading="lazy" />
      <div class="product-badges">
        <span v-if="product.isNew" class="badge badge-gold">جديد</span>
        <span v-if="discount > 0" class="badge badge-red">-{{ discount }}%</span>
      </div>
      <button class="quick-add" @click.stop="addToCart">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </button>
    </div>
    <div class="product-info">
      <span class="product-category">{{ product.categoryLabel }}</span>
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-rating">
        <div class="stars">
          <svg v-for="i in 5" :key="i" width="14" height="14" viewBox="0 0 24 24"
            :fill="i <= Math.round(product.rating) ? 'var(--color-gold)' : 'none'"
            :stroke="i <= Math.round(product.rating) ? 'var(--color-gold)' : 'var(--text-muted)'"
            stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <span class="review-count">({{ product.reviews }})</span>
      </div>
      <div class="product-pricing">
        <span class="current-price">{{ formatCurrency(product.price) }}</span>
        <span v-if="product.originalPrice > product.price" class="original-price">
          {{ formatCurrency(product.originalPrice) }}
        </span>
      </div>
      <InstallmentBadge :price="product.price" :months="3" :compact="true" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCurrency } from '../../composables/useCurrency'
import { useCartStore } from '../../stores/cartStore'
import InstallmentBadge from '../common/InstallmentBadge.vue'

const props = defineProps({
  product: { type: Object, required: true }
})

const { formatCurrency } = useCurrency()
const cartStore = useCartStore()

const discount = computed(() => {
  if (!props.product.originalPrice || props.product.originalPrice <= props.product.price) return 0
  return Math.round((1 - props.product.price / props.product.originalPrice) * 100)
})

function addToCart() {
  cartStore.addItem(props.product)
}
</script>

<style scoped>
.product-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.product-card:hover {
  border-color: var(--border-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.product-image {
  position: relative;
  aspect-ratio: 1;
  background: var(--bg-input);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-badges {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.quick-add {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gold);
  color: var(--bg-primary);
  border-radius: var(--radius-full);
  opacity: 0;
  transform: translateY(8px);
  transition: all var(--transition-fast);
}

.product-card:hover .quick-add {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .quick-add {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-info {
  padding: 14px;
}

.product-category {
  font-size: 0.7rem;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 6px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.stars {
  display: flex;
  gap: 1px;
}

.review-count {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.product-pricing {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.current-price {
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-gold);
}

.original-price {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-decoration: line-through;
}
</style>
