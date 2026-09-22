import vm from 'node:vm'

export type BankAngle = { id: string; niche: string; name: string; risk?: string; why?: string; afirm?: string[]; preg?: string[]; val?: string[]; ben?: string[]; promo?: string[]; cta?: string[] }

export function parseBankSource(source: string): BankAngle[] {
  const marker = source.indexOf('ANG.push')
  if (marker < 0) throw createError({ statusCode: 400, statusMessage: 'No se encontró una estructura ANG.push en el HTML' })
  const context: { ANG: BankAngle[]; window: Record<string, unknown> } = { ANG: [], window: {} }
  try {
    const end = source.indexOf('</script>', marker) > 0 ? source.indexOf('</script>', marker) : source.length
    const script = source.slice(marker, end)
    const dataOnly = script.indexOf('(function(){') >= 0 ? script.slice(0, script.indexOf('(function(){')) : script
    vm.runInNewContext(dataOnly, context, { timeout: 3000 })
  } catch { throw createError({ statusCode: 400, statusMessage: 'El banco HTML no tiene una estructura ANG válida' }) }
  return context.ANG.filter(item => item?.id && item?.niche && item?.name)
}
