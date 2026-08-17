<template>
  <section class="brands-section">
    <h3 class="brands-title">الماركات</h3>
    <div class="brands-scroll">
      <div
        v-for="brand in brands"
        :key="brand.id"
        class="brand-item"
        @click="$router.push(`/category/${brand.slug}`)"
      >
        <div class="brand-card">
          <img :src="brand.image" :alt="brand.name" loading="lazy" />
          <div class="brand-overlay">
            <span class="brand-label">{{ brand.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const brands = [
  { id: 'samsung', name: 'Samsung', slug: 'phones', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop&auto=format' },
  { id: 'apple', name: 'Apple', slug: 'phones', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&auto=format' },
  { id: 'sony', name: 'Sony', slug: 'audio', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop&auto=format' },
  { id: 'dell', name: 'Dell', slug: 'laptops', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&h=300&fit=crop&auto=format' },
  { id: 'hp', name: 'HP', slug: 'laptops', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop&auto=format' },
  { id: 'lenovo', name: 'Lenovo', slug: 'laptops', image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=300&h=300&fit=crop&auto=format' }
]
</script>

<style scoped>
.brands-section { margin-bottom: 24px; }
.brands-title { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 14px; }
.brands-scroll { display: flex; gap: 14px; overflow-x: auto; scrollbar-width: none; padding: 4px 0; }
.brands-scroll::-webkit-scrollbar { display: none; }
.brand-item { flex-shrink: 0; cursor: pointer; transition: transform var(--transition-fast); }
.brand-item:active { transform: scale(0.96); }
.brand-card { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; position: relative; background: var(--bg-card); border: 2px solid var(--border-light); transition: all var(--transition-fast); }
.brand-item:active .brand-card { border-color: var(--color-gold); box-shadow: 0 0 0 3px rgba(212, 168, 67, 0.15); }
.brand-card img { width: 100%; height: 100%; object-fit: cover; }
.brand-overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.35); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity var(--transition-fast); }
.brand-item:active .brand-overlay { opacity: 1; }
.brand-label { color: #fff; font-size: 0.7rem; font-weight: 800; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4); font-family: 'Cairo', sans-serif; }
</style>
