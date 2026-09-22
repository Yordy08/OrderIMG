import mongoose from 'mongoose'

let connection: Promise<typeof mongoose> | null = null

export async function connectDb() {
  if (mongoose.connection.readyState === 1) return mongoose
  if (!connection) {
    const config = useRuntimeConfig()
    connection = mongoose.connect(config.mongodbUri as string, { serverSelectionTimeoutMS: 5000 })
  }
  try { return await connection } catch (error) { connection = null; throw createError({ statusCode: 503, statusMessage: 'No se pudo conectar con MongoDB', cause: error }) }
}

export function objectId(value: string) {
  if (!mongoose.isValidObjectId(value)) throw createError({ statusCode: 400, statusMessage: 'Identificador inválido' })
  return new mongoose.Types.ObjectId(value)
}
