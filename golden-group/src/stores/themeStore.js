import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref('dark')

  function initTheme() {
    const saved = localStorage.getItem('golden-age-theme')
    if (saved) {
      currentTheme.value = saved
    } else {
      const hour = new Date().getHours()
      currentTheme.value = (hour >= 6 && hour < 18) ? 'light' : 'dark'
    }
    applyTheme()
  }

  function toggleTheme() {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('golden-age-theme', currentTheme.value)
    applyTheme()
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme.value)
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      currentTheme.value === 'dark' ? '#0a1628' : '#ffffff'
    )
  }

  return { currentTheme, initTheme, toggleTheme }
})
