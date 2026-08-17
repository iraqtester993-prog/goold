<template>
  <div id="app" :data-theme="theme">
    <AppHeader v-if="!hideLayout" />
    <main class="main-content" :class="{ 'no-header': hideLayout }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <BottomNav v-if="!hideLayout" />
    <CartDrawer />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from './stores/themeStore'
import AppHeader from './components/layout/AppHeader.vue'
import BottomNav from './components/layout/BottomNav.vue'
import CartDrawer from './components/cart/CartDrawer.vue'

const route = useRoute()
const themeStore = useThemeStore()

const theme = computed(() => themeStore.currentTheme)
const hideLayout = computed(() =>
  ['splash', 'welcome', 'login', 'register'].includes(route.name)
)

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style>
.main-content {
  padding-top: 56px;
  padding-bottom: 72px;
  min-height: 100vh;
}

.main-content.no-header {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
