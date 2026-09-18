import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useToast } from '../context/ToastContext'

const sections = [
  { to: '/business/corporate', label: 'Overview', icon: '🏠', end: true },
  { to: '/business/corporate/profile', label: 'Company Profile', icon: '🏢' },
  { to: '/business/corporate/projects', label: 'Projects', icon: '🏗️' },
  { to: '/business/corporate/portfolio', label: 'Portfolio', icon: '🖼️' },
  { to: '/business/corporate/opportunities', label: 'Opportunities', icon: '💼' },
  { to: '/tenders', label: 'Apply Tender', icon: '📋' },
]

const seed = [
  { name: 'Nirman Heights — G+6 Commercial', location: 'Sagar, MP', status: 'In Progress', progress: 46 },
  { name: 'Green Park Apartments', location: 'Bhopal, MP', status: 'In Progress', progress: 72 },
  { name: 'NH-44 Approach Road', location: 'Sagar, MP', status: 'Completed', progress: 100 },
]

export default function CorporateProjectsPage() {
  const { showToast } = useToast()
  const [projects, setProjects] = useState(seed)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', location: '', description: '', startDate: '', expectedDate: '', team: '', status: 'Draft' })

  const create = (e) => {
    e.preventDefault()
    setProjects((p) => [{ name: form.name, location: form.location, status: 'Draft', progress: 0 }, ...p])
    setShowForm(false)
    setForm({ name: '', location: '', description: '', startDate: '', expectedDate: '', team: '', status: 'Draft' })
    showToast('Project created as Draft ✔')
  }

  const statusColor = { 'In Progress': 'rgba(0,191,166,0.12)', Completed: 'rgba(0,191,166,0.15)', Draft: 'rgba(148,163,184,0.15)', 'Under Review': 'rgba(59,130,246,0.12)' }
  const statusText = { 'In Progress': 'var(--teal)', Completed: 'var(--teal)', Draft: 'var(--gray-500)', 'Under Review': '#3B82F6' }

  return (
    <DashboardLayout
      title="Corporate Projects"
      subtitle="Create, upload and manage all your company's projects."
      sections={sections}
      body={
        <>
          <div className="dash-actions-row">
            <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>➕ Create Project</button>
            <button className="btn btn-teal" onClick={() => showToast('Project upload form (demo)')}>⬆ Upload Data</button>
          </div>

          {showForm && (
            <div className="post-project-form">
              <h2>🏗️ New Corporate Project</h2>
              <form onSubmit={create}>
                <div className="form-group"><label>Project Name *</label><input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required /></div>
                <div className="form-row">
                  <div className="form-group"><label>Location</label><input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} /></div>
                  <div className="form-group"><label>Start Date</label><input type="date" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} /></div>
                </div>
                <div className="form-group"><label>Team Members (comma separated)</label><input value={form.team} placeholder="e.g. Rajesh, Priya, Vikram" onChange={(e) => setForm((f) => ({ ...f, team: e.target.value }))} /></div>
                <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} /></div>
                <button className="btn btn-primary btn-lg auth-btn">Create Project</button>
              </form>
            </div>
          )}

          <div style={{ height: 16 }} />

          {projects.map((p, i) => (
            <div className="gov-project" key={i}>
              <div className="gov-project-ico">🏗️</div>
              <div style={{ flex: 1 }}><h3>{p.name}</h3><p>📍 {p.location}</p></div>
              <div style={{ width: 140 }}>
                <div className="progress-label" style={{ justifyContent: 'space-between' }}><span className="name" style={{ fontSize: '0.72rem' }}>{p.progress}%</span></div>
                <div className="progress-bar"><div className="progress-fill teal" style={{ width: `${p.progress}%` }}></div></div>
              </div>
              <span className="request-status" style={{ background: statusColor[p.status], color: statusText[p.status] }}>{p.status}</span>
            </div>
          ))}

          <p className="auth-demo">Project reports auto-generate from diary + photos. View them in Portfolio.</p>
        </>
      }
    />
  )
}