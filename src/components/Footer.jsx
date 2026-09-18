import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <Logo size={40} className="logo-img" />
              NIRMAN <span>SETU</span>
            </Link>
            <p>The digital bridge connecting India's construction workforce with opportunities. Every skill. Every person. Every project.</p>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/choose-role">Get Started</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>For Users</h4>
            <ul>
              <li><Link to="/customer">Customer Admin</Link></li>
              <li><Link to="/business/professional">Professional</Link></li>
              <li><Link to="/business/government">Government</Link></li>
              <li><Link to="/business/corporate">Corporate</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Nirman SETU. Built for the people who build India.</p>
          <div className="footer-socials">
            <a href="#">X</a>
            <a href="#">in</a>
            <a href="#">Fb</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
