<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-card">
        <div class="avatar">
          <span class="avatar-initials">{{ initials }}</span>
        </div>
        <h2 class="user-name">{{ customerStore.profile.name }}</h2>
        <div class="user-details">
          <span class="detail-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/>
            </svg>
            {{ customerStore.profile.phone }}
          </span>
          <span class="detail-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            {{ customerStore.profile.email }}
          </span>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">{{ customerStore.dashboard.activeContracts }}</span>
          <span class="stat-label">عقود نشطة</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ formatCurrency(customerStore.dashboard.remainingAmount) }}</span>
          <span class="stat-label">المبلغ المتبقي</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ formatCurrency(customerStore.dashboard.lastDeduction.amount) }}</span>
          <span class="stat-label">آخر استقطاع</span>
        </div>
      </div>

      <div class="menu-list">
        <router-link to="/profile/edit" class="menu-item">
          <div class="menu-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </div>
          <span class="menu-label">تعديل الملف الشخصي</span>
          <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </router-link>

        <router-link to="/contracts" class="menu-item">
          <div class="menu-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <span class="menu-label">عقودي</span>
          <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </router-link>

        <router-link to="/installment-requests" class="menu-item">
          <div class="menu-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              <line x1="9" y1="12" x2="15" y2="12"/>
              <line x1="9" y1="16" x2="15" y2="16"/>
            </svg>
          </div>
          <span class="menu-label">طلبات التقسيط</span>
          <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </router-link>

        <router-link to="/deductions" class="menu-item">
          <div class="menu-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <span class="menu-label">سجل الاستقطاعات</span>
          <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </router-link>

        <router-link to="/orders" class="menu-item">
          <div class="menu-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
          </div>
          <span class="menu-label">طلباتي</span>
          <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </router-link>

        <router-link to="/favorites" class="menu-item">
          <div class="menu-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <span class="menu-label">المفضلة</span>
          <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </router-link>

        <router-link to="/customer-service" class="menu-item">
          <div class="menu-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span class="menu-label">خدمة العملاء</span>
          <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </router-link>

        <router-link to="/settings" class="menu-item">
          <div class="menu-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <span class="menu-label">الإعدادات</span>
          <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </router-link>
      </div>

      <button class="logout-btn" @click="handleLogout">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        <span>تسجيل الخروج</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomerStore } from '../stores/customerStore'
import { useAuthStore } from '../stores/authStore'
import { useCurrency } from '../composables/useCurrency'

const router = useRouter()
const customerStore = useCustomerStore()
const authStore = useAuthStore()
const { formatCurrency } = useCurrency()

const initials = computed(() => {
  const name = customerStore.profile.name || ''
  const parts = name.split(' ')
  if (parts.length >= 2) return parts[0][0] + parts[1][0]
  return name.substring(0, 2)
})

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  authStore.checkAuth()
})
</script>

<style scoped>
.profile-page {
  padding: 16px 0;
}

.container {
  padding: 0 16px;
  max-width: 560px;
  margin: 0 auto;
}

.profile-card {
  text-align: center;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 36px 24px;
  margin-bottom: 20px;
  backdrop-filter: blur(8px);
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: var(--radius-full);
  background: var(--color-gold-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: var(--shadow-gold);
}

.avatar-initials {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--bg-primary);
}

.user-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  color: var(--text-secondary);
}

.detail-item svg {
  color: var(--color-gold);
  flex-shrink: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 18px 12px;
  text-align: center;
  backdrop-filter: blur(8px);
}

.stat-value {
  display: block;
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-gold);
  margin-bottom: 4px;
  line-height: 1.3;
}

.stat-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  font-weight: 500;
}

.menu-list {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 24px;
  backdrop-filter: blur(8px);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  color: var(--text-primary);
  text-decoration: none;
  transition: background var(--transition-fast);
  border-bottom: 1px solid var(--border-light);
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: var(--bg-card-hover);
}

.menu-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--bg-input);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gold);
  flex-shrink: 0;
}

.menu-label {
  flex: 1;
  font-size: 0.92rem;
  font-weight: 600;
}

.menu-arrow {
  color: var(--text-muted);
  flex-shrink: 0;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  color: #ef4444;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.3);
}
</style>
