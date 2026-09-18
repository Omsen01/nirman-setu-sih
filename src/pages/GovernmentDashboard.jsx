import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { useAuth } from '../context/AuthContext'
import { useTenders } from '../hooks/useCatalog'

export default function GovernmentDashboard() {
  const { user } = useAuth()
  const { tenders } = useTenders()

  const sections = [
    { to: '/business/government', label: 'Overview', icon: '🏠', end: true },
    { to: '/business/government/projects', label: 'Government Projects', icon: '🏗️' },
    { to: '/business/government/tenders', label: 'Tender List', icon: '📋' },
    { to: '/business/government/applications', label: 'Tender Applications', icon: '📥' },
    { to: '/business/government/inspection', label: 'Digital Inspection', icon: '🔎' },
    { to: '/business/government/monitoring', label: 'Project Monitoring', icon: '📈' },
  ]

  const features = [
    { to: '/business/government/projects', icon: '🏗️', title: 'Government Projects', desc: 'Create, publish & manage projects' },
    { to: '/business/government/tenders', icon: '📋', title: 'Tender List', desc: 'Browse active government tenders' },
    { to: '/business/government/applications', icon: '📥', title: 'Tender Applications', desc: 'Review submitted applications & statuses' },
    { to: '/business/government/inspection', icon: '🔎', title: 'Digital Inspection', desc: 'Step-by-step verification workflow' },
    { to: '/business/government/monitoring', icon: '📈', title: 'Project Monitoring', desc: 'Track progress, photos & inspection status' },
    { to: '/help', icon: '📞', title: 'Customer Care', desc: 'Support & assistance' },
  ]

  const stats = [
    { icon: '📋', value: tenders.length, label: 'Open Tenders' },
    { icon: '📥', value: '14', label: 'Applications' },
    { icon: '🔎', value: '3', label: 'Inspections' },
    { icon: '📈', value: '18', label: 'Ongoing Projects' },
  ]

  return (
    <DashboardLayout
      title="Government Dashboard"
      subtitle={`Welcome, ${user?.name || 'Government Officer'} — manage projects, tenders & inspections.`}
      sections={sections}
      body={
        <>
          <div className="dash-grid-4">
            {stats.map((s) => (
              <div className="dash-stat" key={s.label}>
                <div className="icon teal">{s.icon}</div>
                <div className="value">{s.value}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="section-heading">
            <h2>Administration Modules</h2>
            <p>Complete lifecycle: publish → apply → inspect → monitor.</p>
          </div>

          <div className="dash-feat-grid">
            {features.map((f) => (
              <Link to={f.to} key={f.title} className="dash-feat">
                <span className="dash-feat-icon">{f.icon}</span>
                <b>{f.title}</b>
                <p>{f.desc}</p>
                <span className="dash-feat-cta">Open →</span>
              </Link>
            ))}
          </div>
        </>
      }
    />
  )
}