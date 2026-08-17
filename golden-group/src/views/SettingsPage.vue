<template>
  <div class="settings-page">
    <div class="page-header">
      <button class="back-btn" @click="$router.back()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
      <h1 class="page-title">الإعدادات</h1>
    </div>

    <div class="container">
      <div class="settings-section">
        <h2 class="section-label">المظهر</h2>
        <div class="setting-item">
          <div class="setting-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <span class="setting-label">{{ themeStore.currentTheme === 'dark' ? 'الوضع الداكن' : 'الوضع الفاتح' }}</span>
          </div>
          <button
            class="toggle-switch"
            :class="{ active: themeStore.currentTheme === 'dark' }"
            @click="themeStore.toggleTheme()"
          >
            <span class="toggle-knob"></span>
          </button>
        </div>
      </div>

      <div class="settings-section">
        <h2 class="section-label">الإشعارات</h2>
        <div class="setting-item">
          <div class="setting-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span class="setting-label">إشعارات الدفع</span>
          </div>
          <button
            class="toggle-switch"
            :class="{ active: pushEnabled }"
            @click="pushEnabled = !pushEnabled"
          >
            <span class="toggle-knob"></span>
          </button>
        </div>
      </div>

      <div class="settings-section">
        <h2 class="section-label">عن التطبيق</h2>
        <div class="setting-item static">
          <div class="setting-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span class="setting-label">الإصدار</span>
          </div>
          <span class="setting-value">1.0.0</span>
        </div>

        <div class="setting-item clickable" @click="showPrivacy = true">
          <div class="setting-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span class="setting-label">سياسة الخصوصية</span>
          </div>
          <svg class="setting-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>

        <div class="setting-item clickable" @click="showTerms = true">
          <div class="setting-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span class="setting-label">الشروط والأحكام</span>
          </div>
          <svg class="setting-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
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

    <Teleport to="body">
      <div v-if="showPrivacy || showTerms" class="modal-overlay" @click.self="closeModals">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ showPrivacy ? 'سياسة الخصوصية' : 'الشروط والأحكام' }}</h3>
            <button class="modal-close" @click="closeModals">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <p v-if="showPrivacy">
              نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. لا نشارك معلوماتك مع أطراف ثالثة إلا بموافقتك الصريحة أو عند الضرورة القانونية. نستخدم بياناتك فقط لتقديم خدماتنا وتحسين تجربتك.
            </p>
            <p v-if="showTerms">
              باستخدامك لتطبيق "العصر الذهبي" أنت توافق على هذه الشروط. نحتفظ بحق تعديل الشروط في أي وقت. يتحمل المستخدم مسؤولية مراجعة الشروط بشكل دوري. جميع المنتجات عرضة لتوفر المخزون وسياسة الإرجاع.
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/themeStore'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()

const pushEnabled = ref(true)
const showPrivacy = ref(false)
const showTerms = ref(false)

function closeModals() {
  showPrivacy.value = false
  showTerms.value = false
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.settings-page {
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
}

.container {
  padding: 20px 16px;
  max-width: 560px;
  margin: 0 auto;
}

.settings-section {
  margin-bottom: 28px;
}

.section-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  padding-right: 4px;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  margin-bottom: 2px;
  transition: background var(--transition-fast);
}

.setting-item:first-of-type {
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.setting-item:last-of-type {
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  margin-bottom: 0;
}

.setting-item:only-of-type {
  border-radius: var(--radius-lg);
}

.setting-item.clickable {
  cursor: pointer;
}

.setting-item.clickable:hover {
  background: var(--bg-card-hover);
}

.setting-info {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-primary);
}

.setting-info svg {
  color: var(--color-gold);
  flex-shrink: 0;
}

.setting-label {
  font-size: 0.9rem;
  font-weight: 600;
}

.setting-value {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 600;
}

.setting-arrow {
  color: var(--text-muted);
  flex-shrink: 0;
}

.toggle-switch {
  position: relative;
  width: 50px;
  height: 28px;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.toggle-switch.active {
  background: var(--color-gold);
  border-color: var(--color-gold);
}

.toggle-knob {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 22px;
  height: 22px;
  background: white;
  border-radius: var(--radius-full);
  transition: transform var(--transition-fast);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.toggle-switch.active .toggle-knob {
  transform: translateX(-22px);
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
  font-family: 'Cairo', sans-serif;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: 8px;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.3);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  padding: 24px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border-light);
}

.modal-header h3 {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-primary);
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  color: var(--text-muted);
  background: var(--bg-card);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.modal-close:hover {
  color: var(--text-primary);
  background: var(--bg-card-hover);
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
}

.modal-body p {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.8;
}
</style>
