import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useDocuments } from '../hooks/useCatalog'
import { useToast } from '../context/ToastContext'
import { api } from '../api/client'
import * as demo from '../api/demo'

const sections = [
  { to: '/business/professional', label: 'Overview', icon: '🏠', end: true },
  { to: '/business/professional/diary', label: 'Digital Diary', icon: '📔' },
  { to: '/business/professional/photos', label: 'Daily Photos', icon: '📷' },
  { to: '/business/professional/documents', label: 'Documents', icon: '📁' },
  { to: '/business/professional/report', label: 'Project Report', icon: '📊' },
]

const CATEGORIES = ['Agreement', 'Work Document', 'Identity / Verification', 'Project Document', 'Other']

export default function DocumentsPage() {
  const { documents, reload } = useDocuments()
  const { showToast } = useToast()
  const [form, setForm] = useState({ title: '', category: 'Agreement', project: '', notes: '' })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title) { showToast('Document title is required'); return }
    try {
      await api.post('/me/documents', form)
    } catch {
      demo.addDoc(form)
    }
    showToast('Document uploaded ✔')
    setForm({ title: '', category: 'Agreement', project: '', notes: '' })
    reload()
  }

  const remove = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    try { await api.del(`/me/documents/${id}`) } catch { demo.removeDoc(id) }
    showToast('Document deleted')
    reload()
  }

  return (
    <DashboardLayout
      title="Project Documents"
      subtitle="Securely store agreements, work documents and verification files."
      sections={sections}
      body={
        <>
          <div className="post-project-form">
            <h2>📁 Upload Document</h2>
            <form onSubmit={submit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Document Title *</label>
                  <input placeholder="e.g. Work Agreement — Sharma Residence" value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Related Project</label>
                <input placeholder="Project name (optional)" value={form.project}
                  onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>📎 File</label>
                <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => {
                  const f = e.target.files[0]
                  if (f) setForm((prev) => ({ ...prev, notes: f.name }))
                }} />
              </div>
              <button className="btn btn-primary btn-lg auth-btn">📤 Upload Document</button>
            </form>
          </div>

          <div style={{ height: 32 }} />
          <div className="section-heading"><h2>Stored Documents ({documents.length})</h2></div>

          {documents.length === 0 ? (
            <div className="empty-box"><h3>No documents yet</h3><p>Upload agreements and project files above.</p></div>
          ) : (
            <div className="docs-grid">
              {documents.map((d) => (
                <div className="doc-card" key={d._id}>
                  <div className="doc-icon">📄</div>
                  <div className="doc-body">
                    <span className="doc-cat">{d.category}</span>
                    <h3>{d.title}</h3>
                    {d.project && <p>🏗️ {d.project}</p>}
                    {d.notes && <p className="doc-notes">{d.notes}</p>}
                  </div>
                  <div className="doc-actions">
                    <button className="btn btn-outline btn-sm" onClick={() => showToast('Download started (demo)')}>⬇ View</button>
                    <button className="btn btn-outline btn-sm" style={{ color: 'var(--brick)', borderColor: 'rgba(192,57,43,0.3)' }} onClick={() => remove(d._id, d.title)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      }
    />
  )
}