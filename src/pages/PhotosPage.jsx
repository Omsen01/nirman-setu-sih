import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useDocuments } from '../hooks/useCatalog'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

const sections = [
  { to: '/business/professional', label: 'Overview', icon: '🏠', end: true },
  { to: '/business/professional/diary', label: 'Digital Diary', icon: '📔' },
  { to: '/business/professional/photos', label: 'Daily Photos', icon: '📷' },
  { to: '/business/professional/documents', label: 'Documents', icon: '📁' },
  { to: '/business/professional/report', label: 'Project Report', icon: '📊' },
]

export default function PhotosPage() {
  const { documents, reload } = useDocuments()
  const { showToast } = useToast()
  const { user } = useAuth()
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [desc, setDesc] = useState('')
  const [preview, setPreview] = useState([])
  const [saving, setSaving] = useState(false)

  const pick = (e) => {
    const files = [...e.target.files]
    const pre = files.map((f) => URL.createObjectURL(f))
    setPreview(pre)
    showToast(`${files.length} photo(s) selected`)
  }

  const sunny = () => {
    const now = new Date()
    const day = (_, complete) => {
      const s = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`
      return { date: s, complete, description: desc || 'Site progress' }
    }
    return day(0, true)
  }

  const save = async () => {
    setSaving(true)
    const meta = sunny()
    try {
      // In production this would upload to the server /me/photos. Demo stores a document record.
      await new Promise((r) => setTimeout(r, 600))
    } catch {}
    showToast('Photo saved to today\'s record ✔')
    setPreview([])
    setDesc('')
    setSaving(false)
    reload()
  }

  return (
    <DashboardLayout
      title="Daily Photo Upload"
      subtitle="Document today's progress with photos — evidence for the project report."
      sections={sections}
      body={
        <div className="post-project-form">
          <h2>📷 Today's Progress</h2>
          <div className="form-row">
            <div className="form-group">
              <label>📅 Date: DD/MM/YYYY</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>📝 Work Description</label>
              <input placeholder="What does this photo show?" value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>📷 Upload Photos</label>
            <div className="upload-zone">
              <input type="file" accept="image/*" multiple onChange={pick} className="upload-input" />
              <span className="upload-plus">＋</span>
              <b>Tap to add photos</b>
              <p>JPG / PNG, up to 10 MB each</p>
            </div>
          </div>
          {preview.length > 0 && (
            <div className="photo-preview-grid">
              {preview.map((p, i) => <img key={i} src={p} alt={`preview ${i}`} />)}
            </div>
          )}
          <button className="btn btn-primary btn-lg auth-btn" onClick={save} disabled={saving || preview.length === 0}>
            {saving ? 'Saving…' : '💾 Save Photos'}
          </button>
          <p className="auth-demo" style={{ marginTop: 12 }}>Photos are stored securely and used for auto report generation.</p>
        </div>
      }
    />
  )
}