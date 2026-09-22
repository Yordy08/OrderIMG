import CopyItem from '../../models/CopyItem'
import Angle from '../../models/Angle'
import { connectDb, objectId } from '../../utils/db'
import { categories, requiredString } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  await connectDb(); const body = await readBody(event); const angleId = objectId(String(body?.angleId)); const type = requiredString(body?.type, 'El tipo')
  if (!categories.includes(type as typeof categories[number])) throw createError({ statusCode: 400, statusMessage: 'Tipo inválido' })
  if (!await Angle.exists({ _id: angleId })) throw createError({ statusCode: 400, statusMessage: 'El ángulo no existe' })
  return CopyItem.create({ angleId, type, text: requiredString(body?.text, 'El texto') })
})
