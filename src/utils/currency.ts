export const toCurrency = (value: number, options?: { suffix?: boolean }): string => {
  if (isNaN(value)) {
    return ''
  }

  const style = options?.suffix ? 'currency' : 'decimal'

  var formatter = new Intl.NumberFormat('pt-BR', {
    style: style,
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return formatter.format(value)
}
