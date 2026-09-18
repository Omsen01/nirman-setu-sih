import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'

import authRoutes from './routes/auth.js'
import workerRoutes from './routes/workers.js'
import serviceRequestRoutes from './routes/serviceRequests.js'
import projectRoutes from './routes/projects.js'
import tenderRoutes from './routes/tenders.js'
import applicationRoutes from './routes/applications.js'
import inspectionRoutes from './routes/inspections.js'
import companyRoutes from './routes/companies.js'
import workLogRoutes from './routes/workLogs.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/workers', workerRoutes)
app.use('/api/service-requests', serviceRequestRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tenders', tenderRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/inspections', inspectionRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/me', workLogRoutes)

// Health check (used by Render / uptime monitors)
app.get('/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }))

// Serve React build in production (Monorepo: vite build outputs to <root>/dist)
const distPath = path.resolve(__dirname, '..', '..', 'dist')
app.use(express.static(distPath))
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) return next()
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) res.status(200).send('<h3>Nirman SETU — run `npm run build` first, or use `npm run dev` for the dev server</h3>')
  })
})

const PORT = process.env.PORT || 5000

async function boot() {
  const ok = await connectDB()
  if (ok) {
    // Auto-seed on first boot when DB is empty
    const { ensureSeeded } = await import('./scripts/ensureSeeded.js')
    await ensureSeeded()
  } else {
    console.warn('[server] DB unavailable — starting without DB (demo fallback enabled)')
  }
  app.listen(PORT, () => console.log(`[server] http://localhost:${PORT}`))
}
boot()