import Niche from '../../models/Niche'
import { connectDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  await connectDb()
  const query = getQuery(event)
  return Niche.find(query.active === 'true' ? { isActive: true } : {}).sort({ name: 1 }).lean()
})
