import { Router } from 'express'
import Tender from '../models/Tender.js'

const router = Router()

// GET /api/tenders
router.get('/', async (req, res) => {
  try {
    const tenders = await Tender.find().sort({ createdAt: -1 })
    res.json({ tenders })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router