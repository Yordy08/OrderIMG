export const categories = ['affirmative_title', 'question_title', 'validation', 'benefit', 'promo', 'cta', 'news'] as const
export const riskLevels = ['LOW', 'MEDIUM', 'HIGH', 'EXTREME'] as const

export function requiredString(value: unknown, field: string) {
  if (typeof value !== 'string' || !value.trim()) throw createError({ statusCode: 400, statusMessage: `${field} es obligatorio` })
  return value.trim()
}

export function booleanValue(value: unknown, fallback = true) { return typeof value === 'boolean' ? value : fallback }
