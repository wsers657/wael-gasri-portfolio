const svgNamespace = 'http://www.w3.org/2000/svg'
const trailLifetime = 1900

type Point = { x: number; y: number; time: number }

function attachTrail(orb: HTMLElement) {
  if (orb.dataset.trailReady || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const satellite = orb.querySelector<HTMLElement>('b')
  if (!satellite) return

  orb.dataset.trailReady = 'true'
  satellite.classList.add('satellite')

  const svg = document.createElementNS(svgNamespace, 'svg')
  svg.classList.add('satellite-trail')
  svg.setAttribute('aria-hidden', 'true')
  const segments = Array.from({ length: 56 }, () => {
    const line = document.createElementNS(svgNamespace, 'line')
    svg.append(line)
    return line
  })
  orb.insertBefore(svg, satellite)

  const points: Point[] = []
  let frame = 0
  let lastSample = 0

  const draw = (time: number) => {
    if (!orb.isConnected) {
      cancelAnimationFrame(frame)
      return
    }

    const orbBounds = orb.getBoundingClientRect()
    const satelliteBounds = satellite.getBoundingClientRect()
    const scaleX = orbBounds.width / orb.clientWidth || 1
    const scaleY = orbBounds.height / orb.clientHeight || 1

    if (time - lastSample > 18) {
      points.unshift({
        x: (satelliteBounds.left + satelliteBounds.width / 2 - orbBounds.left) / scaleX,
        y: (satelliteBounds.top + satelliteBounds.height / 2 - orbBounds.top) / scaleY,
        time,
      })
      lastSample = time
    }

    while (points.length && time - points[points.length - 1].time > trailLifetime) points.pop()

    segments.forEach((line, index) => {
      const pointIndex = Math.floor(index * Math.max(points.length - 1, 0) / segments.length)
      const newer = points[pointIndex]
      const older = points[pointIndex + 1]
      if (!newer || !older) {
        line.style.opacity = '0'
        return
      }

      const fade = Math.max(0, 1 - (time - newer.time) / trailLifetime)
      line.setAttribute('x1', String(newer.x))
      line.setAttribute('y1', String(newer.y))
      line.setAttribute('x2', String(older.x))
      line.setAttribute('y2', String(older.y))
      line.style.opacity = String(fade * fade * (1 - index / (segments.length + 2)))
      line.style.strokeWidth = String(7.2 - index * 0.075)
    })

    frame = requestAnimationFrame(draw)
  }

  frame = requestAnimationFrame(draw)
}

function mountTrails() {
  document.querySelectorAll<HTMLElement>('.orb').forEach(attachTrail)
}

function start() {
  mountTrails()
  const observer = new MutationObserver(mountTrails)
  observer.observe(document.body, { childList: true, subtree: true })
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true })
else start()
