import Niche from '../../models/Niche'
import Angle from '../../models/Angle'
import CopyItem from '../../models/CopyItem'
import { connectDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  await connectDb()
  const body = await readBody(event)
  if (body?.confirmation !== 'ELIMINAR TODO') throw createError({ statusCode: 400, statusMessage: 'Confirmación inválida' })
  const [copies, angles, niches] = await Promise.all([CopyItem.deleteMany({}), Angle.deleteMany({}), Niche.deleteMany({})])
  return { ok: true, deleted: { copies: copies.deletedCount, angles: angles.deletedCount, niches: niches.deletedCount } }
})
