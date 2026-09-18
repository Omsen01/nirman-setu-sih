import mongoose from 'mongoose'

const portfolioSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    name: { type: String, required: true },
    description: String,
    photos: [String],
    completionDate: String,
    services: String,
    status: { type: String, enum: ['Previous', 'Ongoing'], default: 'Previous' },
    report: String,
    outcome: String,
  },
  { timestamps: true }
)

export default mongoose.model('Portfolio', portfolioSchema)