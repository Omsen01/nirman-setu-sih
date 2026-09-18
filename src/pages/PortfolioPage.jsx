import DashboardLayout from '../components/DashboardLayout'

const sections = [
  { to: '/business/corporate', label: 'Overview', icon: '🏠', end: true },
  { to: '/business/corporate/profile', label: 'Company Profile', icon: '🏢' },
  { to: '/business/corporate/projects', label: 'Projects', icon: '🏗️' },
  { to: '/business/corporate/portfolio', label: 'Portfolio', icon: '🖼️' },
  { to: '/business/corporate/opportunities', label: 'Opportunities', icon: '💼' },
  { to: '/tenders', label: 'Apply Tender', icon: '📋' },
]

const portfolio = [
  { name: 'Sharma Residence', year: '2025', services: 'RCC + Finishing', outcome: 'Completed on time · 4.8★', status: 'Previous', icon: '🏠' },
  { name: 'Sagar School Block', year: '2025', services: 'Turnkey', outcome: 'Handed over before session', status: 'Previous', icon: '🏫' },
  { name: 'City Mall Interiors', year: '2024', services: 'Interior Design', outcome: '₹8 Cr value · 210 projects total', status: 'Previous', icon: '🏬' },
  { name: 'Nirman Heights (Ongoing)', year: '2026', services: 'RCC Shell', outcome: 'Progress 46% — on track', status: 'Ongoing', icon: '🏗️' },
]

export default function PortfolioPage() {
  return (
    <DashboardLayout
      title="Corporate Portfolio"
      subtitle="Completed and ongoing projects — your company's work history."
      sections={sections}
      body={
        <>
          {['Previous', 'Ongoing'].map((sec) => (
            <div key={sec}>
              <div className="section-heading"><h2>{sec === 'Previous' ? '✅ Completed Projects' : '🏗️ Ongoing Projects'}</h2></div>
              {portfolio.filter((p) => p.status === sec).map((p, i) => (
                <div className="portfolio-row" key={i}>
                  <div className="portfolio-ico">{p.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3>{p.name}</h3>
                    <p>{p.services} · {p.year}</p>
                  </div>
                  <div className="portfolio-outcome">{p.outcome}</div>
                </div>
              ))}
            </div>
          ))}
        </>
      }
    />
  )
}