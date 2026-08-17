<template>
  <div class="order-detail-page" v-if="order">
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/orders">طلباتي</router-link>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        <span class="current">طلب #{{ order.id }}</span>
      </div>

      <div class="order-header">
        <h1>طلب #{{ order.id }}</h1>
        <span class="badge" :class="statusClass(order.status)">{{ order.statusLabel }}</span>
      </div>

      <div class="order-date">{{ formatDate(order.createdAt) }}</div>

      <div class="timeline-section">
        <h2 class="section-heading">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          مراحل الطلب
        </h2>
        <div class="timeline">
          <div
            v-for="(step, index) in timelineSteps"
            :key="index"
            class="timeline-step"
            :class="{
              completed: index < timelineProgress,
              current: index === timelineProgress,
              pending: index > timelineProgress
            }"
          >
            <div class="step-connector">
              <div class="step-dot">
                <svg v-if="index < timelineProgress" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <div v-else-if="index === timelineProgress" class="pulse-ring"></div>
                <div v-else class="pending-dot"></div>
              </div>
              <div v-if="index < timelineSteps.length - 1" class="step-line" :class="{ filled: index < timelineProgress }"></div>
            </div>
            <div class="step-content">
              <div class="step-header">
                <span class="step-icon">{{ step.icon }}</span>
                <span class="step-title">{{ step.title }}</span>
              </div>
              <div class="step-meta">
                <span v-if="index < timelineProgress" class="step-date">{{ step.date }}</span>
                <span v-if="index < timelineProgress" class="step-status completed-text">مكتمل</span>
                <span v-else-if="index === timelineProgress" class="step-status current-text">جاري التنفيذ</span>
                <span v-else class="step-status pending-text">قيد الانتظار</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="order-layout">
        <div class="order-items">
          <h2 class="section-heading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            المنتجات
          </h2>
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <img :src="item.image" :alt="item.name" />
            <div class="item-info">
              <h4>{{ item.name }}</h4>
              <span class="item-qty">الكمية: {{ item.quantity }}</span>
            </div>
            <span class="item-price">{{ formatCurrency(item.price * item.quantity) }}</span>
          </div>
        </div>

        <div class="order-info-card">
          <h3>تفاصيل الطلب</h3>
          <div class="info-row">
            <span class="info-label">طريقة الدفع</span>
            <span class="info-value">{{ paymentLabel }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">المدينة</span>
            <span class="info-value">{{ order.city }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">العنوان</span>
            <span class="info-value">{{ order.address }}</span>
          </div>
          <div class="info-row total">
            <span class="info-label">الإجمالي</span>
            <span class="total-price">{{ formatCurrency(order.total) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <div class="container">
      <h2>الطلب غير موجود</h2>
      <router-link to="/orders" class="btn btn-primary">العودة للطلبات</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '../stores/orderStore'
import { useCurrency } from '../composables/useCurrency'

const route = useRoute()
const orderStore = useOrderStore()
const { formatCurrency } = useCurrency()

const order = computed(() => orderStore.getOrder(route.params.id))

const timelineProgress = ref(3)

const timelineSteps = computed(() => {
  const baseDate = order.value ? new Date(order.value.createdAt) : new Date()
  function dateOffset(days) {
    const d = new Date(baseDate)
    d.setDate(d.getDate() + days)
    return d.toLocaleDateString('ar-IQ', { month: 'long', day: 'numeric', year: 'numeric' })
  }
  return [
    { icon: '📦', title: 'استلام الطلب', date: dateOffset(0) },
    { icon: '🔍', title: 'التدقيق', date: dateOffset(0) },
    { icon: '✅', title: 'التحقق من البيانات', date: dateOffset(1) },
    { icon: '🏛️', title: 'التحقق من جهة العمل والراتب', date: null },
    { icon: '📤', title: 'إرسال الطلب إلى الدائرة الحكومية', date: null },
    { icon: '⏳', title: 'انتظار الموافقة', date: null },
    { icon: '✔️', title: 'الموافقة النهائية', date: null },
    { icon: '📝', title: 'إنشاء العقد', date: null },
    { icon: '⚙️', title: 'تجهيز المنتج', date: null },
    { icon: '🚚', title: 'التسليم', date: null }
  ]
})

const paymentLabels = {
  cash: 'الدفع عند الاستلام',
  installment: 'الدفع بالقسط',
  transfer: 'تحويل بنكي'
}

const paymentLabel = computed(() => order.value ? paymentLabels[order.value.paymentMethod] || '' : '')

function formatDate(date) {
  return new Date(date).toLocaleDateString('ar-IQ', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

function statusClass(status) {
  const classes = { pending: 'badge-gold', delivered: 'badge-green', cancelled: 'badge-red' }
  return classes[status] || 'badge-gold'
}
</script>

<style scoped>
.order-detail-page {
  padding: 20px 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.breadcrumb a {
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.breadcrumb a:hover {
  color: var(--color-gold);
}

.breadcrumb svg {
  flex-shrink: 0;
}

.order-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.order-header h1 {
  font-size: 1.5rem;
  font-weight: 800;
}

.order-date {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 28px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.timeline-section {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 24px;
}

.timeline {
  display: flex;
  flex-direction: column;
}

.timeline-step {
  display: flex;
  gap: 16px;
  min-height: 64px;
}

.step-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 36px;
  flex-shrink: 0;
}

.step-dot {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.completed .step-dot {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 2px solid #22c55e;
}

.current .step-dot {
  background: rgba(212, 168, 67, 0.15);
  border: 2px solid var(--color-gold);
}

.pending .step-dot {
  background: var(--bg-input);
  border: 2px solid var(--border-light);
}

.pulse-ring {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  background: var(--color-gold);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.6;
  }
}

.pending-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--text-muted);
  opacity: 0.4;
}

.step-line {
  width: 2px;
  flex: 1;
  min-height: 20px;
  background: var(--border-light);
  transition: background var(--transition-normal);
}

.step-line.filled {
  background: #22c55e;
}

.step-content {
  flex: 1;
  padding-bottom: 20px;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.step-icon {
  font-size: 1rem;
}

.step-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.pending .step-title {
  color: var(--text-muted);
}

.step-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 28px;
}

.step-date {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.step-status {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.completed-text {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.current-text {
  color: var(--color-gold);
  background: rgba(212, 168, 67, 0.1);
}

.pending-text {
  color: var(--text-muted);
  background: var(--bg-input);
}

.order-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: start;
}

.order-items {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-light);
}

.order-item:last-child {
  border-bottom: none;
}

.order-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: var(--bg-input);
}

.item-info {
  flex: 1;
}

.item-info h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.item-qty {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.item-price {
  font-weight: 700;
  color: var(--color-gold);
}

.order-info-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.order-info-card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 0.9rem;
}

.info-label {
  color: var(--text-secondary);
}

.info-value {
  color: var(--text-primary);
  font-weight: 600;
}

.info-row.total {
  padding-top: 14px;
  border-top: 1px solid var(--border-light);
  font-weight: 700;
  color: var(--text-primary);
}

.total-price {
  color: var(--color-gold);
  font-size: 1.2rem;
  font-weight: 800;
}

.not-found {
  text-align: center;
  padding: 120px 20px;
}

.not-found h2 {
  margin-bottom: 20px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .order-layout {
    grid-template-columns: 1fr;
  }

  .timeline-section {
    padding: 18px;
  }

  .step-content {
    padding-bottom: 16px;
  }
}
</style>
