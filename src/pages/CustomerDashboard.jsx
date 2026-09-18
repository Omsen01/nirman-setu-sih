import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { useAuth } from '../context/AuthContext'
import { useRequests } from '../hooks/useCatalog'

const categories = [
  { key: 'transportation', icon: '🚆', title: 'Transportation', desc: 'Railway & road projects', to: '/customer/transportation', color: 'orange' },
  { key: 'water', icon: '💧', title: 'Water Project', desc: 'Pipelines, WTP, tanks', to: '/customer/workers/water', color: 'teal' },
  { key: 'residential', icon: '🏠', title: 'Residential Project', desc: 'Homes & interiors', to: '/customer/workers/residential', color: 'gold' },
]

export default function CustomerDashboard() {
  const { user } = useAuth()
  const { requests } = useRequests()
  const navigate = useNavigate()

  const sections = [
    { to: '/customer', label: 'Overview', icon: '🏠', end: true },
    { to: '/customer/transportation', label: 'Transportation', icon: '🚆', end: true },
    { to: '/customer/workers/water', label: 'Water Project', icon: '💧' },
    { to: '/customer/workers/residential', label: 'Residential Project', icon: '🏠' },
    { to: '/customer/requests', label: 'My Requests', icon: '📨' },
  ]

  const stats = [
    { icon: '📨', value: requests.length, label: 'My Requests' },
    { icon: '👷', value: '12+', label: 'Verified Workers' },
    { icon: '✅', value: '4', label: 'Completed Services' },
  ]

  return (
    <DashboardLayout
      title={`Welcome, ${user?.name || 'Customer'} 👋`}
      subtitle="What kind of project do you need?"
      sections={sections}
      body={
        <>
          <div className="dash-grid-3">
            {stats.map((s) => (
              <div className="dash-stat" key={s.label}>
                <div className="icon orange">{s.icon}</div>
                <div className="value">{s.value}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="section-heading">
            <h2>Choose a Service Category</h2>
            <p>Select the type of project — we'll show you the right workers.</p>
          </div>

          <div className="dash-cat-grid">
            {categories.map((c) => (
              <button key={c.key} className={`cat-card cat-${c.color}`} onClick={() => navigate(c.to)}>
                <span className="cat-icon">{c.icon}</span>
                <span className="cat-title">{c.title}</span>
                <span className="cat-desc">{c.desc}</span>
                <span className="cat-open">Open →</span>
              </button>
            ))}
          </div>

          <div className="dash-call-flex">
            <div className="dash-call-card">
              <span>📞</span>
              <div>
                <b>Need Help?</b>
                <p>Our support team can assist you.</p>
              </div>
              <a href="tel:18001801234" className="btn btn-primary btn-sm">Call Now</a>
            </div>
            <Link to="/search" className="dash-call-card link">
              <span>🔍</span>
              <div>
                <b>Browse all professionals</b>
                <p>Search workers by skill & location</p>
              </div>
              <span className="btn btn-outline btn-sm">Open</span>
            </Link>
          </div>
        </>
      }
    />
  )
}