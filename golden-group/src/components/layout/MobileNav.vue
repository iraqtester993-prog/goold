<template>
  <nav class="mobile-nav">
    <router-link to="/" class="nav-item" :class="{ active: route.name === 'home' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      <span>الرئيسية</span>
    </router-link>

    <router-link to="/products" class="nav-item" :class="{ active: route.name === 'products' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
      <span>المنتجات</span>
    </router-link>

    <router-link to="/cart" class="nav-item cart-nav" :class="{ active: route.name === 'cart' }">
      <div class="cart-icon-wrap">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span v-if="cartStore.totalItems > 0" class="mobile-badge">{{ cartStore.totalItems }}</span>
      </div>
      <span>السلة</span>
    </router-link>

    <router-link to="/orders" class="nav-item" :class="{ active: route.name === 'orders' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
      <span>طلباتي</span>
    </router-link>

    <router-link to="/profile" class="nav-item" :class="{ active: route.name === 'profile' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <span>حسابي</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCartStore } from '../../stores/cartStore'

const route = useRoute()
const cartStore = useCartStore()
</script>

<style scoped>
.mobile-nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--mobile-nav-height);
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
}

@media (min-width: 769px) {
  .mobile-nav {
    display: none;
  }
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 12px;
  color: var(--text-muted);
  font-size: 0.65rem;
  font-weight: 500;
  transition: color var(--transition-fast);
  position: relative;
}

.nav-item.active {
  color: var(--color-gold);
}

.nav-item span:last-child {
  font-size: 0.65rem;
}

.cart-icon-wrap {
  position: relative;
}

.mobile-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gold);
  color: var(--bg-primary);
  font-size: 0.6rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  padding: 0 3px;
}
</style>
