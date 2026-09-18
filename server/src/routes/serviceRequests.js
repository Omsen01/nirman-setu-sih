import { Router } from 'express'
import ServiceRequest from '../models/ServiceRequest.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// POST /api/service-requests — customer sends request to a worker
router.post('/', protect, async (req, res) => {
  try {
    const { worker, category, requirement, location, requiredDate, description, photos, documents } = req.body
    if (!worker || !requirement || !location) {
      return res.status(400).json({ error: 'Worker, requirement and location are required' })
    }
    const sr = await ServiceRequest.create({
      customer: req.user.id,
      worker,
      category: category || 'residential',
      requirement,
      location,
      requiredDate,
      description,
      photos: photos || [],
      documents: documents || [],
    })
    res.status(201).json({ request: sr })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/service-requests/mine — requests for the logged-in professional
router.get('/mine', protect, async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ worker: req.query.worker }).sort({ createdAt: -1 })
    res.json({ requests })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/service-requests/:id/status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body
    const sr = await ServiceRequest.findByIdAndUpdate(req.params.id, { status }, { new: true })
    res.json({ request: sr })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router