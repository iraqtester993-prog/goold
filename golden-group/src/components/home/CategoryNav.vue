<template>
  <section class="category-section">
    <h3 class="section-label">الأقسام</h3>
    <div class="category-scroll">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="category-chip"
        :class="{ active: activeCategory === cat.slug }"
        @click="selectCategory(cat.slug)"
      >
        <div class="cat-image">
          <img :src="cat.image" :alt="cat.name" loading="lazy" />
        </div>
        <span class="cat-name">{{ cat.name }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeCategory = ref(null)

const categories = [
  { id: 'phones', name: 'هواتف', slug: 'phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&auto=format' },
  { id: 'laptops', name: 'لابتوب', slug: 'laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop&auto=format' },
  { id: 'tablets', name: 'لوحات', slug: 'tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop&auto=format' },
  { id: 'audio', name: 'سماعات', slug: 'audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&auto=format' },
  { id: 'watches', name: 'ساعات', slug: 'watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&auto=format' },
  { id: 'accessories', name: 'ملحقات', slug: 'accessories', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop&auto=format' }
]

function selectCategory(slug) {
  activeCategory.value = activeCategory.value === slug ? null : slug
  router.push(`/category/${slug}`)
}
</script>

<style scoped>
.category-section { margin-bottom: 24px; }
.section-label { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; }
.category-scroll { display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none; padding: 2px 0; }
.category-scroll::-webkit-scrollbar { display: none; }
.category-chip { display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 72px; cursor: pointer; transition: all var(--transition-fast); }
.category-chip:active { transform: scale(0.95); }
.cat-image { width: 64px; height: 64px; border-radius: var(--radius-lg); overflow: hidden; border: 2px solid var(--border-light); background: var(--bg-card); transition: all var(--transition-fast); }
.category-chip:active .cat-image,
.category-chip.active .cat-image { border-color: var(--color-gold); box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.15); }
.cat-image img { width: 100%; height: 100%; object-fit: cover; }
.cat-name { font-size: 0.72rem; font-weight: 700; color: var(--text-secondary); text-align: center; }
.category-chip.active .cat-name { color: var(--color-gold); }
</style>
