import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { api, setToken } from '../api/client'
import * as demo from '../api/demo'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => (localStorage.getItem('ns_token') ? demo.demoUser() || null : null))
  const [offline, setOffline] = useState(false)

  // On load: if we have a token, try to refresh from backend; else keep demo user.
  useEffect(() => {
    if (!localStorage.getItem('ns_token')) return
    api.get('/auth/me')
      .then(({ user }) => { setUser(user); setOffline(false) })
      .catch((err) => {
        if (err.offline) { setOffline(true); setUser(demo.demoUser()) }
        else { setUser(demo.demoUser()) }
      })
  }, [])

  const login = useCallback(async ({ mobile, pin }) => {
    setOffline(false)
    try {
      const data = await api.post('/auth/login', { mobile, pin })
      setToken(data.token)
      setUser(data.user)
      return { ok: true, user: data.user }
    } catch (err) {
      if (err.offline) {
        const demoRes = demo.demoLogin(mobile, pin)
        if (demoRes.error) return { ok: false, error: demoRes.error }
        setUser(demoRes.user)
        setOffline(true)
        return { ok: true, user: demoRes.user, offline: true }
      }
      return { ok: false, error: err.message }
    }
  }, [])

  const register = useCallback(async (payload) => {
    setOffline(false)
    try {
      const data = await api.post('/auth/register', payload)
      return { ok: true, devCode: data.devCode, otpSent: data.otpSent }
    } catch (err) {
      if (err.offline) {
        const demoRes = demo.demoRegister(payload)
        if (demoRes.error) return { ok: false, error: demoRes.error }
        setUser(demoRes.user)
        setOffline(true)
        return { ok: true, user: demoRes.user, offline: true, devCode: '123456' }
      }
      return { ok: false, error: err.message }
    }
  }, [])

  const requestOtp = useCallback(async ({ mobile }) => {
    try { return await api.post('/auth/request-otp', { mobile }) }
    catch { return { otpSent: true, devCode: '123456' } }
  }, [])

  const verifyOtp = useCallback(async ({ mobile, otp }) => {
    try {
      const data = await api.post('/auth/verify-otp', { mobile, otp })
      setToken(data.token)
      setUser(data.user)
      return { ok: true, user: data.user }
    } catch (err) {
      if (err.offline) {
        const u = demo.demoLogin(mobile, '1234')
        if (u.error) return { ok: false, error: u.error }
        setUser(u.user)
        setOffline(true)
        return { ok: true, user: u.user, offline: true }
      }
      return { ok: false, error: err.message }
    }
  }, [])

  const selectRole = useCallback(async ({ role, subRole }) => {
    const apply = (u) => { setUser(u); return { ok: true } }
    try {
      const { user: u, token } = await api.put('/auth/role', { role, subRole })
      setToken(token)
      return apply(u)
    } catch (err) {
      const next = demo.demoSetRole(role, subRole)
      setOffline(true)
      return apply(next.user)
    }
  }, [])

  const logout = useCallback(() => {
    demo.demoLogout()
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, offline, login, register, requestOtp, verifyOtp, selectRole, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}