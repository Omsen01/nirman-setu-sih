import { useEffect, useRef, useState } from 'react'

export default function Counter({ target, suffix = '+', duration = 2000 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true
            let start = 0
            const increment = target / (duration / 16)

            const update = () => {
              start += increment
              if (start < target) {
                setValue(Math.floor(start))
                requestAnimationFrame(update)
              } else {
                setValue(target)
              }
            }
            update()
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <div ref={ref}>{value.toLocaleString()}{suffix}</div>
}