const API_URL = import.meta.env.VITE_API_URL || '/api'

function getToken() {
  return localStorage.getItem('ns_token')
}

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const token = getToken()
  const options = { method, headers: { ...headers } }
  if (token) options.headers.Authorization = `Bearer ${token}`
  if (body !== undefined) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(body)
  }
  try {
    const res = await fetch(`${API_URL}${path}`, options)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      const err = new Error(data.error || 'Request failed')
      err.status = res.status
      throw err
    }
    return res.json()
  } catch (err) {
    if (err.status) throw err
    // Network unreachable -> signal demo fallback
    const fallback = new Error('Offline - running in demo mode')
    fallback.offline = true
    throw fallback
  }
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  del: (path) => request(path, { method: 'DELETE' }),
  upload: async (path, file) => {
    const fd = new FormData()
    fd.append('file', file)
    const token = getToken()
    const res = await fetch(`${API_URL}${path}`, { method: 'POST', headers: token ? { Authorization: `Bearer ${token}` } : {}, body: fd })
    if (!res.ok) throw new Error('Upload failed')
    return res.json()
  },
}

export const setToken = (t) => {
  if (t) localStorage.setItem('ns_token', t)
  else localStorage.removeItem('ns_token')
}
export { API_URL }