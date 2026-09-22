import CopyItem from '../../../models/CopyItem'
import { connectDb, objectId } from '../../../utils/db'

export default defineEventHandler(async (event) => { await connectDb(); const angleId = objectId(getRouterParam(event, 'id')!); await CopyItem.updateMany({ angleId }, { $set: { isUsed: false } }); return { ok: true } })
