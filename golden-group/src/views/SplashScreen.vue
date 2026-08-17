<template>
  <div class="splash-screen" :class="{ fadeOut: isFading }">
    <div class="splash-content">
      <div class="splash-logo" :class="{ animate: logoVisible }">
        <svg viewBox="0 0 80 80" width="100" height="100">
          <rect x="8" y="8" width="28" height="28" rx="6" fill="var(--color-gold)" opacity="0.8"/>
          <rect x="44" y="8" width="28" height="28" rx="6" fill="var(--color-gold)" opacity="0.6"/>
          <rect x="8" y="44" width="28" height="28" rx="6" fill="var(--color-gold)" opacity="0.6"/>
          <rect x="44" y="44" width="28" height="28" rx="6" fill="var(--color-gold)" opacity="0.4"/>
          <rect x="26" y="26" width="28" height="28" rx="6" fill="var(--color-gold)"/>
        </svg>
      </div>
      <h1 class="splash-title" :class="{ animate: titleVisible }">العصر الذهبي</h1>
      <p class="splash-subtitle" :class="{ animate: subtitleVisible }">أجهزة إلكترونية - تقسيط مريح</p>
      <div class="splash-loader" :class="{ animate: loaderVisible }">
        <div class="loader-bar"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isFading = ref(false)
const logoVisible = ref(false)
const titleVisible = ref(false)
const subtitleVisible = ref(false)
const loaderVisible = ref(false)

onMounted(() => {
  setTimeout(() => { logoVisible.value = true }, 200)
  setTimeout(() => { titleVisible.value = true }, 500)
  setTimeout(() => { subtitleVisible.value = true }, 700)
  setTimeout(() => { loaderVisible.value = true }, 900)
  setTimeout(() => {
    isFading.value = true
    setTimeout(() => {
      const hasVisited = localStorage.getItem('golden-age-visited')
      router.replace(hasVisited ? '/home' : '/welcome')
    }, 400)
  }, 2800)
})
</script>

<style scoped>
.splash-screen {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.4s ease;
}
.splash-screen.fadeOut {
  opacity: 0;
}
.splash-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.splash-logo {
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.splash-logo.animate {
  opacity: 1;
  transform: scale(1);
}
.splash-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--color-gold);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}
.splash-title.animate {
  opacity: 1;
  transform: translateY(0);
}
.splash-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.5s ease;
}
.splash-subtitle.animate {
  opacity: 1;
  transform: translateY(0);
}
.splash-loader {
  width: 200px;
  height: 3px;
  background: var(--border-light);
  border-radius: 3px;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
  margin-top: 20px;
}
.splash-loader.animate {
  opacity: 1;
}
.loader-bar {
  width: 0%;
  height: 100%;
  background: var(--color-gold-gradient);
  border-radius: 3px;
  animation: load 1.8s ease forwards;
}
@keyframes load {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
}
</style>
