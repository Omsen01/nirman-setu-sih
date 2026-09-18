import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { useWorkers } from '../hooks/useCatalog'

export default function WorkerProfilePage() {
  const { id } = useParams()
  const { workers } = useWorkers()
  const worker = workers.find((w) => String(w.id || w._id) === String(id))
  const similar = workers.filter((w) => w.id !== worker?.id).slice(0, 3)

  const sections = [
    { to: '/customer', label: 'Overview', icon: '🏠', end: true },
    { to: '/customer/transportation', label: 'Transportation', icon: '🚆', end: true },
    { to: '/customer/workers/water', label: 'Water Project', icon: '💧' },
    { to: '/customer/workers/residential', label: 'Residential Project', icon: '🏠' },
  ]

  if (!worker) return (
    <DashboardLayout title="Not found" sections={sections} body={<div className="empty-box">Worker not found.</div>} />
  )

  const quickInfo = [
    ['Experience', `${worker.exp}+ Years`],
    ['Projects', `${worker.projectsCompleted || '—'} Completed`],
    ['Location', worker.location],
    ['Availability', worker.available ? 'Available' : 'Busy'],
    ['Languages', 'Hindi, English'],
    ['Verification', worker.verified ? '✅ Verified' : 'Pending'],
  ]

  return (
    <DashboardLayout
      title={worker.name}
      subtitle={worker.role}
      sections={sections}
      body={
        <>
          <div className="profile-grid">
            <div>
              <div className="profile-section">
                <div className="worker-card-header" style={{ background: `linear-gradient(135deg, var(--${worker.header || 'orange'}), #fff)` }}>
                  <div className="worker-card-avatar" style={{ fontSize: '3.5rem' }}>{worker.emoji}</div>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
                  {worker.verified && <span className="worker-badge badge-verified">✓ Verified</span>}
                  {worker.topRated && <span className="worker-badge badge-top">⭐ Top Rated</span>}
                  <span className="worker-badge" style={{ background: 'rgba(0,191,166,0.1)', color: 'var(--teal)' }}>{worker.available ? '● Available' : '○ Busy'}</span>
                </div>
              </div>

              <div className="profile-section">
                <h3>👤 About</h3>
                <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>{worker.about || `${worker.name} is a ${worker.role} with ${worker.exp}+ years of experience based in ${worker.location}.`}</p>
              </div>

              <div className="profile-section">
                <h3>🛠️ Skills</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {worker.skills.map((s, i) => (
                    <span key={s} style={{ padding: '8px 16px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, background: ['rgba(255,107,43,0.1)', 'rgba(0,191,166,0.1)', 'rgba(255,184,0,0.1)'].map(c => c)[i % 3], color: ['var(--saffron)', 'var(--teal)', 'var(--gold)'][i % 3] }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <h3>📁 Portfolio</h3>
                <div className="portfolio-grid">
                  {[`${worker.emoji}`, '🏗️', '🏠', '📐'].map((e, i) => (
                    <div key={i} className="portfolio-item" style={{ background: ['linear-gradient(135deg,#FFE5D0,#FFE5D099)', 'linear-gradient(135deg,#D0F0FF,#D0F0FF99)', 'linear-gradient(135deg,#E0FFE5,#E0FFE599)', 'linear-gradient(135deg,#FFF0D0,#FFF0D099)'][i] }}>
                      <span style={{ fontSize: '2.2rem' }}>{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="profile-section">
                <h3>📋 Quick Info</h3>
                {quickInfo.map(([label, value], i) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < quickInfo.length - 1 ? '1px solid var(--gray-100)' : undefined }}>
                    <span style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{label}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: label === 'Availability' && worker.available ? 'var(--teal)' : 'var(--gray-800)' }}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="profile-section" style={{ textAlign: 'center' }}>
                <Link to={`/customer/request/${worker.id || worker._id}`} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}>
                  📤 Request Service
                </Link>
                <a href="tel:18001801234" className="btn btn-teal btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}>
                  📞 Contact Worker
                </a>
                <Link to="/customer" className="btn btn-outline btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                  ← Back to Dashboard
                </Link>
              </div>

              <div className="profile-section">
                <h3>👥 Similar Professionals</h3>
                {similar.map((w) => (
                  <Link to={`/customer/worker/${w.id || w._id}`} key={w.id || w._id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 'var(--radius)', transition: 'var(--transition)', textDecoration: 'none' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, var(--${w.header}), var(--${w.avatarBg}))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{w.emoji}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--gray-800)' }}>{w.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{w.role} · ★ {w.rating}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}