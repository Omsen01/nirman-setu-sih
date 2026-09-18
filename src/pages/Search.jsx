import { useMemo, useState } from 'react'
import WorkerCard from '../components/WorkerCard'
import Reveal from '../components/Reveal'
import { workers } from '../data'

const LOCATIONS = [
  'All Locations', 'Delhi', 'Mumbai', 'Bangalore', 'Sagar, MP', 'Bhopal',
  'Jaipur', 'Lucknow', 'Pune', 'Hyderabad', 'Chennai',
]

const SKILLS = [
  'All Skills', 'Masonry', 'Carpentry', 'Electrical', 'Plumbing', 'Painting',
  'RCC Work', 'Interior Design', 'Civil Engineering', 'Architecture', 'AutoCAD',
]

const FILTERS = ['All', '✓ Verified Only', '⭐ Top Rated', '👷 Workers', '📋 Professionals', '🏗️ Available Now']

export default function Search() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [skill, setSkill] = useState('')
  const [activeFilters, setActiveFilters] = useState(new Set(['All']))

  const filtered = useMemo(() => {
    return workers.filter((worker) => {
      const q = query.toLowerCase()
      const nameMatch = !q || worker.name.toLowerCase().includes(q) || worker.role.toLowerCase().includes(q)
      const locationMatch = !location || worker.location.toLowerCase().includes(location.toLowerCase())
      const skillMatch = !skill || worker.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))

      let filterMatch = true
      if (activeFilters.has('✓ Verified Only')) filterMatch = filterMatch && worker.verified
      if (activeFilters.has('⭐ Top Rated')) filterMatch = filterMatch && worker.topRated

      return nameMatch && locationMatch && skillMatch && filterMatch
    })
  }, [query, location, skill, activeFilters])

  const toggleFilter = (filter) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (filter === 'All') {
        return new Set(['All'])
      }
      next.delete('All')
      if (next.has(filter)) next.delete(filter)
      else next.add(filter)
      if (next.size === 0) next.add('All')
      return next
    })
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Find Construction Professionals</h1>
          <p>Search from thousands of verified skilled workers and professionals across India</p>
        </div>
      </div>

      <div className="search-bar-container">
        <div className="search-bar">
          <div className="search-input-group">
            <span className="icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="search-input-group">
            <span className="icon">📍</span>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              {LOCATIONS.map((loc) => <option key={loc} value={loc === 'All Locations' ? '' : loc}>{loc}</option>)}
            </select>
          </div>
          <div className="search-input-group">
            <span className="icon">🛠️</span>
            <select value={skill} onChange={(e) => setSkill(e.target.value)}>
              {SKILLS.map((s) => <option key={s} value={s === 'All Skills' ? '' : s}>{s}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" style={{ borderRadius: 'var(--radius-lg)', padding: '14px 32px' }}>
            Search
          </button>
        </div>

        <div className="filter-tags">
          {FILTERS.map((filter) => (
            <div
              key={filter}
              className={`filter-tag ${activeFilters.has(filter) ? 'active' : ''}`}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div style={{ padding: '48px 0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem' }}>
            Showing <strong style={{ color: 'var(--gray-900)' }}>{filtered.length}</strong> professionals
          </p>
          <select style={{ padding: '8px 16px', border: '1px solid var(--gray-200)', borderRadius: 8, fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: 'var(--gray-600)', background: 'var(--white)', cursor: 'pointer' }}>
            <option>Sort by: Best Match</option>
            <option>Highest Rated</option>
            <option>Most Experienced</option>
            <option>Nearest Location</option>
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="workers-grid">
            {filtered.map((worker) => (
              <Reveal key={worker.id}><WorkerCard worker={worker} /></Reveal>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</div>
            <h3 style={{ color: 'var(--gray-800)', marginBottom: 8 }}>No professionals found</h3>
            <p style={{ color: 'var(--gray-500)' }}>Try adjusting your filters or search terms</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div style={{ textAlign: 'center', padding: '0 0 80px' }}>
            <button className="btn btn-outline btn-lg">Load More Professionals</button>
          </div>
        )}
      </div>
    </>
  )
}