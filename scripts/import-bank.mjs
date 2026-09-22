import fs from 'node:fs/promises'
import vm from 'node:vm'
import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI
if (!uri) throw new Error('MONGODB_URI no está configurada')

const source = await fs.readFile(new URL('../BancoCopy.html', import.meta.url), 'utf8')
const script = source.split('<script>')[1].split('</script>')[0]
const data = script.slice(0, script.indexOf('(function(){'))
const context = { ANG: [], window: {} }
vm.runInNewContext(data, context)

const nicheNames = { dia: 'Diabetes', art: 'Articulaciones', pro: 'Próstata' }
const riskMap = { bajo: 'LOW', 'bajo-medio': 'LOW', medio: 'MEDIUM', 'medio-alto': 'HIGH', alto: 'EXTREME' }
const Niche = mongoose.model('Niche', new mongoose.Schema({ name: String, description: String, isActive: Boolean }, { collection: 'niches' }))
const Angle = mongoose.model('Angle', new mongoose.Schema({ nicheId: mongoose.Schema.Types.ObjectId, code: String, name: String, riskLevel: String, description: String, isActive: Boolean }, { collection: 'angles' }))
const Copy = mongoose.model('CopyComponent', new mongoose.Schema({ angleId: mongoose.Schema.Types.ObjectId, type: String, text: String, isUsed: Boolean, timesUsed: Number }, { collection: 'copycomponents' }))

await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
const niches = {}
for (const [key, name] of Object.entries(nicheNames)) niches[key] = await Niche.findOneAndUpdate({ name }, { $setOnInsert: { name, description: `Banco de copy para ${name}`, isActive: true } }, { upsert: true, new: true })

const types = { afirm: 'affirmative_title', preg: 'question_title', val: 'validation', ben: 'benefit', promo: 'promo', cta: 'cta' }
let anglesProcessed = 0; let copiesCreated = 0
for (const raw of context.ANG) {
  const niche = niches[raw.niche]
  if (!niche) continue
  const angle = await Angle.findOneAndUpdate(
    { nicheId: niche._id, name: raw.name },
    { $set: { code: raw.id, name: raw.name, riskLevel: riskMap[raw.risk] || 'MEDIUM', description: raw.why || '' }, $setOnInsert: { nicheId: niche._id, isActive: true } },
    { upsert: true, new: true }
  )
  anglesProcessed++
  const operations = []
  for (const [field, type] of Object.entries(types)) {
    for (const text of raw[field] || []) {
      operations.push({ updateOne: { filter: { angleId: angle._id, type, text }, update: { $setOnInsert: { angleId: angle._id, type, text, isUsed: false, timesUsed: 0 } }, upsert: true } })
    }
  }
  if (operations.length) { const result = await Copy.bulkWrite(operations, { ordered: false }); copiesCreated += result.upsertedCount || 0 }
}
console.log(`Importación completada: ${Object.keys(niches).length} nichos, ${anglesProcessed} ángulos procesados y ${copiesCreated} componentes nuevos.`)
await mongoose.disconnect()
