import DashboardLayout from '../components/DashboardLayout'
import { useAuth } from '../context/AuthContext'

const sections = [
  { to: '/business/professional', label: 'Overview', icon: '🏠', end: true },
  { to: '/business/professional/diary', label: 'Digital Diary', icon: '📔' },
  { to: '/business/professional/photos', label: 'Daily Photos', icon: '📷' },
  { to: '/business/professional/documents', label: 'Documents', icon: '📁' },
  { to: '/business/professional/report', label: 'Project Report', icon: '📊' },
]

const history = [
  { icon: '🏠', name: 'Sharma Residence Construction', year: '2023', value: 'RCC + Finishing', status: 'Verified' },
  { icon: '🏬', name: 'City Mall Interior Fit-out', year: '2024', value: 'Turnkey', status: 'Verified' },
  { icon: '🏗️', name: 'NH-44 Bridge Piling', year: '2025', value: 'Sub-contract', status: 'Verified' },
]

export default function WorkHistoryPage() {
  const { user } = useAuth()

  return (
    <DashboardLayout
      title="Work History"
      subtitle={`Verified completed projects of ${user?.name || 'this professional'}`}
      sections={sections}
      body={
        <div className="dash-card-list">
          {history.map((h, i) => (
            <div className="dash-card-row" key={i}>
              <div className="dash-card-ico">{h.icon}</div>
              <div style={{ flex: 1 }}>
                <b>{h.name}</b>
                <p>{h.year} · {h.value}</p>
              </div>
              <span className="badge-verified">✓ {h.status}</span>
            </div>
          ))}
          <p className="auth-demo" style={{ textAlign: 'center', padding: 8 }}>Reports you mark complete appear here automatically.</p>
        </div>
      }
    />
  )
}