import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { useAuth } from '../context/AuthContext'
import { useDiary } from '../hooks/useCatalog'

export default function ProfessionalDashboard() {
  const { user } = useAuth()
  const { entries } = useDiary()

  const sections = [
    { to: '/business/professional', label: 'Overview', icon: '🏠', end: true },
    { to: '/business/professional/diary', label: 'Digital Diary', icon: '📔' },
    { to: '/business/professional/photos', label: 'Daily Photos', icon: '📷' },
    { to: '/business/professional/documents', label: 'Documents', icon: '📁' },
    { to: '/business/professional/report', label: 'Project Report', icon: '📊' },
  ]

  const features = [
    { to: '/business/professional/diary', icon: '📔', title: 'Digital Diary', desc: 'Record daily work, progress & notes' },
    { to: '/business/professional/photos', icon: '📷', title: 'Daily Photo Upload', desc: 'Upload site photos with date & description' },
    { to: '/business/professional/documents', icon: '📁', title: 'Project Documents', desc: 'Agreements, work documents, verification' },
    { to: '/business/professional/report', icon: '📊', title: 'Project Report', desc: 'Auto-generated report from diary + photos' },
    { to: '/business/professional/workhistory', icon: '🕐', title: 'Work History', desc: 'Completed projects & portfolio' },
    { to: '/help', icon: '📞', title: 'Customer Care', desc: 'Call support when you need help' },
  ]

  const stats = [
    { icon: '📔', value: entries.length, label: 'Diary Entries' },
    { icon: '📷', value: '24', label: 'Photos Uploaded' },
    { icon: '📁', value: '8', label: 'Documents' },
    { icon: '✅', value: '3', label: 'Active Projects' },
  ]

  return (
    <DashboardLayout
      title={`Professional Dashboard`}
      subtitle={`Welcome, ${user?.name || 'Professional'} — manage your projects here.`}
      sections={sections}
      body={
        <>
          <div className="dash-grid-4">
            {stats.map((s) => (
              <div className="dash-stat" key={s.label}>
                <div className="icon orange">{s.icon}</div>
                <div className="value">{s.value}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="section-heading">
            <h2>Your Tools</h2>
            <p>Everything you need to manage projects, from diary to report.</p>
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