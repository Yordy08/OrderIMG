import CopyItem from '../../models/CopyItem'
import Angle from '../../models/Angle'
import { connectDb, objectId } from '../../utils/db'
import { categories, requiredString } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  await connectDb()
  const body = await readBody(event)
  const angleId = objectId(String(body?.angleId))
  if (!await Angle.exists({ _id: angleId })) throw createError({ statusCode: 400, statusMessage: 'El ángulo no existe' })
  if (!Array.isArray(body?.items) || body.items.length === 0 || body.items.length > 2000) throw createError({ statusCode: 400, statusMessage: 'Debes enviar entre 1 y 2000 frases' })
  const clean = body.items.map((item: any) => ({ type: requiredString(item?.type, 'El tipo'), text: requiredString(item?.text, 'El texto').slice(0, 500) })).filter((item: any) => categories.includes(item.type))
  if (!clean.length) throw createError({ statusCode: 400, statusMessage: 'No hay componentes válidos para importar' })
  const operations = clean.map((item: any) => ({ updateOne: { filter: { angleId, type: item.type, text: item.text }, update: { $setOnInsert: { angleId, type: item.type, text: item.text, isUsed: false, timesUsed: 0 } }, upsert: true } }))
  const result = await CopyItem.bulkWrite(operations, { ordered: false })
  return { imported: result.upsertedCount || 0, duplicates: clean.length - (result.upsertedCount || 0), received: clean.length }
})
