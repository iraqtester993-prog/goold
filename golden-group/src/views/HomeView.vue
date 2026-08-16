<template>
  <div class="home" :class="{ light: !isDark }">
    <div class="header">
      <div class="header-right">
        <button class="theme-btn" @click="toggleTheme">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
      <h1 class="title">العصر الذهبي</h1>
      <div class="header-left">
        <button class="notif-btn" @click="notifications">
          🔔
        </button>
      </div>
    </div>

    <div class="content">
      <div class="welcome">
        <h2>مرحباً بك في العصر الذهبي</h2>
        <p>تصفح أحدث المنتجات والعروض</p>
      </div>

      <div class="categories">
        <div class="cat-card" v-for="cat in categories" :key="cat.name">
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.name }}</span>
        </div>
      </div>

      <div class="section">
        <h3>أحدث المنتجات</h3>
        <div class="products">
          <div class="product-card" v-for="p in products" :key="p.name">
            <div class="product-img">{{ p.icon }}</div>
            <div class="product-info">
              <h4>{{ p.name }}</h4>
              <p class="price">{{ p.price }} د.ع</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { isDark, toggleTheme } = useTheme()

const notifications = () => {}

const categories = ref([
  { name: 'هواتف', icon: '📱' },
  { name: 'لابتوب', icon: '💻' },
  { name: 'ساعات', icon: '⌚' },
  { name: 'سماعات', icon: '🎧' }
])

const products = ref([
  { name: 'آيفون 15 برو ماكس', price: '1,500,000', icon: '📱' },
  { name: 'سامسونج جالكسي S24', price: '800,000', icon: '📱' },
  { name: 'ماك بوك برو M3', price: '2,200,000', icon: '💻' },
  { name: 'آبل ووتش السلسلة 9', price: '450,000', icon: '⌚' }
])
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #0a0f1d;
}

.home.light {
  background: #f5f0e6;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #0d1225;
  border-bottom: 1px solid #1a1a3a;
}

.light .header {
  background: #ede5d0;
  border-bottom: 1px solid #d4c9a8;
}

.header-right,
.header-left {
  width: 50px;
  display: flex;
  justify-content: center;
}

.theme-btn,
.notif-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  transition: background 0.3s;
}

.theme-btn:hover,
.notif-btn:hover {
  background: rgba(212, 175, 55, 0.15);
}

.title {
  color: #d4af37;
  font-size: 20px;
}

.light .title {
  color: #8B7332;
}

.content {
  padding: 20px;
}

.welcome {
  text-align: center;
  margin-bottom: 30px;
}

.welcome h2 {
  color: #d4af37;
  font-size: 22px;
  margin-bottom: 8px;
}

.light .welcome h2 {
  color: #8B7332;
}

.welcome p {
  color: #999;
  font-size: 14px;
}

.light .welcome p {
  color: #666;
}

.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 30px;
}

.cat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  background: #1a1a2e;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.light .cat-card {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.cat-card:hover {
  background: #252545;
}

.light .cat-card:hover {
  background: #f0f0f0;
}

.cat-icon {
  font-size: 28px;
}

.cat-name {
  color: #ccc;
  font-size: 12px;
}

.light .cat-name {
  color: #555;
}

.section h3 {
  color: #d4af37;
  font-size: 18px;
  margin-bottom: 16px;
}

.light .section h3 {
  color: #8B7332;
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding-bottom: 30px;
}

.product-card {
  background: #1a1a2e;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.light .product-card {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-img {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  background: #12122a;
}

.light .product-img {
  background: #f5f0e6;
}

.product-info {
  padding: 12px;
}

.product-info h4 {
  color: #fff;
  font-size: 14px;
  margin-bottom: 6px;
}

.light .product-info h4 {
  color: #333;
}

.price {
  color: #d4af37;
  font-weight: bold;
  font-size: 13px;
}

.light .price {
  color: #8B7332;
}
</style>
