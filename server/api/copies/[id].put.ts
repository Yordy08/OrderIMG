import CopyItem from '../../models/CopyItem'
import { connectDb, objectId } from '../../utils/db'
import { categories, requiredString } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  await connectDb(); const body = await readBody(event); const id = objectId(getRouterParam(event, 'id')!); const type = requiredString(body?.type, 'El tipo')
  if (!categories.includes(type as typeof categories[number])) throw createError({ statusCode: 400, statusMessage: 'Tipo inválido' })
  const update: Record<string, unknown> = { type, text: requiredString(body?.text, 'El texto') }
  if (['affirmative_title', 'question_title'].includes(type) && typeof body?.isUsed === 'boolean') update.isUsed = body.isUsed
  else update.isUsed = false
  const item = await CopyItem.findByIdAndUpdate(id, update, { new: true, runValidators: true })
  if (!item) throw createError({ statusCode: 404, statusMessage: 'Copy no encontrado' }); return item
})
