import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useDiary } from '../hooks/useCatalog'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

const sections = [
  { to: '/business/professional', label: 'Overview', icon: '🏠', end: true },
  { to: '/business/professional/diary', label: 'Digital Diary', icon: '📔' },
  { to: '/business/professional/photos', label: 'Daily Photos', icon: '📷' },
  { to: '/business/professional/documents', label: 'Documents', icon: '📁' },
  { to: '/business/professional/report', label: 'Project Report', icon: '📊' },
]

export default function ReportPage() {
  const { entries } = useDiary()
  const { user } = useAuth()
  const { showToast } = useToast()
  const [phase, setPhase] = useState('idle') // idle | collecting | analyzing | generating | done
  const [progress, setProgress] = useState(0)

  const run = () => {
    setPhase('collecting')
    setProgress(10)
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + 15
        if (next >= 100) {
          clearInterval(t)
          setPhase('done')
          return 100
        }
        if (next === 40) setPhase('analyzing')
        if (next === 70) setPhase('generating')
        return next
      })
    }, 350)
  }

  const name = user?.name || 'Professional'

  const reportRows = [
    ['Report Generated For', `${name}`],
    ['Project Type', 'Residential / Infrastructure'],
    ['Diary Entries Used', String(entries.length)],
    ['Photo Records', '24'],
    ['Documents Verified', '8'],
    ['Overall Completion', '62%'],
    ['Quality Summary', 'Work on track — finishing stage'],
  ]

  return (
    <DashboardLayout
      title="Project Report"
      subtitle="Automatically generated from your digital diary, daily photos and documents."
      sections={sections}
      body={
        <div className="report-layout">
          <div className="post-project-form" style={{ alignSelf: 'start' }}>
            <h2>📊 Generate Report</h2>
            <p>Collects project data → analyzes photos & diary → builds a downloadable report.</p>
            <div className="report-flow">
              <div className={`report-step ${['collecting', 'analyzing', 'generating', 'done'].indexOf(phase) >= 0 ? 'done' : ''}`}>
                <span>1</span> Collect Project Data
              </div>
              <div className={`report-step ${['analyzing', 'generating', 'done'].indexOf(phase) >= 0 ? 'done' : ''}`}>
                <span>2</span> Analyze Photos / Data
              </div>
              <div className={`report-step ${['generating', 'done'].indexOf(phase) >= 0 ? 'done' : ''}`}>
                <span>3</span> Generate Report
              </div>
              <div className={`report-step ${phase === 'done' ? 'done' : ''}`}>
                <span>4</span> View / Download
              </div>
            </div>
            {phase !== 'idle' && phase !== 'done' && (
              <div className="progress-bar-wrapper">
                <div className="progress-label"><span className="name">{phase === 'collecting' ? 'Collecting…' : phase === 'analyzing' ? 'Analyzing…' : 'Generating PDF…'}</span><span className="percent">{progress}%</span></div>
                <div className="progress-bar"><div className="progress-fill teal" style={{ width: `${progress}%` }}></div></div>
              </div>
            )}
            {phase === 'done' ? (
              <button className="btn btn-primary btn-lg auth-btn" onClick={() => showToast('Report downloaded (PDF) ✔')}>⬇ Download Report</button>
            ) : (
              <button className="btn btn-primary btn-lg auth-btn" onClick={run} disabled={phase !== 'idle'}>
                {phase === 'idle' ? '⚡ Generate Report' : 'Working…'}
              </button>
            )}
          </div>

          {phase === 'done' && (
            <div className="post-project-form">
              <div className="report-head">
                <div style={{ fontSize: '2rem' }}>📑</div>
                <div>
                  <h2>Nirman SETU — Project Report</h2>
                  <p>Completed report ready to view & store in work history</p>
                </div>
              </div>
              {reportRows.map(([k, v], i) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < reportRows.length - 1 ? '1px solid var(--gray-100)' : undefined }}>
                  <span style={{ color: 'var(--gray-500)' }}>{k}</span>
                  <b>{v}</b>
                </div>
              ))}
              <button className="btn btn-teal btn-lg auth-btn" onClick={() => { showToast('Added to Work History ✔'); }}>➕ Add to Work History</button>
            </div>
          )}
        </div>
      }
    />
  )
}