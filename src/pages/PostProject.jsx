import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { useToast } from '../context/ToastContext'

const PROJECT_TYPES = [
  'New Construction - Residential',
  'New Construction - Commercial',
  'Renovation',
  'Interior Work',
  'Electrical Work',
  'Plumbing Work',
  'Painting',
  'Flooring & Tiling',
  'Other',
]

const SKILLS = [
  'Masonry', 'RCC Work', 'Carpentry', 'Electrical', 'Plumbing',
  'Painting', 'Flooring', 'Interior Design', 'Civil Engineer', 'Architecture',
]

export default function PostProject() {
  const [selectedSkills, setSelectedSkills] = useState(new Set())
  const { showToast } = useToast()
  const navigate = useNavigate()

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
    showToast('Project posted successfully! Professionals will submit quotations soon.')
    setTimeout(() => navigate('/dashboard'), 1500)
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Post a Construction Project</h1>
          <p>Describe your project and receive quotations from verified professionals</p>
        </div>
      </div>

      <div className="post-project">
        <Reveal className="post-project-form">
          <h2>🏗️ Project Details</h2>
          <p>Fill in the details below to post your project</p>

          <form id="projectForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Name</label>
              <input type="text" placeholder="e.g., Sharma Residence Construction" required />
            </div>

            <div className="form-group">
              <label>Project Type</label>
              <select required defaultValue="">
                <option value="" disabled>Select project type</option>
                {PROJECT_TYPES.map((type) => <option key={type}>{type}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Project Location</label>
              <input type="text" placeholder="City, State" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Plot Size (sq.ft.)</label>
                <input type="number" placeholder="e.g., 2000" />
              </div>
              <div className="form-group">
                <label>Built-up Area (sq.ft.)</label>
                <input type="number" placeholder="e.g., 1500" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Number of Floors</label>
                <select defaultValue="2 Floors (G+1)">
                  <option>1 Floor (Ground)</option>
                  <option>2 Floors (G+1)</option>
                  <option>3 Floors (G+2)</option>
                  <option>More than 3</option>
                </select>
              </div>
              <div className="form-group">
                <label>Estimated Budget</label>
                <div className="budget-input">
                  <input type="text" placeholder="e.g., 25,00,000" required />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Required Skills / Professionals</label>
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

            <div className="form-row">
              <div className="form-group">
                <label>Preferred Start Date</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Target Completion</label>
                <input type="date" />
              </div>
            </div>

            <div className="form-group">
              <label>Project Description</label>
              <textarea placeholder="Describe your project in detail - what you want to build, any specific requirements, materials preferred, etc."></textarea>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
                Post Project &rarr;
              </button>
              <button type="button" className="btn btn-outline btn-lg" onClick={() => navigate('/')} style={{ flex: '0 0 auto' }}>
                Cancel
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </>
  )
}