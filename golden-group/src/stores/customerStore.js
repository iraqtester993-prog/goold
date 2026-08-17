import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCustomerStore = defineStore('customer', () => {
  const profile = ref({
    id: 1,
    name: 'أحمد محمد علي',
    phone: '07801234567',
    email: 'ahmed.ali@email.com',
    username: 'ahmed_ali',
    avatar: null,
    workplace: 'وزارة التربية',
    workplaceCode: 'GOV-EDU-001',
    salary: 1200000,
    address: 'بغداد - الكرادة - شارع 60',
    city: 'baghdad',
    nationalId: '199012345678',
    birthDate: '1990-05-15',
    gender: 'male',
    registeredDevices: [
      { id: 1, name: 'Samsung Galaxy S24', lastActive: '2026-07-21', current: true },
      { id: 2, name: 'iPhone 15', lastActive: '2026-07-15', current: false }
    ]
  })

  const loading = ref(false)

  const dashboard = computed(() => ({
    activeContracts: 1,
    remainingAmount: 1000000,
    remainingInstallments: 6,
    lastDeduction: { amount: 91667, date: '2026-07-01' },
    lastOrder: { id: 'ORD-2026-003', product: 'Samsung Galaxy S24 Ultra', date: '2026-07-20' },
    unreadNotifications: 3
  }))

  async function updateProfile(data) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 500))
      Object.assign(profile.value, data)
      return { success: true }
    } catch (e) {
      return { success: false, message: 'خطأ في تحديث البيانات' }
    } finally {
      loading.value = false
    }
  }

  async function changePassword(data) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 500))
      return { success: true }
    } catch (e) {
      return { success: false, message: 'خطأ في تغيير كلمة المرور' }
    } finally {
      loading.value = false
    }
  }

  function removeDevice(id) {
    profile.value.registeredDevices = profile.value.registeredDevices.filter(d => d.id !== id)
  }

  return { profile, loading, dashboard, updateProfile, changePassword, removeDevice }
})
