import CopyItem from '../models/CopyItem'
import { connectDb } from '../utils/db'

export default defineEventHandler(async () => {
  await connectDb()
  const [totals, byAngle] = await Promise.all([
    CopyItem.aggregate([{ $group: { _id: null, components: { $sum: 1 }, used: { $sum: { $cond: ['$isUsed', 1, 0] } }, timesUsed: { $sum: '$timesUsed' } } }]),
    CopyItem.aggregate([{ $group: { _id: '$angleId', components: { $sum: 1 }, used: { $sum: { $cond: ['$isUsed', 1, 0] } }, timesUsed: { $sum: '$timesUsed' } } }, { $lookup: { from: 'angles', localField: '_id', foreignField: '_id', as: 'angle' } }, { $unwind: '$angle' }, { $project: { _id: 0, angleId: '$_id', name: '$angle.name', components: 1, used: 1, timesUsed: 1 } }, { $sort: { timesUsed: -1 } }])
  ])
  return { totals: totals[0] || { components: 0, used: 0, timesUsed: 0 }, byAngle }
})
