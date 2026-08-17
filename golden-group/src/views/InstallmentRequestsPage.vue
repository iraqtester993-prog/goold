<template>
  <div class="requests-page">
    <div class="container">
      <div class="page-header">
        <button class="back-btn" @click="$router.back()">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
        <h1 class="page-title">طلبات التقسيط</h1>
      </div>

      <!-- Status Filters -->
      <div class="status-filters">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="filter-chip"
          :class="{ active: activeFilter === filter.value }"
          @click="activeFilter = filter.value"
        >
          <span class="filter-dot" :style="{ background: filter.color }"></span>
          {{ filter.label }}
          <span v-if="filter.count" class="filter-count">{{ filter.count }}</span>
        </button>
      </div>

      <!-- Requests List -->
      <div v-if="filteredRequests.length" class="requests-list">
        <div
          v-for="req in filteredRequests"
          :key="req.id"
          class="request-card"
          @click="selectedRequest = req"
        >
          <div class="request-header">
            <div class="request-id-wrap">
              <span class="request-id">#{{ req.id }}</span>
              <span class="request-date">{{ formatDate(req.date) }}</span>
            </div>
            <span class="status-badge" :class="`status-${req.status}`">
              <span class="status-dot"></span>
              {{ req.statusLabel }}
            </span>
          </div>

          <div class="request-product">
            <img :src="req.productImage" :alt="req.productName" class="product-thumb" />
            <div class="product-details">
              <span class="product-name">{{ req.productName }}</span>
              <span class="product-price">{{ formatCurrency(req.amount) }}</span>
            </div>
          </div>

          <div class="request-installment-info">
            <div class="installment-detail">
              <span class="detail-label">القسط الشهري</span>
              <span class="detail-value">{{ formatCurrency(req.monthlyPayment) }}</span>
            </div>
            <div class="installment-detail">
              <span class="detail-label">المدة</span>
              <span class="detail-value">{{ req.months }} شهر</span>
            </div>
            <div class="installment-detail">
              <span class="detail-label">الدفعة المقدمة</span>
              <span class="detail-value">{{ formatCurrency(req.downPayment) }}</span>
            </div>
          </div>

          <!-- Status Timeline -->
          <div class="status-timeline">
            <div
              v-for="(step, i) in req.timeline"
              :key="i"
              class="timeline-step"
              :class="{ active: step.active, completed: step.completed }"
            >
              <div class="timeline-icon">
                <svg v-if="step.completed" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span v-else-if="step.active" class="pulse-dot"></span>
                <span v-else class="step-num">{{ i + 1 }}</span>
              </div>
              <div class="timeline-info">
                <span class="timeline-label">{{ step.label }}</span>
                <span v-if="step.date" class="timeline-date">{{ step.date }}</span>
              </div>
            </div>
          </div>

          <div v-if="req.note" class="request-note" :class="`note-${req.status}`">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            {{ req.note }}
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        <h3>لا توجد طلبات</h3>
        <p>لم تقدم أي طلبات تقسيط بعد</p>
      </div>

      <!-- Detail Modal -->
      <Teleport to="body">
        <div v-if="selectedRequest" class="modal-overlay" @click.self="selectedRequest = null">
          <div class="modal-content">
            <div class="modal-header">
              <h3>تفاصيل الطلب #{{ selectedRequest.id }}</h3>
              <button class="modal-close" @click="selectedRequest = null">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <div class="detail-section">
                <h4>المنتج</h4>
                <div class="detail-product">
                  <img :src="selectedRequest.productImage" :alt="selectedRequest.productName" />
                  <div>
                    <span class="detail-product-name">{{ selectedRequest.productName }}</span>
                    <span class="detail-product-price">{{ formatCurrency(selectedRequest.amount) }}</span>
                  </div>
                </div>
              </div>
              <div class="detail-section">
                <h4>تفاصيل التقسيط</h4>
                <div class="detail-grid">
                  <div class="detail-item">
                    <span class="detail-key">القسط الشهري</span>
                    <span class="detail-val">{{ formatCurrency(selectedRequest.monthlyPayment) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-key">المدة</span>
                    <span class="detail-val">{{ selectedRequest.months }} شهر</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-key">الدفعة المقدمة</span>
                    <span class="detail-val">{{ formatCurrency(selectedRequest.downPayment) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-key">الفائدة</span>
                    <span class="detail-val">{{ selectedRequest.interest }}%</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-key">تاريخ الطلب</span>
                    <span class="detail-val">{{ formatDate(selectedRequest.date) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-key">الحالة</span>
                    <span class="detail-val" :class="`text-${selectedRequest.status}`">{{ selectedRequest.statusLabel }}</span>
                  </div>
                </div>
              </div>
              <div v-if="selectedRequest.note" class="detail-section">
                <h4>ملاحظة</h4>
                <p class="detail-note">{{ selectedRequest.note }}</p>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCurrency } from '../composables/useCurrency'

const { formatCurrency } = useCurrency()
const activeFilter = ref('all')
const selectedRequest = ref(null)

const requests = ref([
  {
    id: 'INST-2026-001',
    productName: 'Samsung Galaxy S24 Ultra',
    productImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200',
    amount: 1500000,
    monthlyPayment: 145000,
    months: 12,
    downPayment: 500000,
    interest: 15,
    date: '2026-07-15',
    status: 'approved',
    statusLabel: 'موافق عليه',
    note: null,
    timeline: [
      { label: 'تقديم الطلب', completed: true, date: '15 يوليو', active: false },
      { label: 'قيد المراجعة', completed: true, date: '16 يوليو', active: false },
      { label: 'استعلام الدائرة', completed: true, date: '18 يوليو', active: false },
      { label: 'الموافق عليه', completed: true, date: '20 يوليو', active: false }
    ]
  },
  {
    id: 'INST-2026-002',
    productName: 'iPhone 15 Pro Max',
    productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200',
    amount: 1800000,
    monthlyPayment: 172500,
    months: 12,
    downPayment: 600000,
    interest: 15,
    date: '2026-07-20',
    status: 'inquiry',
    statusLabel: 'استعلام من الدائرة',
    note: 'جاري التحقق من بياناتك مع جهة العمل',
    timeline: [
      { label: 'تقديم الطلب', completed: true, date: '20 يوليو', active: false },
      { label: 'قيد المراجعة', completed: true, date: '21 يوليو', active: false },
      { label: 'استعلام الدائرة', completed: false, date: null, active: true },
      { label: 'النتيجة', completed: false, date: null, active: false }
    ]
  },
  {
    id: 'INST-2026-003',
    productName: 'MacBook Pro M3',
    productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200',
    amount: 2500000,
    monthlyPayment: 239583,
    months: 12,
    downPayment: 800000,
    interest: 15,
    date: '2026-07-22',
    status: 'review',
    statusLabel: 'قيد المراجعة',
    note: null,
    timeline: [
      { label: 'تقديم الطلب', completed: true, date: '22 يوليو', active: false },
      { label: 'قيد المراجعة', completed: false, date: null, active: true },
      { label: 'استعلام الدائرة', completed: false, date: null, active: false },
      { label: 'النتيجة', completed: false, date: null, active: false }
    ]
  },
  {
    id: 'INST-2026-004',
    productName: 'iPad Pro M2',
    productImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200',
    amount: 1200000,
    monthlyPayment: 115000,
    months: 12,
    downPayment: 400000,
    interest: 15,
    date: '2026-07-10',
    status: 'rejected',
    statusLabel: 'مرفوض',
    note: 'تم رفض الطلب لعدم استيفاء شروط الحد الأدنى للراتب المطلوب',
    timeline: [
      { label: 'تقديم الطلب', completed: true, date: '10 يوليو', active: false },
      { label: 'قيد المراجعة', completed: true, date: '11 يوليو', active: false },
      { label: 'استعلام الدائرة', completed: true, date: '13 يوليو', active: false },
      { label: 'تم الرفض', completed: true, date: '14 يوليو', active: false }
    ]
  }
])

const filters = computed(() => [
  { value: 'all', label: 'الكل', count: requests.value.length, color: 'var(--color-gold)' },
  { value: 'review', label: 'قيد المراجعة', count: requests.value.filter(r => r.status === 'review').length, color: '#f59e0b' },
  { value: 'inquiry', label: 'استعلام', count: requests.value.filter(r => r.status === 'inquiry').length, color: '#3b82f6' },
  { value: 'approved', label: 'موافق', count: requests.value.filter(r => r.status === 'approved').length, color: '#22c55e' },
  { value: 'rejected', label: 'مرفوض', count: requests.value.filter(r => r.status === 'rejected').length, color: '#ef4444' }
])

const filteredRequests = computed(() => {
  if (activeFilter.value === 'all') return requests.value
  return requests.value.filter(r => r.status === activeFilter.value)
})

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ar-IQ', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<style scoped>
.requests-page {
  padding: 16px 0 24px;
}

.container {
  padding: 0 16px;
  max-width: 600px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  color: var(--text-primary);
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.back-btn:active {
  background: var(--bg-card-hover);
}

.page-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-primary);
}

/* Filters */
.status-filters {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 4px;
  margin-bottom: 20px;
}

.status-filters::-webkit-scrollbar {
  display: none;
}

.filter-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: 'Cairo', sans-serif;
}

.filter-chip.active {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--bg-primary);
}

.filter-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.filter-count {
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.1);
  border-radius: var(--radius-full);
  font-size: 0.65rem;
}

.filter-chip.active .filter-count {
  background: rgba(0,0,0,0.2);
  color: var(--bg-primary);
}

/* Request Cards */
.requests-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.request-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 16px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.request-card:active {
  border-color: var(--color-gold);
}

.request-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.request-id-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.request-id {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
}

.request-date {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 700;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-approved {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}
.status-approved .status-dot { background: #22c55e; }

.status-rejected {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.status-rejected .status-dot { background: #ef4444; }

.status-review {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}
.status-review .status-dot { background: #f59e0b; }

.status-inquiry {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}
.status-inquiry .status-dot { background: #3b82f6; }

/* Product */
.request-product {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.product-thumb {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  object-fit: cover;
  background: var(--bg-input);
  flex-shrink: 0;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.product-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-primary);
}

.product-price {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-gold);
}

/* Installment Info */
.request-installment-info {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}

.installment-detail {
  flex: 1;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  padding: 10px 8px;
  text-align: center;
}

.detail-label {
  display: block;
  font-size: 0.65rem;
  color: var(--text-muted);
  margin-bottom: 3px;
}

.detail-value {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* Timeline */
.status-timeline {
  display: flex;
  align-items: flex-start;
  gap: 0;
  margin-bottom: 10px;
  position: relative;
}

.timeline-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  position: relative;
}

.timeline-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 8px;
  right: 50%;
  width: 100%;
  height: 2px;
  background: var(--border-light);
}

.timeline-step.completed:not(:last-child)::after {
  background: var(--color-gold);
}

.timeline-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--bg-input);
  border: 2px solid var(--border-light);
  z-index: 1;
}

.timeline-step.completed .timeline-icon {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--bg-primary);
}

.timeline-step.active .timeline-icon {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3b82f6;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

.step-num {
  font-size: 0.5rem;
  color: var(--text-muted);
  font-weight: 700;
}

.timeline-info {
  text-align: center;
}

.timeline-label {
  display: block;
  font-size: 0.58rem;
  font-weight: 600;
  color: var(--text-muted);
}

.timeline-step.active .timeline-label {
  color: #3b82f6;
}

.timeline-step.completed .timeline-label {
  color: var(--color-gold);
}

.timeline-date {
  display: block;
  font-size: 0.52rem;
  color: var(--text-muted);
}

/* Note */
.request-note {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.5;
}

.note-inquiry {
  background: rgba(59, 130, 246, 0.08);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.note-rejected {
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.note-approved {
  background: rgba(34, 197, 94, 0.08);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

/* Empty */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-state h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 16px 0 8px;
}

.empty-state p {
  font-size: 0.88rem;
  color: var(--text-muted);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: flex-end;
  z-index: 300;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border-light);
  position: sticky;
  top: 0;
  background: var(--bg-secondary);
  z-index: 1;
}

.modal-header h3 {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-primary);
}

.modal-close {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  color: var(--text-muted);
  background: var(--bg-card);
  border: none;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.detail-section {
  margin-bottom: 20px;
}

.detail-section h4 {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-gold);
  margin-bottom: 12px;
}

.detail-product {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-product img {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  object-fit: cover;
  background: var(--bg-input);
}

.detail-product-name {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
}

.detail-product-price {
  display: block;
  font-size: 0.85rem;
  color: var(--color-gold);
  font-weight: 600;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.detail-item {
  padding: 10px 12px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
}

.detail-key {
  display: block;
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-bottom: 3px;
}

.detail-val {
  display: block;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-primary);
}

.text-approved { color: #22c55e; }
.text-rejected { color: #ef4444; }
.text-review { color: #f59e0b; }
.text-inquiry { color: #3b82f6; }

.detail-note {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.7;
  padding: 12px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
}
</style>
