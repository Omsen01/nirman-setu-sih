import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema(
  {
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    applicantName: String,
    company: String,
    tender: { type: mongoose.Schema.Types.ObjectId, ref: 'Tender', required: true },
    tenderId: String,
    applicationDate: { type: String, default: () => new Date().toISOString().slice(0, 10) },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Selected', 'Rejected', 'Inspection Pending', 'Inspection Completed'],
      default: 'Submitted',
    },
    documents: [String],
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('TenderApplication', applicationSchema)