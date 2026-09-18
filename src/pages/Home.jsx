import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import { useModal } from '../context/ModalContext'

const heroWorkers = [
  { emoji: '👷', bg: 'orange', name: 'Rajesh Kumar', role: 'Mason & RCC Professional • 10 yrs exp', rating: 4.8, badge: '✓ Verified', badgeClass: 'badge-verified' },
  { emoji: '👩‍💼', bg: 'teal', name: 'Priya Sharma', role: 'Interior Designer • 8 yrs exp', rating: 4.9, badge: '⭐ Top Rated', badgeClass: 'badge-top' },
  { emoji: '🔧', bg: 'gold', name: 'Vikram Singh', role: 'Electrician • 15 yrs exp', rating: 4.7, badge: '✓ Verified', badgeClass: 'badge-verified' },
  { emoji: '📐', bg: 'blue', name: 'Amit Patel', role: 'Civil Engineer • 12 yrs exp', rating: 4.6, badge: '✓ Verified', badgeClass: 'badge-verified' },
]

const philosophyCards = [
  { icon: '🪨', bg: 'orange', title: 'Every Contribution Matters', text: 'Just as every stone in Ram Setu had purpose, every skill in construction has value. The mason\'s bricks, the electrician\'s wires, the architect\'s design — all are essential.' },
  { icon: '🌉', bg: 'teal', title: 'Building the Bridge', text: 'SETU means bridge. We connect skill with opportunity, worker with client, and professional with project. We bridge the gap between those who can build and those who need something built.' },
  { icon: '✨', bg: 'gold', title: 'Skill to Business', text: 'A mason can become a service provider. A worker can become an entrepreneur. Nirman SETU creates a path from skill to identity to opportunity to growth to nation building.' },
]

const marqueeRow1 = [
  ['🧱', 'Masonry'], ['🪚', 'Carpentry'], ['⚡', 'Electrical'], ['🔧', 'Plumbing'],
  ['🎨', 'Painting'], ['🏗️', 'RCC Work'], ['📐', 'Architecture'], ['💼', 'Interior Design'],
  ['🔩', 'Welding'], ['🏭', 'Fabrication'], ['📋', 'Surveying'], ['🖥️', 'AutoCAD'],
  ['🏠', 'Flooring'], ['🪟', 'Tiling'], ['🔨', 'Bar Bending'], ['🏗️', 'Shuttering'],
]

const marqueeRow2 = [
  ['🏛️', 'Structural Engineering'], ['📊', 'Quantity Surveying'], ['🖊️', 'Drafting'], ['🏗️', 'Site Supervision'],
  ['🎓', 'Construction Consulting'], ['👷', 'Labour Contracting'], ['🚛', 'Material Supply'], ['🏗️', 'Equipment Rental'],
  ['📋', '3D Design'], ['🏠', 'Vastu Consulting'], ['🧮', 'Estimation'], ['📈', 'Project Management'],
]

const steps = [
  { num: 1, bg: 'orange', title: 'Create Profile', text: 'Build your digital professional identity. Showcase your skills, experience, and completed projects.' },
  { num: 2, bg: 'teal', title: 'Get Discovered', text: 'Customers find you based on skills, location, and reviews. Get verified to build trust.' },
  { num: 3, bg: 'gold', title: 'Receive Projects', text: 'Submit quotations, negotiate terms, and get hired for projects that match your expertise.' },
  { num: 4, bg: 'blue', title: 'Grow Your Career', text: 'Build reviews, expand your portfolio, and grow from a worker to a service provider to an entrepreneur.' },
]

const features = [
  { icon: '🪪', bg: 'bg-orange', title: 'Digital Professional Identity', text: 'Create a comprehensive profile showcasing your skills, experience, portfolio, and customer reviews — all in one place.' },
  { icon: '🔍', bg: 'bg-teal', title: 'Smart Search & Discovery', text: 'Find the right professionals by skill, location, experience, and ratings. Compare before you hire.' },
  { icon: '📋', bg: 'bg-gold', title: 'Quotation System', text: 'Post your project requirements and receive competitive quotations from verified professionals.' },
  { icon: '📊', bg: 'bg-blue', title: 'Project Dashboard', text: 'Track construction progress, expenses, materials, and milestones in real-time with visual dashboards.' },
  { icon: '🧮', bg: 'bg-purple', title: 'Estimation & BOQ', text: 'Get preliminary budgets, material quantities, labour and duration estimates for your project — before you start.' },
  { icon: '🏢', bg: 'bg-pink', title: 'Company Profiles', text: 'Evaluate contractors, agencies and suppliers on documented credentials — not just word of mouth.' },
]

const journeySteps = [
  { icon: '📋', title: 'Planning & Estimation', text: 'Define your project scope, get cost estimates and BOQ' },
  { icon: '🏗️', title: 'Foundation & Structure', text: 'RCC work, brickwork, and structural development' },
  { icon: '⚡', title: 'MEP Works', text: 'Electrical, plumbing, and mechanical installations' },
  { icon: '🏠', title: 'Finishing & Interiors', text: 'Flooring, painting, fixtures, and interior design' },
  { icon: '🎉', title: 'Final Handover', text: 'Quality check, documentation, and project completion' },
]

export default function Home() {
  const { openRegistration } = useModal()

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-pattern"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="dot"></span>
              Inspired by the Spirit of Ram Setu
            </div>
            <h1>
              Every Skill Has<br />
              <span className="gradient-text">Value.</span> Every Person<br />
              Can <span className="teal-text">Build.</span>
            </h1>
            <p className="hero-subtitle">
              Nirman SETU is the digital bridge connecting India's construction workforce
              with opportunities. From mason to architect, every skill deserves a
              professional identity.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={openRegistration}>
                Create Your Profile &rarr;
              </button>
              <Link to="/search" className="btn btn-secondary btn-lg">
                Find Professionals
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="number"><Counter target={15000} /></div>
                <div className="label">Skilled Workers</div>
              </div>
              <div className="hero-stat">
                <div className="number"><Counter target={3200} /></div>
                <div className="label">Projects Completed</div>
              </div>
              <div className="hero-stat">
                <div className="number"><Counter target={120} /></div>
                <div className="label">Cities Covered</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-title">Top Professionals Near You</div>
              {heroWorkers.map((w) => (
                <div className="worker-profile-card" key={w.name}>
                  <div className={`worker-avatar ${w.bg}`}>{w.emoji}</div>
                  <div className="worker-info">
                    <h4>{w.name}</h4>
                    <p>{w.role}</p>
                  </div>
                  <div className="worker-meta">
                    <div className="worker-rating">★ {w.rating}</div>
                    <span className={`worker-badge ${w.badgeClass}`}>{w.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy" id="philosophy">
        <div className="container">
          <Reveal className="section-header" as="div">
            <div className="section-tag">Our Philosophy</div>
            <h2>Inspired by Ram Setu</h2>
            <p>In the Ramayana, even the smallest squirrel contributed what it could.
              Nirman SETU believes every construction skill has value and deserves recognition.</p>
          </Reveal>

          <div className="philosophy-grid">
            {philosophyCards.map((card) => (
              <Reveal className="philosophy-card" key={card.title}>
                <div className={`philosophy-icon ${card.bg}`}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS MARQUEE */}
      <section className="skills-section">
        <div className="container">
          <h2>Skills We Celebrate</h2>
        </div>
        <div className="marquee-wrapper">
          <div className="marquee">
            {[...marqueeRow1, ...marqueeRow1].map(([emoji, skill], i) => (
              <div className="skill-chip" key={i}>
                <span className="emoji">{emoji}</span> {skill}
              </div>
            ))}
          </div>
          <div className="marquee marquee-row-2">
            {[...marqueeRow2, ...marqueeRow2].map(([emoji, skill], i) => (
              <div className="skill-chip" key={i}>
                <span className="emoji">{emoji}</span> {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag">How It Works</div>
            <h2>From Skill to Opportunity in 4 Steps</h2>
            <p>Whether you're a skilled worker looking for projects or a customer
              looking for professionals, Nirman SETU makes the connection simple.</p>
          </Reveal>

          <div className="steps-container">
            {steps.map((step) => (
              <Reveal className="step-card" key={step.num}>
                <div className={`step-number ${step.bg}`}>{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag">Features</div>
            <h2>Everything You Need to Build</h2>
            <p>Nirman SETU provides a complete ecosystem for the construction industry —
              from individual skills to project management.</p>
          </Reveal>

          <div className="features-grid">
            {features.map((feature) => (
              <Reveal className="feature-card" key={feature.title}>
                <div className={`feature-icon ${feature.bg}`}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONSTRUCTION JOURNEY */}
      <section className="journey" id="journey">
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag">Construction Journey</div>
            <h2>Track Every Stage of Your Project</h2>
            <p>From planning to handover, Nirman SETU gives you visibility
              into every phase of construction.</p>
          </Reveal>

          <div className="journey-timeline">
            {journeySteps.map((step) => (
              <Reveal className="journey-step" key={step.title}>
                <div className="journey-dot">{step.icon}</div>
                <div className="journey-content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="container">
          <Reveal className="cta-content">
            <h2>Ready to Build Your<br /><span className="gradient-text">Digital Identity?</span></h2>
            <p>Join thousands of construction professionals who are growing their careers
              through Nirman SETU. Your skill has value — let the world see it.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg" onClick={openRegistration}>
                Join as Professional &rarr;
              </button>
              <Link to="/estimation" className="btn btn-secondary btn-lg">
                Get Estimation &rarr;
              </Link>
              <Link to="/post-project" className="btn btn-secondary btn-lg">
                Post a Project
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}