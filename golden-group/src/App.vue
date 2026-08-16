<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'

const { applyTheme } = useTheme()

onMounted(() => {
  applyTheme()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
  background: #0a0f1d;
  color: #ffffff;
  direction: rtl;
}

body.light {
  background: #f5f0e6;
  color: #1a1a2e;
}
</style>
