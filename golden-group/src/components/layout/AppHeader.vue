<template>
  <header class="app-header">
    <div class="header-row">
      <div class="search-toggle" @click="showSearch = !showSearch">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>

      <div class="header-title" @click="$router.push('/home')">
        <span class="logo-name">العصر الذهبي</span>
      </div>

      <div class="header-actions">
        <ThemeToggle />
        <button class="action-btn notif-btn" @click="$router.push('/notifications')">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span v-if="notificationStore.unreadCount > 0" class="notif-badge">
            {{ notificationStore.unreadCount }}
          </span>
        </button>
      </div>
    </div>

    <transition name="slide-down">
      <div v-if="showSearch" class="search-expanded">
        <div class="search-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="ابحث عن منتج..."
            @input="handleSearch"
          />
          <button class="search-close" @click="showSearch = false; searchQuery = ''">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../../stores/productStore'
import { useNotificationStore } from '../../stores/notificationStore'
import ThemeToggle from '../common/ThemeToggle.vue'

const router = useRouter()
const productStore = useProductStore()
const notificationStore = useNotificationStore()

const showSearch = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

function handleSearch() {
  productStore.searchQuery = searchQuery.value
  if (searchQuery.value && router.currentRoute.value.name !== 'products') {
    router.push('/products')
  }
}

function toggleSearch() {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    nextTick(() => searchInput.value?.focus())
  }
}

defineExpose({ toggleSearch })
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
  z-index: 100;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 12px;
}

.search-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.search-toggle:hover,
.search-toggle:active {
  background: var(--bg-card);
  color: var(--color-gold);
}

.header-title {
  flex: 1;
  text-align: center;
  cursor: pointer;
}

.logo-name {
  font-size: 1.1rem;
  font-weight: 800;
  background: var(--color-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 2px;
}

.action-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.action-btn:hover,
.action-btn:active {
  background: var(--bg-card);
  color: var(--color-gold);
}

.notif-badge {
  position: absolute;
  top: 2px;
  left: 2px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ef4444;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  padding: 0 4px;
  animation: badgePop 0.3s ease;
}

@keyframes badgePop {
  0% { transform: scale(0); }
  70% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.search-expanded {
  padding: 0 12px 12px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

.search-bar:focus-within {
  border-color: var(--color-gold);
}

.search-bar input {
  flex: 1;
  color: var(--text-primary);
  font-size: 0.9rem;
  background: none;
  border: none;
  outline: none;
}

.search-bar input::placeholder {
  color: var(--text-muted);
}

.search-close {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
