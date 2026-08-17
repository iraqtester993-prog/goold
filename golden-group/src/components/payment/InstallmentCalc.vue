<template>
  <div class="installment-calc">
    <h3 class="calc-title">حاسبة الأقساط</h3>
    <div class="price-display">
      <span class="label">سعر المنتج</span>
      <span class="price">{{ formatCurrency(price) }}</span>
    </div>

    <div class="options">
      <button
        v-for="option in options"
        :key="option.months"
        class="option"
        :class="{ active: selected === option.months }"
        @click="selected = option.months"
      >
        <span class="months">{{ option.months }} شهر</span>
        <span class="monthly">{{ formatCurrency(option.monthlyPayment) }}/شهر</span>
        <span v-if="option.interest > 0" class="interest">فوائد {{ option.interest }}%</span>
        <span v-else class="no-interest">بدون فوائد</span>
      </button>
    </div>

    <div class="summary" v-if="selectedOption">
      <div class="summary-row">
        <span>القسط الشهري</span>
        <span class="gold">{{ formatCurrency(selectedOption.monthlyPayment) }}</span>
      </div>
      <div class="summary-row">
        <span>المدة</span>
        <span>{{ selectedOption.months }} شهر</span>
      </div>
      <div class="summary-row">
        <span>إجمالي المبلغ</span>
        <span>{{ formatCurrency(selectedOption.totalPayment) }}</span>
      </div>
      <div v-if="selectedOption.totalInterest > 0" class="summary-row interest-row">
        <span>الفائدة</span>
        <span>{{ formatCurrency(selectedOption.totalInterest) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCurrency } from '../../composables/useCurrency'
import { useInstallment } from '../../composables/useInstallment'

const props = defineProps({
  price: { type: Number, required: true }
})

const { formatCurrency } = useCurrency()
const { getInstallmentOptions } = useInstallment()

const selected = ref(3)
const options = computed(() => getInstallmentOptions(props.price))
const selectedOption = computed(() => options.value.find(o => o.months === selected.value))
</script>

<style scoped>
.installment-calc {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.calc-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.price-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.price-display .label {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.price-display .price {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-gold);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.option {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  background: var(--bg-input);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.option:hover {
  border-color: var(--border-color);
}

.option.active {
  border-color: var(--color-gold);
  background: rgba(212, 168, 67, 0.08);
}

.months {
  font-weight: 700;
  color: var(--text-primary);
  min-width: 60px;
}

.monthly {
  font-weight: 600;
  color: var(--color-gold);
}

.interest {
  font-size: 0.75rem;
  padding: 2px 8px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-radius: var(--radius-full);
}

.no-interest {
  font-size: 0.75rem;
  padding: 2px 8px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: var(--radius-full);
}

.summary {
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.summary-row.gold {
  font-weight: 700;
}

.interest-row {
  color: #ef4444;
}
</style>
