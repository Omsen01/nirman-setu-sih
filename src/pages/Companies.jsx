import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal'
import { useToast } from '../context/ToastContext'
import { companies } from '../data'

const TYPES = ['All Types', ...new Set(companies.map((c) => c.type))]

const gradientMap = {
  orange: 'linear-gradient(135deg, var(--saffron), #FF8F5C)',
  teal: 'linear-gradient(135deg, var(--teal), #4ECDC4)',
  gold: 'linear-gradient(135deg, var(--gold), #FFD700)',
}

export default function Companies() {
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All Types')
  const [onlyVerified, setOnlyVerified] = useState(false)

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const q = query.toLowerCase()
      const nameMatch = !q || c.name.toLowerCase().includes(q) || c.specialization.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q))
      const typeMatch = type === 'All Types' || c.type === type
      const verifiedMatch = !onlyVerified || c.verified
      return nameMatch && typeMatch && verifiedMatch
    })
  }, [query, type, onlyVerified])

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Companies, Contractors & Suppliers</h1>
          <p>Evaluate construction businesses on documented credentials — not just word of mouth</p>
        </div>
      </div>

      <div className="search-bar-container">
        <div className="search-bar">
          <div className="search-input-group">
            <span className="icon">🔍</span>
            <input
              type="text"
              placeholder="Search companies by name, field or specialisation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="search-input-group">
            <span className="icon">🏢</span>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <label className="search-checkbox" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--gray-600)', whiteSpace: 'nowrap', fontWeight: 500 }}>
            <input type="checkbox" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} style={{ accentColor: 'var(--saffron)', width: 16, height: 16 }} />
            Verified only
          </label>
        </div>
      </div>

      <div className="container">
        <div style={{ padding: '48px 0 16px' }}>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem' }}>
            Showing <strong style={{ color: 'var(--gray-900)' }}>{filtered.length}</strong> businesses
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="workers-grid">
            {filtered.map((comp) => (
              <Reveal key={comp.id}>
                <div className="company-card">
                  <div className="worker-card-header" style={{ background: gradientMap[comp.header] }}>
                    <div className="company-avatar">{comp.emoji}</div>
                    {comp.verified && <span className="company-verify">✓ Verified</span>}
                  </div>
                  <div className="company-body">
                    <span className="company-type">{comp.type}</span>
                    <h3>{comp.name}</h3>
                    <p className="company-desc">{comp.description}</p>
                    <div className="company-tags">
                      {comp.tags.map((t) => <span key={t}>{t}</span>)}
                    </div>
                    <div className="company-stats">
                      <div><strong>⭐ {comp.rating}</strong><span>{comp.reviews} reviews</span></div>
                      <div><strong>{comp.exp} yrs</strong><span>experience</span></div>
                      <div><strong>{comp.projects}</strong><span>projects</span></div>
                      <div><strong>{comp.projectValue}</strong><span>portfolio value</span></div>
                    </div>
                    <div className="company-foot">
                      <span>📍 {comp.location}</span>
                      <button className="btn btn-primary" onClick={() => showToast(`Request for proposal sent to ${comp.name}!`)}>
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>🏢</div>
            <h3 style={{ color: 'var(--gray-800)', marginBottom: 8 }}>No businesses found</h3>
            <p style={{ color: 'var(--gray-500)' }}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </>
  )
}