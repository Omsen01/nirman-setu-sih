import { Router } from 'express'
import Worker from '../models/Worker.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// GET /api/workers?category=railway|road|water|residential&q=
router.get('/', async (req, res) => {
  try {
    const { category, q } = req.query
    const filter = {}
    if (category && category !== 'all') filter.category = category
    if (q) filter.$or = [{ name: { $regex: q, $options: 'i' } }, { role: { $regex: q, $options: 'i' } }, { skills: { $regex: q, $options: 'i' } }]
    const workers = await Worker.find(filter).sort({ topRated: -1, rating: -1 })
    res.json({ workers })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/workers/:id
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id)
    if (!worker) return res.status(404).json({ error: 'Worker not found' })
    res.json({ worker })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router