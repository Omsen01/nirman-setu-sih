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

export default function CorporateProfilePage() {
  const { showToast } = useToast()
  const [company, setCompany] = useState({
    name: 'Rajesh Construction Services',
    type: 'Contractor',
    location: 'Sagar, Madhya Pradesh',
    description: 'Full-service civil contracting firm specialising in residential and commercial RCC structures with an in-house team of skilled masons, bar benders, shuttering and RCC workers.',
    services: ['RCC', 'Brickwork', 'Full Turnkey', 'Labour Contracting'],
    contact: { phone: '+91 90000 11111', email: 'contact@rajeshconstruction.in', website: 'rajeshconstruction.in', address: 'Sagar, MP' },
    team: [
      { name: 'Rajesh Kumar', role: 'Director', profession: 'Mason & RCC Professional', experience: '12 yrs', emoji: '👷' },
      { name: 'Sunil Verma', role: 'Site Manager', profession: 'Mason', experience: '9 yrs', emoji: '🧱' },
      { name: 'Deepa Nair', role: 'Interior Head', profession: 'Interior Designer', experience: '11 yrs', emoji: '🛋️' },
    ],
    licenses: [
      { title: 'Class A Contractor License', number: 'MP-CL-4471', issued: '2021', expiry: '2026', verified: true },
      { title: 'GST Registered Dealer', number: 'GST-23AABC4471', issued: '2019', expiry: 'Ongoing', verified: true },
    ],
  })

  const [tab, setTab] = useState('profile')

  const update = (k, v) => setCompany((c) => ({ ...c, [k]: v }))
  const updateContact = (k, v) => setCompany((c) => ({ ...c, contact: { ...c.contact, [k]: v } }))

  const save = () => { showToast('Company profile saved ✔') }

  return (
    <DashboardLayout
      title="Company Profile"
      subtitle={company.name}
      sections={sections}
      body={
        <>
          <div className="dash-tabs">
            {[['profile', '🏢 Profile'], ['team', '👥 Team Members'], ['license', '🪪 License Details']].map(([k, label]) => (
              <button key={k} className={`dash-tab ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>{label}</button>
            ))}
          </div>

          {tab === 'profile' && (
            <div className="post-project-form">
              <h2>🏢 Company Profile</h2>
              <div className="form-group"><label>Company Name</label><input value={company.name} onChange={(e) => update('name', e.target.value)} /></div>
              <div className="form-row">
                <div className="form-group"><label>Type</label><input value={company.type} onChange={(e) => update('type', e.target.value)} /></div>
                <div className="form-group"><label>Location</label><input value={company.location} onChange={(e) => update('location', e.target.value)} /></div>
              </div>
              <div className="form-group"><label>Description</label><textarea rows={4} value={company.description} onChange={(e) => update('description', e.target.value)} /></div>
              <div className="form-group"><label>Services</label><input value={company.services.join(', ')} onChange={(e) => update('services', e.target.value.split(',').map((s) => s.trim()))} /></div>
              <h3 style={{ margin: '20px 0 12px' }}>📞 Contact Details</h3>
              <div className="form-row">
                <div className="form-group"><label>Phone</label><input value={company.contact.phone} onChange={(e) => updateContact('phone', e.target.value)} /></div>
                <div className="form-group"><label>Email</label><input value={company.contact.email} onChange={(e) => updateContact('email', e.target.value)} /></div>
              </div>
              <div className="form-group"><label>Website</label><input value={company.contact.website} onChange={(e) => updateContact('website', e.target.value)} /></div>
              <button className="btn btn-primary btn-lg auth-btn" onClick={save}>💾 Save Profile</button>
            </div>
          )}

          {tab === 'team' && (
            <div className="post-project-form">
              <h2>👥 Team Members</h2>
              {company.team.map((m, i) => (
                <div className="team-row" key={i}>
                  <span className="team-emoji">{m.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <b>{m.name}</b>
                    <p>{m.role} · {m.profession} · {m.experience}</p>
                  </div>
                  <button className="btn btn-outline btn-sm" onClick={() => showToast('Member details editable (demo)')}>Edit</button>
                </div>
              ))}
              <button className="btn btn-outline btn-lg auth-btn" onClick={() => showToast('Add team member form (demo)')}>➕ Add Team Member</button>
            </div>
          )}

          {tab === 'license' && (
            <div className="post-project-form">
              <h2>🪪 License Details</h2>
              {company.licenses.map((l, i) => (
                <div className="team-row" key={i}>
                  <span className="team-emoji">🪪</span>
                  <div style={{ flex: 1 }}>
                    <b>{l.title}</b>
                    <p>{l.number} · Issued {l.issued} · Expiry {l.expiry}</p>
                  </div>
                  <span className="badge-verified">✓ {l.verified ? 'Verified' : 'Pending'}</span>
                </div>
              ))}
              <button className="btn btn-outline btn-lg auth-btn" onClick={() => showToast('Upload license document (demo)')}>⬆ Upload Document</button>
            </div>
          )}
        </>
      }
    />
  )
}