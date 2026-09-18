import jwt from 'jsonwebtoken'

export function signToken(user) {
  return jwt.sign(
    { id: user._id, mobile: user.mobile, role: user.role, subRole: user.subRole },
    process.env.JWT_SECRET || 'change-me-in-production',
    { expiresIn: process.env.JWT_EXPIRES || '7d' }
  )
}

export function protect(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'change-me-in-production')
    next()
  } catch {
    return res.status(401).json({ error: 'Session expired, please login again' })
  }
}

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied for your role' })
  }
  next()
}

export const requireSubRole = (...subRoles) => (req, res, next) => {
  if (!subRoles.includes(req.user.subRole)) {
    return res.status(403).json({ error: 'Access denied for your role' })
  }
  next()
}