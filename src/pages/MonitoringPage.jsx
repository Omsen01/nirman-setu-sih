import DashboardLayout from '../components/DashboardLayout'

const sections = [
  { to: '/business/government', label: 'Overview', icon: '🏠', end: true },
  { to: '/business/government/projects', label: 'Government Projects', icon: '🏗️' },
  { to: '/business/government/tenders', label: 'Tender List', icon: '📋' },
  { to: '/business/government/applications', label: 'Tender Applications', icon: '📥' },
  { to: '/business/government/inspection', label: 'Digital Inspection', icon: '🔎' },
  { to: '/business/government/monitoring', label: 'Project Monitoring', icon: '📈' },
]

const projects = [
  { name: 'NH-44 Overbridge — Sagar', contractor: 'Rajesh Construction Services', status: 'In Progress', flag: '🟢', flagText: 'On Track', progress: 46 },
  { name: '10 MLD WTP — Jabalpur', contractor: 'Urbanrise Developers', status: 'In Progress', flag: '🟡', flagText: 'Attention Required', progress: 38 },
  { name: 'School Development — Gwalior', contractor: 'Sita Sub-Contracting', status: 'Soon', flag: '🔴', flagText: 'Delayed', progress: 22 },
  { name: 'Smart City Lighting — Ujjain', contractor: 'Global Interior Concepts', status: 'Completed', flag: '✅', flagText: 'Completed', progress: 100 },
]

export default function MonitoringPage() {
  return (
    <DashboardLayout
      title="Project Monitoring"
      subtitle="Track progress, photos, reports and inspection status of ongoing projects."
      sections={sections}
      body={
        <div className="monitor-list">
          {projects.map((p, i) => (
            <div className="monitor-card" key={i}>
              <div className="monitor-head">
                <div className="monitor-flag">{p.flag}</div>
                <div style={{ flex: 1 }}>
                  <h3>{p.name}</h3>
                  <p>👷 {p.contractor} · {p.status}</p>
                </div>
                <span className={`monitor-badge ${p.flag === '🟢' ? 'teal' : p.flag === '🟡' ? 'gold' : p.flag === '✅' ? 'teal' : 'brick'}`}>{p.flagText}</span>
              </div>
              <div className="progress-bar-wrapper">
                <div className="progress-label"><span className="name">Progress</span><span className="percent">{p.progress}%</span></div>
                <div className="progress-bar"><div className="progress-fill teal" style={{ width: `${p.progress}%` }}></div></div>
              </div>
              <div className="monitor-meta">
                <span>📸 24 photos</span><span>📑 2 reports</span><span>🔎 Inspection: {p.flag === '✅' ? 'Completed' : 'Pending'}</span><span>📅 2026-09</span>
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}