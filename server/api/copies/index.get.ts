import CopyItem from '../../models/CopyItem'
import { connectDb, objectId } from '../../utils/db'

export default defineEventHandler(async (event) => {
  await connectDb(); const query = getQuery(event); const filter: Record<string, unknown> = {}
  if (query.angleId) filter.angleId = objectId(String(query.angleId)); if (query.type) filter.type = query.type
  return CopyItem.find(filter).sort({ type: 1, createdAt: -1 }).lean()
})
