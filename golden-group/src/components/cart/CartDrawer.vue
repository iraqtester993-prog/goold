<template>
  <transition name="slide-right">
    <div v-if="cartStore.isOpen" class="cart-overlay" @click.self="cartStore.toggleCart">
      <div class="cart-drawer">
        <div class="cart-header">
          <h3>سلة المشتريات ({{ cartStore.totalItems }})</h3>
          <button class="close-btn" @click="cartStore.toggleCart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="cart-body" v-if="cartStore.items.length">
          <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
        </div>

        <div v-else class="cart-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <p>سلتك فارغة</p>
          <router-link to="/products" class="btn btn-primary" @click="cartStore.toggleCart">
            تصفح المنتجات
          </router-link>
        </div>

        <div v-if="cartStore.items.length" class="cart-footer">
          <div class="cart-summary">
            <div class="summary-row">
              <span>المجموع الفرعي</span>
              <span>{{ formatCurrency(cartStore.totalPrice) }}</span>
            </div>
            <div class="summary-row total">
              <span>الإجمالي</span>
              <span class="total-price">{{ formatCurrency(cartStore.totalPrice) }}</span>
            </div>
          </div>
          <router-link to="/checkout" class="btn btn-primary btn-full" @click="cartStore.toggleCart">
            إتمام الشراء
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useCartStore } from '../../stores/cartStore'
import { useCurrency } from '../../composables/useCurrency'
import CartItem from './CartItem.vue'

const cartStore = useCartStore()
const { formatCurrency } = useCurrency()
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  justify-content: flex-start;
}

.cart-drawer {
  width: 100%;
  max-width: 400px;
  height: 100%;
  background: var(--bg-secondary);
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--border-light);
}

.cart-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.close-btn:hover {
  background: var(--bg-card);
  color: var(--text-primary);
}

.cart-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

.cart-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--text-muted);
}

.cart-footer {
  padding: 20px;
  border-top: 1px solid var(--border-light);
}

.cart-summary {
  margin-bottom: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.summary-row.total {
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-primary);
}

.total-price {
  color: var(--color-gold);
  font-size: 1.2rem;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
}
</style>
