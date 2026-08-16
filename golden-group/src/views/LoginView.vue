<template>
  <div class="login" :class="{ light: !isDark }">
    <div class="logo-wrapper">
      <img src="/app-logo.png" alt="السوق الذهبي" />
    </div>

    <h1>تسجيل الدخول</h1>

    <form @submit.prevent="handleLogin" class="form">
      <div class="input-group">
        <label>رقم الهاتف</label>
        <input v-model="phone" type="tel" placeholder="أدخل رقم الهاتف" required />
      </div>

      <div class="input-group">
        <label>كلمة المرور</label>
        <input v-model="password" type="password" placeholder="أدخل كلمة المرور" required />
      </div>

      <button type="submit" class="btn">دخول</button>
    </form>

    <p class="link">
      ليس لديك حساب؟
      <router-link to="/register">سجل الآن</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { isDark } = useTheme()

const phone = ref('')
const password = ref('')

const handleLogin = () => {
  router.push('/home')
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: #0a0f1d;
}

.login.light {
  background: #f5f0e6;
}

.logo-wrapper {
  width: 200px;
  height: 200px;
  margin: 0 auto 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: #0a0f1d;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(212, 175, 55, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.light .logo-wrapper {
  background: #e8e0cc;
  border: 2px solid rgba(212, 175, 55, 0.5);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.logo-wrapper img {
  width: 160px;
  height: 160px;
  object-fit: contain;
  border-radius: 50%;
}

h1 {
  color: #d4af37;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
}

.light h1 {
  color: #8B7332;
}

.form {
  width: 100%;
  max-width: 380px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #cccccc;
  font-size: 14px;
}

.light .input-group label {
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #2a2a4a;
  border-radius: 12px;
  background: #1a1a2e;
  color: #ffffff;
  font-size: 16px;
  text-align: right;
}

.light .input-group input {
  border: 1px solid #ccc;
  background: #ffffff;
  color: #333;
}

.input-group input::placeholder {
  color: #666;
}

.btn {
  width: 100%;
  padding: 16px;
  background: #d4af37;
  color: #0a0f1d;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;
}

.btn:hover {
  background: #c9a42e;
}

.link {
  margin-top: 24px;
  color: #999;
  font-size: 14px;
}

.light .link {
  color: #666;
}

.link a {
  color: #d4af37;
  text-decoration: none;
  font-weight: bold;
}

.light .link a {
  color: #8B7332;
}
</style>
