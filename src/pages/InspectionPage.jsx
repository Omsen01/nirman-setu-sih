import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

const sections = [
  { to: '/business/government', label: 'Overview', icon: '🏠', end: true },
  { to: '/business/government/projects', label: 'Government Projects', icon: '🏗️' },
  { to: '/business/government/tenders', label: 'Tender List', icon: '📋' },
  { to: '/business/government/applications', label: 'Tender Applications', icon: '📥' },
  { to: '/business/government/inspection', label: 'Digital Inspection', icon: '🔎' },
  { to: '/business/government/monitoring', label: 'Project Monitoring', icon: '📈' },
]

const defaultSteps = [
  { name: 'Project Details', icon: '📋' },
  { name: 'Document Verification', icon: '📁' },
  { name: 'Site / Project Evidence', icon: '🏗️' },
  { name: 'Photo / Video Upload', icon: '📷' },
  { name: 'Inspection Notes', icon: '📝' },
  { name: 'Inspector Verification', icon: '🧑‍💼' },
  { name: 'Inspection Report', icon: '📑' },
]

export default function InspectionPage() {
  const { showToast } = useToast()
  const { user } = useAuth()
  const [current, setCurrent] = useState(0)
  const [done, setDone] = useState(new Set())
  const [notes, setNotes] = useState({})
  const [project, setProject] = useState('Rural Water Supply & Treatment Plant (10 MLD)')
  const [status, setStatus] = useState('In Progress')
  const [completedAll, setCompletedAll] = useState(false)

  const step = defaultSteps[current]

  const markDone = () => {
    setDone((prev) => new Set(prev).add(current))
    if (current < defaultSteps.length - 1) {
      setCurrent((c) => c + 1)
      showToast(`STEP ${current + 1} complete — moving to next`)
    } else {
      setCompletedAll(true)
      setStatus('Completed')
      showToast('🎉 Inspection completed! Report generated.')
    }
  }

  const progress = Math.round((done.size / defaultSteps.length) * 100)

  return (
    <DashboardLayout
      title="Digital Inspection"
      subtitle="Step-by-step verification: project → documents → evidence → report."
      sections={sections}
      body={
        <>
          <div className="insp-layout">
            <div className="post-project-form">
              <h2>🔎 Digital Inspection</h2>
              <div className="form-group">
                <label>Inspection Project</label>
                <input value={project} onChange={(e) => setProject(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Inspector</label>
                <input value={user?.name || 'Government Officer'} readOnly />
              </div>

              <div className="insp-progress">
                <div className="progress-label"><span className="name">Inspection Progress</span><span className="percent">{progress}%</span></div>
                <div className="progress-bar"><div className="progress-fill teal" style={{ width: `${progress}%` }}></div></div>
              </div>

              <div className="insp-steps">
                {defaultSteps.map((s, i) => (
                  <div key={s.name} className={`insp-step ${i === current ? 'current' : ''} ${done.has(i) ? 'done' : ''}`}>
                    <span className="insp-step-num">{done.has(i) ? '✓' : i + 1}</span>
                    <span>{s.icon} {s.name}</span>
                  </div>
                ))}
              </div>

              {!completedAll ? (
                <div className="insp-card">
                  <h3>STEP {current + 1} — {step.name}</h3>
                  {step.icon === '📷' && (
                    <input type="file" accept="image/*" multiple onChange={(e) => showToast(`${e.target.files.length} photo(s) added as evidence`)} />
                  )}
                  {step.icon === '📝' && (
                    <textarea rows={3} placeholder="Inspection notes / remarks…" value={notes[current] || ''}
                      onChange={(e) => setNotes((n) => ({ ...n, [current]: e.target.value }))} />
                  )}
                  {step.icon === '🏗️' && (
                    <p style={{ color: 'var(--gray-500)' }}>Confirm site conditions match the submitted project details & photos.</p>
                  )}
                  {step.icon === '📁' && (
                    <p style={{ color: 'var(--gray-500)' }}>All documents auto-verified: GST ✔ · PAN ✔ · License ✔ · EPF/ESI ✔</p>
                  )}
                  <button className="btn btn-primary btn-lg auth-btn" onClick={markDone}>
                    {current === defaultSteps.length - 1 ? '✅ Complete Inspection' : `Mark Step ${current + 1} Complete →`}
                  </button>
                </div>
              ) : (
                <div className="insp-report-ready">
                  <h3>📑 Inspection Report Ready</h3>
                  <p>All 7 steps verified by {user?.name || 'Inspector'} on {new Date().toLocaleDateString('en-IN')}.</p>
                  <button className="btn btn-primary btn-lg auth-btn" onClick={() => showToast('Inspection report downloaded (PDF) ✔')}>⬇ Download Report</button>
                </div>
              )}
            </div>

            <div>
              <div className="profile-section">
                <h3>📋 About this Inspection</h3>
                <div className="dash-info-list">
                  <div><span>Status</span><b>{status}</b></div>
                  <div><span>Steps</span><b>{done.size}/{defaultSteps.length}</b></div>
                  <div><span>Inspector</span><b>{user?.name || 'Government Officer'}</b></div>
                  <div><span>Record</span><b>Maintained ✔</b></div>
                </div>
              </div>
              <div className="dash-call-card" style={{ marginTop: 16 }}>
                <span>📞</span>
                <div><b>Need assistance?</b><p>Call inspection help desk</p></div>
                <a href="tel:18001801234" className="btn btn-primary btn-sm">Call</a>
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}