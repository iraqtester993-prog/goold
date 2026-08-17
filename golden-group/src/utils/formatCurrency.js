export function formatCurrency(amount) {
  return new Intl.NumberFormat('ar-IQ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount) + ' د.ع'
}

export function formatNumber(num) {
  return new Intl.NumberFormat('ar-IQ').format(num)
}
