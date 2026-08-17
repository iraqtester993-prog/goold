export function useInstallment() {
  function calculateInstallment(price, months, interestRate = 0) {
    const totalWithInterest = price * (1 + interestRate / 100)
    const monthlyPayment = Math.ceil(totalWithInterest / months)
    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - price

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      interestRate,
      months
    }
  }

  function getInstallmentOptions(price) {
    return [
      { ...calculateInstallment(price, 3, 0), label: '3 أشهر بدون فوائد' },
      { ...calculateInstallment(price, 6, 10), label: '6 أشهر مع فائدة 10%' },
      { ...calculateInstallment(price, 12, 15), label: '12 شهر مع فائدة 15%' }
    ]
  }

  return { calculateInstallment, getInstallmentOptions }
}
