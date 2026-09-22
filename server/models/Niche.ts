import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, default: '', trim: true, maxlength: 300 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.models.Niche || mongoose.model('Niche', schema)
