import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('golden-age-cart') || '[]'))
  const isOpen = ref(false)

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const totalSavings = computed(() =>
    items.value.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
  )

  function addItem(product, quantity = 1) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity,
        installmentOptions: product.installmentOptions
      })
    }
    saveCart()
    isOpen.value = true
  }

  function removeItem(productId) {
    items.value = items.value.filter(i => i.id !== productId)
    saveCart()
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(i => i.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  function clearCart() {
    items.value = []
    saveCart()
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  function saveCart() {
    localStorage.setItem('golden-age-cart', JSON.stringify(items.value))
  }

  return {
    items, isOpen, totalItems, totalPrice, totalSavings,
    addItem, removeItem, updateQuantity, clearCart, toggleCart
  }
})
