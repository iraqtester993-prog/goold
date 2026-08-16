<template>
  <div class="register" :class="{ light: !isDark }">
    <h1>إنشاء حساب جديد</h1>

    <form @submit.prevent="handleRegister" class="form">
      <div class="input-group">
        <label>نوع الحساب</label>
        <select v-model="accountType" class="select">
          <option value="employee">موظف</option>
          <option value="merchant">كاسب</option>
        </select>
      </div>

      <div class="input-group">
        <label>الاسم الكامل</label>
        <input v-model="name" type="text" placeholder="أدخل الاسم الكامل" required />
      </div>

      <div class="input-group">
        <label>رقم الهاتف</label>
        <input v-model="phone" type="tel" placeholder="أدخل رقم الهاتف" required />
      </div>

      <div class="input-group">
        <label>العنوان</label>
        <input v-model="address" type="text" placeholder="أدخل العنوان" required />
      </div>

      <div v-if="accountType === 'employee'" class="input-group">
        <label>الدائرة الحكومية</label>
        <input v-model="governmentDept" type="text" placeholder="أدخل الدائرة الحكومية" />
      </div>

      <div v-if="accountType === 'employee'" class="input-group">
        <label>العنوان الوظيفي</label>
        <input v-model="jobTitle" type="text" placeholder="أدخل العنوان الوظيفي" />
      </div>

      <div v-if="accountType === 'merchant'" class="input-group">
        <label>نوع العمل</label>
        <input v-model="businessType" type="text" placeholder="أدخل نوع العمل" />
      </div>

      <div v-if="accountType === 'merchant'" class="input-group">
        <label>مكان العمل</label>
        <input v-model="workPlace" type="text" placeholder="أدخل مكان العمل" />
      </div>

      <div class="input-group">
        <label>الهوية الشخصية - الوجه الأمامي</label>
        <input type="file" accept="image/*" @change="e => idFront = e.target.files[0]" />
      </div>

      <div class="input-group">
        <label>الهوية الشخصية - الوجه الخلفي</label>
        <input type="file" accept="image/*" @change="e => idBack = e.target.files[0]" />
      </div>

      <div class="input-group">
        <label>الصورة الشخصية</label>
        <input type="file" accept="image/*" @change="e => personalPhoto = e.target.files[0]" />
      </div>

      <div class="input-group">
        <label>بطاقة الإقامة - الوجه الأمامي</label>
        <input type="file" accept="image/*" @change="e => residenceFront = e.target.files[0]" />
      </div>

      <div class="input-group">
        <label>بطاقة الإقامة - الوجه الخلفي</label>
        <input type="file" accept="image/*" @change="e => residenceBack = e.target.files[0]" />
      </div>

      <div class="input-group">
        <label>كلمة المرور</label>
        <input v-model="password" type="password" placeholder="أدخل كلمة المرور" required />
      </div>

      <div class="input-group">
        <label>تأكيد كلمة المرور</label>
        <input v-model="confirmPassword" type="password" placeholder="أعد إدخال كلمة المرور" required />
      </div>

      <button type="submit" class="btn">تسجيل</button>
    </form>

    <p class="link">
      لديك حساب بالفعل؟
      <router-link to="/login">سجل الدخول</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { isDark } = useTheme()

const accountType = ref('employee')
const name = ref('')
const phone = ref('')
const address = ref('')
const governmentDept = ref('')
const jobTitle = ref('')
const businessType = ref('')
const workPlace = ref('')
const idFront = ref(null)
const idBack = ref(null)
const personalPhoto = ref(null)
const residenceFront = ref(null)
const residenceBack = ref(null)
const password = ref('')
const confirmPassword = ref('')

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('كلمتا المرور غير متطابقتين')
    return
  }
  router.push('/home')
}
</script>

<style scoped>
.register {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background: #0a0f1d;
}

.register.light {
  background: #f5f0e6;
}

h1 {
  color: #d4af37;
  font-size: 22px;
  margin-bottom: 30px;
  text-align: center;
}

.light h1 {
  color: #8B7332;
}

.form {
  width: 100%;
  max-width: 400px;
}

.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  color: #cccccc;
  font-size: 13px;
}

.light .input-group label {
  color: #555;
}

.input-group input,
.select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #2a2a4a;
  border-radius: 10px;
  background: #1a1a2e;
  color: #ffffff;
  font-size: 15px;
  text-align: right;
}

.light .input-group input,
.light .select {
  border: 1px solid #ccc;
  background: #ffffff;
  color: #333;
}

.input-group input[type="file"] {
  padding: 10px;
  font-size: 13px;
}

.input-group input::placeholder {
  color: #666;
}

.select {
  appearance: auto;
  cursor: pointer;
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
}

.link {
  margin-top: 20px;
  margin-bottom: 40px;
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
