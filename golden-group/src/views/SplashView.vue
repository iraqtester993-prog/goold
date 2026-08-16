<template>
  <div class="splash">
    <div class="logo-container">
      <div class="spinner-ring"></div>
      <img src="/app-logo.png" alt="السوق الذهبي" class="logo" />
    </div>
    <div class="text" :class="{ show: showText }">أهلاً بك في متجر السوق الذهبي</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showText = ref(false)

onMounted(() => {
  setTimeout(() => {
    showText.value = true
  }, 1500)

  setTimeout(() => {
    router.push('/login')
  }, 3000)
})
</script>

<style scoped>
.splash {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0a0f1d;
  overflow: hidden;
}

.logo-container {
  position: relative;
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 160px;
  height: 160px;
  object-fit: contain;
  position: relative;
  z-index: 1;
  border-radius: 50%;
}

.spinner-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 220px;
  border: 4px solid transparent;
  border-top-color: #d4af37;
  border-right-color: #d4af37;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.text {
  margin-top: 40px;
  font-size: 20px;
  color: #d4af37;
  font-weight: bold;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

.text.show {
  opacity: 1;
  transform: translateY(0);
}
</style>
