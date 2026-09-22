import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  nicheId: { type: mongoose.Schema.Types.ObjectId, ref: 'Niche', required: true, index: true },
  code: { type: String, required: true, trim: true, maxlength: 20 },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  riskLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'EXTREME'], default: 'MEDIUM', index: true },
  description: { type: String, default: '', trim: true, maxlength: 500 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.models.Angle || mongoose.model('Angle', schema)
