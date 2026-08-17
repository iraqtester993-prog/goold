<template>
  <div class="orders-page">
    <div class="container">
      <h1 class="page-title">طلباتي</h1>

      <div v-if="orderStore.orders.length" class="orders-list">
        <router-link
          v-for="order in orderStore.orders"
          :key="order.id"
          :to="`/orders/${order.id}`"
          class="order-card"
        >
          <div class="order-card-inner">
            <div class="order-header">
              <span class="order-id">طلب #{{ order.id }}</span>
              <span class="badge" :class="statusClass(order.status)">{{ order.statusLabel }}</span>
            </div>
            <div class="order-body">
              <div class="order-items-preview">
                <img
                  v-for="(item, i) in order.items.slice(0, 3)"
                  :key="i"
                  :src="item.image"
                  :alt="item.name"
                />
                <span v-if="order.items.length > 3" class="more">+{{ order.items.length - 3 }}</span>
              </div>
              <div class="order-info">
                <span class="order-date">{{ formatDate(order.createdAt) }}</span>
                <span class="order-total">{{ formatCurrency(order.total) }}</span>
              </div>
            </div>
          </div>
          <div class="order-card-glow"></div>
        </router-link>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <h2>لا توجد طلبات</h2>
        <p>لم تقم بأي طلبات بعد. ابدأ التسوق واكتشف أفضل المنتجات</p>
        <router-link to="/products" class="btn btn-primary btn-lg">تسوق الآن</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from '../stores/orderStore'
import { useCurrency } from '../composables/useCurrency'

const orderStore = useOrderStore()
const { formatCurrency } = useCurrency()

function formatDate(date) {
  return new Date(date).toLocaleDateString('ar-IQ', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

function statusClass(status) {
  const classes = {
    pending: 'badge-gold',
    delivered: 'badge-green',
    cancelled: 'badge-red'
  }
  return classes[status] || 'badge-gold'
}
</script>

<style scoped>
.orders-page {
  padding: 20px 0;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 600px;
}

.order-card {
  position: relative;
  display: block;
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.order-card:hover .order-card-glow {
  opacity: 1;
}

.order-card-inner {
  position: relative;
  z-index: 1;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 18px 20px;
  transition: border-color var(--transition-fast);
}

.order-card:hover .order-card-inner {
  border-color: var(--border-color);
}

.order-card-glow {
  position: absolute;
  inset: 0;
  background: var(--color-gold-gradient);
  opacity: 0;
  transition: opacity var(--transition-normal);
  z-index: 0;
  filter: blur(20px);
  transform: translateY(4px);
}

.order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.order-id {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.order-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.order-items-preview {
  display: flex;
  align-items: center;
}

.order-items-preview img {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  object-fit: cover;
  background: var(--bg-input);
  margin-left: -8px;
  border: 2px solid var(--bg-card);
  transition: transform var(--transition-fast);
}

.order-card:hover .order-items-preview img {
  transform: scale(1.05);
}

.order-items-preview img:first-child {
  margin-left: 0;
}

.more {
  margin-left: -8px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
  border: 2px solid var(--bg-card);
}

.order-info {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-date {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.order-total {
  font-weight: 800;
  color: var(--color-gold);
  font-size: 0.95rem;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border-radius: var(--radius-full);
  border: 1px solid var(--border-light);
}

.empty-state h2 {
  margin: 0 0 8px;
  color: var(--text-primary);
  font-size: 1.3rem;
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 28px;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}
</style>
