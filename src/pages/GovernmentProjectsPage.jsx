import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useToast } from '../context/ToastContext'

const sections = [
  { to: '/business/government', label: 'Overview', icon: '🏠', end: true },
  { to: '/business/government/projects', label: 'Government Projects', icon: '🏗️' },
  { to: '/business/government/tenders', label: 'Tender List', icon: '📋' },
  { to: '/business/government/applications', label: 'Tender Applications', icon: '📥' },
  { to: '/business/government/inspection', label: 'Digital Inspection', icon: '🔎' },
  { to: '/business/government/monitoring', label: 'Project Monitoring', icon: '📈' },
]

const seed = [
  { name: 'NH-44 Overbridge — Sagar', location: 'Sagar, MP', status: 'In Progress', progress: 46, dept: 'PWD / NHAI' },
  { name: '10 MLD Water Treatment Plant', location: 'Jabalpur, MP', status: 'Under Review', progress: 12, dept: 'Jal Nigam' },
  { name: '4-Lane Highway (18 km)', location: 'Indore–Dewas', status: 'Draft', progress: 0, dept: 'State Highway Authority' },
]

export default function GovernmentProjectsPage() {
  const { showToast } = useToast()
  const [projects, setProjects] = useState(seed)
  const [form, setForm] = useState({ name: '', location: '', dept: '', description: '' })
  const [showForm, setShowForm] = useState(false)

  const statusColor = { 'In Progress': 'rgba(0,191,166,0.12)', 'Under Review': 'rgba(59,130,246,0.12)', Draft: 'rgba(148,163,184,0.15)' }
  const statusText = { 'In Progress': 'var(--teal)', 'Under Review': '#3B82F6', Draft: 'var(--gray-500)' }

  const create = (e) => {
    e.preventDefault()
    const p = { name: form.name, location: form.location, dept: form.dept, status: 'Draft', progress: 0 }
    setProjects((prev) => [p, ...prev])
    setForm({ name: '', location: '', dept: '', description: '' })
    setShowForm(false)
    showToast('Project created as Draft ✔')
  }

  return (
    <DashboardLayout
      title="Government Projects"
      subtitle="Create, publish and manage government projects."
      sections={sections}
      body={
        <>
          <div className="dash-actions-row">
            <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>➕ Create Project</button>
            <button className="btn btn-teal" onClick={() => showToast('Project published to citizens ✔')}>📢 Publish Project</button>
          </div>

          {showForm && (
            <div className="post-project-form">
              <h2>🏗️ New Government Project</h2>
              <form onSubmit={create}>
                <div className="form-row">
                  <div className="form-group"><label>Project Name *</label><input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required /></div>
                  <div className="form-group"><label>Department *</label><input value={form.dept} onChange={(e) => setForm((f) => ({ ...f, dept: e.target.value }))} required /></div>
                </div>
                <div className="form-group"><label>Location</label><input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} /></div>
                <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} /></div>
                <button className="btn btn-primary btn-lg auth-btn">Create Project</button>
              </form>
            </div>
          )}

          <div style={{ height: 16 }} />

          <div className="gov-project-list">
            {projects.map((p, i) => (
              <div className="gov-project" key={i}>
                <div className="gov-project-ico">🏗️</div>
                <div style={{ flex: 1 }}>
                  <h3>{p.name}</h3>
                  <p>{p.dept} · 📍 {p.location}</p>
                </div>
                <div style={{ width: 140 }}>
                  <div className="progress-label" style={{ justifyContent: 'space-between' }}><span className="name" style={{ fontSize: '0.72rem' }}>Progress</span><span className="percent" style={{ fontSize: '0.72rem' }}>{p.progress}%</span></div>
                  <div className="progress-bar"><div className="progress-fill teal" style={{ width: `${p.progress}%` }}></div></div>
                </div>
                <span className="request-status" style={{ background: statusColor[p.status], color: statusText[p.status] }}>{p.status}</span>
              </div>
            ))}
          </div>
        </>
      }
    />
  )
}