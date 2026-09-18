import mongoose from 'mongoose'

const workerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    emoji: { type: String, default: '👷' },
    header: { type: String, enum: ['orange', 'teal', 'gold', 'blue'], default: 'orange' },
    avatarBg: { type: String, default: 'orange' },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    exp: { type: Number, default: 1 },
    location: { type: String, default: '' },
    verified: { type: Boolean, default: false },
    topRated: { type: Boolean, default: false },
    skills: [String],
    about: String,
    available: { type: Boolean, default: true },
    projectsCompleted: { type: Number, default: 0 },
    languages: [String],
    category: { type: String, enum: ['railway', 'road', 'water', 'residential', 'general'], default: 'general' },
    portfolio: [
      {
        title: String,
        description: String,
        photos: [String],
        completionDate: String,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Worker', workerSchema)