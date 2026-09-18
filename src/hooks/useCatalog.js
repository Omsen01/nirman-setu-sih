import { useEffect, useState, useCallback } from 'react'
import { api } from '../api/client'
import * as demo from '../api/demo'

export function useWorkers(category) {
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { workers } = await api.get(`/workers${category ? `?category=${category}` : ''}`)
      setWorkers(workers)
      setOffline(false)
    } catch (err) {
      if (err.offline) {
        setOffline(true)
        setWorkers(category ? demo.categoryWorkers(category) : demo.allWorkers())
      }
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => { load() }, [load])

  return { workers, loading, offline, reload: load }
}

export function useTenders() {
  const [tenders, setTenders] = useState([])
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    api.get('/tenders')
      .then(({ tenders }) => { setTenders(tenders); setOffline(false) })
      .catch((err) => { if (err.offline) { setOffline(true); setTenders(demo.getTenders()) } })
      .finally(() => setLoading(false))
  }, [])

  return { tenders, loading, offline }
}

export function useCompanies() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    api.get('/companies')
      .then(({ companies }) => { setCompanies(companies); setOffline(false) })
      .catch((err) => { if (err.offline) { setOffline(true); setCompanies(demo.getCompanies()) } })
      .finally(() => setLoading(false))
  }, [])

  return { companies, loading, offline }
}

export function useDiary() {
  const [entries, setEntries] = useState([])
  const load = useCallback(() => {
    api.get('/me/diary')
      .then(({ entries }) => setEntries(entries))
      .catch((err) => { if (err.offline) setEntries(demo.getDiary()) })
  }, [])
  useEffect(load, [load])
  return { entries, reload: load }
}

export function useDocuments() {
  const [documents, setDocuments] = useState([])
  const load = useCallback(() => {
    api.get('/me/documents')
      .then(({ documents }) => setDocuments(documents))
      .catch((err) => { if (err.offline) setDocuments(demo.getDocs()) })
  }, [])
  useEffect(load, [load])
  return { documents, reload: load }
}

export function useRequests() {
  const [requests, setRequests] = useState([])
  const load = useCallback(() => {
    try {
      const mine = demo.getMyRequests()
      setRequests(mine)
    } catch {}
  }, [])
  useEffect(load, [load])
  return { requests, reload: load }
}