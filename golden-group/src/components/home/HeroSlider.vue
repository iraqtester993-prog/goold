<template>
  <section class="hero-slider">
    <div class="slides-wrapper" :style="{ transform: `translateX(${currentSlide * 100}%)` }">
      <div v-for="(slide, i) in slides" :key="i" class="slide">
        <img :src="slide.image" :alt="slide.title" class="slide-bg" />
        <div class="slide-overlay">
          <div class="slide-content">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-desc">{{ slide.desc }}</p>
            <button class="btn-order" @click="$router.push(slide.link)">
              اطلب الآن
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="flip-rtl">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="slider-dots">
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="dot"
        :class="{ active: currentSlide === i }"
        @click="currentSlide = i"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let timer = null

const slides = [
  {
    title: 'عروض التقسيط على جميع الأجهزة',
    desc: 'اشترِ الآن وادفع على أقساط مريحة بدون فوائد',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    link: '/products'
  },
  {
    title: 'iPhone 15 Pro Max - الأحدث من آبل',
    desc: 'تصميم تيتانيوم فاخر مع شريحة A17 Pro',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
    link: '/products/2'
  },
  {
    title: 'Samsung Galaxy S24 Ultra',
    desc: 'كاميرا 200MP - معالج Snapdragon 8 Gen 3',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
    link: '/products/1'
  }
]

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

onMounted(() => { timer = setInterval(nextSlide, 4000) })
onUnmounted(() => { clearInterval(timer) })
</script>

<style scoped>
.hero-slider {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
  aspect-ratio: 16 / 7;
}

.slides-wrapper {
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
}

.slide {
  min-width: 100%;
  position: relative;
}

.slide-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%);
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.slide-content {
  color: #fff;
  max-width: 100%;
}

.slide-title {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 4px;
  line-height: 1.3;
}

.slide-desc {
  font-size: 0.8rem;
  opacity: 0.85;
  margin-bottom: 12px;
  line-height: 1.4;
}

.btn-order {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  background: var(--color-gold);
  color: var(--bg-primary);
  border: none;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-order:active {
  transform: scale(0.96);
}

.flip-rtl {
  transform: scaleX(-1);
}

.slider-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: rgba(255,255,255,0.5);
  border: none;
  transition: all var(--transition-fast);
  padding: 0;
  cursor: pointer;
}

.dot.active {
  width: 20px;
  background: var(--color-gold);
}

@media (max-width: 480px) {
  .hero-slider {
    aspect-ratio: 16 / 8;
  }
  .slide-title {
    font-size: 1rem;
  }
}
</style>
