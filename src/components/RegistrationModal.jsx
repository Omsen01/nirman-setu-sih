import { useState } from 'react'
import Logo from './Logo'
import { useModal } from '../context/ModalContext'

const SKILLS = [
  '🏗️ RCC Work', '🧱 Masonry', '🪚 Carpentry', '⚡ Electrical', '🔧 Plumbing',
  '🎨 Painting', '🔥 Welding', '🏠 Flooring', '📐 Architecture', '🖥️ AutoCAD',
]

export default function RegistrationModal() {
  const { activeModal, closeModal } = useModal()
  const [role, setRole] = useState(null)
  const [selectedSkills, setSelectedSkills] = useState(new Set())

  if (activeModal !== 'registration') return null

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev)
      if (next.has(skill)) next.delete(skill)
      else next.add(skill)
      return next
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!role) {
      alert('Please select a role')
      return
    }
    if (selectedSkills.size === 0) {
      alert('Please select at least one skill')
      return
    }
    closeModal()
    showSuccess()
  }

  const showSuccess = () => {
    const notification = document.createElement('div')
    notification.className = 'toast-notification'
    notification.textContent = 'Registration successful! Welcome to Nirman SETU.'
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>&times;</button>
        <div className="modal-header">
          <Logo size={56} className="logo-img" />
          <h2>Join Nirman SETU</h2>
          <p>Create your professional identity in the construction industry</p>
        </div>
        <div className="modal-body">
          <form id="registrationForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Enter first name" required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Enter last name" required />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" required />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" required />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="City, State" required />
            </div>

            <div className="form-group">
              <label>I am a...</label>
              <div className="role-selector role-selector-3">
                <div
                  className={`role-option ${role === 'worker' ? 'selected' : ''}`}
                  onClick={() => setRole('worker')}
                >
                  <div className="icon">👷</div>
                  <div className="label">Skilled Worker</div>
                </div>
                <div
                  className={`role-option ${role === 'professional' ? 'selected' : ''}`}
                  onClick={() => setRole('professional')}
                >
                  <div className="icon">📋</div>
                  <div className="label">Professional</div>
                </div>
                <div
                  className={`role-option ${role === 'company' ? 'selected' : ''}`}
                  onClick={() => setRole('company')}
                >
                  <div className="icon">🏢</div>
                  <div className="label">Company / Contractor</div>
                </div>
              </div>
            </div>

            {role === 'company' && (
              <div className="form-group">
                <label>Company / Firm Name</label>
                <input type="text" placeholder="e.g., Rajesh Construction Services" required />
              </div>
            )}
            {role !== 'company' && (
              <div className="form-group">
                <label>Select Your Skills</label>
                <div className="skill-selector">
                  {SKILLS.map((skill) => (
                    <div
                      key={skill}
                      className={`skill-option ${selectedSkills.has(skill) ? 'selected' : ''}`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Years of Experience</label>
              <select required defaultValue="">
                <option value="" disabled>Select experience</option>
                <option>0-2 years</option>
                <option>3-5 years</option>
                <option>5-10 years</option>
                <option>10-15 years</option>
                <option>15+ years</option>
              </select>
            </div>

            <div className="form-group">
              <label>Bio / About Yourself</label>
              <textarea placeholder="Tell us about your work, expertise, and what you specialize in..."></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              Create Profile &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}