import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('golden-age-token') || null)
  const loading = ref(false)
  const otpSent = ref(false)
  const otpPhone = ref('')
  const loginMethod = ref('password')

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  async function login(username, password) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 800))
      const mockUser = {
        id: 1,
        username,
        name: 'أحمد محمد علي',
        phone: '07801234567',
        email: 'ahmed.ali@email.com'
      }
      user.value = mockUser
      token.value = 'mock-jwt-token'
      localStorage.setItem('golden-age-token', token.value)
      return { success: true }
    } catch (error) {
      return { success: false, message: 'خطأ في تسجيل الدخول' }
    } finally {
      loading.value = false
    }
  }

  async function sendOTP(phone) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 600))
      otpPhone.value = phone
      otpSent.value = true
      return { success: true, message: 'تم إرسال رمز التحقق' }
    } catch (error) {
      return { success: false, message: 'خطأ في إرسال الرمز' }
    } finally {
      loading.value = false
    }
  }

  async function verifyOTP(code) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 600))
      if (code.length === 4) {
        const mockUser = {
          id: 1,
          username: 'user',
          name: 'أحمد محمد علي',
          phone: otpPhone.value,
          email: 'ahmed.ali@email.com'
        }
        user.value = mockUser
        token.value = 'mock-jwt-token-otp'
        localStorage.setItem('golden-age-token', token.value)
        otpSent.value = false
        return { success: true }
      }
      return { success: false, message: 'رمز غير صحيح' }
    } catch (error) {
      return { success: false, message: 'خطأ في التحقق' }
    } finally {
      loading.value = false
    }
  }

  async function register(data) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 800))
      return { success: true }
    } catch (error) {
      return { success: false, message: 'خطأ في التسجيل' }
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('golden-age-token')
  }

  function checkAuth() {
    if (token.value) {
      user.value = {
        id: 1,
        username: 'ahmed_ali',
        name: 'أحمد محمد علي',
        phone: '07801234567',
        email: 'ahmed.ali@email.com'
      }
    }
  }

  return {
    user, token, loading, otpSent, otpPhone, loginMethod,
    isLoggedIn, login, sendOTP, verifyOTP, register, logout, checkAuth
  }
})
