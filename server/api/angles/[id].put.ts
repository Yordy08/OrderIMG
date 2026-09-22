import Angle from '../../models/Angle'
import { connectDb, objectId } from '../../utils/db'
import { booleanValue, requiredString, riskLevels } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  await connectDb(); const body = await readBody(event); const id = objectId(getRouterParam(event, 'id')!)
  if (!riskLevels.includes(body?.riskLevel)) throw createError({ statusCode: 400, statusMessage: 'Nivel de riesgo inválido' })
  const update: Record<string, unknown> = { code: requiredString(body?.code, 'El código'), name: requiredString(body?.name, 'El nombre'), riskLevel: body.riskLevel, description: body?.description || '', isActive: booleanValue(body?.isActive) }
  if (body?.nicheId) update.nicheId = objectId(String(body.nicheId))
  const item = await Angle.findByIdAndUpdate(id, update, { new: true, runValidators: true }).populate('nicheId', 'name')
  if (!item) throw createError({ statusCode: 404, statusMessage: 'Ángulo no encontrado' }); return item
})
