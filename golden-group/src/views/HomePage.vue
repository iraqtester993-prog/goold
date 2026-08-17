<template>
  <div class="home-page">
    <div class="container">

      <!-- Hero Slider -->
      <HeroSlider />

      <!-- Brand Icons -->
      <CategoryIcons />

      <!-- Category Chips -->
      <CategoryNav />

      <!-- Featured Products -->
      <ProductRow
        title="عروض اليوم"
        :products="featuredProducts"
      />

      <!-- Best Sellers -->
      <ProductRow
        title="الأكثر مبيعاً"
        :products="bestSellers"
      />

      <!-- New Arrivals -->
      <ProductRow
        title="وصل حديثاً"
        :products="newProducts"
      />

      <!-- Discounted Products -->
      <ProductRow
        title="تخفيضات"
        :products="discountedProducts"
      />

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '../stores/productStore'
import HeroSlider from '../components/home/HeroSlider.vue'
import CategoryIcons from '../components/home/CategoryIcons.vue'
import CategoryNav from '../components/home/CategoryNav.vue'
import ProductRow from '../components/home/ProductRow.vue'

const productStore = useProductStore()

const featuredProducts = computed(() => productStore.featuredProducts.slice(0, 4))
const bestSellers = computed(() => productStore.bestSellers.slice(0, 4))
const newProducts = computed(() => productStore.newProducts.slice(0, 4))
const discountedProducts = computed(() =>
  productStore.products.filter(p => p.originalPrice > p.price).slice(0, 4)
)
</script>

<style scoped>
.home-page {
  padding: 12px 0 24px;
}
</style>
