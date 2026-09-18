import DashboardLayout from '../components/DashboardLayout'
import { useRequests } from '../hooks/useCatalog'
import { useAuth } from '../context/AuthContext'

const statusColor = {
  Submitted: 'rgba(59,130,246,0.12)', 'Under Review': 'rgba(255,184,0,0.12)',
  Accepted: 'rgba(0,191,166,0.12)', 'In Progress': 'rgba(255,107,43,0.12)',
  Completed: 'rgba(0,191,166,0.15)', Rejected: 'rgba(192,57,43,0.1)',
}
const statusText = {
  Submitted: '#3B82F6', 'Under Review': 'var(--gold)', Accepted: 'var(--teal)',
  'In Progress': 'var(--saffron)', Completed: 'var(--teal)', Rejected: 'var(--brick)',
}

export default function MyRequestsPage() {
  const { requests } = useRequests()
  const { user } = useAuth()

  const sections = [
    { to: '/customer', label: 'Overview', icon: '🏠', end: true },
    { to: '/customer/transportation', label: 'Transportation', icon: '🚆', end: true },
    { to: '/customer/workers/water', label: 'Water Project', icon: '💧' },
    { to: '/customer/workers/residential', label: 'Residential Project', icon: '🏠' },
    { to: '/customer/requests', label: 'My Requests', icon: '📨' },
  ]

  return (
    <DashboardLayout
      title={`My Requests (${requests.length})`}
      subtitle={`Track your service requests, ${user?.name || 'customer'} — every action is recorded.`}
      sections={sections}
      body={
        requests.length === 0 ? (
          <div className="empty-box">
            <div style={{ fontSize: '3rem' }}>📨</div>
            <h3>No requests yet</h3>
            <p>Go to a category and request a service from a worker.</p>
          </div>
        ) : (
          <div className="requests-list">
            {requests.map((r) => (
              <div className="request-card" key={r._id}>
                <div className="request-head">
                  <span className="request-emoji">📤</span>
                  <div>
                    <h3>{r.requirement}</h3>
                    <p>{r.location} · {r.requiredDate || 'Flexible date'}</p>
                  </div>
                  <span className="request-status" style={{ background: statusColor[r.status] || statusColor.Submitted, color: statusText[r.status] || statusText.Submitted }}>
                    {r.status}
                  </span>
                </div>
                {r.description && <p className="request-desc">{r.description}</p>}
                <div className="request-foot">
                  <span>🕐 {new Date(r.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  <span>📞 1800-180-1234 for help</span>
                </div>
              </div>
            ))}
          </div>
        )
      }
    />
  )
}