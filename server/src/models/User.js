import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    pin: { type: String, select: false },
    address: { type: String, trim: true },
    otp: { type: String, select: false },
    otpExpires: { type: Date, select: false },
    role: { type: String, enum: ['customer', 'business'], default: null },
    subRole: { type: String, enum: [null, 'professional', 'government', 'corporate'], default: null },
    language: { type: String, default: 'en' },
    avatar: { type: String, default: '👤' },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)