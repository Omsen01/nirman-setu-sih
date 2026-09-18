import mongoose from 'mongoose'

const companySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    type: String,
    emoji: String,
    avatarBg: String,
    rating: Number,
    reviews: Number,
    exp: Number,
    location: String,
    verified: Boolean,
    description: String,
    services: [String],
    contact: {
      phone: String,
      email: String,
      website: String,
      address: String,
    },
    team: [
      {
        name: String,
        role: String,
        profession: String,
        experience: String,
        emoji: String,
      },
    ],
    licenses: [
      {
        title: String,
        number: String,
        issued: String,
        expiry: String,
        url: String,
        verified: Boolean,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Company', companySchema)