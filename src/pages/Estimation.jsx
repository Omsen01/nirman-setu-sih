import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal'
import { useToast } from '../context/ToastContext'

const TIERS = {
  value: { label: 'Value Build', perSqft: 1350, icon: '🥉', desc: 'Basic finish, standard materials' },
  standard: { label: 'Standard Build', perSqft: 1700, icon: '🥈', desc: 'Balanced quality & cost' },
  premium: { label: 'Premium Build', perSqft: 2300, icon: '🥇', desc: 'Premium materials & finishes' },
}

const VAT = (qty, decimals = 0) => Math.max(0, Math.round(qty * 10 ** decimals) / 10 ** decimals)

function useEstimate(area, floors, tierKey) {
  return useMemo(() => {
    const tier = TIERS[tierKey]
    const builtUp = area * floors
    const budget = builtUp * tier.perSqft

    const materials = [
      { name: 'Cement', icon: '🧱', unit: 'bags', qty: VAT(builtUp * 0.267, 0), rate: 420, note: 'OPC/PPC 53 grade' },
      { name: 'Steel (TMT)', icon: '🔩', unit: 'MT', qty: VAT(builtUp * 0.0053, 1), rate: 62000, note: 'Fe 550D' },
      { name: 'Sand', icon: '🏖️', unit: 'm³', qty: VAT(builtUp * 0.0267, 1), rate: 4200, note: 'River / M-sand' },
      { name: 'Aggregate', icon: '🪨', unit: 'm³', qty: VAT(builtUp * 0.02, 1), rate: 3600, note: '20mm & 40mm' },
      { name: 'Bricks', icon: '🧱', unit: 'nos', qty: VAT(builtUp * 10, 0), rate: 8.5, note: '9" × 4.4" standard' },
      { name: 'Tiles & Flooring', icon: '🟫', unit: 'boxes', qty: VAT(builtUp * 0.2, 0), rate: 1400, note: 'Vitrified 60×60' },
      { name: 'Paint (interior + ext.)', icon: '🎨', unit: 'litres', qty: VAT(builtUp * 0.55, 0), rate: 380, note: 'Emulsion + PU' },
    ]

    const materialCost = materials.reduce((sum, m) => sum + m.qty * m.rate, 0)

    const workdays = Math.round(90 + builtUp * 0.12)
    const workers = Math.max(8, Math.round(builtUp * 0.012) + 6)
    const durationMonths = VAT(7 + builtUp / 1500 * 3, 1)

    return { tier, builtUp, budget, materials, materialCost, workdays, workers, durationMonths }
  }, [area, floors, tierKey])
}

const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN')

export default function Estimation() {
  const { showToast } = useToast()
  const [area, setArea] = useState(1500)
  const [floors, setFloors] = useState(1)
  const [tierKey, setTierKey] = useState('standard')

  const est = useEstimate(area, floors, tierKey)

  const laborCost = est.builtUp * 420
  const miscCost = est.budget * 0.02
  const costBreakdown = useMemo(() => {
    const material = est.materialCost
    const labor = est.builtUp * 420
    const misc = est.budget * 0.02
    const total = material + labor + misc
    return [
      { label: 'Materials', value: material, pct: Math.round((material / total) * 100), color: 'var(--saffron)' },
      { label: 'Labour (per skill)', value: labor, pct: Math.round((labor / total) * 100), color: 'var(--teal)' },
      { label: 'Equipment & Misc.', value: misc, pct: Math.round((misc / total) * 100), color: 'var(--gold)' },
    ]
  }, [est])

  const progress = costBreakdown.reduce((acc, c) => acc + c.pct, 0)
  const normBreakdown = costBreakdown.map((c) => ({ ...c, pct: progress ? Math.round((c.pct / progress) * 100) : 0 }))

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Estimation & BOQ</h1>
          <p>Describe your house — get a preliminary budget, materials and labour requirement</p>
        </div>
      </div>

      <div style={{ background: 'var(--gray-50)', minHeight: '100vh', padding: '48px 0 80px' }}>
        <div className="container">
          <div className="est-layout">
            {/* LEFT: CALCULATOR */}
            <Reveal className="est-card">
              <h3 className="est-card-title">🧮 Build Your Estimate</h3>

              <div className="form-group">
                <label>Built-up Area (per floor)</label>
                <div className="est-range-row">
                  <input
                    type="range" min="400" max="6000" step="100" value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--saffron)' }}
                  />
                  <div className="est-range-value">{Number(area).toLocaleString('en-IN')} sq.ft.</div>
                </div>
              </div>

              <div className="form-group">
                <label>Number of Floors</label>
                <div className="est-pills">
                  {[1, 2, 3, 4].map((f) => (
                    <div key={f} className={`est-pill ${floors === f ? 'active' : ''}`} onClick={() => setFloors(f)}>
                      {f === 1 ? 'Ground' : `G+${f - 1}`}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Quality Tier</label>
                <div className="est-tiers">
                  {Object.entries(TIERS).map(([key, t]) => (
                    <div key={key} className={`est-tier ${tierKey === key ? 'active' : ''}`} onClick={() => setTierKey(key)}>
                      <div className="est-tier-icon">{t.icon}</div>
                      <div>
                        <div className="est-tier-name">{t.label}</div>
                        <div className="est-tier-sub">{t.desc}</div>
                      </div>
                      <div className="est-tier-price">{fmt(t.perSqft)}/sq.ft.</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => showToast('Estimate saved! Share this BOQ when requesting quotations.')}
              >
                💾 Save This Estimate
              </button>
            </Reveal>

            {/* RIGHT: RESULTS */}
            <Reveal className="est-results">
              <div className="est-summary">
                <div>
                  <div className="est-summary-label">Estimated Budget</div>
                  <div className="est-summary-value">{fmt(Math.round(est.budget))}</div>
                  <div className="est-summary-sub">
                    {est.builtUp.toLocaleString('en-IN')} sq.ft. total • {est.tier.icon} {est.tier.label}
                  </div>
                </div>
                <div className="est-summary-chip">
                  <span>BOQ — Preliminary</span><br />
                  <small>Final quantities by qualified engineer</small>
                </div>
              </div>

              <div className="est-block">
                <h4>💰 Cost Breakdown</h4>
                {normBreakdown.map((c) => (
                  <div className="est-cost-row" key={c.label}>
                    <div className="est-cost-label">
                      <span className="est-cost-dot" style={{ background: c.color }}></span>
                      {c.label}
                    </div>
                    <div className="est-cost-bar"><div className="est-cost-fill" style={{ width: `${c.pct}%`, background: c.color }}></div></div>
                    <div className="est-cost-value">{c.pct}%</div>
                  </div>
                ))}
                <div className="est-note">
                  Materials {fmt(Math.round(est.materialCost))} + Labour {fmt(Math.round(laborCost))} + Misc. {fmt(Math.round(miscCost))}
                </div>
              </div>

              <div className="est-block">
                <h4>📦 Material Requirement</h4>
                <div style={{ overflowX: 'auto' }}>
                  <table className="est-table">
                    <thead>
                      <tr><th>Material</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>
                    </thead>
                    <tbody>
                      {est.materials.map((m) => (
                        <tr key={m.name}>
                          <td>
                            <span style={{ marginRight: 6 }}>{m.icon}</span>
                            <strong>{m.name}</strong>
                            <div className="est-table-note" style={{ fontSize: '0.72rem', color: 'var(--gray-400)' }}>{m.note}</div>
                          </td>
                          <td>{m.qty.toLocaleString('en-IN')} {m.unit}</td>
                          <td>{fmt(m.rate)}</td>
                          <td><strong>{fmt(Math.round(m.qty * m.rate))}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="est-block">
                <h4>👷 Labour & Timeline</h4>
                <div className="est-meta-grid">
                  <div className="est-meta">
                    <div className="est-meta-icon">👷</div>
                    <div className="est-meta-value">{est.workers} workers</div>
                    <div className="est-meta-sub">estimated requirement</div>
                  </div>
                  <div className="est-meta">
                    <div className="est-meta-icon">📅</div>
                    <div className="est-meta-value">~{est.durationMonths} months</div>
                    <div className="est-meta-sub">construction period</div>
                  </div>
                  <div className="est-meta">
                    <div className="est-meta-icon">⏱️</div>
                    <div className="est-meta-value">{est.workdays.toLocaleString('en-IN')} days</div>
                    <div className="est-meta-sub">estimated workdays</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}