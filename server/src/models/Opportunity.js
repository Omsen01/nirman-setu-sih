import mongoose from 'mongoose'

const opportunitySchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    title: { type: String, required: true },
    kind: { type: String, enum: ['Employment', 'Service', 'Project', 'Collaboration', 'Contract'], default: 'Service' },
    description: String,
    location: String,
    posted: { type: String, default: () => new Date().toISOString().slice(0, 10) },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Opportunity', opportunitySchema)