import { Link } from 'react-router-dom'

const adminTypes = [
  { sub: 'professional', icon: '👷', title: 'Professional Admin', desc: 'Digital diary, daily photos, documents, project reports & work history', to: '/business/professional', color: 'orange' },
  { sub: 'government', icon: '🏛️', title: 'Government Admin', desc: 'Projects, tenders, applications, digital inspection & monitoring', to: '/business/government', color: 'teal' },
  { sub: 'corporate', icon: '🏢', title: 'Corporate Admin', desc: 'Company profile, team, licenses, projects, portfolio & opportunities', to: '/business/corporate', color: 'gold' },
]

export default function BusinessAdminPage() {
  return (
    <div className="auth-page">
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="auth-card" style={{ maxWidth: 760 }}>
        <h1>Business Admin</h1>
        <p className="auth-sub">Select your administration type</p>
        <div className="dash-cat-grid">
          {adminTypes.map((c) => (
            <Link to={c.to} key={c.sub} className={`cat-card cat-${c.color}`} style={{ textDecoration: 'none' }}>
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-title">{c.title}</span>
              <span className="cat-desc">{c.desc}</span>
              <span className="cat-open">Open →</span>
            </Link>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/choose-role" style={{ color: 'var(--saffron)', fontWeight: 600 }}>← Change role</Link>
        </p>
      </div>
    </div>
  )
}