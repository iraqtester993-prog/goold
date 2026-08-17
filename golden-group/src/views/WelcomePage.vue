<template>
  <div class="welcome-page">
    <div class="welcome-content">
      <div class="welcome-slides">
        <div class="slides-track" :style="{ transform: `translateX(${currentSlide * 100}%)` }">
          <div v-for="(slide, i) in slides" :key="i" class="welcome-slide">
            <div class="slide-icon">{{ slide.icon }}</div>
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-desc">{{ slide.desc }}</p>
          </div>
        </div>
      </div>

      <div class="welcome-dots">
        <button
          v-for="(_, i) in slides"
          :key="i"
          class="dot"
          :class="{ active: currentSlide === i }"
          @click="currentSlide = i"
        />
      </div>

      <div class="welcome-actions">
        <button class="btn btn-primary btn-full btn-lg" @click="$router.push('/login')">
          تسجيل الدخول
        </button>
        <button class="btn btn-secondary btn-full btn-lg" @click="$router.push('/register')">
          إنشاء حساب جديد
        </button>
        <button class="guest-link" @click="continueAsGuest">
          المتابعة كضيف
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentSlide = ref(0)
let timer = null

const slides = [
  {
    icon: '📱',
    title: 'تسوّق بأفضل الأسعار',
    desc: 'اكتشف أحدث الأجهزة الإلكترونية بأسعار تنافسية مع خيارات تقسيط مريحة'
  },
  {
    icon: '💳',
    title: 'قسط على راتبك',
    desc: 'قسم مشترياتك على أقساط شهرية مريحة يتم استقطاعها تلقائياً من راتبك'
  },
  {
    icon: '✅',
    title: 'موافقة سريعة',
    desc: 'نظام ذكي لتقديم طلبات التقسيط مع متابعة فورية لحالة طلبك'
  }
]

onMounted(() => {
  timer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 4000)
})

onUnmounted(() => { clearInterval(timer) })

function continueAsGuest() {
  localStorage.setItem('golden-age-visited', 'true')
  router.push('/home')
}
</script>

<style scoped>
.welcome-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: 20px;
}
.welcome-content {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}
.welcome-slides {
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-xl);
}
.slides-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.welcome-slide {
  min-width: 100%;
  text-align: center;
  padding: 40px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
}
.slide-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.slide-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 12px;
}
.slide-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
}
.welcome-dots {
  display: flex;
  gap: 8px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--text-muted);
  transition: all var(--transition-fast);
}
.dot.active {
  width: 24px;
  background: var(--color-gold);
}
.welcome-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.guest-link {
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-align: center;
  padding: 8px;
}
.guest-link:hover {
  color: var(--color-gold);
}
</style>
