<template>
  <Teleport to="body">
    <Transition name="gallery-fade">
      <div v-if="visible" class="image-gallery-overlay" @click.self="close">
        <div class="gallery-container">
          <button class="gallery-close" @click="close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <button class="gallery-nav gallery-prev" v-if="images.length > 1" @click="prev">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div class="gallery-image-wrapper">
            <img :src="images[currentIndex]" :alt="`صورة ${currentIndex + 1}`" class="gallery-image" />
          </div>

          <button class="gallery-nav gallery-next" v-if="images.length > 1" @click="next">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <div class="gallery-dots" v-if="images.length > 1">
            <button
              v-for="(_, idx) in images"
              :key="idx"
              class="gallery-dot"
              :class="{ active: currentIndex === idx }"
              @click="currentIndex = idx"
            />
          </div>

          <span class="gallery-counter">{{ currentIndex + 1 }} / {{ images.length }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  images: { type: Array, default: () => [] },
  startIndex: { type: Number, default: 0 }
})

const emit = defineEmits(['update:visible'])

const currentIndex = ref(props.startIndex)

watch(() => props.startIndex, (val) => { currentIndex.value = val })
watch(() => props.visible, (val) => { if (val) currentIndex.value = props.startIndex })

function close() { emit('update:visible', false) }
function next() { currentIndex.value = (currentIndex.value + 1) % props.images.length }
function prev() { currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length }
</script>

<style scoped>
.image-gallery-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.gallery-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-close {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.gallery-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.gallery-nav:hover {
  background: rgba(255, 255, 255, 0.2);
}

.gallery-prev { left: 16px; }
.gallery-next { right: 16px; }

.gallery-image-wrapper {
  max-width: 85vw;
  max-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-image {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
  user-select: none;
}

.gallery-dots {
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.gallery-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 0;
}

.gallery-dot.active {
  background: var(--color-gold);
  width: 24px;
  border-radius: 4px;
}

.gallery-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-weight: 600;
}

.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition: opacity 0.25s ease;
}

.gallery-fade-enter-from,
.gallery-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .gallery-nav { display: none; }
  .gallery-image { max-width: 95vw; max-height: 80vh; }
}
</style>
