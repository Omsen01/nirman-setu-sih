import { Router } from 'express'
import Project from '../models/Project.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// GET /api/projects?ownerOnly=true
router.get('/', protect, async (req, res) => {
  try {
    const filter = req.query.ownerOnly === 'true' ? { owner: req.user.id } : {}
    const projects = await Project.find(filter).sort({ createdAt: -1 })
    res.json({ projects })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/projects
router.post('/', protect, async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, owner: req.user.id })
    res.status(201).json({ project })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/projects/:id
router.patch('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ project })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router