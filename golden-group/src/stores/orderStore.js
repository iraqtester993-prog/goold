import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('orders', () => {
  const orders = ref([])
  const loading = ref(false)

  function createOrder(orderData) {
    const order = {
      id: Date.now(),
      ...orderData,
      status: 'pending',
      statusLabel: 'قيد الانتظار',
      createdAt: new Date().toISOString(),
      items: [...orderData.items]
    }
    orders.value.unshift(order)
    return order
  }

  function getOrder(id) {
    return orders.value.find(o => o.id === parseInt(id))
  }

  return { orders, loading, createOrder, getOrder }
})
