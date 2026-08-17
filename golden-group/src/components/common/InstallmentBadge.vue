<template>
  <span class="installment-badge" :class="{ compact }">
    <svg v-if="!compact" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="1" y="4" width="22" height="16" rx="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
    <span>قسط من {{ formatCurrency(monthlyPayment) }}/شهر</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { useCurrency } from '../../composables/useCurrency'

const props = defineProps({
  price: { type: Number, required: true },
  months: { type: Number, default: 3 },
  compact: { type: Boolean, default: false }
})

const { formatCurrency } = useCurrency()

const monthlyPayment = computed(() => {
  return Math.ceil(props.price / props.months)
})
</script>

<style scoped>
.installment-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
}

.installment-badge.compact {
  padding: 2px 8px;
  font-size: 0.7rem;
}
</style>
