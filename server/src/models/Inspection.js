import mongoose from 'mongoose'

const inspectionSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'TenderApplication' },
    projectName: String,
    location: String,
    inspectorName: String,
    organization: String,
    date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
    steps: [
      {
        name: String,
        completed: Boolean,
        notes: String,
      },
    ],
    photos: [String],
    report: { type: String },
    status: { type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
  },
  { timestamps: true }
)

export default mongoose.model('Inspection', inspectionSchema)