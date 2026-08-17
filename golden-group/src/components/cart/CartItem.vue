<template>
  <div class="cart-item">
    <img :src="item.image" :alt="item.name" class="item-image" />
    <div class="item-details">
      <h4 class="item-name">{{ item.name }}</h4>
      <p class="item-price">{{ formatCurrency(item.price) }}</p>
      <div class="item-actions">
        <div class="quantity-controls">
          <button @click="updateQty(-1)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
          <span class="qty">{{ item.quantity }}</span>
          <button @click="updateQty(1)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
        <button class="remove-btn" @click="remove">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../../stores/cartStore'
import { useCurrency } from '../../composables/useCurrency'

const props = defineProps({
  item: { type: Object, required: true }
})

const cartStore = useCartStore()
const { formatCurrency } = useCurrency()

function updateQty(delta) {
  cartStore.updateQuantity(props.item.id, props.item.quantity + delta)
}

function remove() {
  cartStore.removeItem(props.item.id)
}
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-light);
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: var(--bg-input);
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  line-height: 1.3;
}

.item-price {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-gold);
  margin-bottom: 8px;
}

.item-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.quantity-controls button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--text-primary);
  transition: background var(--transition-fast);
}

.quantity-controls button:hover {
  background: var(--bg-card-hover);
}

.qty {
  min-width: 32px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  transition: all var(--transition-fast);
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
</style>
