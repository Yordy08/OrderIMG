import Niche from '../../models/Niche'
import Angle from '../../models/Angle'
import CopyItem from '../../models/CopyItem'
import { connectDb } from '../../utils/db'
import { parseBankSource } from '../../utils/parseBank'

const nicheNames: Record<string, string> = { dia: 'Diabetes', art: 'Articulaciones', pro: 'Próstata' }
const riskMap: Record<string, string> = { bajo: 'LOW', 'bajo-medio': 'LOW', medio: 'MEDIUM', 'medio-alto': 'HIGH', alto: 'EXTREME' }
const types: Record<string, string> = { afirm: 'affirmative_title', preg: 'question_title', val: 'validation', ben: 'benefit', promo: 'promo', cta: 'cta', news: 'news' }

export default defineEventHandler(async (event) => {
  await connectDb(); const body = await readBody(event); const bank = parseBankSource(String(body?.source || '')); const niches: Record<string, any> = {}; let components = 0
  for (const [key, name] of Object.entries(nicheNames)) niches[key] = await Niche.findOneAndUpdate({ name }, { $setOnInsert: { name, description: `Banco de copy para ${name}`, isActive: true } }, { upsert: true, new: true })
  for (const raw of bank) {
    const niche = niches[raw.niche]; if (!niche) continue
    const angle = await Angle.findOneAndUpdate({ nicheId: niche._id, name: raw.name }, { $set: { code: raw.id, riskLevel: riskMap[raw.risk || ''] || 'MEDIUM', description: raw.why || '' }, $setOnInsert: { nicheId: niche._id, isActive: true } }, { upsert: true, new: true })
    const operations: any[] = []
    for (const [field, type] of Object.entries(types)) for (const text of raw[field as keyof typeof raw] || []) operations.push({ updateOne: { filter: { angleId: angle._id, type, text }, update: { $setOnInsert: { angleId: angle._id, type, text, isUsed: false, timesUsed: 0 } }, upsert: true } })
    if (operations.length) components += (await CopyItem.bulkWrite(operations, { ordered: false })).upsertedCount || 0
  }
  return { niches: Object.keys(niches).length, angles: bank.length, components }
})
