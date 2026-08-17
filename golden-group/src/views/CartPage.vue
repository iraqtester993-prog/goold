<template>
  <div class="cart-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">سلة المشتريات</h1>
        <span v-if="cartStore.items.length" class="item-count-badge">{{ cartStore.totalItems }} منتج</span>
      </div>

      <div v-if="cartStore.items.length" class="cart-layout">
        <div class="cart-items">
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item-card">
            <img :src="item.image" :alt="item.name" class="item-image" />
            <div class="item-info">
              <h4 class="item-name">{{ item.name }}</h4>
              <div v-if="item.originalPrice > item.price" class="item-price-row">
                <span class="item-old-price">{{ formatCurrency(item.originalPrice) }}</span>
                <span class="item-price">{{ formatCurrency(item.price) }}</span>
              </div>
              <p v-else class="item-price">{{ formatCurrency(item.price) }}</p>
              <div class="item-actions">
                <div class="quantity-controls">
                  <button class="qty-btn" @click="cartStore.updateQuantity(item.id, item.quantity - 1)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                  <span class="qty-value">{{ item.quantity }}</span>
                  <button class="qty-btn" @click="cartStore.updateQuantity(item.id, item.quantity + 1)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                </div>
                <span class="item-total">{{ formatCurrency(item.price * item.quantity) }}</span>
                <button class="remove-btn" @click="cartStore.removeItem(item.id)" title="إزالة">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-summary-card">
          <div class="summary-glow"></div>
          <h3>ملخص الطلب</h3>
          <div class="summary-rows">
            <div class="summary-row">
              <span>عدد المنتجات</span>
              <span>{{ cartStore.totalItems }} منتج</span>
            </div>
            <div class="summary-row">
              <span>المجموع الفرعي</span>
              <span>{{ formatCurrency(cartStore.totalPrice + cartStore.totalSavings) }}</span>
            </div>
            <div v-if="cartStore.totalSavings > 0" class="summary-row savings">
              <span>التخفيضات</span>
              <span>-{{ formatCurrency(cartStore.totalSavings) }}</span>
            </div>
            <div class="summary-row">
              <span>التوصيل</span>
              <span class="free-delivery">مجاني</span>
            </div>
            <div class="summary-row total">
              <span>الإجمالي</span>
              <span class="total-price">{{ formatCurrency(cartStore.totalPrice) }}</span>
            </div>
          </div>

          <div class="action-buttons">
            <router-link to="/checkout" class="btn btn-gold btn-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              إتمام الشراء نقداً
            </router-link>
            <router-link to="/installment-request" class="btn btn-outline-gold btn-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              طلب تقسيط
            </router-link>
          </div>

          <router-link to="/products" class="continue-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            متابعة التسوق
          </router-link>
        </div>
      </div>

      <div v-else class="empty-cart">
        <div class="empty-icon-wrapper">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="1.2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="m1 1 4 0 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
        <h2>سلتك فارغة</h2>
        <p>لم تقم بإضافة أي منتجات بعد. ابدأ التسوق الآن واكتشف أفضل الأجهزة الإلكترونية بأسعار مميزة</p>
        <router-link to="/products" class="btn btn-gold btn-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          تصفح المنتجات
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'
import { useCurrency } from '../composables/useCurrency'

const cartStore = useCartStore()
const { formatCurrency } = useCurrency()
</script>

<style scoped>
.cart-page {
  padding: 24px 0 100px;
  min-height: 70vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 800;
  font-family: 'Cairo', sans-serif;
  color: var(--text-primary);
}

.item-count-badge {
  background: var(--color-gold-gradient);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: var(--radius-full);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 28px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item-card {
  display: flex;
  gap: 16px;
  padding: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

.cart-item-card:hover {
  border-color: var(--border-color);
  box-shadow: var(--shadow-md);
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: var(--bg-input);
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item-name {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
}

.item-price-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-old-price {
  font-size: 0.82rem;
  color: var(--text-muted);
  text-decoration: line-through;
}

.item-price {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--color-gold);
}

.item-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
}

.quantity-controls {
  display: flex;
  align-items: center;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.qty-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  color: var(--text-primary);
  transition: background var(--transition-fast);
}

.qty-btn:hover {
  background: var(--bg-card-hover);
}

.qty-value {
  min-width: 36px;
  text-align: center;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-primary);
}

.item-total {
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--color-gold);
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  transition: all var(--transition-fast);
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* Summary Card */
.cart-summary-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 28px;
  position: sticky;
  top: calc(var(--header-height, 70px) + 20px);
  overflow: hidden;
}

.summary-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  background: var(--color-gold-gradient);
  border-radius: 50%;
  opacity: 0.06;
  pointer-events: none;
}

.cart-summary-card h3 {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: var(--text-primary);
  font-family: 'Cairo', sans-serif;
}

.summary-rows {
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.summary-row.savings {
  color: #22c55e;
  font-weight: 600;
}

.free-delivery {
  color: #22c55e;
  font-weight: 600;
}

.summary-row.total {
  padding-top: 14px;
  border-top: 2px solid var(--border-light);
  margin-top: 4px;
  font-weight: 800;
  font-size: 1rem;
  color: var(--text-primary);
}

.total-price {
  color: var(--color-gold);
  font-size: 1.25rem;
  font-weight: 900;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: var(--radius-lg);
  font-family: 'Cairo', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition: all var(--transition-normal);
  cursor: pointer;
  border: none;
}

.btn-full {
  width: 100%;
}

.btn-lg {
  padding: 16px 28px;
  font-size: 1rem;
}

.btn-gold {
  background: var(--color-gold-gradient);
  color: #fff;
  box-shadow: var(--shadow-gold);
}

.btn-gold:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(212, 168, 67, 0.35);
}

.btn-outline-gold {
  background: transparent;
  color: var(--color-gold);
  border: 2px solid var(--color-gold);
}

.btn-outline-gold:hover {
  background: rgba(212, 168, 67, 0.08);
}

.continue-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.continue-link:hover {
  color: var(--color-gold);
  background: rgba(212, 168, 67, 0.06);
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: 80px 24px;
}

.empty-icon-wrapper {
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 50%;
}

.empty-cart h2 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: var(--text-primary);
  font-family: 'Cairo', sans-serif;
}

.empty-cart p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  max-width: 360px;
  margin: 0 auto 28px;
  line-height: 1.7;
}

/* Responsive */
@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-summary-card {
    position: static;
  }
}

@media (max-width: 600px) {
  .cart-page {
    padding: 16px 0 120px;
  }

  .page-title {
    font-size: 1.3rem;
  }

  .cart-item-card {
    flex-direction: column;
    padding: 14px;
  }

  .item-image {
    width: 100%;
    height: 180px;
  }

  .item-actions {
    flex-wrap: wrap;
  }

  .item-total {
    font-size: 1rem;
  }
}
</style>
