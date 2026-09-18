import mongoose from 'mongoose'

const serviceRequestSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
    category: { type: String, enum: ['railway', 'road', 'water', 'residential'], required: true },
    requirement: { type: String, required: true },
    location: { type: String, required: true },
    requiredDate: { type: String },
    description: { type: String },
    photos: [String],
    documents: [String],
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Accepted', 'In Progress', 'Completed', 'Rejected'],
      default: 'Submitted',
    },
  },
  { timestamps: true }
)

export default mongoose.model('ServiceRequest', serviceRequestSchema)