<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-header">
        <svg viewBox="0 0 60 60" width="60" height="60">
          <rect x="6" y="6" width="21" height="21" rx="4" fill="var(--color-gold)" opacity="0.8"/>
          <rect x="33" y="6" width="21" height="21" rx="4" fill="var(--color-gold)" opacity="0.6"/>
          <rect x="6" y="33" width="21" height="21" rx="4" fill="var(--color-gold)" opacity="0.6"/>
          <rect x="33" y="33" width="21" height="21" rx="4" fill="var(--color-gold)" opacity="0.4"/>
          <rect x="19" y="19" width="22" height="22" rx="4" fill="var(--color-gold)"/>
        </svg>
        <h1 class="brand-name">العصر الذهبي</h1>
        <p class="brand-tagline">انشئ حسابك وتسوق الآن</p>
      </div>

      <div class="register-card glass-card">
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-row">
            <div class="input-group">
              <input v-model="form.name" type="text" placeholder="الاسم الكامل" class="form-input" required />
              <span class="input-icon">👤</span>
            </div>
            <div class="input-group">
              <input v-model="form.phone" type="tel" placeholder="رقم الهاتف" class="form-input" dir="ltr" required />
              <span class="input-icon">📱</span>
            </div>
          </div>

          <div class="input-group">
            <input v-model="form.email" type="email" placeholder="البريد الإلكتروني (اختياري)" class="form-input" dir="ltr" />
            <span class="input-icon">📧</span>
          </div>

          <div class="input-group">
            <input v-model="form.username" type="text" placeholder="اسم المستخدم" class="form-input" required />
            <span class="input-icon">🔑</span>
          </div>

          <div class="form-row">
            <div class="input-group">
              <input v-model="form.password" type="password" placeholder="كلمة المرور" class="form-input" required />
              <span class="input-icon">🔒</span>
            </div>
            <div class="input-group">
              <input v-model="form.confirmPassword" type="password" placeholder="تأكيد كلمة المرور" class="form-input" required />
              <span class="input-icon">🔒</span>
            </div>
          </div>

          <div class="input-group">
            <select v-model="form.city" class="form-input" required>
              <option value="">المدينة</option>
              <option value="baghdad">بغداد</option>
              <option value="basra">البصرة</option>
              <option value="erbil">أربيل</option>
              <option value="sulaymaniyah">السليمانية</option>
              <option value="najaf">النجف</option>
              <option value="karbala">كربلاء</option>
              <option value="mosul">الموصل</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary btn-full btn-lg" :disabled="authStore.loading">
            <span v-if="authStore.loading" class="spinner"></span>
            <span v-else>إنشاء حساب</span>
          </button>
        </form>
      </div>

      <div class="login-option">
        <span>لديك حساب بالفعل؟</span>
        <router-link to="/login" class="gold-link">تسجيل الدخول</router-link>
      </div>

      <button class="floating-theme" @click="themeStore.toggleTheme()">
        {{ themeStore.currentTheme === 'dark' ? '☀️' : '🌙' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useThemeStore } from '../stores/themeStore'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const form = reactive({
  name: '', phone: '', email: '', username: '',
  password: '', confirmPassword: '', city: ''
})

async function handleRegister() {
  if (form.password !== form.confirmPassword) {
    alert('كلمتا المرور غير متطابقتين')
    return
  }
  const result = await authStore.register(form)
  if (result.success) router.push('/login')
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: 20px;
}
.register-container {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.register-header { text-align: center; }
.brand-name { font-size: 2rem; font-weight: 900; color: var(--color-gold); margin: 8px 0 4px; }
.brand-tagline { color: var(--text-secondary); font-size: 0.9rem; }
.register-card {
  width: 100%;
  padding: 28px 24px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
}
.register-form { display: flex; flex-direction: column; gap: 12px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.input-group { position: relative; }
.form-input {
  width: 100%;
  padding: 13px 44px 13px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: all var(--transition-fast);
}
.form-input:focus {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.1);
}
.input-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
}
.login-option {
  display: flex;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
.gold-link { color: var(--color-gold); font-weight: 700; }
.floating-theme {
  position: fixed;
  top: 16px;
  left: 16px;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
</style>
