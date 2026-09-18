import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { protect, signToken } from '../middleware/auth.js'
import { sendOtp, verifyOtp } from '../services/otpService.js'

const router = Router()

// POST /api/auth/register — create account with mobile + OTP
router.post('/register', async (req, res) => {
  try {
    const { name, mobile, email, pin, address } = req.body
    if (!name || !mobile) return res.status(400).json({ error: 'Name and mobile are required' })

    const exists = await User.findOne({ mobile })
    if (exists) return res.status(409).json({ error: 'An account with this mobile already exists. Please login.' })

    let pinHash
    if (pin) pinHash = await bcrypt.hash(String(pin), 10)

    const user = await User.create({ name, mobile, email, pin: pinHash, address })

    const { sent, devCode } = await sendOtp(mobile)
    user.otp = devCode || null
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000)
    /* keep isVerified false until OTP verified */
    await user.save({ validateBeforeSave: false })

    res.status(201).json({ user: publicUser(user), otpSent: sent, devCode: devCode || null })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/auth/request-otp — send fresh OTP for existing user / login
router.post('/request-otp', async (req, res) => {
  try {
    const { mobile } = req.body
    if (!mobile) return res.status(400).json({ error: 'Mobile number is required' })

    const { sent, devCode } = await sendOtp(mobile)
    await User.updateOne(
      { mobile },
      { $set: { otp: devCode || null, otpExpires: new Date(Date.now() + 5 * 60 * 1000) } },
      { upsert: false }
    )
    res.json({ otpSent: sent, devCode: devCode || null })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/auth/verify-otp — verify OTP (login if account exists, else confirm registration)
router.post('/verify-otp', async (req, res) => {
  try {
    const { mobile, otp } = req.body
    if (!mobile || !otp) return res.status(400).json({ error: 'Mobile and OTP are required' })

    const user = await User.findOne({ mobile }).select('+pin +otp +otpExpires')
    if (!user) return res.status(404).json({ error: 'No account found with this mobile. Please register.' })

    // Demo mode: accept 123456 universally
    const demoOk = process.env.DEMO_MODE === 'true' && otp === '123456'
    if (!demoOk && !verifyOtp(user.otp, user.otpExpires, otp)) {
      return res.status(400).json({ error: 'Invalid or expired OTP' })
    }

    user.otp = undefined
    user.otpExpires = undefined
    user.isVerified = true
    await user.save({ validateBeforeSave: false })

    res.json({ user: publicUser(user), token: signToken(user) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/auth/login — mobile + PIN fallback
router.post('/login', async (req, res) => {
  try {
    const { mobile, pin } = req.body
    if (!mobile || !pin) return res.status(400).json({ error: 'Mobile and PIN are required' })

    const user = await User.findOne({ mobile }).select('+pin')
    if (!user) return res.status(404).json({ error: 'No account found with this mobile. Please register.' })
    if (!user.pin) return res.status(400).json({ error: 'No PIN set on this account. Use OTP login.' })

    const ok = await bcrypt.compare(String(pin), user.pin)
    if (!ok) return res.status(401).json({ error: 'Incorrect PIN' })

    res.json({ user: publicUser(user), token: signToken(user) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/auth/role — select role & subRole (Customer Admin / Business Admin -> Professional/Government/Corporate)
router.put('/role', protect, async (req, res) => {
  try {
    const { role, subRole } = req.body
    const allowed = role === 'customer' ? ['customer'] : role === 'business' ? ['business'] : []
    if (!allowed.length) return res.status(400).json({ error: 'Role must be customer or business' })

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { role, subRole: subRole && role === 'business' ? subRole : null },
      { new: true }
    )
    if (!user) return res.status(404).json({ error: 'User not found' })

    res.json({ user: publicUser(user), token: signToken(user) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ user: publicUser(user) })
})

// PUT /api/auth/language — remember selected language
router.put('/language', protect, async (req, res) => {
  try {
    const { language } = req.body
    const user = await User.findByIdAndUpdate(req.user.id, { language }, { new: true })
    res.json({ user: publicUser(user) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

function publicUser(u) {
  return {
    _id: u._id,
    name: u.name,
    mobile: u.mobile,
    email: u.email,
    address: u.address,
    role: u.role,
    subRole: u.subRole,
    language: u.language,
    avatar: u.avatar,
    isVerified: u.isVerified,
  }
}

export default router