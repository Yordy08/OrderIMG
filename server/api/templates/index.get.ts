import Template from '../../models/Template'
import { connectDb } from '../../utils/db'

export default defineEventHandler(async () => { await connectDb(); return Template.find({ isActive: true }).sort({ updatedAt: -1 }).lean() })
