<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="logo-pulse">
          <svg viewBox="0 0 60 60" width="70" height="70">
            <rect x="6" y="6" width="21" height="21" rx="4" fill="var(--color-gold)" opacity="0.8"/>
            <rect x="33" y="6" width="21" height="21" rx="4" fill="var(--color-gold)" opacity="0.6"/>
            <rect x="6" y="33" width="21" height="21" rx="4" fill="var(--color-gold)" opacity="0.6"/>
            <rect x="33" y="33" width="21" height="21" rx="4" fill="var(--color-gold)" opacity="0.4"/>
            <rect x="19" y="19" width="22" height="22" rx="4" fill="var(--color-gold)"/>
          </svg>
        </div>
        <h1 class="brand-name">العصر الذهبي</h1>
        <p class="brand-tagline">أجهزة إلكترونية - تقسيط مريح</p>
      </div>

      <div class="login-card glass-card">
        <div class="auth-tabs">
          <button class="tab" :class="{ active: authMode === 'password' }" @click="authMode = 'password'">
            كلمة المرور
          </button>
          <button class="tab" :class="{ active: authMode === 'otp' }" @click="authMode = 'otp'">
            رمز التحقق
          </button>
        </div>

        <form v-if="authMode === 'password'" @submit.prevent="handleLogin" class="login-form">
          <div class="input-group">
            <input v-model="username" type="text" placeholder="اسم المستخدم" class="form-input" required />
            <span class="input-icon">👤</span>
          </div>
          <div class="input-group">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="كلمة المرور" class="form-input" required />
            <span class="input-icon">🔒</span>
            <button type="button" class="toggle-pass" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
          <div class="form-options">
            <a href="#" class="forgot-link">نسيت كلمة المرور؟</a>
          </div>
          <button type="submit" class="btn btn-primary btn-full btn-lg" :disabled="authStore.loading">
            <span v-if="authStore.loading" class="spinner"></span>
            <span v-else>دخول</span>
          </button>
        </form>

        <form v-else @submit.prevent="handleOTP" class="login-form">
          <div v-if="!otpSent" class="otp-step">
            <div class="input-group">
              <input v-model="otpPhone" type="tel" placeholder="رقم الهاتف" class="form-input" dir="ltr" required />
              <span class="input-icon">📱</span>
            </div>
            <button type="submit" class="btn btn-primary btn-full btn-lg" :disabled="authStore.loading">
              <span v-if="authStore.loading" class="spinner"></span>
              <span v-else>إرسال رمز التحقق</span>
            </button>
          </div>
          <div v-else class="otp-verify">
            <p class="otp-msg">تم إرسال رمز التحقق إلى {{ otpPhone }}</p>
            <div class="otp-inputs">
              <input v-for="(_, i) in 4" :key="i" :ref="el => otpRefs[i] = el"
                v-model="otpCode[i]" type="tel" maxlength="1"
                class="otp-input" @input="onOTPInput(i, $event)"
                @keydown.backspace="onOTPBackspace(i, $event)"
              />
            </div>
            <button type="submit" class="btn btn-primary btn-full btn-lg" :disabled="authStore.loading || otpCode.join('').length < 4">
              <span v-if="authStore.loading" class="spinner"></span>
              <span v-else>تحقق</span>
            </button>
            <button type="button" class="resend-btn" @click="otpSent = false">إعادة الإرسال</button>
          </div>
        </form>

        <div class="divider">
          <span>أو</span>
        </div>

        <button class="biometric-btn glass-btn" @click="handleBiometric">
          <span class="bio-icon">🔐</span>
          <span>الدخول بالبصمة / Face ID</span>
        </button>
      </div>

      <div class="guest-option">
        <button class="btn btn-secondary btn-full" @click="$router.push('/home')">
          المتابعة كضيف
        </button>
      </div>

      <div class="register-option">
        <span>ليس لديك حساب؟</span>
        <router-link to="/register" class="gold-link">إنشاء حساب</router-link>
      </div>

      <button class="floating-theme" @click="themeStore.toggleTheme()">
        {{ themeStore.currentTheme === 'dark' ? '☀️' : '🌙' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useThemeStore } from '../stores/themeStore'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const authMode = ref('password')
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const otpPhone = ref('')
const otpSent = ref(false)
const otpCode = reactive(['', '', '', ''])
const otpRefs = ref([])

async function handleLogin() {
  const result = await authStore.login(username.value, password.value)
  if (result.success) {
    localStorage.setItem('golden-age-visited', 'true')
    router.push('/home')
  }
}

async function handleOTP() {
  if (!otpSent.value) {
    const result = await authStore.sendOTP(otpPhone.value)
    if (result.success) otpSent.value = true
  } else {
    const result = await authStore.verifyOTP(otpCode.join(''))
    if (result.success) {
      localStorage.setItem('golden-age-visited', 'true')
      router.push('/home')
    }
  }
}

function onOTPInput(index, event) {
  if (otpCode[index] && index < 3) {
    nextTick(() => { otpRefs.value[index + 1]?.focus() })
  }
}

function onOTPBackspace(index, event) {
  if (!otpCode[index] && index > 0) {
    nextTick(() => { otpRefs.value[index - 1]?.focus() })
  }
}

function handleBiometric() {
  authStore.login('biometric_user', 'biometric').then(result => {
    if (result.success) {
      localStorage.setItem('golden-age-visited', 'true')
      router.push('/home')
    }
  })
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: 20px;
}
.login-container {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.login-header {
  text-align: center;
}
.logo-pulse {
  margin-bottom: 12px;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.brand-name {
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-gold);
  margin-bottom: 4px;
}
.brand-tagline {
  color: var(--text-secondary);
  font-size: 0.9rem;
}
.login-card {
  width: 100%;
  padding: 28px 24px;
}
.glass-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(12px);
}
.auth-tabs {
  display: flex;
  gap: 4px;
  background: var(--bg-input);
  border-radius: var(--radius-full);
  padding: 4px;
  margin-bottom: 24px;
}
.tab {
  flex: 1;
  padding: 10px;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}
.tab.active {
  background: var(--color-gold);
  color: var(--bg-primary);
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.input-group {
  position: relative;
}
.input-group .form-input {
  padding: 14px 48px 14px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.95rem;
  width: 100%;
  transition: all var(--transition-fast);
}
.input-group .form-input:focus {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.1);
}
.input-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
}
.toggle-pass {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
}
.form-options {
  text-align: center;
}
.forgot-link {
  color: var(--text-secondary);
  font-size: 0.85rem;
}
.forgot-link:hover {
  color: var(--color-gold);
}
.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 20px 0;
}
.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-light);
}
.divider span {
  color: var(--text-muted);
  font-size: 0.85rem;
}
.glass-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}
.glass-btn:hover {
  border-color: var(--color-gold);
  background: rgba(212, 168, 67, 0.08);
}
.bio-icon {
  font-size: 1.3rem;
}
.otp-msg {
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 8px;
}
.otp-inputs {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.otp-input {
  width: 52px;
  height: 56px;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  background: var(--bg-input);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}
.otp-input:focus {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.1);
}
.resend-btn {
  width: 100%;
  text-align: center;
  color: var(--color-gold);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px;
}
.guest-option {
  width: 100%;
}
.register-option {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
.gold-link {
  color: var(--color-gold);
  font-weight: 700;
}
.gold-link:hover {
  text-decoration: underline;
}
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
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
