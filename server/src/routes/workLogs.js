import { Router } from 'express'
import DiaryEntry from '../models/DiaryEntry.js'
import Document from '../models/Document.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// DIARY =============================================
router.get('/diary', protect, async (req, res) => {
  try {
    const entries = await DiaryEntry.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json({ entries })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/diary', protect, async (req, res) => {
  try {
    const entry = await DiaryEntry.create({ ...req.body, user: req.user.id })
    res.status(201).json({ entry })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/diary/:id', protect, async (req, res) => {
  try {
    await DiaryEntry.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DOCUMENTS =========================================
router.get('/documents', protect, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json({ documents })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/documents', protect, async (req, res) => {
  try {
    const doc = await Document.create({ ...req.body, user: req.user.id })
    res.status(201).json({ document: doc })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/documents/:id', protect, async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PHOTOS — daily photo upload stored as documents with category 'Photo'
router.post('/photos', protect, (req, res) => {
  const files = (req.files || []).map((f) => `/uploads/${f.filename}`)
  res.status(201).json({ files })
})

export default router