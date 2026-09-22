import Angle from '../../models/Angle'
import { connectDb, objectId } from '../../utils/db'

export default defineEventHandler(async (event) => {
  await connectDb(); const query = getQuery(event); const filter: Record<string, unknown> = {}
  if (query.nicheId) filter.nicheId = objectId(String(query.nicheId)); if (query.active === 'true') filter.isActive = true
  return Angle.find(filter).populate('nicheId', 'name').sort({ createdAt: -1 }).lean()
})
