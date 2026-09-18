import { useState } from 'react'
import { Link } from 'react-router-dom'
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

const statuses = ['Submitted', 'Under Review', 'Selected', 'Rejected', 'Inspection Pending', 'Inspection Completed']
const statusColor = {
  Submitted: 'rgba(59,130,246,0.12)', 'Under Review': 'rgba(255,184,0,0.12)', Selected: 'rgba(0,191,166,0.12)',
  Rejected: 'rgba(192,57,43,0.1)', 'Inspection Pending': 'rgba(255,107,43,0.12)', 'Inspection Completed': 'rgba(0,191,166,0.15)',
}
const statusText = {
  Submitted: '#3B82F6', 'Under Review': 'var(--gold)', Selected: 'var(--teal)', Rejected: 'var(--brick)',
  'Inspection Pending': 'var(--saffron)', 'Inspection Completed': 'var(--teal)',
}

const seedApps = [
  { company: 'Rajesh Construction Services', tender: 'NS-TR-2026-014', date: '2026-09-20', status: 'Inspection Pending', verified: true },
  { company: 'National Steel & Materials Ltd', tender: 'NS-TR-2026-011', date: '2026-09-18', status: 'Under Review', verified: true },
  { company: 'Sharma & Associates', tender: 'NS-TR-2026-009', date: '2026-09-22', status: 'Submitted', verified: false },
  { company: 'Verma Structural Consultants', tender: 'NS-TR-2026-006', date: '2026-09-10', status: 'Selected', verified: true },
]

export default function ApplicationsPage() {
  const { showToast } = useToast()
  const [apps, setApps] = useState(seedApps)

  const setStatus = (i, status) => {
    setApps((prev) => prev.map((a, idx) => (idx === i ? { ...a, status } : a)))
    if (status === 'Selected') showToast('Application selected → moved to Digital Inspection')
    else showToast(`Status updated to "${status}"`)
  }

  return (
    <DashboardLayout
      title="Tender Applications"
      subtitle="Review applications, verify documents and update status."
      sections={sections}
      body={
        <div className="table-wrap">
          <table className="ns-table">
            <thead>
              <tr>
                <th>Applicant / Company</th><th>Tender</th><th>Date</th><th>Verified</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a, i) => (
                <tr key={i}>
                  <td><b>{a.company}</b></td>
                  <td>{a.tender}</td>
                  <td>{a.date}</td>
                  <td>{a.verified ? '✅ Verified' : '⏳ Pending'}</td>
                  <td><span className="request-status" style={{ background: statusColor[a.status], color: statusText[a.status] }}>{a.status}</span></td>
                  <td>
                    <select value={a.status} onChange={(e) => setStatus(i, e.target.value)} className="status-select">
                      {statuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="dash-actions-row" style={{ marginTop: 20 }}>
            <Link to="/business/government/inspection" className="btn btn-primary">🔎 Go to Digital Inspection</Link>
          </div>
        </div>
      }
    />
  )
}