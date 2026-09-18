import { Link } from 'react-router-dom'

export default function WorkerCard({ worker, basePath = '/customer/worker' }) {
  return (
    <div className="worker-card">
      <div className={`worker-card-header ${worker.header}`}>
        <div className="worker-card-avatar">{worker.emoji}</div>
      </div>
      <div className="worker-card-body">
        <h3>{worker.name}</h3>
        <p className="role">{worker.role}</p>
        <div className="worker-card-stats">
          <div className="worker-card-stat">
            <span className="star">★</span> {worker.rating} ({worker.reviews} reviews)
          </div>
          <div className="worker-card-stat">📌 {worker.exp} yrs</div>
        </div>
        <div className="worker-card-skills">
          {worker.skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </div>
      <div className="worker-card-footer">
        <span className="location">📍 {worker.location}</span>
        <Link to={`${basePath}/${worker._id || worker.id}`} className="btn btn-primary">View Profile</Link>
      </div>
    </div>
  )
}