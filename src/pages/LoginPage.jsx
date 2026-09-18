import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function LoginPage() {
  const { login, requestOtp, verifyOtp } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [mode, setMode] = useState('pin') // 'pin' | 'otp'
  const [mobile, setMobile] = useState('')
  const [pinOrOtp, setPinOrOtp] = useState('')
  const [otpDev, setOtpDev] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (mode === 'pin') {
      const res = await login({ mobile, pin: pinOrOtp })
      if (res.ok) {
        showToast('Login successful!')
        navigate(res.user.role === 'business' ? '/business' : res.user.role === 'customer' ? '/customer' : '/choose-role')
      } else {
        showToast(res.error || 'Login failed')
      }
    } else {
      const res = await verifyOtp({ mobile, otp: pinOrOtp })
      if (res.ok) {
        showToast('OTP verified. Login successful!')
        navigate(res.user.role === 'business' ? '/business' : res.user.role === 'customer' ? '/customer' : '/choose-role')
      } else {
        showToast(res.error || 'OTP verification failed')
      }
    }
    setLoading(false)
  }

  const requestOtpHandler = async () => {
    if (mobile.length < 10) { showToast('Enter a valid mobile number first'); return }
    const res = await requestOtp({ mobile })
    if (res.devCode) {
      setOtpDev(`Dev OTP: ${res.devCode}`)
      setPinOrOtp(res.devCode)
    }
    setMode('otp')
    showToast('OTP sent! Check your phone')
  }

  return (
    <div className="auth-page">
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      <div className="auth-card">
        <Logo size={64} className="logo-img" />
        <h1>Welcome Back</h1>
        <p className="auth-sub">Sign in to your Nirman SETU account</p>

        <div className="auth-tabs">
          <button className={`auth-tab ${mode === 'pin' ? 'active' : ''}`} onClick={() => { setMode('pin'); setPinOrOtp('') }}>PIN Login</button>
          <button className={`auth-tab ${mode === 'otp' ? 'active' : ''}`} onClick={() => { setMode('otp'); setPinOrOtp('') }}>OTP Login</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>📱 Mobile Number</label>
            <input type="tel" placeholder="10-digit mobile number" value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))} required />
          </div>

          {mode === 'pin' ? (
            <>
              <div className="form-group">
                <label>🔑 PIN / Password</label>
                <input type="password" placeholder="Enter your 4-6 digit PIN" value={pinOrOtp}
                  onChange={(e) => setPinOrOtp(e.target.value)} required />
              </div>
              <button className="btn btn-primary btn-lg auth-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>📨 OTP Code</label>
                <input type="text" placeholder="6-digit OTP" value={pinOrOtp} maxLength={6}
                  onChange={(e) => setPinOrOtp(e.target.value.replace(/[^0-9]/g, ''))} required />
              </div>
              {otpDev && <div className="auth-dev-hint">{otpDev}</div>}
              <button type="button" className="btn btn-outline auth-btn" onClick={requestOtpHandler}>
                Resend OTP
              </button>
              <button className="btn btn-primary btn-lg auth-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Sign In →'}
              </button>
            </>
          )}
        </form>

        <p className="auth-foot">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <div className="auth-demo">Demo: 9000000001–4 / PIN 1234 · OTP 123456</div>
      </div>
    </div>
  )
}