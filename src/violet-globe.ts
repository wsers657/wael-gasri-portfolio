import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'

export function mountVioletGlobe() {
  let started = false
  const waitForHost = () => {
    const host = document.querySelector<HTMLElement>('.orb')
    if (!host) return requestAnimationFrame(waitForHost)
    if (started) return
    started = true
    const mobile = window.innerWidth < 760
    const canvas = document.createElement('canvas')
    canvas.className = 'violet-globe-canvas'
    host.appendChild(canvas)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.35 : 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 100)
    camera.position.z = 3.35
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), mobile ? .8 : 1.15, .72, .18))

    const earth = new THREE.Group()
    const envelope = new THREE.Group()
    scene.add(earth, envelope)
    const texture = new THREE.TextureLoader().load('/media/earth-lights.png')
    texture.colorSpace = THREE.SRGBColorSpace
    const detail = mobile ? 76 : 120
    const core = new THREE.Mesh(new THREE.SphereGeometry(1.18, detail, detail), new THREE.MeshStandardMaterial({ color: 0x070514, roughness: .66, metalness: .45 }))
    earth.add(core)
    const dots = new THREE.Mesh(new THREE.SphereGeometry(1.193, detail, detail), new THREE.ShaderMaterial({
      uniforms: { map: { value: texture } }, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader: 'uniform sampler2D map;varying vec2 vUv;void main(){float land=dot(texture2D(map,vUv).rgb,vec3(.333));land=smoothstep(.025,.28,land);vec2 cell=fract(vUv*vec2(240.,122.))-.5;float point=1.-smoothstep(.09,.18,length(cell));float a=land*point;gl_FragColor=vec4(vec3(.48,.16,1.)*a,a*.95);}'
    }))
    earth.add(dots)
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.31, detail, detail), new THREE.ShaderMaterial({
      transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
      vertexShader: 'varying vec3 n;void main(){n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader: 'varying vec3 n;void main(){float rim=pow(1.-abs(dot(n,vec3(0.,0.,1.))),2.6);gl_FragColor=vec4(.42,.13,1.,rim*.75);}'
    }))
    earth.add(atmosphere)

    const positions: number[] = [], links: number[] = [], count = mobile ? 60 : 135
    for (let i = 0; i < count; i++) {
      const y = THREE.MathUtils.randFloatSpread(1.85), theta = Math.random() * Math.PI * 2, radius = Math.sqrt(1 - y * y)
      const point = new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius).multiplyScalar(1.214)
      positions.push(point.x, point.y, point.z)
      if (i > 2 && Math.random() > .26) {
        const previous = Math.floor(Math.random() * i) * 3
        links.push(point.x, point.y, point.z, positions[previous], positions[previous + 1], positions[previous + 2])
      }
    }
    const nodeGeometry = new THREE.BufferGeometry()
    nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const connectionGeometry = new THREE.BufferGeometry()
    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(links, 3))
    earth.add(new THREE.LineSegments(connectionGeometry, new THREE.LineBasicMaterial({ color: 0x9e76ff, transparent: true, opacity: .34, blending: THREE.AdditiveBlending, depthWrite: false })))
    earth.add(new THREE.Points(nodeGeometry, new THREE.PointsMaterial({ color: 0xe2c6ff, size: mobile ? .023 : .017, sizeAttenuation: true, transparent: true, opacity: .94, blending: THREE.AdditiveBlending, depthWrite: false })))

    const veilSpecs: [number[], number, number][] = [[[-.55,.25,.38],0xae78ff,.23],[[.68,-.42,-.15],0x7594ff,.17],[[-.12,1.05,.8],0xe1a8ff,.13]]
    veilSpecs.forEach(([rotation, color, opacity]) => {
      const veil = new THREE.Mesh(new THREE.TorusGeometry(1.31, .013, 8, mobile ? 88 : 164, Math.PI * 1.48), new THREE.MeshBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }))
      veil.rotation.set(rotation[0], rotation[1], rotation[2])
      envelope.add(veil)
    })

    const path: THREE.Vector3[] = []
    for (let i = 0; i < 96; i++) { const x = -1.13 + i * .024, z = Math.sqrt(Math.max(0, 1.2 * 1.2 - x * x)) + .022; path.push(new THREE.Vector3(x, 0, z)) }
    const beam = new THREE.Line(new THREE.BufferGeometry().setFromPoints(path), new THREE.LineBasicMaterial({ color: 0xe5c7ff, transparent: true, opacity: .9, blending: THREE.AdditiveBlending, depthWrite: false }))
    const glowCanvas = document.createElement('canvas'); glowCanvas.width = glowCanvas.height = 64
    const context = glowCanvas.getContext('2d')!, gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, '#ffffff'); gradient.addColorStop(.13, '#e3c5ff'); gradient.addColorStop(.42, 'rgba(144,76,255,.48)'); gradient.addColorStop(1, 'rgba(90,40,255,0)')
    context.fillStyle = gradient; context.fillRect(0, 0, 64, 64)
    const pulse = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(glowCanvas), color: 0xc99cff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }))
    pulse.scale.set(.21, .21, .21)
    const scan = new THREE.Group(); scan.add(beam, pulse); envelope.add(scan)
    scene.add(new THREE.AmbientLight(0x44317a, .9))
    const key = new THREE.PointLight(0xc39bff, 5, 4); key.position.set(-1.6, 1.2, 2); scene.add(key)

    const resize = () => { const rect = host.getBoundingClientRect(); renderer.setSize(rect.width, rect.height, false); composer.setSize(rect.width, rect.height); camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix() }
    const observer = new ResizeObserver(resize); observer.observe(host); resize()
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    const animate = (now: number) => {
      const time = now * .001
      if (!reduced) { earth.rotation.y = time * .09; envelope.rotation.y = -time * .055; envelope.rotation.z = Math.sin(time * .22) * .12; scan.position.y = Math.sin(time * .55) * .52; pulse.position.copy(path[Math.floor(((time * .55) % 1 + 1) % 1 * (path.length - 1))]); pulse.position.y = scan.position.y }
      composer.render(); frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    const cleanup = () => { cancelAnimationFrame(frame); observer.disconnect(); renderer.dispose(); composer.dispose(); texture.dispose(); nodeGeometry.dispose(); connectionGeometry.dispose(); canvas.remove() }
    new MutationObserver(() => { if (!document.body.contains(host)) cleanup() }).observe(document.body, { childList: true, subtree: true })
  }
  requestAnimationFrame(waitForHost)
}
