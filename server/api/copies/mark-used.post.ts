import CopyItem from '../../models/CopyItem'
import { connectDb, objectId } from '../../utils/db'

export default defineEventHandler(async (event) => {
  await connectDb(); const body = await readBody(event); if (!Array.isArray(body?.ids) || !body.ids.length) throw createError({ statusCode: 400, statusMessage: 'Debes enviar ids' })
  const ids = body.ids.map((id: unknown) => objectId(String(id))); await CopyItem.updateMany({ _id: { $in: ids }, type: { $in: ['affirmative_title', 'question_title'] } }, { $set: { isUsed: true }, $inc: { timesUsed: 1 } }); return { ok: true }
})
