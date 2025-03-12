type WeigthtSuffix = 'gram' | 'kilogram'
export const formatWeight = (weight: number, options?: { suffix?: WeigthtSuffix }) => {
  const style = options?.suffix ? 'unit' : 'decimal'

  return Intl.NumberFormat('pt-BR', {
    style: style,
    unit: options?.suffix,
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
  }).format(weight)
}
