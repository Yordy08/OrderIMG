import CopyItem from '../../models/CopyItem'
import { connectDb, objectId } from '../../utils/db'

export default defineEventHandler(async (event) => { await connectDb(); const result = await CopyItem.findByIdAndDelete(objectId(getRouterParam(event, 'id')!)); if (!result) throw createError({ statusCode: 404, statusMessage: 'Copy no encontrado' }); return { ok: true } })
