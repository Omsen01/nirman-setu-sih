import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { useToast } from '../context/ToastContext'

const faqs = [
  { q: 'How do I find a worker?', a: 'Login as Customer Admin → choose Transportation / Water / Residential → select your project type → browse the worker list and view profiles.' },
  { q: 'How do I request a service?', a: 'Open a worker profile and tap "Request Service". Fill the form, add photos/documents and send the request. The worker will be notified.' },
  { q: 'How do I upload daily photos as a professional?', a: 'Login as Business Admin → Professional → Digital Diary → Daily Photo. Select date, describe the work and upload.' },
  { q: 'How do government tenders work?', a: 'Government Admin publishes tenders. Companies apply through Corporate Admin. Selected applications then move to Digital Inspection.' },
  { q: 'How is my data kept safe?', a: 'Login is protected with OTP/PIN, documents are stored securely, and every major action is recorded with timestamp.' },
  { q: 'What if I need help filling a form?', a: 'Call customer care and our support team will assist you step by step. You can also raise a complaint from this page.' },
]

export default function HelpDeskPage() {
  const { showToast } = useToast()
  const [form, setForm] = useState({ name: '', mobile: '', subject: '', message: '' })

  const submit = (e) => {
    e.preventDefault()
    showToast('Complaint submitted! Our team will contact you soon.')
    setForm({ name: '', mobile: '', subject: '', message: '' })
  }

  return (
    <div className="page-header help-header">
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="container">
        <Logo size={56} className="logo-img" />
        <h1>Help & Customer Support</h1>
        <p>Need assistance? We're here to help — call us or raise a support ticket.</p>

        <div className="help-grid">
          <div className="help-call-card">
            <div className="help-call-icon">📞</div>
            <h3>Customer Care</h3>
            <div className="help-number">1800-180-1234</div>
            <p>Available 8 AM – 10 PM, all days</p>
            <a href="tel:18001801234" className="btn btn-primary btn-lg">📞 Call Now</a>
            <p className="help-call-sub">Having difficulty filling details? Our support team can help you.</p>
          </div>

          <div className="help-actions-card">
            <Link to="/help/complaint" className="help-action" onClick={(e) => e.preventDefault()}>
              <span>📝</span> Raise Complaint
            </Link>
            <button className="help-action" onClick={() => showToast('Filling assistance: call 1800-180-1234')}>
              <span>🆘</span> Get Assistance
            </button>
            <Link to="/language" className="help-action">
              <span>🌐</span> Change Language
            </Link>
          </div>
        </div>

        <div className="help-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <details key={i} className="faq-item" open={i === 0}>
                <summary>❓ {f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="help-section">
          <h2>Complaint / Support Form</h2>
          <form className="help-form" onSubmit={submit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input value={form.mobile} onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))} required />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} placeholder="e.g. Cannot upload project photo" required />
            </div>
            <div className="form-group">
              <label>Describe your issue</label>
              <textarea rows={4} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} required />
            </div>
            <button className="btn btn-primary btn-lg">Submit Complaint →</button>
          </form>
        </div>
      </div>
    </div>
  )
}