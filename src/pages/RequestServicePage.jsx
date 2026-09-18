import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { useWorkers } from '../hooks/useCatalog'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { api } from '../api/client'
import * as demo from '../api/demo'

export default function RequestServicePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { workers } = useWorkers()
  const { user } = useAuth()
  const { showToast } = useToast()
  const worker = workers.find((w) => String(w.id || w._id) === String(id))

  const [form, setForm] = useState({ requirement: '', location: '', requiredDate: '', description: '', photos: [] })
  const [sending, setSending] = useState(false)

  const sections = [
    { to: '/customer', label: 'Overview', icon: '🏠', end: true },
    { to: '/customer/transportation', label: 'Transportation', icon: '🚆', end: true },
    { to: '/customer/workers/water', label: 'Water Project', icon: '💧' },
    { to: '/customer/workers/residential', label: 'Residential Project', icon: '🏠' },
  ]

  if (!worker) return <DashboardLayout title="Worker not found" sections={sections} body={<div className="empty-box">Worker not found.</div>} />

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    const payload = {
      worker: worker.id || worker._id,
      category: worker.category || 'railway',
      requirement: form.requirement,
      location: form.location,
      requiredDate: form.requiredDate,
      description: form.description,
    }
    try {
      await api.post('/service-requests', payload)
      showToast('Request sent successfully!')
    } catch (err) {
      if (err.offline) demo.addRequest(payload)
      showToast('Request sent successfully!')
    }
    setSending(false)
    navigate('/customer/requests')
  }

  return (
    <DashboardLayout
      title="Request Service"
      subtitle={`Send a service request to ${worker.name}`}
      sections={sections}
      body={
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div className="post-project-form">
            <h2>📤 Service Request Form</h2>
            <p>Tell {worker.name} what you need.</p>
            <form onSubmit={submit}>
              <div className="form-group">
                <label>Project / Service Requirement *</label>
                <input placeholder="e.g. Brickwork for house boundary wall" value={form.requirement}
                  onChange={(e) => setForm((f) => ({ ...f, requirement: e.target.value }))} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location *</label>
                  <input placeholder="City, State" value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Required Date</label>
                  <input type="date" value={form.requiredDate}
                    onChange={(e) => setForm((f) => ({ ...f, requiredDate: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={4} placeholder="Describe the work, quantity, materials, etc." value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>📎 Optional Photos / Documents</label>
                <input type="file" accept="image/*" multiple onChange={(e) => {
                  const files = [...e.target.files].slice(0, 4).map((file, i) => `photo-${Date.now()}-${i}`)
                  setForm((f) => ({ ...f, photos: files }))
                  showToast(`${files.length} photo(s) attached (demo metadata)`)
                }} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: 'center' }} disabled={sending}>
                  {sending ? 'Sending…' : '📤 Send Request'}
                </button>
                <Link to={`/customer/worker/${worker.id || worker._id}`} className="btn btn-outline btn-lg">Cancel</Link>
              </div>
            </form>
          </div>

          <div className="profile-section">
            <h3>👷 Requesting from</h3>
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ width: 72, height: 72, margin: '0 auto 12px', borderRadius: 20, background: `linear-gradient(135deg, var(--${worker.header}), var(--${worker.avatarBg}))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem' }}>{worker.emoji}</div>
              <h4>{worker.name}</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{worker.role}</p>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>📍 {worker.location} · ★ {worker.rating}</p>
            </div>
            <div style={{ padding: 12, background: 'rgba(0,191,166,0.08)', borderRadius: 'var(--radius)', fontSize: '0.85rem', color: 'var(--gray-600)' }}>
              📨 {user ? 'Your request will be sent directly to the worker.' : 'Login required to send requests.'}
            </div>
          </div>
        </div>
      }
    />
  )
}