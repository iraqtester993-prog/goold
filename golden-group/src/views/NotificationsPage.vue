<template>
  <div class="notifications-page">
    <div class="page-header">
      <button class="back-btn" @click="$router.back()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
      <h1 class="page-title">الإشعارات</h1>
      <button
        v-if="notificationStore.unreadCount > 0"
        class="mark-read-btn"
        @click="notificationStore.markAllRead()"
      >
        تعيين الكل كمقروء
      </button>
    </div>

    <div class="container">
      <template v-if="newNotifications.length > 0">
        <div class="notif-group">
          <h2 class="group-title">جديدة</h2>
          <div class="notif-list">
            <div
              v-for="notif in newNotifications"
              :key="notif.id"
              class="notif-item unread"
              @click="notificationStore.markAsRead(notif.id)"
            >
              <div class="notif-icon-wrap">
                <span class="notif-icon">{{ notif.icon }}</span>
              </div>
              <div class="notif-content">
                <h3 class="notif-title">{{ notif.title }}</h3>
                <p class="notif-message">{{ notif.message }}</p>
                <span class="notif-time">{{ formatRelativeTime(notif.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="readNotifications.length > 0">
        <div class="notif-group">
          <h2 class="group-title">مقروءة</h2>
          <div class="notif-list">
            <div
              v-for="notif in readNotifications"
              :key="notif.id"
              class="notif-item"
            >
              <div class="notif-icon-wrap">
                <span class="notif-icon">{{ notif.icon }}</span>
              </div>
              <div class="notif-content">
                <h3 class="notif-title">{{ notif.title }}</h3>
                <p class="notif-message">{{ notif.message }}</p>
                <span class="notif-time">{{ formatRelativeTime(notif.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div v-if="notificationStore.notifications.length === 0" class="empty-state">
        <div class="empty-icon">🔔</div>
        <h3>لا توجد إشعارات</h3>
        <p>ستظهر الإشعارات الجديدة هنا</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotificationStore } from '../stores/notificationStore'

const notificationStore = useNotificationStore()

const newNotifications = computed(() =>
  notificationStore.notifications.filter(n => !n.read)
)

const readNotifications = computed(() =>
  notificationStore.notifications.filter(n => n.read)
)

function formatRelativeTime(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now - date
  const diffMin = Math.floor(diffMs / 60000)
  const diffHrs = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHrs / 24)

  if (diffMin < 1) return 'الآن'
  if (diffMin < 60) return `منذ ${diffMin} ${diffMin === 1 ? 'دقيقة' : 'دقائق'}`
  if (diffHrs < 24) return `منذ ${diffHrs} ${diffHrs === 1 ? 'ساعة' : 'ساعات'}`
  return `منذ ${diffDays} ${diffDays === 1 ? 'يوم' : 'أيام'}`
}
</script>

<style scoped>
.notifications-page {
  min-height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
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
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.back-btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-color);
}

.page-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-primary);
  flex: 1;
}

.mark-read-btn {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-gold);
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity var(--transition-fast);
}

.mark-read-btn:hover {
  opacity: 0.8;
}

.container {
  padding: 20px 16px;
}

.notif-group {
  margin-bottom: 28px;
}

.group-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  padding-right: 4px;
}

.notif-list {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  border-bottom: 1px solid var(--border-light);
  transition: background var(--transition-fast);
  cursor: pointer;
}

.notif-item:last-child {
  border-bottom: none;
}

.notif-item:hover {
  background: var(--bg-card-hover);
}

.notif-item.unread {
  background: rgba(212, 168, 67, 0.04);
  border-right: 3px solid var(--color-gold);
}

.notif-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--bg-input);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notif-icon {
  font-size: 1.3rem;
}

.notif-content {
  flex: 1;
  min-width: 0;
}

.notif-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.notif-message {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 6px;
}

.notif-time {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 80px 24px;
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-state h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-state p {
  font-size: 0.9rem;
  color: var(--text-muted);
}
</style>
