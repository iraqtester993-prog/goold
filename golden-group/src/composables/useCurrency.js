import { computed } from 'vue'

export function useCurrency() {
  function formatCurrency(amount) {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount) + ' د.ع'
  }

  function formatCurrencyShort(amount) {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + ' مليون د.ع'
    }
    if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + ' ألف د.ع'
    }
    return formatCurrency(amount)
  }

  function parseCurrency(str) {
    return parseInt(str.replace(/[^\d]/g, '')) || 0
  }

  return { formatCurrency, formatCurrencyShort, parseCurrency }
}
