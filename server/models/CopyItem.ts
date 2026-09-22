import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  angleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Angle', required: true, index: true },
  type: { type: String, enum: ['affirmative_title', 'question_title', 'validation', 'benefit', 'promo', 'cta', 'news'], required: true, index: true },
  text: { type: String, required: true, trim: true, maxlength: 500 },
  timesUsed: { type: Number, default: 0, min: 0 },
  isUsed: { type: Boolean, default: false },
}, { timestamps: true, collection: 'copycomponents' })

export default mongoose.models.CopyComponent || mongoose.model('CopyComponent', schema)
