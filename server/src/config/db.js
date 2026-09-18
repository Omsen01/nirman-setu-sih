import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nirman_setu'
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    console.log(`[db] connected: ${uri}`)
    return true
  } catch (err) {
    console.error('[db] connection failed:', err.message)
    return false
  }
}