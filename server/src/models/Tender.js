import mongoose from 'mongoose'

const tenderSchema = new mongoose.Schema(
  {
    tenderId: { type: String, unique: true },
    title: { type: String, required: true },
    department: String,
    location: String,
    value: String,
    deadline: String,
    published: String,
    category: String,
    status: { type: String, default: 'Open' },
    description: String,
    eligibility: [{ item: String, met: Boolean }],
  },
  { timestamps: true }
)

export default mongoose.model('Tender', tenderSchema)