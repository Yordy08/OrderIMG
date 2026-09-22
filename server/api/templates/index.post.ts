import Template from '../../models/Template'
import { connectDb } from '../../utils/db'
import { requiredString } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  await connectDb(); const body = await readBody(event); const html = requiredString(body?.html, 'El HTML')
  if (html.length > 500000) throw createError({ statusCode: 400, statusMessage: 'La plantilla supera el límite permitido' })
  await Template.updateMany({}, { $set: { isActive: false } })
  return Template.create({ name: requiredString(body?.name || 'Plantilla principal', 'El nombre'), html, isActive: true })
})
