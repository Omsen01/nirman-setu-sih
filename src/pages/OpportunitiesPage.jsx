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

const kinds = ['All', 'Employment', 'Service', 'Project', 'Collaboration', 'Contract']

const seed = [
  { title: 'Hiring Masons — Greater Sagar', kind: 'Employment', description: '10+ masons needed for commercial tower. Daily wages + bonus.', location: 'Sagar, MP', active: true },
  { title: 'Subcontract — RCC Works', kind: 'Contract', description: 'RCC subcontracting for residential towers up to G+6.', location: 'Bhopal, MP', active: true },
  { title: 'Civil Material Supply', kind: 'Service', description: 'Cement, steel and aggregate supply partnerships.', location: 'Statewide', active: true },
  { title: 'Joint Venture — NH Widening', kind: 'Collaboration', description: 'JV partner for state highway widening project.', location: 'Indore-Dewas', active: true },
]

export default function OpportunitiesPage() {
  const { showToast } = useToast()
  const [filter, setFilter] = useState('All')
  const [list, setList] = useState(seed)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', kind: 'Employment', description: '', location: '' })

  const filtered = filter === 'All' ? list : list.filter((o) => o.kind === filter)

  const create = (e) => {
    e.preventDefault()
    setList((prev) => [{ ...form, active: true }, ...prev])
    setForm({ title: '', kind: 'Employment', description: '', location: '' })
    setShowForm(false)
    showToast('Opportunity published ✔')
  }

  const kindColor = { Employment: 'var(--saffron)', Contract: 'var(--teal)', Service: 'var(--gold)', Collaboration: '#3B82F6', Project: 'var(--gray-600)' }

  return (
    <DashboardLayout
      title="Corporate Opportunities"
      subtitle="Publish and manage your employment, service and contract opportunities."
      sections={sections}
      body={
        <>
          <div className="dash-actions-row">
            <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>➕ Add Opportunity</button>
            <div className="dash-filter-row">
              {kinds.map((k) => (
                <button key={k} className={`dash-filter-chip ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>{k}</button>
              ))}
            </div>
          </div>

          {showForm && (
            <div className="post-project-form">
              <h2>💼 New Opportunity</h2>
              <form onSubmit={create}>
                <div className="form-group"><label>Title *</label><input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required /></div>
                <div className="form-row">
                  <div className="form-group"><label>Kind</label><select value={form.kind} onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value }))}>
                    {kinds.filter((k) => k !== 'All').map((k) => <option key={k}>{k}</option>)}
                  </select></div>
                  <div className="form-group"><label>Location</label><input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} /></div>
                </div>
                <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} /></div>
                <button className="btn btn-primary btn-lg auth-btn">Publish</button>
              </form>
            </div>
          )}

          <div style={{ height: 16 }} />

          {filtered.length === 0 ? (
            <div className="empty-box"><h3>No opportunities</h3><p>Add your first opportunity above.</p></div>
          ) : (
            <div className="opp-list">
              {filtered.map((o, i) => (
                <div className="opp-card" key={i}>
                  <div className="opp-kind" style={{ background: `${kindColor[o.kind]}22`, color: kindColor[o.kind] }}>{o.kind}</div>
                  <div style={{ flex: 1 }}><h3>{o.title}</h3><p>{o.description}</p><span style={{ fontSize: '0.82rem', color: 'var(--gray-400)' }}>📍 {o.location}</span></div>
                  <button className="btn btn-outline btn-sm" onClick={() => showToast('Details view (demo)')}>View</button>
                </div>
              ))}
            </div>
          )}
        </>
      }
    />
  )
}