import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

export default function AboutPage() {
  return (
    <>
      <section className="profile-hero">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="container">
          <div className="profile-header" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h1>About Nirman SETU</h1>
            <p className="role">Every Skill. Every Person. Every Project.</p>
            <p className="location" style={{ maxWidth: 720, lineHeight: 1.9 }}>Nirman SETU is a unified digital platform connecting customers, skilled and unskilled workers, professionals, government departments, and corporate organizations — for household, infrastructure, professional, government and corporate projects.</p>
          </div>
        </div>
      </section>
      <section className="how-it-works" style={{ padding: '72px 0' }}>
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag">Who it serves</div>
            <h2>One platform, four worlds</h2>
          </Reveal>
          <div className="features-grid">
            {[
              { icon: '👤', title: 'Customers', text: 'Find and hire workers for railway, road, water and residential projects. Request services and contact professionals directly.' },
              { icon: '👷', title: 'Professionals', text: 'Manage projects with a digital diary, daily photo uploads, secure documents and automatic project reports.' },
              { icon: '🏛️', title: 'Government', text: 'Publish projects and tenders, review applications, carry out step-by-step digital inspections and monitor progress.' },
              { icon: '🏢', title: 'Corporates', text: 'Maintain company profile, team, licenses, projects, portfolio and opportunities in one place.' },
            ].map((f) => (
              <Reveal className="feature-card" key={f.title}>
                <div className="feature-icon bg-orange">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/choose-role" className="btn btn-primary btn-lg">Get Started →</Link>
          </div>
        </div>
      </section>
    </>
  )
}