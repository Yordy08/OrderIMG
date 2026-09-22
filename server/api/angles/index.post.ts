import Angle from '../../models/Angle'
import Niche from '../../models/Niche'
import { connectDb, objectId } from '../../utils/db'
import { booleanValue, requiredString, riskLevels } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  await connectDb(); const body = await readBody(event); const nicheId = objectId(String(body?.nicheId))
  if (!await Niche.exists({ _id: nicheId })) throw createError({ statusCode: 400, statusMessage: 'El nicho no existe' })
  if (!riskLevels.includes(body?.riskLevel)) throw createError({ statusCode: 400, statusMessage: 'Nivel de riesgo inválido' })
  return Angle.create({ nicheId, code: requiredString(body?.code, 'El código'), name: requiredString(body?.name, 'El nombre'), riskLevel: body.riskLevel, description: body?.description || '', isActive: booleanValue(body?.isActive) })
})
