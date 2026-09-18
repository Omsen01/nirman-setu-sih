import { useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useModal } from '../context/ModalContext'

export default function LoginModal() {
  const { activeModal, closeModal, openRegistration } = useModal()
  const navigate = useNavigate()

  if (activeModal !== 'login') return null

  const handleSubmit = (e) => {
    e.preventDefault()
    closeModal()
    navigate('/dashboard')
  }

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>&times;</button>
        <div className="modal-header">
          <Logo size={56} className="logo-img" />
          <h2>Welcome Back</h2>
          <p>Sign in to your Nirman SETU account</p>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email or Phone</label>
              <input type="text" placeholder="Enter email or phone number" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" required />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--gray-600)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--saffron)' }} /> Remember me
              </label>
              <a href="#" style={{ fontSize: '0.85rem', color: 'var(--saffron)', fontWeight: 500 }}>Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              Sign In &rarr;
            </button>
          </form>
        </div>
        <div className="modal-footer">
          <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.9rem', color: 'var(--gray-500)' }}>
            Don't have an account?{' '}
            <a href="#" style={{ color: 'var(--saffron)', fontWeight: 600 }} onClick={(e) => { e.preventDefault(); openRegistration() }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}