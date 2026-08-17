<template>
  <div class="deductions-page">
    <div class="container">
      <div class="page-header">
        <router-link to="/profile" class="back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </router-link>
        <h1 class="page-title">سجل الاستقطاعات</h1>
      </div>

      <div class="summary-card">
        <div class="summary-item">
          <div class="summary-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div class="summary-data">
            <span class="summary-label">إجمالي المبالغ المستقطعة</span>
            <span class="summary-value">{{ formatCurrency(deductionStore.totalDeducted) }}</span>
          </div>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-item">
          <div class="summary-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div class="summary-data">
            <span class="summary-label">عدد عمليات الاستقطاع</span>
            <span class="summary-value">{{ deductionStore.deductions.length }}</span>
          </div>
        </div>
      </div>

      <div v-if="deductionStore.deductions.length" class="deductions-list">
        <div v-for="deduction in deductionStore.deductions" :key="deduction.id" class="deduction-card" :class="'status-' + deduction.status">
          <div class="deduction-card-accent"></div>
          <div class="deduction-card-content">
            <div class="deduction-header">
              <div class="deduction-id-group">
                <span class="deduction-id">{{ deduction.id }}</span>
                <span class="badge" :class="deduction.status === 'completed' ? 'badge-green' : 'badge-gold'">
                  {{ deduction.statusLabel }}
                </span>
              </div>
              <span class="deduction-date">{{ formatDate(deduction.date) }}</span>
            </div>

            <div class="deduction-details">
              <div class="detail-row">
                <span class="detail-label">رقم القسط</span>
                <span class="detail-value">{{ deduction.installmentId }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">رقم العقد</span>
                <span class="detail-value">{{ deduction.contractId }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">المبلغ</span>
                <span class="detail-value amount">{{ formatCurrency(deduction.amount) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">جهة التنفيذ</span>
                <span class="detail-value">{{ deduction.executor }}</span>
              </div>
            </div>

            <div v-if="deduction.notes" class="deduction-notes">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span>{{ deduction.notes }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
        </div>
        <h2>لا توجد سجلات استقطاعات</h2>
        <p>لم يتم تسجيل أي عمليات استقطاع بعد</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDeductionStore } from '../stores/draftStore'
import { useCurrency } from '../composables/useCurrency'

const deductionStore = useDeductionStore()
const { formatCurrency } = useCurrency()

function formatDate(date) {
  return new Date(date).toLocaleDateString('ar-IQ', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}
</script>

<style scoped>
.deductions-page {
  padding: 20px 0;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.back-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.back-btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-color);
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
}

.summary-card {
  display: flex;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 20px;
  margin-bottom: 24px;
  max-width: 600px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

.summary-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 168, 67, 0.1);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.summary-data {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.summary-label {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.summary-value {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-gold);
}

.summary-divider {
  width: 1px;
  height: 48px;
  background: var(--border-light);
  margin: 0 20px;
  flex-shrink: 0;
}

.deductions-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 640px;
}

.deduction-card {
  display: flex;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.deduction-card:hover {
  border-color: var(--border-color);
  box-shadow: var(--shadow-md);
  transform: translateX(-2px);
}

.deduction-card-accent {
  width: 4px;
  flex-shrink: 0;
}

.deduction-card.status-completed .deduction-card-accent {
  background: #22c55e;
}

.deduction-card.status-pending .deduction-card-accent {
  background: var(--color-gold);
}

.deduction-card-content {
  flex: 1;
  padding: 18px 20px;
}

.deduction-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.deduction-id-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.deduction-id {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.deduction-date {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.deduction-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.detail-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
}

.detail-value.amount {
  color: var(--color-gold);
  font-weight: 800;
}

.deduction-notes {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
  font-size: 0.8rem;
  color: var(--text-muted);
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
  max-width: 320px;
  margin: 0 auto;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .summary-card {
    flex-direction: column;
    gap: 16px;
  }

  .summary-divider {
    width: 100%;
    height: 1px;
    margin: 0;
  }

  .deduction-details {
    grid-template-columns: 1fr;
  }

  .deduction-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
