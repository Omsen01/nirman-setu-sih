import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function RoleSelectPage() {
  const { user, selectRole } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const choose = async (role, subRole) => {
    if (!user) { navigate('/login'); return }
    const res = await selectRole({ role, subRole })
    if (res.ok) {
      if (role === 'customer') navigate('/customer')
      else navigate('/business')
    }
  }

  return (
    <div className="auth-page">
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="auth-card" style={{ maxWidth: 720 }}>
        <Logo size={64} className="logo-img" />
        <h1>{t.selectRole}</h1>
        <p className="auth-sub">Welcome, {user?.name} 👋 — where would you like to go?</p>

        <div className="role-selector role-selector-2">
          <button className="role-option role-card-big" onClick={() => choose('customer')}>
            <span className="role-big-icon">👤</span>
            <span className="role-label">{t.customerAdmin}</span>
            <span className="role-desc">Find workers · Request services · Contact professionals</span>
          </button>
          <button className="role-option role-card-big accent" onClick={() => choose('business')}>
            <span className="role-big-icon">🏢</span>
            <span className="role-label">{t.businessAdmin}</span>
            <span className="role-desc">Professional · Government · Corporate dashboards</span>
          </button>
        </div>
      </div>
    </div>
  )
}