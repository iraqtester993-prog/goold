<template>
  <div class="categories-page">
    <div class="container">

      <div class="page-header">
        <h1 class="page-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          التصنيفات
        </h1>
      </div>

      <div class="categories-grid">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="`/category/${category.slug}`"
          class="category-card"
        >
          <div class="category-icon-wrap">
            <span class="category-emoji">{{ category.icon }}</span>
          </div>
          <h3 class="category-name">{{ category.name }}</h3>
          <span class="category-count">{{ getCategoryCount(category.id) }} منتج</span>
          <div class="category-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()
const categories = productStore.categories

function getCategoryCount(categoryId) {
  return productStore.getProductsByCategory(categoryId).length
}
</script>

<style scoped>
.categories-page {
  padding: 24px 0 48px;
}

.page-header {
  margin-bottom: 28px;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--text-primary);
  margin: 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 36px 20px 28px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all var(--transition-normal);
}

.category-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: var(--radius-xl);
  padding: 1px;
  background: linear-gradient(135deg, transparent, transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: background var(--transition-normal);
  pointer-events: none;
}

.category-card:hover {
  transform: translateY(-6px);
  border-color: transparent;
  box-shadow: 0 8px 32px rgba(212, 175, 55, 0.15), var(--shadow-lg);
}

.category-card:hover::before {
  background: linear-gradient(135deg, var(--color-gold), rgba(212, 175, 55, 0.3));
}

.category-icon-wrap {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 175, 55, 0.08);
  border-radius: var(--radius-lg);
  margin-bottom: 16px;
  transition: all var(--transition-normal);
}

.category-card:hover .category-icon-wrap {
  background: rgba(212, 175, 55, 0.15);
  transform: scale(1.08);
}

.category-emoji {
  font-size: 2.4rem;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 6px;
  transition: color var(--transition-fast);
}

.category-card:hover .category-name {
  color: var(--color-gold);
}

.category-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
  margin-bottom: 12px;
}

.category-arrow {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-input);
  border-radius: var(--radius-full);
  color: var(--text-muted);
  opacity: 0;
  transform: translateX(-8px);
  transition: all var(--transition-fast);
}

.category-card:hover .category-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--color-gold);
  background: rgba(212, 175, 55, 0.1);
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .category-card {
    padding: 28px 16px 22px;
  }
  .category-icon-wrap {
    width: 64px;
    height: 64px;
  }
  .category-emoji {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .category-card {
    padding: 24px 12px 20px;
  }
}
</style>
