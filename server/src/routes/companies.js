import { Router } from 'express'
import Company from '../models/Company.js'
import Portfolio from '../models/Portfolio.js'
import Opportunity from '../models/Opportunity.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// GET /api/companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find()
    res.json({ companies })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/companies/:id
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
    if (!company) return res.status(404).json({ error: 'Company not found' })
    res.json({ company })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/companies/:id — update profile / team / licenses
router.put('/:id', protect, async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ company })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PORTFOLIO =========================================
router.get('/:id/portfolio', async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ company: req.params.id }).sort({ createdAt: -1 })
    res.json({ portfolio })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/:id/portfolio', protect, async (req, res) => {
  try {
    const item = await Portfolio.create({ ...req.body, company: req.params.id })
    res.status(201).json({ item })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// OPPORTUNITIES =====================================
router.get('/:id/opportunities', async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ company: req.params.id }).sort({ createdAt: -1 })
    res.json({ opportunities })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/:id/opportunities', protect, async (req, res) => {
  try {
    const opportunity = await Opportunity.create({ ...req.body, company: req.params.id })
    res.status(201).json({ opportunity })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router