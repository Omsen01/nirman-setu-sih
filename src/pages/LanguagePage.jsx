import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { LANGUAGES, useLanguage } from '../context/LanguageContext'

export default function LanguagePage() {
  const { lang, setLang } = useLanguage()
  const navigate = useNavigate()

  const select = (code) => {
    setLang(code)
    navigate(-1)
  }

  return (
    <div className="auth-page">
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="auth-card" style={{ maxWidth: 560 }}>
        <Logo size={64} className="logo-img" />
        <h1>Select Language</h1>
        <p className="auth-sub">अपनी भाषा चुनें — Choose your language</p>

        <div className="lang-grid">
          {LANGUAGES.map((l) => (
            <button key={l.code} className={`lang-card ${lang === l.code ? 'active' : ''}`} onClick={() => select(l.code)}>
              <span className="lang-flag">{l.flag}</span>
              <span className="lang-label">{l.label}</span>
              <span className="lang-name">{l.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}