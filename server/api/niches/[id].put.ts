import Niche from '../../models/Niche'
import { connectDb, objectId } from '../../utils/db'
import { booleanValue, requiredString } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  await connectDb(); const body = await readBody(event); const id = objectId(getRouterParam(event, 'id')!)
  const item = await Niche.findByIdAndUpdate(id, { name: requiredString(body?.name, 'El nombre'), description: body?.description || '', isActive: booleanValue(body?.isActive) }, { new: true, runValidators: true })
  if (!item) throw createError({ statusCode: 404, statusMessage: 'Nicho no encontrado' }); return item
})
