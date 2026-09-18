import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    kind: { type: String, enum: ['customer', 'professional', 'government', 'corporate'], default: 'customer' },
    client: String,
    location: String,
    description: String,
    startDate: String,
    expectedDate: String,
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Under Review', 'In Progress', 'Inspection', 'Completed', 'Rejected'],
      default: 'In Progress',
    },
    team: [String],
    documents: [String],
    photos: [String],
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)