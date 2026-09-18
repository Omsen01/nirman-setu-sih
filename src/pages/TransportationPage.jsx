import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'

const options = [
  { to: '/customer/workers/railway', icon: '🚆', title: 'Railway Project', desc: 'Find workers for railway bridges, tracks, signalling, stations & electrification', color: 'orange' },
  { to: '/customer/workers/road', icon: '🛣', title: 'Road Project', desc: 'Find workers for highways, roads, culverts, drainage & road furniture', color: 'teal' },
]

export default function TransportationPage() {
  const sections = [
    { to: '/customer', label: 'Overview', icon: '🏠', end: true },
    { to: '/customer/transportation', label: 'Transportation', icon: '🚆', end: true },
    { to: '/customer/water', label: 'Water Project', icon: '💧' },
    { to: '/customer/residential', label: 'Residential Project', icon: '🏠' },
  ]

  return (
    <DashboardLayout
      title="Transportation"
      subtitle="Choose a transportation project type"
      sections={sections}
      body={
        <div className="dash-cat-grid">
          {options.map((c) => (
            <Link to={c.to} key={c.title} className={`cat-card cat-${c.color}`} style={{ textDecoration: 'none' }}>
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-title">{c.title}</span>
              <span className="cat-desc">{c.desc}</span>
              <span className="cat-open">Open →</span>
            </Link>
          ))}
        </div>
      }
    />
  )
}