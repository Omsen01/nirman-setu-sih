import { useEffect, useRef } from 'react'

export default function useReveal() {
  const refs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    refs.current.forEach((el) => {
      if (el && !el.classList.contains('visible')) {
        el.classList.remove('animate-on-scroll')
      }
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (el) => {
    if (el && !refs.current.includes(el)) {
      el.classList.add('animate-on-scroll')
      refs.current.push(el)
    }
  }
}