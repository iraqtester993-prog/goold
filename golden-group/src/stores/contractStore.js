import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useContractStore = defineStore('contracts', () => {
  const contracts = ref([
    {
      id: 'CON-2026-001',
      productId: 1,
      productName: 'Samsung Galaxy S24 Ultra',
      productImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
      contractValue: 1500000,
      downPayment: 500000,
      remainingAmount: 1000000,
      totalInstallments: 12,
      paidInstallments: 6,
      remainingInstallments: 6,
      monthlyPayment: 91667,
      interestRate: 15,
      startDate: '2025-12-01',
      nextPaymentDate: '2026-07-01',
      endDate: '2026-12-01',
      status: 'active',
      statusLabel: 'نشط',
      employerName: 'وزارة التربية',
      employerCode: 'GOV-EDU-001'
    },
    {
      id: 'CON-2025-089',
      productId: 2,
      productName: 'iPhone 15 Pro Max',
      productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
      contractValue: 1800000,
      downPayment: 600000,
      remainingAmount: 0,
      totalInstallments: 6,
      paidInstallments: 6,
      remainingInstallments: 0,
      monthlyPayment: 200000,
      interestRate: 10,
      startDate: '2025-06-01',
      nextPaymentDate: null,
      endDate: '2025-12-01',
      status: 'completed',
      statusLabel: 'مكتمل',
      employerName: 'وزارة التربية',
      employerCode: 'GOV-EDU-001'
    }
  ])

  const loading = ref(false)

  const activeContracts = computed(() => contracts.value.filter(c => c.status === 'active'))
  const completedContracts = computed(() => contracts.value.filter(c => c.status === 'completed'))

  function getContract(id) {
    return contracts.value.find(c => c.id === id)
  }

  async function fetchContracts() {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 500))
    } finally {
      loading.value = false
    }
  }

  return { contracts, loading, activeContracts, completedContracts, getContract, fetchContracts }
})
