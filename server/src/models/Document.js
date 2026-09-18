import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    category: { type: String, default: 'General' },
    project: String,
    url: String,
    notes: String,
  },
  { timestamps: true }
)

export default mongoose.model('Document', documentSchema)