<template>
  <nav class="bottom-nav">
    <router-link to="/home" class="nav-tab" :class="{ active: route.name === 'home' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      <span>الرئيسية</span>
    </router-link>

    <router-link to="/categories" class="nav-tab" :class="{ active: route.name === 'categories' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
      <span>الأقسام</span>
    </router-link>

    <router-link to="/cart" class="nav-tab cart-tab" :class="{ active: route.name === 'cart' }">
      <div class="cart-icon-wrap">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
      </div>
      <span>السلة</span>
    </router-link>

    <router-link to="/deductions" class="nav-tab" :class="{ active: route.name === 'deductions' }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
      <span>إقتصادي</span>
    </router-link>

    <router-link to="/profile" class="nav-tab" :class="{ active: route.name === 'profile' }">
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
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 64px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
  z-index: 100;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 8px 12px;
  color: var(--text-muted);
  text-decoration: none;
  position: relative;
  transition: color var(--transition-fast);
}

.nav-tab.active {
  color: var(--color-gold);
}

.nav-tab.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: var(--color-gold);
  border-radius: 0 0 2px 2px;
}

.nav-tab span {
  font-size: 0.62rem;
  font-weight: 600;
}

.nav-tab svg {
  transition: transform var(--transition-fast);
}

.nav-tab.active svg {
  transform: scale(1.1);
}

.cart-tab .cart-icon-wrap {
  position: relative;
}

.cart-badge {
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
