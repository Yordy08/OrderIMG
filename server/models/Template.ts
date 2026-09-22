import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  html: { type: String, required: true, maxlength: 500000 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.models.CreativeTemplate || mongoose.model('CreativeTemplate', schema)
