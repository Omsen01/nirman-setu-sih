import { workers, tenders as tenderData, companies as companyData } from '../data'

// Demo-mode mirror of the API. Used when the backend is offline so the app
// remains fully navigable. Persists auth + a couple of resources in localStorage.

const KEY_USER = 'ns_demo_user'
const KEY_REQS = 'ns_demo_requests'
const KEY_DIARY = 'ns_demo_diary'
const KEY_DOCS = 'ns_demo_docs'
const KEY_INSP = 'ns_demo_inspections'

const catMap = {
  railway: [0, 1, 2],
  road: [3, 4, 5],
  water: [6, 7, 8],
  residential: [9, 10, 11],
}

export const categoryWorkers = (category) =>
  (catMap[category] || []).map((i) => ({ ...workers[i], id: workers[i].id, category }))

export const allWorkers = () =>
  workerList().map((_, i) => ({ ...workers[i], id: workers[i].id }))

function workerList() {
  return workers
}

export function getTenders() {
  return tenderData
}

export function getCompanies() {
  return companyData
}

export function getCompanyById(id) {
  return companyData.find((c) => String(c.id) === String(id)) || companyData[0]
}

export function getPortfolio(companyId) {
  const c = getCompanyById(companyId)
  return [
    { name: `${c.name} — Sample Project`, description: 'Residential G+1 RCC structure', photos: [], completionDate: '2025-03-01', services: 'RCC, Brickwork, Finishing', status: 'Previous', outcome: 'Completed on time · 4.8★' },
    { name: 'Commercial Tower — RCC Shell', description: '6-storey commercial tower structural shell', photos: [], services: 'RCC & Structure', status: 'Ongoing', outcome: 'Progress 46%' },
  ]
}

export function getOpportunities(companyId) {
  return [
    { title: 'Hiring Masons — Greater Sagar', kind: 'Employment', description: '10+ masons needed. Daily wages + bonus.', location: 'Sagar, MP', active: true },
    { title: 'Subcontract — RCC Works', kind: 'Contract', description: 'RCC subcontracting for residential towers G+6.', location: 'Bhopal, MP', active: true },
    { title: 'Civil Material Supply', kind: 'Service', description: 'Cement, steel and aggregate supply partnerships.', location: 'Statewide', active: true },
  ]
}

// ---- demo auth ----
export function demoUser() {
  try { return JSON.parse(localStorage.getItem(KEY_USER)) || null } catch { return null }
}

export function demoLogin(mobile, pin) {
  const demo = [
    { name: 'Demo Customer', mobile: '9000000001', pin: '1234', role: 'customer', subRole: null, avatar: '👤', email: 'customer@nirman.setu' },
    { name: 'Demo Professional', mobile: '9000000002', pin: '1234', role: 'business', subRole: 'professional', avatar: '👷', email: 'pro@nirman.setu' },
    { name: 'Demo Government', mobile: '9000000003', pin: '1234', role: 'business', subRole: 'government', avatar: '🏛️', email: 'gov@nirman.setu' },
    { name: 'Demo Corporate', mobile: '9000000004', pin: '1234', role: 'business', subRole: 'corporate', avatar: '🏢', email: 'corp@nirman.setu' },
  ]
  const u = demo.find((d) => d.mobile === mobile && String(pin) === String(d.pin))
  if (!u) return { error: 'Incorrect PIN or unknown demo mobile. Use 9000000001–9000000004 with PIN 1234.' }
  const record = { ...u }
  delete record.pin
  localStorage.setItem(KEY_USER, JSON.stringify(record))
  localStorage.setItem('ns_token', 'demo-token')
  return { user: record, token: 'demo-token' }
}

export function demoRegister({ name, mobile, pin, email, address }) {
  const record = { name, mobile, email, address, role: null, subRole: null, avatar: '👤' }
  const users = JSON.parse(localStorage.getItem('ns_demo_users') || '[]')
  if (users.find((u) => u.mobile === mobile)) return { error: 'Account exists with this mobile. Please login.' }
  users.push({ mobile, pin })
  localStorage.setItem('ns_demo_users', JSON.stringify(users))
  localStorage.setItem(KEY_USER, JSON.stringify(record))
  localStorage.setItem('ns_token', 'demo-token')
  return { user: record, token: 'demo-token', otpSent: true, devCode: '123456' }
}

export function demoSetRole(role, subRole) {
  const user = demoUser()
  const next = { ...user, role, subRole: role === 'business' ? subRole : null }
  localStorage.setItem(KEY_USER, JSON.stringify(next))
  return { user: next }
}

export function demoLogout() {
  localStorage.removeItem(KEY_USER)
  localStorage.removeItem('ns_token')
}

// ---- demo service requests ----
export function getMyRequests() {
  return JSON.parse(localStorage.getItem(KEY_REQS) || '[]')
}

export function addRequest(req) {
  const list = getMyRequests()
  const record = { ...req, _id: 'demo-' + Date.now(), status: 'Submitted', createdAt: new Date().toISOString() }
  list.unshift(record)
  localStorage.setItem(KEY_REQS, JSON.stringify(list))
  return record
}

// ---- demo diary ----
export function getDiary() {
  return JSON.parse(localStorage.getItem(KEY_DIARY) || '[]')
}

export function addDiary(entry) {
  const list = getDiary()
  const record = { ...entry, _id: 'demo-' + Date.now(), createdAt: new Date().toISOString() }
  list.unshift(record)
  localStorage.setItem(KEY_DIARY, JSON.stringify(list))
  return record
}

export function removeDiary(id) {
  const next = getDiary().filter((d) => d._id !== id)
  localStorage.setItem(KEY_DIARY, JSON.stringify(next))
}

// ---- demo documents ----
export function getDocs() {
  return JSON.parse(localStorage.getItem(KEY_DOCS) || '[]')
}

export function addDoc(doc) {
  const list = getDocs()
  const record = { ...doc, _id: 'demo-' + Date.now(), createdAt: new Date().toISOString() }
  list.unshift(record)
  localStorage.setItem(KEY_DOCS, JSON.stringify(list))
  return record
}

export function removeDoc(id) {
  const next = getDocs().filter((d) => d._id !== id)
  localStorage.setItem(KEY_DOCS, JSON.stringify(next))
}

// ---- demo inspections ----
const DEFAULT_STEPS = [
  { name: 'Project Details', completed: true, notes: 'All details match tender' },
  { name: 'Document Verification', completed: true, notes: 'GST, PAN, license verified' },
  { name: 'Site / Project Evidence', completed: false, notes: '' },
  { name: 'Photo / Video Upload', completed: false, notes: '' },
  { name: 'Inspection Notes', completed: false, notes: '' },
  { name: 'Inspector Verification', completed: false, notes: '' },
  { name: 'Inspection Report', completed: false, notes: '' },
]

export function getInspections() {
  const base = JSON.parse(localStorage.getItem(KEY_INSP) || '[]')
  if (!base.length) {
    return [{ _id: 'demo-insp-1', projectName: 'Rural Water Supply & Treatment Plant (10 MLD)', location: 'Jabalpur, MP', inspectorName: 'Demo Government', status: 'In Progress', steps: DEFAULT_STEPS.map((s) => ({ ...s })), date: '2026-09-15' }]
  }
  return base
}

export function updateInspection(id, payload) {
  const list = getInspections()
  const i = list.findIndex((x) => x._id === id)
  const current = i >= 0 ? list[i] : list[0]
  const merged = { ...current, ...payload, steps: payload.steps || current.steps }
  if (i >= 0) list[i] = merged
  else list.unshift(merged)
  localStorage.setItem(KEY_INSP, JSON.stringify(list))
  return merged
}