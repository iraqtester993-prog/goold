<template>
  <div class="contracts-page">
    <div class="container">
      <h1 class="page-title">عقدي</h1>

      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
          <span class="tab-count">{{ tab.count }}</span>
        </button>
      </div>

      <div v-if="filteredContracts.length" class="contracts-list">
        <router-link
          v-for="contract in filteredContracts"
          :key="contract.id"
          :to="`/contracts/${contract.id}`"
          class="contract-card"
        >
          <div class="contract-card-top">
            <div class="contract-product">
              <img :src="contract.productImage" :alt="contract.productName" />
              <div class="contract-product-info">
                <span class="contract-id">{{ contract.id }}</span>
                <h3 class="contract-name">{{ contract.productName }}</h3>
              </div>
            </div>
            <span class="badge" :class="contract.status === 'active' ? 'badge-gold' : 'badge-green'">
              {{ contract.statusLabel }}
            </span>
          </div>

          <div class="contract-financials">
            <div class="financial-item">
              <span class="financial-label">قيمة العقد</span>
              <span class="financial-value">{{ formatCurrency(contract.contractValue) }}</span>
            </div>
            <div class="financial-item">
              <span class="financial-label">الدفعة المقدمة</span>
              <span class="financial-value">{{ formatCurrency(contract.downPayment) }}</span>
            </div>
            <div class="financial-item">
              <span class="financial-label">المتبقي</span>
              <span class="financial-value highlight">{{ formatCurrency(contract.remainingAmount) }}</span>
            </div>
          </div>

          <div class="installment-progress">
            <div class="progress-header">
              <span class="progress-label">الأقساط</span>
              <span class="progress-count">{{ contract.paidInstallments }} / {{ contract.totalInstallments }}</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: (contract.paidInstallments / contract.totalInstallments * 100) + '%' }"
              ></div>
            </div>
          </div>

          <div class="contract-card-glow"></div>
        </router-link>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M9 15l2 2 4-4"/>
          </svg>
        </div>
        <h2>لا توجد عقود {{ activeTab === 'active' ? 'نشطة' : activeTab === 'completed' ? 'مكتملة' : '' }}</h2>
        <p v-if="activeTab === 'all'">لم تقم بإنشاء أي عقود بعد</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useContractStore } from '../stores/contractStore'
import { useCurrency } from '../composables/useCurrency'

const contractStore = useContractStore()
const { formatCurrency } = useCurrency()

const activeTab = ref('all')

const tabs = computed(() => [
  { key: 'active', label: 'نشطة', count: contractStore.activeContracts.length },
  { key: 'completed', label: 'مكتملة', count: contractStore.completedContracts.length },
  { key: 'all', label: 'الكل', count: contractStore.contracts.length }
])

const filteredContracts = computed(() => {
  if (activeTab.value === 'active') return contractStore.activeContracts
  if (activeTab.value === 'completed') return contractStore.completedContracts
  return contractStore.contracts
})
</script>

<style scoped>
.contracts-page {
  padding: 20px 0;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-color);
}

.tab-btn.active {
  background: var(--color-gold-gradient);
  color: var(--bg-primary);
  border-color: transparent;
  box-shadow: var(--shadow-gold);
}

.tab-count {
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.2);
}

.tab-btn:not(.active) .tab-count {
  background: var(--bg-input);
  color: var(--text-muted);
}

.contracts-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 640px;
}

.contract-card {
  position: relative;
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 20px;
  transition: all var(--transition-normal);
  overflow: hidden;
}

.contract-card:hover {
  border-color: var(--border-color);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.contract-card:hover .contract-card-glow {
  opacity: 1;
}

.contract-card-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(212, 168, 67, 0.06) 0%, transparent 60%);
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.contract-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
}

.contract-product {
  display: flex;
  align-items: center;
  gap: 14px;
}

.contract-product img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: var(--bg-input);
}

.contract-product-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contract-id {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 600;
}

.contract-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
}

.contract-financials {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 18px;
  padding: 14px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
}

.financial-item {
  text-align: center;
}

.financial-label {
  display: block;
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.financial-value {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
}

.financial-value.highlight {
  color: var(--color-gold);
}

.installment-progress {
  position: relative;
  z-index: 1;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.progress-count {
  font-size: 0.8rem;
  color: var(--color-gold);
  font-weight: 700;
}

.progress-bar {
  height: 6px;
  background: var(--bg-input);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-gold-gradient);
  border-radius: var(--radius-full);
  transition: width 0.8s ease;
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
</style>
