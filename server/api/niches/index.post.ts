import Niche from '../../models/Niche'
import { connectDb } from '../../utils/db'
import { booleanValue, requiredString } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  await connectDb(); const body = await readBody(event)
  return Niche.create({ name: requiredString(body?.name, 'El nombre'), description: body?.description || '', isActive: booleanValue(body?.isActive) })
})
