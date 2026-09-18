import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useDiary } from '../hooks/useCatalog'
import { useToast } from '../context/ToastContext'
import { api } from '../api/client'
import * as demo from '../api/demo'

const sections = [
  { to: '/business/professional', label: 'Overview', icon: '🏠', end: true },
  { to: '/business/professional/diary', label: 'Digital Diary', icon: '📔' },
  { to: '/business/professional/photos', label: 'Daily Photos', icon: '📷' },
  { to: '/business/professional/documents', label: 'Documents', icon: '📁' },
  { to: '/business/professional/report', label: 'Project Report', icon: '📊' },
]

export default function DiaryPage() {
  const { entries, reload } = useDiary()
  const { showToast } = useToast()
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), work: '', description: '', progress: '', notes: '', issues: '', materialsUsed: '' })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.work) { showToast('Work description is required'); return }
    try {
      await api.post('/me/diary', form)
    } catch {
      demo.addDiary(form)
    }
    showToast('Diary entry saved! ✔')
    setForm({ date: new Date().toISOString().slice(0, 10), work: '', description: '', progress: '', notes: '', issues: '', materialsUsed: '' })
    reload()
  }

  return (
    <DashboardLayout
      title="Digital Diary"
      subtitle="Record your daily work, progress and issues — build your project record."
      sections={sections}
      body={
        <>
          <div className="post-project-form">
            <h2>📔 Today's Entry</h2>
            <form onSubmit={submit}>
              <div className="form-row">
                <div className="form-group">
                  <label>📅 Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>🏗️ Work Done *</label>
                  <input placeholder="e.g. Brickwork on first floor east wall" value={form.work}
                    onChange={(e) => setForm((f) => ({ ...f, work: e.target.value }))} required />
                </div>
              </div>
              <div className="form-group">
                <label>📝 Work Description</label>
                <textarea rows={3} placeholder="Describe what was done today" value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>📈 Progress</label>
                  <input placeholder="e.g. 10% of brickwork completed" value={form.progress}
                    onChange={(e) => setForm((f) => ({ ...f, progress: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>🧱 Materials Used</label>
                  <input placeholder="e.g. 40 bags cement, 3000 bricks" value={form.materialsUsed}
                    onChange={(e) => setForm((f) => ({ ...f, materialsUsed: e.target.value }))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>⚠️ Issues / Problems</label>
                  <input placeholder="e.g. Sand delivery delayed" value={form.issues}
                    onChange={(e) => setForm((f) => ({ ...f, issues: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>📌 Notes</label>
                  <input placeholder="Reminders & follow-ups" value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
                </div>
              </div>
              <button className="btn btn-primary btn-lg auth-btn">💾 Save Entry</button>
            </form>
          </div>

          <div style={{ height: 32 }} />

          <div className="section-heading">
            <h2>Diary History ({entries.length})</h2>
          </div>
          {entries.length === 0 ? (
            <div className="empty-box"><h3>No diary entries yet</h3><p>Save your first entry above.</p></div>
          ) : (
            <div className="diary-list">
              {entries.map((e) => (
                <div className="diary-card" key={e._id}>
                  <div className="diary-date">
                    <b>{e.date}</b>
                    <button className="btn btn-outline btn-sm" onClick={async () => {
                      if (confirm('Delete this entry?')) {
                        try { await api.del(`/me/diary/${e._id}`) } catch { demo.removeDiary(e._id) }
                        showToast('Entry deleted')
                        reload()
                      }
                    }}>✕</button>
                  </div>
                  <h3>{e.work}</h3>
                  {e.description && <p>{e.description}</p>}
                  <div className="diary-meta">
                    {e.progress && <span>📈 {e.progress}</span>}
                    {e.materialsUsed && <span>🧱 {e.materialsUsed}</span>}
                    {e.issues && <span>⚠️ {e.issues}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      }
    />
  )
}