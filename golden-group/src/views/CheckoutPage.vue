<template>
  <div class="checkout-page">
    <div class="container">
      <div class="page-header">
        <button class="back-btn" @click="$router.back()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <h1 class="page-title">إتمام الطلب</h1>
      </div>

      <div class="checkout-layout">
        <div class="checkout-form-section">
          <div class="section-card">
            <div class="section-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h2>معلومات التوصيل</h2>
            <form class="checkout-form" @submit.prevent>
              <div class="form-row">
                <div class="form-group">
                  <label>الاسم الكامل <span class="required">*</span></label>
                  <input v-model="form.name" type="text" class="form-input" placeholder="أدخل اسمك الكامل" />
                </div>
                <div class="form-group">
                  <label>رقم الهاتف <span class="required">*</span></label>
                  <input v-model="form.phone" type="tel" class="form-input" placeholder="07XX XXX XXXX" dir="ltr" />
                </div>
              </div>
              <div class="form-group">
                <label>المدينة <span class="required">*</span></label>
                <div class="select-wrapper">
                  <select v-model="form.city" class="form-input">
                    <option value="">اختر المدينة</option>
                    <option value="بغداد">بغداد</option>
                    <option value="البصرة">البصرة</option>
                    <option value="أربيل">أربيل</option>
                    <option value="السليمانية">السليمانية</option>
                    <option value="النجف">النجف</option>
                    <option value="كربلاء">كربلاء</option>
                    <option value="الموصل">الموصل</option>
                    <option value="ديالى">ديالى</option>
                    <option value="نينوى">نينوى</option>
                    <option value="كركوك">كركوك</option>
                    <option value="ذي قار">ذي قار</option>
                    <option value="ميسان">ميسان</option>
                    <option value="القادسية">القادسية</option>
                    <option value="الأنبار">الأنبار</option>
                    <option value="صلاح الدين">صلاح الدين</option>
                    <option value="دهوك">دهوك</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label>العنوان التفصيلي <span class="required">*</span></label>
                <textarea v-model="form.address" class="form-input" rows="3" placeholder="الحي، الشارع، رقم المنزل..."></textarea>
              </div>
            </form>
          </div>

          <div class="section-card">
            <div class="section-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            <h2>طريقة الدفع</h2>
            <div class="payment-options">
              <label class="payment-option" :class="{ active: form.paymentMethod === 'cash' }">
                <input type="radio" value="cash" v-model="form.paymentMethod" />
                <div class="option-content">
                  <div class="option-icon cash-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                    </svg>
                  </div>
                  <div class="option-text">
                    <span class="option-title">الدفع عند الاستلام</span>
                    <span class="option-desc">ادفع نقداً عند استلام طلبك</span>
                  </div>
                  <div class="option-check">
                    <svg v-if="form.paymentMethod === 'cash'" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
              </label>

              <label class="payment-option" :class="{ active: form.paymentMethod === 'transfer' }">
                <input type="radio" value="transfer" v-model="form.paymentMethod" />
                <div class="option-content">
                  <div class="option-icon transfer-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M2 7l10 5 10-5"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div class="option-text">
                    <span class="option-title">تحويل بنكي</span>
                    <span class="option-desc">تحويل مباشر إلى الحساب البنكي</span>
                  </div>
                  <div class="option-check">
                    <svg v-if="form.paymentMethod === 'transfer'" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
              </label>

              <label class="payment-option" :class="{ active: form.paymentMethod === 'installment' }">
                <input type="radio" value="installment" v-model="form.paymentMethod" />
                <div class="option-content">
                  <div class="option-icon installment-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div class="option-text">
                    <span class="option-title">الدفع بالقسط</span>
                    <span class="option-desc">قسم المبلغ على أقساط شهرية مريحة</span>
                  </div>
                  <div class="option-check">
                    <svg v-if="form.paymentMethod === 'installment'" width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
              </label>
            </div>

            <transition name="slide-fade">
              <div v-if="form.paymentMethod === 'installment'" class="installment-section">
                <InstallmentCalc :price="cartStore.totalPrice" />
                <div class="installment-redirect">
                  <p>لتقديم طلب تقسيط رسمي، يرجى إكمال البيانات عبر صفحة طلب التقسيط</p>
                  <router-link to="/installment-request" class="btn btn-outline-gold btn-sm">
                    صفحة طلب التقسيط
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </router-link>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div class="order-summary-card">
          <div class="summary-glow"></div>
          <h3>ملخص الطلب</h3>
          <div class="order-items">
            <div v-for="item in cartStore.items" :key="item.id" class="order-item">
              <img :src="item.image" :alt="item.name" />
              <div class="item-info">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-qty">الكمية: {{ item.quantity }}</span>
              </div>
              <span class="item-price">{{ formatCurrency(item.price * item.quantity) }}</span>
            </div>
          </div>
          <div class="summary-rows">
            <div class="summary-row">
              <span>المجموع الفرعي</span>
              <span>{{ formatCurrency(cartStore.totalPrice) }}</span>
            </div>
            <div class="summary-row">
              <span>التوصيل</span>
              <span class="free-delivery">مجاني</span>
            </div>
            <div v-if="cartStore.totalSavings > 0" class="summary-row savings">
              <span>التخفيضات</span>
              <span>-{{ formatCurrency(cartStore.totalSavings) }}</span>
            </div>
            <div class="summary-row total">
              <span>الإجمالي</span>
              <span class="total-price">{{ formatCurrency(cartStore.totalPrice) }}</span>
            </div>
          </div>
          <button class="btn btn-gold btn-full btn-lg" @click="placeOrder" :disabled="loading">
            <template v-if="loading">
              <span class="spinner"></span>
              جاري التأكيد...
            </template>
            <template v-else>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              تأكيد الطلب
            </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'
import { useCurrency } from '../composables/useCurrency'
import InstallmentCalc from '../components/payment/InstallmentCalc.vue'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const { formatCurrency } = useCurrency()

const loading = ref(false)

const form = reactive({
  name: '',
  phone: '',
  city: '',
  address: '',
  paymentMethod: 'cash'
})

function placeOrder() {
  if (!form.name || !form.phone || !form.city || !form.address) {
    alert('يرجى ملء جميع الحقول المطلوبة')
    return
  }

  loading.value = true

  setTimeout(() => {
    const order = orderStore.createOrder({
      ...form,
      items: cartStore.items,
      total: cartStore.totalPrice
    })

    cartStore.clearCart()
    router.push(`/orders/${order.id}`)
    loading.value = false
  }, 800)
}
</script>

<style scoped>
.checkout-page {
  padding: 24px 0 100px;
  min-height: 70vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  color: var(--text-primary);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.back-btn:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.page-title {
  font-size: 1.6rem;
  font-weight: 800;
  font-family: 'Cairo', sans-serif;
  color: var(--text-primary);
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 28px;
  align-items: start;
}

.section-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 28px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.section-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 168, 67, 0.1);
  color: var(--color-gold);
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.section-card h2 {
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 22px;
  color: var(--text-primary);
  font-family: 'Cairo', sans-serif;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.required {
  color: #ef4444;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-input);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  font-family: 'Cairo', sans-serif;
  font-size: 0.9rem;
  color: var(--text-primary);
  transition: all var(--transition-fast);
  outline: none;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: var(--color-gold);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.1);
}

.form-input::placeholder {
  color: var(--text-muted);
}

textarea.form-input {
  resize: vertical;
  min-height: 80px;
}

.select-wrapper {
  position: relative;
}

select.form-input {
  appearance: none;
  cursor: pointer;
}

/* Payment Options */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.payment-option {
  cursor: pointer;
  display: block;
}

.payment-option input {
  display: none;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: var(--bg-input);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.payment-option.active .option-content {
  border-color: var(--color-gold);
  background: rgba(212, 168, 67, 0.06);
}

.option-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.cash-icon {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.transfer-icon {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.installment-icon {
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
}

.option-text {
  flex: 1;
}

.option-title {
  display: block;
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.option-desc {
  display: block;
  color: var(--text-muted);
  font-size: 0.78rem;
  margin-top: 2px;
}

.option-check {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.installment-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border-light);
}

.installment-redirect {
  margin-top: 16px;
  padding: 14px 16px;
  background: rgba(168, 85, 247, 0.06);
  border: 1px solid rgba(168, 85, 247, 0.15);
  border-radius: var(--radius-md);
}

.installment-redirect p {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.6;
}

/* Summary Card */
.order-summary-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 28px;
  position: sticky;
  top: calc(var(--header-height, 70px) + 20px);
  overflow: hidden;
}

.summary-glow {
  position: absolute;
  top: -40px;
  left: -40px;
  width: 120px;
  height: 120px;
  background: var(--color-gold-gradient);
  border-radius: 50%;
  opacity: 0.06;
  pointer-events: none;
}

.order-summary-card h3 {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 18px;
  color: var(--text-primary);
  font-family: 'Cairo', sans-serif;
}

.order-items {
  margin-bottom: 18px;
  max-height: 240px;
  overflow-y: auto;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-light);
}

.order-item:last-child {
  border-bottom: none;
}

.order-item img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: var(--bg-input);
  flex-shrink: 0;
}

.item-info {
  flex: 1;
}

.item-name {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.item-qty {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.item-price {
  font-weight: 700;
  color: var(--color-gold);
  font-size: 0.88rem;
  white-space: nowrap;
}

.summary-rows {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.free-delivery {
  color: #22c55e;
  font-weight: 600;
}

.summary-row.savings {
  color: #22c55e;
  font-weight: 600;
}

.summary-row.total {
  padding-top: 14px;
  border-top: 2px solid var(--border-light);
  margin-top: 4px;
  font-weight: 800;
  color: var(--text-primary);
}

.total-price {
  color: var(--color-gold);
  font-size: 1.25rem;
  font-weight: 900;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: var(--radius-lg);
  font-family: 'Cairo', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition: all var(--transition-normal);
  cursor: pointer;
  border: none;
}

.btn-full {
  width: 100%;
}

.btn-lg {
  padding: 16px 28px;
  font-size: 1rem;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.82rem;
}

.btn-gold {
  background: var(--color-gold-gradient);
  color: #fff;
  box-shadow: var(--shadow-gold);
}

.btn-gold:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(212, 168, 67, 0.35);
}

.btn-gold:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-outline-gold {
  background: transparent;
  color: var(--color-gold);
  border: 1.5px solid var(--color-gold);
}

.btn-outline-gold:hover {
  background: rgba(212, 168, 67, 0.08);
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Transition */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 900px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .order-summary-card {
    position: static;
    order: -1;
  }
}

@media (max-width: 600px) {
  .checkout-page {
    padding: 16px 0 120px;
  }

  .page-title {
    font-size: 1.3rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .section-card {
    padding: 20px;
  }

  .option-content {
    padding: 14px;
  }
}
</style>
