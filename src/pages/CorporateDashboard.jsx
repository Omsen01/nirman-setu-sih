import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { useAuth } from '../context/AuthContext'

export default function CorporateDashboard() {
  const { user } = useAuth()

  const sections = [
    { to: '/business/corporate', label: 'Overview', icon: '🏠', end: true },
    { to: '/business/corporate/profile', label: 'Company Profile', icon: '🏢' },
    { to: '/business/corporate/projects', label: 'Projects', icon: '🏗️' },
    { to: '/business/corporate/portfolio', label: 'Portfolio', icon: '🖼️' },
    { to: '/business/corporate/opportunities', label: 'Opportunities', icon: '💼' },
    { to: '/tenders', label: 'Apply Tender', icon: '📋' },
  ]

  const features = [
    { to: '/business/corporate/profile', icon: '🏢', title: 'Company Profile', desc: 'Name, logo, services, contact details' },
    { to: '/business/corporate/profile', icon: '👥', title: 'Team Members', desc: 'Manage team roles & professions' },
    { to: '/business/corporate/profile', icon: '🪪', title: 'License Details', desc: 'Upload & manage company licenses' },
    { to: '/business/corporate/projects', icon: '🏗️', title: 'Create / Upload Project', desc: 'New projects with photos & documents' },
    { to: '/business/corporate/portfolio', icon: '🖼️', title: 'Portfolio', desc: 'Showcase completed projects' },
    { to: '/business/corporate/opportunities', icon: '💼', title: 'Opportunities', desc: 'Employment & contract opportunities' },
  ]

  const stats = [
    { icon: '🏗️', value: '3', label: 'Ongoing Projects' },
    { icon: '🖼️', value: '64', label: 'Portfolio Entries' },
    { icon: '📋', value: '5', label: 'Tender Applications' },
    { icon: '⭐', value: '4.8', label: 'Company Rating' },
  ]

  return (
    <DashboardLayout
      title="Corporate Dashboard"
      subtitle={`Welcome, ${user?.name || 'Corporate'} — manage your company identity, projects & portfolio.`}
      sections={sections}
      body={
        <>
          <div className="dash-grid-4">
            {stats.map((s) => (
              <div className="dash-stat" key={s.label}>
                <div className="icon gold">{s.icon}</div>
                <div className="value">{s.value}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="section-heading">
            <h2>Company Modules</h2>
            <p>Your company's complete digital presence.</p>
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