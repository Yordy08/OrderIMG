import Niche from '../../models/Niche'
import Angle from '../../models/Angle'
import CopyItem from '../../models/CopyItem'
import { connectDb, objectId } from '../../utils/db'

export default defineEventHandler(async (event) => {
  await connectDb(); const id = objectId(getRouterParam(event, 'id')!)
  const angles = await Angle.find({ nicheId: id }).select('_id').lean(); await CopyItem.deleteMany({ angleId: { $in: angles.map(x => x._id) } }); await Angle.deleteMany({ nicheId: id })
  const result = await Niche.findByIdAndDelete(id); if (!result) throw createError({ statusCode: 404, statusMessage: 'Nicho no encontrado' }); return { ok: true }
})
