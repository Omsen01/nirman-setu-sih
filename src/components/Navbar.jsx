import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === '/'
  const isDashboard = location.pathname.startsWith('/customer') || location.pathname.startsWith('/business')

  if (isDashboard) return null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const homeDashboard = user?.role === 'customer' ? '/customer' : user?.role ? '/business' : null

  return (
    <>
      <nav className={`navbar ${scrolled || !isHome ? 'scrolled' : ''}`}>
        <div className="container">
          <Link to="/" className="logo">
            <Logo size={40} className="logo-img" />
            NIRMAN <span>SETU</span>
          </Link>

          <ul className="nav-links">
            <li>
              <Link to="/" style={isHome ? { color: 'var(--saffron)' } : undefined}>
                {t.home}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                style={location.pathname === '/about' ? { color: 'var(--saffron)' } : undefined}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                style={location.pathname === '/help' ? { color: 'var(--saffron)' } : undefined}
              >
                {t.helpDesk}
              </Link>
            </li>
            <li>
              <Link
                to="/language"
                style={location.pathname === '/language' ? { color: 'var(--saffron)' } : undefined}
              >
                🌐 {t.language}
              </Link>
            </li>
          </ul>

          <div className="nav-cta">
            {user ? (
              <>
                <Link to={homeDashboard || '/choose-role'} className="btn btn-secondary">
                  Dashboard
                </Link>
                <button className="btn btn-primary" onClick={handleLogout}>
                  {t.login ? 'Logout' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  {t.login}
                </Link>
                <Link to="/register" className="btn btn-primary">
                  {t.register}
                </Link>
              </>
            )}
          </div>

          <div className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>&times;</button>
        <Link to="/">{t.home}</Link>
        <Link to="/about">About</Link>
        <Link to="/help">{t.helpDesk}</Link>
        <Link to="/language">🌐 {t.language}</Link>
        {user ? (
          <>
            <Link to={homeDashboard || '/choose-role'} className="btn btn-primary">Dashboard</Link>
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">{t.login}</Link>
            <Link to="/register" className="btn btn-outline">{t.register}</Link>
          </>
        )}
      </div>
    </>
  )
}