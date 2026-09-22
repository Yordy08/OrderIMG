import CopyItem from '../../models/CopyItem'
import { connectDb, objectId } from '../../utils/db'

export default defineEventHandler(async (event) => {
  await connectDb(); const query = getQuery(event); const filter: Record<string, unknown> = {}
  if (query.angleId) filter.angleId = objectId(String(query.angleId)); if (query.type) filter.type = query.type
  const items = await CopyItem.find(filter).sort({ type: 1, createdAt: -1 }).lean()
  return items.map(item => !['affirmative_title', 'question_title'].includes(item.type) ? { ...item, isUsed: false } : item)
})
