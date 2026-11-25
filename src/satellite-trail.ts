const svgNamespace = 'http://www.w3.org/2000/svg'
const trailLifetime = 1900
const sampleInterval = 1000 / 30
const segmentsPerPath = 7

type Point = { x: number; y: number; time: number }

export function attachSatelliteTrail(orb: HTMLElement) {
  const satellite = orb.querySelector<HTMLElement>('.satellite')
  if (!satellite) return

  const svg = document.createElementNS(svgNamespace, 'svg')
  svg.classList.add('satellite-trail')
  svg.setAttribute('aria-hidden', 'true')

  const paths = Array.from({ length: 9 }, (_, index) => {
    const path = document.createElementNS(svgNamespace, 'path')
    path.setAttribute('stroke-width', String(7.2 - index * 0.5))
    svg.append(path)
    return path
  })
  orb.insertBefore(svg, satellite)

  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)')
  const points: Point[] = []
  let visible = false
  let height = 0
  let width = 0
  let frame = 0
  let lastSample = -Infinity

  const draw = (time: number) => {
    // Leave the satellite's motion to CSS. Sample only the visible wake.
    if (time - lastSample >= sampleInterval - 1) {
      const bounds = orb.getBoundingClientRect()
      const center = satellite.getBoundingClientRect()
      const scale = bounds.width / width
      if (scale > 0) {
        points.unshift({
          x: (center.left + center.width / 2 - bounds.left) / scale,
          y: (center.top + center.height / 2 - bounds.top) / scale,
          time,
        })
      }
      lastSample = time

      while (points.length && time - points[points.length - 1].time > trailLifetime) points.pop()

      for (const [index, path] of paths.entries()) {
        const start = index * segmentsPerPath
        const end = Math.min(start + segmentsPerPath, points.length - 1)
        if (end <= start) {
          if (path.hasAttribute('d')) path.removeAttribute('d')
          continue
        }

        const first = points[start]
        let geometry = `M${first.x.toFixed(1)} ${first.y.toFixed(1)}`
        for (let i = start + 1; i <= end; i++) {
          geometry += `L${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}`
        }
        const fade = 1 - (time - first.time) / trailLifetime
        path.setAttribute('d', geometry)
        path.setAttribute('opacity', String(fade * fade))
      }
    }

    frame = requestAnimationFrame(draw)
  }

  const update = () => {
    const active = visible && width > 0 && height > 0 && !document.hidden && !motionPreference.matches
    orb.toggleAttribute('data-animation-paused', !active)

    if (active) {
      if (!frame) frame = requestAnimationFrame(draw)
      return
    }

    cancelAnimationFrame(frame)
    frame = 0
    lastSample = -Infinity
    points.length = 0
    paths.forEach(path => path.removeAttribute('d'))
  }

  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    update()
  })
  const resize = new ResizeObserver(([entry]) => {
    width = entry.contentRect.width
    height = entry.contentRect.height
    points.length = 0
    update()
  })
  intersection.observe(orb)
  resize.observe(orb)
  motionPreference.addEventListener('change', update)
  document.addEventListener('visibilitychange', update)
  update()

  return () => {
    cancelAnimationFrame(frame)
    intersection.disconnect()
    resize.disconnect()
    motionPreference.removeEventListener('change', update)
    document.removeEventListener('visibilitychange', update)
    orb.removeAttribute('data-animation-paused')
    svg.remove()
  }
}
