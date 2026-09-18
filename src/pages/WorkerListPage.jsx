import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import WorkerCard from '../components/WorkerCard'
import { useWorkers } from '../hooks/useCatalog'

const meta = {
  railway: { icon: '🚆', title: 'Railway Project', desc: 'Find workers for railway bridges, tracks, signalling & stations', sub: '🚆 RAILWAY PROJECT' },
  road: { icon: '🛣️', title: 'Road Project', desc: 'Find workers for highways, roads, culverts & road furniture', sub: '🛣 ROAD PROJECT' },
  water: { icon: '💧', title: 'Water Project', desc: 'Find workers for pipelines, WTP, tanks & water supply', sub: '💧 WATER PROJECT' },
  residential: { icon: '🏠', title: 'Residential Project', desc: 'Find workers for homes, interiors & renovations', sub: '🏠 RESIDENTIAL PROJECT' },
}

export default function WorkerListPage() {
  const { category } = useParams()
  const m = meta[category] || meta.residential
  const { workers, loading, offline } = useWorkers(category)

  const sections = [
    { to: '/customer', label: 'Overview', icon: '🏠', end: true },
    { to: '/customer/transportation', label: 'Transportation', icon: '🚆', end: true },
    { to: '/customer/workers/water', label: 'Water Project', icon: '💧' },
    { to: '/customer/workers/residential', label: 'Residential Project', icon: '🏠' },
    { to: '/customer/requests', label: 'My Requests', icon: '📨' },
  ]

  return (
    <DashboardLayout
      title={m.title}
      subtitle={m.desc}
      sections={sections}
      body={
        <>
          {offline && !loading && <div className="offline-banner">⚡ Offline demo mode — showing sample workers.</div>}
          <div className="dash-breadcrumb">
            <Link to="/customer">Customer Dashboard</Link>
            <span>→</span>
            <b>{m.sub}</b>
          </div>

          {loading ? (
            <div className="loading-box">Loading workers…</div>
          ) : workers.length === 0 ? (
            <div className="empty-box">
              <div style={{ fontSize: '3rem' }}>🔍</div>
              <h3>No workers found</h3>
              <p>Try a different category.</p>
            </div>
          ) : (
            <div className="workers-grid">
              {workers.map((w) => <WorkerCard key={w.id || w._id} worker={w} />)}
            </div>
          )}
        </>
      }
    />
  )
}