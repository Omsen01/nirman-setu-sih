import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function RegisterPage() {
  const { register, verifyOtp, requestOtp } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', mobile: '', email: '', pin: '', address: '' })
  const [otp, setOtp] = useState('')
  const [devCode, setDevCode] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (form.pin.length < 4) { showToast('PIN must be at least 4 digits'); setLoading(false); return }
    const res = await register(form)
    if (res.ok) {
      if (res.offline) { showToast('Account created (demo mode)'); navigate('/choose-role'); setLoading(false); return }
      if (res.devCode) { setDevCode(res.devCode); setOtp(res.devCode) }
      setStep(2)
      showToast('OTP sent to your mobile!')
    } else {
      showToast(res.error || 'Registration failed')
    }
    setLoading(false)
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await verifyOtp({ mobile: form.mobile, otp })
    setLoading(false)
    if (res.ok) {
      showToast('Account verified! Choose your role.')
      navigate('/choose-role')
    } else {
      showToast(res.error || 'OTP verification failed')
    }
  }

  return (
    <div className="auth-page">
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="auth-card">
        <Logo size={64} className="logo-img" />
        <h1>{step === 1 ? 'Create Your Account' : 'Verify Mobile OTP'}</h1>
        <p className="auth-sub">{step === 1 ? 'Join Nirman SETU' : `OTP sent to ${form.mobile}`}</p>

        {step === 1 ? (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>👤 Full Name</label>
              <input type="text" placeholder="Your name" value={form.name} onChange={set('name')} required />
            </div>
            <div className="form-group">
              <label>📱 Mobile Number</label>
              <input type="tel" placeholder="10-digit mobile" value={form.mobile}
                onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value.replace(/[^0-9]/g, '') }))} required />
            </div>
            <div className="form-group">
              <label>📧 Email (optional)</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>🔑 Set PIN</label>
                <input type="password" placeholder="4-6 digit PIN" value={form.pin}
                  onChange={(e) => setForm((f) => ({ ...f, pin: e.target.value.replace(/[^0-9]/g, '') }))} required />
              </div>
              <div className="form-group">
                <label>📍 Address</label>
                <input type="text" placeholder="City, State" value={form.address} onChange={set('address')} />
              </div>
            </div>
            <button className="btn btn-primary btn-lg auth-btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account →'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <div className="form-group">
              <label>📨 Enter OTP</label>
              <input type="text" placeholder="6-digit OTP" maxLength={6} value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} required />
            </div>
            {devCode && <div className="auth-dev-hint">Dev OTP: {devCode}</div>}
            <button className="btn btn-primary btn-lg auth-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Continue →'}
            </button>
            <button type="button" className="btn btn-outline auth-btn" onClick={async () => {
              const r = await requestOtp({ mobile: form.mobile })
              if (r.devCode) { setDevCode(r.devCode); setOtp(r.devCode) }
              showToast('OTP resent')
            }}>
              Resend OTP
            </button>
          </form>
        )}

        <p className="auth-foot">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <div className="auth-demo">Demo OTP: 123456</div>
      </div>
    </div>
  )
}