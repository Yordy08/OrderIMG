import mongoose from 'mongoose'

type MongooseCache = { connection: Promise<typeof mongoose> | null }
const globalMongoose = globalThis as typeof globalThis & { __copyLabMongoose?: MongooseCache }
const cache = globalMongoose.__copyLabMongoose || (globalMongoose.__copyLabMongoose = { connection: null })

export async function connectDb() {
  if (mongoose.connection.readyState === 1) return mongoose
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error de conexión a MongoDB Atlas',
      data: { error: 'Error de conexión a MongoDB Atlas', detail: 'La variable MONGODB_URI no está definida.' }
    })
  }
  if (!cache.connection) {
    cache.connection = mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
      .then(connection => { console.log('[MongoDB Atlas] Conexión establecida'); return connection })
      .catch(error => {
        cache.connection = null
        const detail = error instanceof Error ? error.message : String(error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Error de conexión a MongoDB Atlas',
          data: { error: 'Error de conexión a MongoDB Atlas', detail }
        })
      })
  }
  return await cache.connection
}

export function objectId(value: string) {
  if (!mongoose.isValidObjectId(value)) throw createError({ statusCode: 400, statusMessage: 'Identificador inválido' })
  return new mongoose.Types.ObjectId(value)
}
