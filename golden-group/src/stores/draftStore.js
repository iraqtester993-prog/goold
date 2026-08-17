import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDeductionStore = defineStore('deductions', () => {
  const deductions = ref([
    {
      id: 'DED-2026-001',
      installmentId: 'INST-2026-006',
      contractId: 'CON-2026-001',
      amount: 91667,
      date: '2026-07-01',
      status: 'completed',
      statusLabel: 'تم التنفيذ',
      executor: 'وزارة التربية - قسم الرواتب',
      notes: 'استقطاع شهري - القسط السادس'
    },
    {
      id: 'DED-2026-002',
      installmentId: 'INST-2026-005',
      contractId: 'CON-2026-001',
      amount: 91667,
      date: '2026-06-01',
      status: 'completed',
      statusLabel: 'تم التنفيذ',
      executor: 'وزارة التربية - قسم الرواتب',
      notes: 'استقطاع شهري - القسط الخامس'
    },
    {
      id: 'DED-2026-003',
      installmentId: 'INST-2026-004',
      contractId: 'CON-2026-001',
      amount: 91667,
      date: '2026-05-01',
      status: 'completed',
      statusLabel: 'تم التنفيذ',
      executor: 'وزارة التربية - قسم الرواتب',
      notes: 'استقطاع شهري - القسط الرابع'
    },
    {
      id: 'DED-2026-004',
      installmentId: 'INST-2026-003',
      contractId: 'CON-2026-001',
      amount: 91667,
      date: '2026-04-01',
      status: 'completed',
      statusLabel: 'تم التنفيذ',
      executor: 'وزارة التربية - قسم الرواتب',
      notes: 'استقطاع شهري - القسط الثالث'
    },
    {
      id: 'DED-2026-005',
      installmentId: 'INST-2026-002',
      contractId: 'CON-2026-001',
      amount: 91667,
      date: '2026-03-01',
      status: 'completed',
      statusLabel: 'تم التنفيذ',
      executor: 'وزارة التربية - قسم الرواتب',
      notes: 'استقطاع شهري - القسط الثاني'
    },
    {
      id: 'DED-2026-006',
      installmentId: 'INST-2026-001',
      contractId: 'CON-2026-001',
      amount: 91667,
      date: '2026-02-01',
      status: 'completed',
      statusLabel: 'تم التنفيذ',
      executor: 'وزارة التربية - قسم الرواتب',
      notes: 'استقطاع شهري - القسط الأول'
    }
  ])

  const loading = ref(false)
  const totalDeducted = computed(() => deductions.value.reduce((sum, d) => sum + d.amount, 0))
  const lastDeduction = computed(() => deductions.value[0] || null)

  async function fetchDeductions() {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 400))
    } finally {
      loading.value = false
    }
  }

  return { deductions, loading, totalDeducted, lastDeduction, fetchDeductions }
})
