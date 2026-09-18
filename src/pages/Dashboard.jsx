import { useToast } from '../context/ToastContext'
import { dashboardStats, materials, team, activities, constructionStages } from '../data'

const STAGE_NAMES = constructionStages
const COMPLETED_STAGES = ['Planning & Estimation', 'Foundation', 'Plinth', 'RCC Structure']

const stageState = (name) => {
  if (COMPLETED_STAGES.includes(name)) return 'completed'
  if (name === 'Brickwork') return 'current'
  return 'pending'
}

const statusStyles = {
  Adequate: { bg: 'rgba(0,191,166,0.1)', color: 'var(--teal)' },
  Low: { bg: 'rgba(255,184,0,0.1)', color: '#B8860B' },
  Reorder: { bg: 'rgba(255,107,43,0.1)', color: 'var(--saffron)' },
}

const budgetItems = [
  { label: 'Material Cost', value: '₹6.8L', note: '60.7% of spent', noteColor: 'var(--teal)' },
  { label: 'Labour Cost', value: '₹3.4L', note: '30.4% of spent', noteColor: 'var(--teal)' },
  { label: 'Equipment & Other', value: '₹1.0L', note: '8.9% of spent', noteColor: 'var(--teal)' },
  { label: 'Remaining Budget', value: '₹13.8L', note: '55.2% available', noteColor: 'var(--gray-400)' },
]

const projectInfo = [
  ['Type', 'Residential'],
  ['Area', '1,500 sq.ft.'],
  ['Floors', 'G+1'],
  ['Start Date', 'Mar 15, 2026'],
  ['Target', 'Dec 2026'],
  ['Status', 'In Progress'],
]

const labourAttendance = [
  { name: 'Rajesh Kumar', role: 'Mason', hours: 8, status: 'Present', bg: 'var(--saffron), var(--gold)', emoji: '👷' },
  { name: 'Sunil Verma', role: 'Plumber', hours: 6, status: 'Present', bg: 'var(--teal), #4ECDC4', emoji: '🔧' },
  { name: 'Vikram Singh', role: 'Electrician', hours: 8, status: 'Present', bg: 'var(--gold), #FFD700', emoji: '⚡' },
  { name: 'Amit Patel', role: 'Civil Engineer', hours: 7, status: 'Present', bg: '#3B82F6, #60A5FA', emoji: '📐' },
  { name: 'Dinesh Sharma', role: 'RCC Worker', hours: 0, status: 'Absent', bg: 'var(--saffron), #FF8F5C', emoji: '👷' },
  { name: 'Mohan Lal', role: 'Shuttering', hours: 5, status: 'Half Day', bg: 'var(--teal), var(--gold)', emoji: '🔨' },
  { name: 'Ravi Thakur', role: 'Bar Bender', hours: 8, status: 'Present', bg: 'var(--saffron), var(--teal)', emoji: '🔩' },
  { name: 'Deepak Jain', role: 'Painter', hours: 0, status: 'Absent', bg: 'var(--gold), var(--saffron)', emoji: '🎨' },
]

const sitePhotos = [
  { emoji: '🧱', label: 'East wall brickwork', date: 'Sep 16, 2026', color: 'rgba(255,107,43,0.08)' },
  { emoji: '🏗️', label: 'RCC beam curing', date: 'Sep 15, 2026', color: 'rgba(0,191,166,0.08)' },
  { emoji: '🏗️', label: 'Column reinforcement', date: 'Sep 14, 2026', color: 'rgba(255,184,0,0.08)' },
  { emoji: '📐', label: 'Layout marking', date: 'Sep 13, 2026', color: 'rgba(59,130,246,0.08)' },
]

const payments = [
  { to: 'Rajesh Kumar', desc: 'Brickwork — 1st floor', amount: '₹1,20,000', date: 'Sep 12, 2026', status: 'Paid', color: 'var(--teal)' },
  { to: 'Triveni Cement Traders', desc: 'Cement — 400 bags', amount: '₹1,68,000', date: 'Sep 08, 2026', status: 'Paid', color: 'var(--teal)' },
  { to: 'Kanha Bricks & Tiles', desc: 'Bricks — 15,000', amount: '₹1,27,500', date: 'Sep 05, 2026', status: 'Paid', color: 'var(--teal)' },
  { to: 'Amit Patel', desc: 'Site supervision — Sep', amount: '₹45,000', date: 'Pending', status: 'Pending', color: 'var(--gold)' },
  { to: 'Vikram Singh', desc: 'Electrical — conduit', amount: '₹38,000', date: 'Pending', status: 'Pending', color: 'var(--gray-400)' },
]

export default function Dashboard() {
  const { showToast } = useToast()

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Project Dashboard</h1>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem' }}>Sharma Residence • Sagar, MP</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>📊 Export Report</button>
            <button className="btn btn-primary" style={{ fontSize: '0.85rem' }}>+ Add Update</button>
          </div>
        </div>

        {/* STATS */}
        <div className="dashboard-grid">
          {dashboardStats.map((stat) => (
            <div className="dash-stat" key={stat.label}>
              <div className={`icon ${stat.iconClass}`}>{stat.icon}</div>
              <div className="value">{stat.value}</div>
              <div className="label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="dash-main">
          {/* LEFT */}
          <div>
            <div className="dash-card">
              <h3>📈 Overall Progress</h3>
              {[
                ['Construction Progress', '46%', 'orange'],
                ['Budget Utilized', '44.8%', 'teal'],
                ['Timeline', '38%', 'orange'],
              ].map(([name, pct, cls]) => (
                <div className="progress-bar-wrapper" key={name}>
                  <div className="progress-label">
                    <span className="name">{name}</span>
                    <span className="percent">{pct}</span>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-fill ${cls}`} data-width={pct} style={{ width: pct }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="dash-card">
              <h3>🏗️ Construction Stages</h3>
              <div className="stage-list">
                {STAGE_NAMES.map((name) => {
                  const state = stageState(name)
                  return (
                    <div className={`stage-item ${state}`} key={name}>
                      <div className={`stage-dot ${state}`}></div>
                      <span className="stage-name">{name}</span>
                      <span style={{ marginLeft: 'auto', fontSize: '0.8rem', fontWeight: 600, color: state === 'completed' ? 'var(--teal)' : state === 'current' ? 'var(--saffron)' : 'var(--gray-400)' }}>
                        {state === 'completed' ? '✓ Done' : state === 'current' ? '⏳ In Progress' : 'Pending'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="dash-card">
              <h3>🧱 Material Status</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
                      {['Material', 'Purchased', 'Used', 'Balance', 'Status'].map((h) => (
                        <th key={h} style={{ textAlign: h === 'Status' ? 'center' : 'left', padding: '12px 8px', color: 'var(--gray-500)', fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((m, i) => {
                      const s = statusStyles[m.status]
                      return (
                        <tr style={{ borderBottom: i < materials.length - 1 ? '1px solid var(--gray-50)' : undefined }} key={m.name}>
                          <td style={{ padding: '12px 8px', fontWeight: 500 }}>{m.name}</td>
                          <td style={{ textAlign: 'right', padding: '12px 8px' }}>{m.purchased}</td>
                          <td style={{ textAlign: 'right', padding: '12px 8px' }}>{m.used}</td>
                          <td style={{ textAlign: 'right', padding: '12px 8px', fontWeight: 600 }}>{m.balance}</td>
                          <td style={{ textAlign: 'center', padding: '12px 8px' }}>
                            <span style={{ padding: '4px 12px', borderRadius: 50, background: s.bg, color: s.color, fontSize: '0.75rem', fontWeight: 600 }}>{m.status}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dash-card">
              <h3>💰 Budget Breakdown</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {budgetItems.map((item) => (
                  <div key={item.label} style={{ padding: 16, background: 'var(--gray-50)', borderRadius: 'var(--radius)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontFamily: "'Space Grotesk'", fontSize: '1.4rem', fontWeight: 800, color: item.label === 'Remaining Budget' ? 'var(--saffron)' : 'var(--gray-900)' }}>{item.value}</div>
                    <div style={{ fontSize: '0.8rem', color: item.noteColor, marginTop: 4 }}>{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dash-card">
              <h3>👷 Labour Attendance — Today</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
                      <th style={{ textAlign: 'left', padding: '10px 8px', color: 'var(--gray-500)', fontWeight: 600, fontSize: '0.78rem' }}>Worker</th>
                      <th style={{ textAlign: 'left', padding: '10px 8px', color: 'var(--gray-500)', fontWeight: 600, fontSize: '0.78rem' }}>Role</th>
                      <th style={{ textAlign: 'center', padding: '10px 8px', color: 'var(--gray-500)', fontWeight: 600, fontSize: '0.78rem' }}>Hours</th>
                      <th style={{ textAlign: 'center', padding: '10px 8px', color: 'var(--gray-500)', fontWeight: 600, fontSize: '0.78rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labourAttendance.map((w, i) => (
                      <tr style={{ borderBottom: i < labourAttendance.length - 1 ? '1px solid var(--gray-50)' : undefined }} key={w.name}>
                        <td style={{ padding: '10px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${w.bg})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>{w.emoji}</div>
                          {w.name}
                        </td>
                        <td style={{ padding: '10px 8px', color: 'var(--gray-500)' }}>{w.role}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'center', fontFamily: "'Space Grotesk'", fontWeight: 700 }}>{w.hours ? `${w.hours}h` : '—'}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                          <span style={{
                            padding: '4px 12px', borderRadius: 50, fontSize: '0.72rem', fontWeight: 600,
                            background: w.status === 'Present' ? 'rgba(0,191,166,0.1)' : w.status === 'Absent' ? 'rgba(192,57,43,0.1)' : 'rgba(255,184,0,0.1)',
                            color: w.status === 'Present' ? 'var(--teal)' : w.status === 'Absent' ? 'var(--brick)' : 'var(--gold)',
                          }}>{w.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dash-card">
              <h3>📸 Site Photos — Recent</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {sitePhotos.map((p) => (
                  <div key={p.label} style={{ background: p.color, borderRadius: 'var(--radius)', padding: 20, textAlign: 'center', cursor: 'pointer', transition: 'var(--transition)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>{p.emoji}</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-800)', marginBottom: 2 }}>{p.label}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--gray-400)' }}>{p.date}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dash-card">
              <h3>💳 Payments</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
                      <th style={{ textAlign: 'left', padding: '10px 8px', color: 'var(--gray-500)', fontWeight: 600, fontSize: '0.78rem' }}>To</th>
                      <th style={{ textAlign: 'left', padding: '10px 8px', color: 'var(--gray-500)', fontWeight: 600, fontSize: '0.78rem' }}>Description</th>
                      <th style={{ textAlign: 'right', padding: '10px 8px', color: 'var(--gray-500)', fontWeight: 600, fontSize: '0.78rem' }}>Amount</th>
                      <th style={{ textAlign: 'right', padding: '10px 8px', color: 'var(--gray-500)', fontWeight: 600, fontSize: '0.78rem' }}>Date</th>
                      <th style={{ textAlign: 'center', padding: '10px 8px', color: 'var(--gray-500)', fontWeight: 600, fontSize: '0.78rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p, i) => (
                      <tr style={{ borderBottom: i < payments.length - 1 ? '1px solid var(--gray-50)' : undefined }} key={p.to + p.desc}>
                        <td style={{ padding: '10px 8px', fontWeight: 500 }}>{p.to}</td>
                        <td style={{ padding: '10px 8px', color: 'var(--gray-500)' }}>{p.desc}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'right', fontFamily: "'Space Grotesk'", fontWeight: 700 }}>{p.amount}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--gray-500)' }}>{p.date}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                          <span style={{
                            padding: '4px 12px', borderRadius: 50, fontSize: '0.72rem', fontWeight: 600,
                            background: p.status === 'Paid' ? 'rgba(0,191,166,0.1)' : 'rgba(255,184,0,0.1)',
                            color: p.status === 'Paid' ? 'var(--teal)' : 'var(--gold)',
                          }}>{p.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            <div className="dash-card">
              <h3>📋 Project Info</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {projectInfo.map(([label, value], i) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: i < projectInfo.length - 1 ? '1px solid var(--gray-50)' : undefined }}>
                    <span style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>{label}</span>
                    {label === 'Status' ? (
                      <span style={{ padding: '4px 12px', borderRadius: 50, background: 'rgba(255,107,43,0.1)', color: 'var(--saffron)', fontSize: '0.8rem', fontWeight: 600 }}>{value}</span>
                    ) : (
                      <span style={{ fontWeight: 600, fontSize: '0.85rem', color: label === 'Target' ? 'var(--saffron)' : 'var(--gray-800)' }}>{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="dash-card">
              <h3>👥 Assigned Team</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {team.map((member) => (
                  <div key={member.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 'var(--radius)', background: 'var(--gray-50)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${member.bg})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{member.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{member.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{member.role}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: member.online ? 'var(--teal)' : 'var(--gray-400)' }}>{member.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dash-card">
              <h3>🕐 Recent Activity</h3>
              {activities.map((activity, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-icon">{activity.icon}</div>
                  <div>
                    <div className="activity-text">{activity.text}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="dash-card">
              <h3>⚡ Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }} onClick={() => showToast('Site photos upload dialog would open here')}>
                  📸 Upload Site Photos
                </button>
                <button className="btn btn-teal" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }} onClick={() => showToast('Material order form would open here')}>
                  📦 Order Materials
                </button>
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }} onClick={() => showToast('Payment tracking would open here')}>
                  💳 View Payments
                </button>
                <a href="/estimation" style={{ display: 'flex', width: '100%', padding: '12px 0', background: 'rgba(255,107,43,0.08)', borderRadius: 'var(--radius)', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 600, color: 'var(--saffron)', transition: 'var(--transition)', textAlign: 'center', textDecoration: 'none' }}>
                  🧮 BOQ / Estimation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}