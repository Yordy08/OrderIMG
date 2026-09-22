import { parseBankSource } from '../../utils/parseBank'

export default defineEventHandler(async (event) => {
  const body = await readBody(event); const bank = parseBankSource(String(body?.source || ''))
  const types: Record<string, string> = { afirm: 'Título afirmativo', preg: 'Título pregunta', val: 'Validación', ben: 'Beneficio', promo: 'Promoción', cta: 'CTA', news: 'Noticia' }
  return { angles: bank.map(item => ({ code: item.id, niche: item.niche, name: item.name, counts: Object.fromEntries(Object.entries(types).map(([key, label]) => [label, (item[key as keyof typeof item] as string[] || []).length])) })) }
})
