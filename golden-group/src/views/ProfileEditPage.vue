<template>
  <div class="profile-edit-page">
    <div class="page-header">
      <button class="back-btn" @click="$router.back()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
      <h1 class="page-title">تعديل الملف الشخصي</h1>
    </div>

    <div class="container">
      <form class="edit-form" @submit.prevent="handleSave">
        <div class="form-group">
          <label class="form-label">الاسم الكامل</label>
          <input
            v-model="form.name"
            type="text"
            class="form-input"
            placeholder="أدخل اسمك الكامل"
          />
        </div>

        <div class="form-group">
          <label class="form-label">رقم الهاتف</label>
          <input
            v-model="form.phone"
            type="tel"
            class="form-input"
            placeholder="07XX XXX XXXX"
          />
        </div>

        <div class="form-group">
          <label class="form-label">البريد الإلكتروني</label>
          <input
            v-model="form.email"
            type="email"
            class="form-input"
            placeholder="example@email.com"
          />
        </div>

        <div class="form-group">
          <label class="form-label">جهة العمل</label>
          <input
            v-model="form.workplace"
            type="text"
            class="form-input"
            placeholder="أدخل جهة عملك"
          />
        </div>

        <div class="form-group">
          <label class="form-label">العنوان</label>
          <input
            v-model="form.address"
            type="text"
            class="form-input"
            placeholder="المدينة، الحي، الشارع"
          />
        </div>

        <div class="form-group">
          <label class="form-label">المدينة</label>
          <div class="select-wrap">
            <select v-model="form.city" class="form-input form-select">
              <option value="">اختر المدينة</option>
              <option value="baghdad">بغداد</option>
              <option value="basra">البصرة</option>
              <option value="erbil">أربيل</option>
              <option value="sulaymaniyah">السليمانية</option>
              <option value="najaf">النجف</option>
              <option value="karbala">كربلاء</option>
              <option value="mosul">الموصل</option>
              <option value="kirkuk">كركوك</option>
              <option value="diyala">ديالى</option>
              <option value="anbar">الأنبار</option>
            </select>
            <svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        <button type="submit" class="save-btn" :disabled="customerStore.loading">
          <span v-if="customerStore.loading" class="spinner"></span>
          <span v-else>حفظ التغييرات</span>
        </button>

        <div v-if="saved" class="save-success">تم حفظ التغييرات بنجاح</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCustomerStore } from '../stores/customerStore'

const customerStore = useCustomerStore()
const saved = ref(false)

const form = ref({
  name: '',
  phone: '',
  email: '',
  workplace: '',
  address: '',
  city: ''
})

onMounted(() => {
  const p = customerStore.profile
  form.value = {
    name: p.name || '',
    phone: p.phone || '',
    email: p.email || '',
    workplace: p.workplace || '',
    address: p.address || '',
    city: p.city || ''
  }
})

async function handleSave() {
  const result = await customerStore.updateProfile(form.value)
  if (result.success) {
    saved.value = true
    setTimeout(() => { saved.value = false }, 2500)
  }
}
</script>

<style scoped>
.profile-edit-page {
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

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-secondary);
}

.form-input {
  padding: 14px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: 'Cairo', sans-serif;
  transition: border-color var(--transition-fast);
  outline: none;
  width: 100%;
}

.form-input:focus {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.1);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.select-wrap {
  position: relative;
}

.form-select {
  appearance: none;
  padding-left: 40px;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.save-btn {
  padding: 16px;
  background: var(--color-gold-gradient);
  color: var(--bg-primary);
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 800;
  font-family: 'Cairo', sans-serif;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.save-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-top-color: var(--bg-primary);
  border-radius: var(--radius-full);
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.save-success {
  text-align: center;
  padding: 12px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
