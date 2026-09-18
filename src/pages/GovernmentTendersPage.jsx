import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useTenders } from '../hooks/useCatalog'

const sections = [
  { to: '/business/government', label: 'Overview', icon: '🏠', end: true },
  { to: '/business/government/projects', label: 'Government Projects', icon: '🏗️' },
  { to: '/business/government/tenders', label: 'Tender List', icon: '📋' },
  { to: '/business/government/applications', label: 'Tender Applications', icon: '📥' },
  { to: '/business/government/inspection', label: 'Digital Inspection', icon: '🔎' },
  { to: '/business/government/monitoring', label: 'Project Monitoring', icon: '📈' },
]

export default function GovernmentTendersPage() {
  const { tenders, loading } = useTenders()
  const [expanded, setExpanded] = useState(null)

  return (
    <DashboardLayout
      title="Government Tender List"
      subtitle="View tender details, deadline, eligibility & status."
      sections={sections}
      body={
        loading ? (
          <div className="loading-box">Loading tenders…</div>
        ) : (
          <div className="tenders-list">
            {tenders.map((t) => {
              const met = (t.eligibility || []).filter((e) => e.met).length
              const total = (t.eligibility || []).length
              const open = expanded === t.tenderId || expanded === t._id
              return (
                <div className="tender-card" key={t._id || t.tenderId}>
                  <div className="tender-row" onClick={() => setExpanded(open ? null : (t._id || t.tenderId))}>
                    <div className="tender-id">{t.tenderId}</div>
                    <div className="tender-info">
                      <h3>{t.title}</h3>
                      <p>{t.department} · 📍 {t.location} · {t.category}</p>
                    </div>
                    <div className="tender-meta">
                      <div className="tender-value">{t.value}</div>
                      <div className="tender-deadline">Deadline: {t.deadline}</div>
                    </div>
                    <div className="tender-chevron">{open ? '▾' : '▸'}</div>
                  </div>
                  {open && (
                    <div className="tender-detail">
                      <p className="tender-desc">{t.description}</p>
                      <div className="tender-grid">
                        <div className="tender-detail-card">
                          <h4>Eligibility Checklist ({met}/{total})</h4>
                          <div className="tender-checks">
                            {(t.eligibility || []).map((e, i) => (
                              <div className={`tender-check ${e.met ? 'met' : 'not-met'}`} key={i}>
                                <span className="check-icon">{e.met ? '✅' : '❌'}</span>{e.item}
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
                            <div><span>Status</span><strong>{t.status}</strong></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      }
    />
  )
}