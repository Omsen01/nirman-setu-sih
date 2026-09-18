import mongoose from 'mongoose'

const diaryEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
    work: String,
    description: String,
    progress: String,
    notes: String,
    issues: String,
    materialsUsed: String,
    project: String,
  },
  { timestamps: true }
)

export default mongoose.model('DiaryEntry', diaryEntrySchema)