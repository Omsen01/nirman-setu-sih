import Reveal from '../components/Reveal'
import { useToast } from '../context/ToastContext'
import { reviews } from '../data'

const SKILLS = [
  ['🧱', 'Brickwork', 'Expert'],
  ['🏗️', 'RCC Work', 'Expert'],
  ['🏠', 'Plastering', 'Advanced'],
  ['🪟', 'Tile Work', 'Advanced'],
]

const QUICK_INFO = [
  ['Experience', '10+ Years'],
  ['Projects', '42 Completed'],
  ['Location', 'Sagar, MP'],
  ['Availability', 'Available'],
  ['Languages', 'Hindi, English'],
  ['Member Since', 'Jan 2025'],
]

const similarWorkers = [
  { emoji: '👷', bg: 'linear-gradient(135deg, var(--teal), #4ECDC4)', name: 'Mahesh Gupta', sub: 'Contractor • ★ 4.8' },
  { emoji: '🏗️', bg: 'linear-gradient(135deg, var(--gold), #FFD700)', name: 'Dinesh Sharma', sub: 'RCC Specialist • ★ 4.7' },
  { emoji: '👷', bg: 'linear-gradient(135deg, var(--saffron), #FF8F5C)', name: 'Sunil Verma', sub: 'Mason • ★ 4.6' },
]

export default function Profile() {
  const { showToast } = useToast()

  return (
    <>
      <section className="profile-hero">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="container">
          <div className="profile-header">
            <div className="profile-avatar-lg">👷</div>
            <div className="profile-info">
              <h1>Rajesh Kumar</h1>
              <p className="role">Mason & RCC Professional</p>
              <p className="location">📍 Sagar, Madhya Pradesh</p>
            </div>
            <div className="profile-badges">
              <span className="worker-badge badge-verified" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>✓ Verified Professional</span>
              <span className="worker-badge badge-top" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>⭐ Top Rated</span>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-body">
        <div className="container">
          <div className="profile-grid">
            {/* LEFT COLUMN */}
            <div>
              <div className="profile-section">
                <h3>📊 Overview</h3>
                <div className="stats-grid">
                  <div className="stat-card"><div className="value">10+</div><div className="label">Years Experience</div></div>
                  <div className="stat-card"><div className="value">42</div><div className="label">Projects Completed</div></div>
                  <div className="stat-card"><div className="value">4.8</div><div className="label">Average Rating</div></div>
                  <div className="stat-card"><div className="value">124</div><div className="label">Customer Reviews</div></div>
                </div>

                <div className="progress-bar-wrapper">
                  <div className="progress-label">
                    <span className="name">Profile Completion</span>
                    <span className="percent">92%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill orange" data-width="92%" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="progress-bar-wrapper">
                  <div className="progress-label">
                    <span className="name">Customer Satisfaction</span>
                    <span className="percent">96%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill teal" data-width="96%" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>👤 About</h3>
                <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  Experienced masonry and RCC professional with over 10 years of hands-on experience
                  in residential and commercial construction. Specialized in brickwork, RCC structures,
                  plastering, and tile work. Have successfully completed 42 projects across Madhya Pradesh.
                  Known for quality workmanship, timely delivery, and transparent communication with clients.
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                  {['Brickwork Expert', 'RCC Specialist', 'On-time Delivery', 'Team Leader'].map((badge, i) => (
                    <span key={badge} style={{
                      padding: '6px 14px', borderRadius: 50, fontSize: '0.8rem', fontWeight: 600,
                      background: ['rgba(255,107,43,0.1)', 'rgba(0,191,166,0.1)', 'rgba(255,184,0,0.1)', 'rgba(59,130,246,0.1)'][i],
                      color: ['var(--saffron)', 'var(--teal)', 'var(--gold)', '#3B82F6'][i],
                    }}>{badge}</span>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <h3>🛠️ Skills & Expertise</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {SKILLS.map(([emoji, name, level]) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--gray-50)', borderRadius: 'var(--radius)' }}>
                      <span style={{ fontSize: '1.3rem' }}>{emoji}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--gray-800)' }}>{name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{level}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <h3>📁 Portfolio</h3>
                <div className="portfolio-grid">
                  {['#FFE5D0', '#D0F0FF', '#E0FFE5', '#FFF0D0'].map((color, i) => (
                    <div key={i} className="portfolio-item" style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}>
                      {['🏠', '🏢', '🏗️', '🏘️'][i]}
                    </div>
                  ))}
                </div>
              </div>

              <Reveal className="profile-section">
                <h3>⭐ Customer Reviews</h3>
                {reviews.map((review) => (
                  <div className="review-item" key={review.author}>
                    <div className="review-header">
                      <div className="review-avatar" style={{ background: review.color }}>{review.initials}</div>
                      <div>
                        <div className="review-author">{review.author}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{review.meta}</div>
                      </div>
                      <div className="review-stars">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</div>
                    </div>
                    <p className="review-text">{review.text}</p>
                  </div>
                ))}
              </Reveal>
            </div>

            {/* RIGHT COLUMN */}
            <div>
              <div className="profile-section">
                <h3>📋 Quick Info</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {QUICK_INFO.map(([label, value], i) => (
                    <div key={label} style={{
                      display: 'flex', justifyContent: 'space-between',
                      paddingBottom: i < QUICK_INFO.length - 1 ? 12 : undefined,
                      borderBottom: i < QUICK_INFO.length - 1 ? '1px solid var(--gray-100)' : undefined,
                    }}>
                      <span style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{label}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: label === 'Availability' ? 'var(--teal)' : 'var(--gray-800)' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="profile-section" style={{ textAlign: 'center' }}>
                <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}
                  onClick={() => showToast('Quotation request sent to Rajesh Kumar!')}>
                  Request Quotation
                </button>
                <button className="btn btn-teal btn-lg" style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}
                  onClick={() => showToast('Message request sent!')}>
                  💬 Send Message
                </button>
                <button className="btn btn-outline btn-lg" style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => showToast('Contact details shared!')}>
                  📞 Contact
                </button>
              </div>

              <div className="profile-section">
                <h3>👥 Similar Professionals</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {similarWorkers.map((worker) => (
                    <div key={worker.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 'var(--radius)', cursor: 'pointer', transition: 'var(--transition)', background: 'var(--white)' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gray-50)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'var(--white)'}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: worker.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{worker.emoji}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--gray-800)' }}>{worker.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{worker.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}