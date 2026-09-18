import { Router } from 'express'
import Inspection from '../models/Inspection.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// GET /api/inspections
router.get('/', protect, async (req, res) => {
  try {
    const inspections = await Inspection.find().sort({ createdAt: -1 })
    res.json({ inspections })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/inspections — start digital inspection
router.post('/', protect, async (req, res) => {
  try {
    const inspection = await Inspection.create({ ...req.body, status: 'In Progress' })
    res.status(201).json({ inspection })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/inspections/:id — update steps / complete
router.patch('/:id', protect, async (req, res) => {
  try {
    const inspection = await Inspection.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ inspection })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router