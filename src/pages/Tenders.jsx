import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal'
import { useToast } from '../context/ToastContext'
import { tenders, auditTrail } from '../data'

const CATEGORIES = ['All Categories', ...new Set(tenders.map((t) => t.category))]

export default function Tenders() {
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [expandedId, setExpandedId] = useState(null)
  const [showTrail, setShowTrail] = useState(false)

  const filtered = useMemo(() => {
    return tenders.filter((t) => {
      const q = query.toLowerCase()
      const nameMatch = !q || t.title.toLowerCase().includes(q) || t.department.toLowerCase().includes(q)
      const catMatch = category === 'All Categories' || t.category === category
      return nameMatch && catMatch
    })
  }, [query, category])

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id))

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Government Tenders</h1>
          <p>Transparent, traceable construction opportunities with eligibility verification</p>
        </div>
      </div>

      <div className="search-bar-container">
        <div className="search-bar">
          <div className="search-input-group">
            <span className="icon">🔍</span>
            <input
              type="text"
              placeholder="Search tenders by keyword or department..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="search-input-group">
            <span className="icon">📂</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button
            className="btn btn-teal"
            style={{ borderRadius: 'var(--radius-lg)', padding: '14px 28px', whiteSpace: 'nowrap' }}
            onClick={() => setShowTrail((p) => !p)}
          >
            📜 Audit Trail
          </button>
        </div>
      </div>

      <div className="container">
        {/* AUDIT TRAIL OVERLAY */}
        {showTrail && (
          <Reveal className="audit-overlay">
            <div className="audit-header">
              <h3>📜 Digital Audit Trail</h3>
              <button className="modal-close" onClick={() => setShowTrail(false)} style={{ position: 'static', width: 32, height: 32 }}>&times;</button>
            </div>
            <p className="audit-subtitle">Every major action is recorded — WHO · WHAT · WHEN · WHY</p>
            <div className="audit-timeline">
              {auditTrail.map((item, i) => (
                <div className="audit-step" key={i}>
                  <div className="audit-dot"></div>
                  <div className="audit-line"></div>
                  <div className="audit-content">
                    <div className="audit-title">{item.step}</div>
                    <div className="audit-by">{item.by} • {item.when}</div>
                    <div className="audit-note">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <div style={{ padding: '48px 0 16px' }}>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem' }}>
            Showing <strong style={{ color: 'var(--gray-900)' }}>{filtered.length}</strong> active tender{filtered.length !== 1 && 's'}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="tenders-list">
            {filtered.map((t) => {
              const met = t.eligibility.filter((e) => e.met).length
              const total = t.eligibility.length
              const expanded = expandedId === t.id
              return (
                <Reveal key={t.id} className="tender-card">
                  <div className="tender-row" onClick={() => toggle(t.id)}>
                    <div className="tender-id">{t.id}</div>
                    <div className="tender-info">
                      <h3>{t.title}</h3>
                      <p>{t.department} • 📍 {t.location} • {t.category}</p>
                    </div>
                    <div className="tender-meta">
                      <div className="tender-value">{t.value}</div>
                      <div className="tender-deadline">Deadline: {t.deadline}</div>
                    </div>
                    <div className="tender-eligibility-meter">
                      <div className="tender-meter-label">Eligibility</div>
                      <div className="tender-meter-bar">
                        <div className="tender-meter-fill" style={{ width: `${(met / total) * 100}%`, background: met === total ? 'var(--teal)' : met / total >= 0.5 ? 'var(--gold)' : 'var(--saffron)' }}></div>
                      </div>
                      <div className="tender-meter-value">{met}/{total} checks met</div>
                    </div>
                    <div className="tender-chevron">{expanded ? '▾' : '▸'}</div>
                  </div>

                  {expanded && (
                    <div className="tender-detail">
                      <p className="tender-desc">{t.description}</p>
                      <div className="tender-grid">
                        <div className="tender-detail-card">
                          <h4>Eligibility Checklist</h4>
                          <div className="tender-checks">
                            {t.eligibility.map((e, i) => (
                              <div className={`tender-check ${e.met ? 'met' : 'not-met'}`} key={i}>
                                <span className="check-icon">{e.met ? '✅' : '❌'}</span>
                                {e.item}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="tender-detail-card">
                          <h4>Tender Details</h4>
                          <div className="tender-details">
                            <div><span>Published</span><strong>{t.published}</strong></div>
                            <div><span>Deadline</span><strong>{t.deadline}</strong></div>
                            <div><span>Value</span><strong>{t.value}</strong></div>
                            <div><span>Category</span><strong>{t.category}</strong></div>
                            <div><span>Status</span><strong>{t.status}</strong></div>
                          </div>
                          <button
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
                            onClick={() => showToast(`Quotation request submitted for tender ${t.id}!`)}
                          >
                            Apply for Tender &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Reveal>
              )
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>📋</div>
            <h3 style={{ color: 'var(--gray-800)', marginBottom: 8 }}>No tenders found</h3>
            <p style={{ color: 'var(--gray-500)' }}>Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </>
  )
}