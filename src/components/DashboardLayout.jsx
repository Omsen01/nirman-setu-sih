import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function DashboardLayout({ title, subtitle, sections, children }) {
  const { user, logout } = useAuth()
  const { lang } = useLanguage()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="dash-shell">
      <aside className="dash-sidebar">
        <Link to="/" className="dash-brand">
          <Logo size={38} className="logo-img" />
          <span>NIRMAN <b>SETU</b></span>
        </Link>
        <div className="dash-user">
          <div className="dash-avatar">{user?.avatar || '👤'}</div>
          <div>
            <div className="dash-user-name">{user?.name || 'User'}</div>
            <div className="dash-user-role">{lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}</div>
          </div>
        </div>
        <nav className="dash-nav">
          {sections.map((s) => (
            <NavLink key={s.to} to={s.to} end={s.end} className={({ isActive }) => `dash-link ${isActive ? 'active' : ''}`}>
              <span>{s.icon}</span> {s.label}
            </NavLink>
          ))}
        </nav>
        <div className="dash-side-foot">
          <div className="dash-help">
            <div>📞 Need Help?</div>
            <b>1800-180-1234</b>
          </div>
          <button className="btn btn-outline btn-sm" onClick={handleLogout}>🚪 {lang === 'hi' ? 'लॉगआउट' : 'Logout'}</button>
        </div>
      </aside>

      <main className="dash-main-area">
        <header className="dash-topbar">
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="dash-top-actions">{children?.top}</div>
        </header>
        <div className="dash-content">{children?.body}</div>
      </main>
    </div>
  )
}