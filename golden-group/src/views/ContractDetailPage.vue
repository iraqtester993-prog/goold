<template>
  <div class="contract-detail-page" v-if="contract">
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/contracts">عقدي</router-link>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        <span class="current">{{ contract.id }}</span>
      </div>

      <div class="contract-header">
        <div class="header-info">
          <h1>{{ contract.id }}</h1>
          <span class="badge" :class="contract.status === 'active' ? 'badge-gold' : 'badge-green'">
            {{ contract.statusLabel }}
          </span>
        </div>
      </div>

      <div class="detail-layout">
        <div class="detail-main">
          <div class="product-card">
            <img :src="contract.productImage" :alt="contract.productName" />
            <div class="product-info">
              <span class="product-label">المنتج</span>
              <h3>{{ contract.productName }}</h3>
            </div>
          </div>

          <div class="financial-card">
            <h2 class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              الملخص المالي
            </h2>
            <div class="financial-grid">
              <div class="financial-item">
                <span class="fi-label">قيمة العقد</span>
                <span class="fi-value">{{ formatCurrency(contract.contractValue) }}</span>
              </div>
              <div class="financial-item">
                <span class="fi-label">الدفعة المقدمة</span>
                <span class="fi-value">{{ formatCurrency(contract.downPayment) }}</span>
              </div>
              <div class="financial-item">
                <span class="fi-label">المتبقي</span>
                <span class="fi-value gold">{{ formatCurrency(contract.remainingAmount) }}</span>
              </div>
              <div class="financial-item">
                <span class="fi-label">القسط الشهري</span>
                <span class="fi-value">{{ formatCurrency(contract.monthlyPayment) }}</span>
              </div>
              <div class="financial-item">
                <span class="fi-label">نسبة الفائدة</span>
                <span class="fi-value">{{ contract.interestRate }}%</span>
              </div>
              <div class="financial-item">
                <span class="fi-label">تاريخ البدء</span>
                <span class="fi-value">{{ formatDate(contract.startDate) }}</span>
              </div>
              <div class="financial-item">
                <span class="fi-label">تاريخ الانتهاء</span>
                <span class="fi-value">{{ formatDate(contract.endDate) }}</span>
              </div>
              <div class="financial-item" v-if="contract.nextPaymentDate">
                <span class="fi-label">الدفعة القادمة</span>
                <span class="fi-value gold">{{ formatDate(contract.nextPaymentDate) }}</span>
              </div>
            </div>
          </div>

          <div class="installment-card">
            <h2 class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
              </svg>
              تقدم الأقساط
            </h2>
            <div class="installment-visual">
              <div class="installment-progress-bar">
                <div
                  class="installment-fill"
                  :style="{ width: installmentPercent + '%' }"
                ></div>
              </div>
              <div class="installment-stats">
                <span class="stat">
                  <span class="stat-num">{{ contract.paidInstallments }}</span> مدفوعة
                </span>
                <span class="stat">
                  <span class="stat-num">{{ contract.remainingInstallments }}</span> متبقية
                </span>
                <span class="stat gold">
                  {{ installmentPercent }}%
                </span>
              </div>
            </div>
          </div>

          <div class="payments-card">
            <h2 class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              سجل الدفع
            </h2>
            <div class="payments-table">
              <div class="table-header">
                <span>القسط</span>
                <span>تاريخ الاستحقاق</span>
                <span>المبلغ</span>
                <span>الحالة</span>
              </div>
              <div v-for="payment in paymentHistory" :key="payment.number" class="table-row">
                <span class="row-num">{{ payment.number }}</span>
                <span class="row-date">{{ formatDate(payment.dueDate) }}</span>
                <span class="row-amount">{{ formatCurrency(payment.amount) }}</span>
                <span class="row-status" :class="payment.paid ? 'paid' : 'pending'">
                  {{ payment.paid ? 'مدفوع' : 'قيد الانتظار' }}
                </span>
              </div>
            </div>
          </div>

          <div class="penalties-card">
            <h2 class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              الغرامات
            </h2>
            <div class="empty-penalties">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <p>لا توجد غرامات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <div class="container">
      <h2>العقد غير موجود</h2>
      <router-link to="/contracts" class="btn btn-primary">العودة للعقود</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useContractStore } from '../stores/contractStore'
import { useCurrency } from '../composables/useCurrency'

const route = useRoute()
const contractStore = useContractStore()
const { formatCurrency } = useCurrency()

const contract = computed(() => contractStore.getContract(route.params.id))

const installmentPercent = computed(() => {
  if (!contract.value) return 0
  return Math.round((contract.value.paidInstallments / contract.value.totalInstallments) * 100)
})

const paymentHistory = computed(() => {
  if (!contract.value) return []
  const payments = []
  const startDate = new Date(contract.value.startDate)
  for (let i = 1; i <= contract.value.totalInstallments; i++) {
    const dueDate = new Date(startDate)
    dueDate.setMonth(dueDate.getMonth() + i)
    payments.push({
      number: i,
      dueDate: dueDate.toISOString().split('T')[0],
      amount: contract.value.monthlyPayment,
      paid: i <= contract.value.paidInstallments
    })
  }
  return payments
})

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('ar-IQ', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}
</script>

<style scoped>
.contract-detail-page {
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

.contract-header {
  margin-bottom: 24px;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-info h1 {
  font-size: 1.5rem;
  font-weight: 800;
}

.detail-layout {
  max-width: 700px;
}

.detail-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.product-card img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: var(--bg-input);
}

.product-info {
  flex: 1;
}

.product-label {
  display: block;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.product-info h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.financial-card,
.installment-card,
.payments-card,
.penalties-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.financial-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.financial-item {
  padding: 12px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
}

.fi-label {
  display: block;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.fi-value {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
}

.fi-value.gold {
  color: var(--color-gold);
}

.installment-visual {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.installment-progress-bar {
  height: 10px;
  background: var(--bg-input);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.installment-fill {
  height: 100%;
  background: var(--color-gold-gradient);
  border-radius: var(--radius-full);
  transition: width 1s ease;
}

.installment-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.stat-num {
  font-weight: 700;
  color: var(--text-primary);
  margin-right: 4px;
}

.stat.gold {
  font-weight: 700;
  color: var(--color-gold);
}

.payments-table {
  overflow-x: auto;
}

.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-light);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
}

.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
  font-size: 0.85rem;
  align-items: center;
  transition: background var(--transition-fast);
}

.table-row:last-child {
  border-bottom: none;
}

.row-num {
  font-weight: 700;
  color: var(--text-primary);
}

.row-date {
  color: var(--text-secondary);
}

.row-amount {
  font-weight: 600;
  color: var(--text-primary);
}

.row-status {
  font-weight: 600;
  font-size: 0.78rem;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  text-align: center;
}

.row-status.paid {
  background: rgba(34, 197, 94, 0.12);
  color: #22c55e;
}

.row-status.pending {
  background: rgba(212, 168, 67, 0.12);
  color: var(--color-gold);
}

.empty-penalties {
  text-align: center;
  padding: 32px 20px;
}

.empty-penalties p {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: 0.9rem;
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
  .financial-grid {
    grid-template-columns: 1fr;
  }

  .table-header,
  .table-row {
    grid-template-columns: 60px 1fr 1fr auto;
    font-size: 0.8rem;
  }
}
</style>
