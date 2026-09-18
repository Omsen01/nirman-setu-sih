import { Router } from 'express'
import TenderApplication from '../models/TenderApplication.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// POST /api/applications — apply to a tender
router.post('/', protect, async (req, res) => {
  try {
    const { tender, company, documents } = req.body
    if (!tender) return res.status(400).json({ error: 'Tender is required' })
    const app = await TenderApplication.create({
      applicant: req.user.id,
      applicantName: req.body.applicantName || req.user.name,
      company,
      tender,
      tenderId: req.body.tenderId,
      documents: documents || [],
    })
    res.status(201).json({ application: app })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/applications
router.get('/', protect, async (req, res) => {
  try {
    const applications = await TenderApplication.find().sort({ createdAt: -1 })
    res.json({ applications })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/applications/:id/status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body
    const app = await TenderApplication.findByIdAndUpdate(req.params.id, { status }, { new: true })
    res.json({ application: app })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router