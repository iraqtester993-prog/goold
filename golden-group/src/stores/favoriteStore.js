import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoriteStore = defineStore('favorites', () => {
  const items = ref(JSON.parse(localStorage.getItem('golden-age-favorites') || '[]'))

  const count = computed(() => items.value.length)

  function isFavorite(productId) {
    return items.value.includes(productId)
  }

  function toggle(productId) {
    if (isFavorite(productId)) {
      items.value = items.value.filter(id => id !== productId)
    } else {
      items.value.push(productId)
    }
    save()
  }

  function add(productId) {
    if (!isFavorite(productId)) {
      items.value.push(productId)
      save()
    }
  }

  function remove(productId) {
    items.value = items.value.filter(id => id !== productId)
    save()
  }

  function save() {
    localStorage.setItem('golden-age-favorites', JSON.stringify(items.value))
  }

  return { items, count, isFavorite, toggle, add, remove }
})
