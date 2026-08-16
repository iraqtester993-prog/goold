import { ref, watch } from 'vue'

const isDark = ref(localStorage.getItem('theme') !== 'light')

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  const applyTheme = () => {
    if (isDark.value) {
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
    }
  }

  return { isDark, toggleTheme, applyTheme }
}
