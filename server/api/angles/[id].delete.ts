import Angle from '../../models/Angle'
import CopyItem from '../../models/CopyItem'
import { connectDb, objectId } from '../../utils/db'

export default defineEventHandler(async (event) => {
  await connectDb(); const id = objectId(getRouterParam(event, 'id')!); const result = await Angle.findByIdAndDelete(id)
  if (!result) throw createError({ statusCode: 404, statusMessage: 'Ángulo no encontrado' }); await CopyItem.deleteMany({ angleId: id }); return { ok: true }
})
