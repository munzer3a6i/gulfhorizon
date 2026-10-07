import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Tracks which section (by element id) is currently being read.
 * A section becomes active once its top crosses `ratio` of the viewport height.
 * `scrollTo(id)` smooth-scrolls to a section and pins the active item while the scroll runs,
 * so the indicator glides straight to the target instead of stepping through every section.
 */
export default function useScrollSpy(ids, { ratio = 0.32 } = {}) {
  const [active, setActive] = useState(ids[0])
  const lock = useRef(0)
  const key = ids.join('|')

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      if (Date.now() < lock.current) return
      const line = window.innerHeight * ratio
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - line <= 0) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    const onScrollEnd = () => {
      lock.current = 0
      onScroll()
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('scrollend', onScrollEnd)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('scrollend', onScrollEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ratio])

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setActive(id)
    lock.current = Date.now() + 1200
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(window.history.state, '', `#${id}`)
  }, [])

  return [active, scrollTo]
}
