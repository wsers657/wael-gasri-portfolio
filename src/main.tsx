/* Legacy single-page implementation retained for reference.
import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hls from 'hls.js'
import './styles.css'
import './enhanced.css'

gsap.registerPlugin(ScrollTrigger)
const stream = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const pics = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1519608487953-e999c86e7450?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85'
]

function Video({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => { const v = ref.current; if (!v) return; let h: Hls | undefined; if (Hls.isSupported()) { h = new Hls({ enableWorker: true }); h.loadSource(stream); h.attachMedia(v) } else if (v.canPlayType('application/vnd.apple.mpegurl')) v.src = stream; return () => h?.destroy() }, [])
  return <video ref={ref} className={className} autoPlay muted loop playsInline />
}
function Loading({ done }: { done: () => void }) {
  const [n, setN] = useState(0); const words = ['Design', 'Create', 'Inspire']; const [word, setWord] = useState(0)
  useEffect(() => { const start = performance.now(); let frame = 0; const tick = (t: number) => { const v = Math.min(100, Math.floor(((t - start) / 2700) * 100)); setN(v); if (v < 100) frame = requestAnimationFrame(tick); else setTimeout(done, 400) }; frame = requestAnimationFrame(tick); const cycle = setInterval(() => setWord(x => (x + 1) % 3), 900); return () => { cancelAnimationFrame(frame); clearInterval(cycle) } }, [done])
  return <motion.div className="loader" exit={{ opacity: 0, transition: { duration: .55 } }}><div className="loader-label">Portfolio</div><AnimatePresence mode="wait"><motion.div key={word} className="loader-word" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-20,opacity:0}}>{words[word]}</motion.div></AnimatePresence><div className="counter">{String(n).padStart(3,'0')}</div><div className="progress"><span style={{ transform: `scaleX(${n / 100})` }} /></div></motion.div>
}
function Nav() { const [scrolled,setScrolled]=useState(false); useEffect(()=>{const f=()=>setScrolled(scrollY>100); addEventListener('scroll',f); return()=>removeEventListener('scroll',f)},[]); return <nav className={'nav '+(scrolled?'shadow':'')}><a className="logo" href="#home"><i>JA</i></a><span className="divider"/><div className="links"><a className="active" href="#home">Home</a><a href="#work">Work</a><a href="#journal">Resume</a></div><span className="divider"/><a className="say-hi" href="#contact">Say hi <b>↗</b></a></nav> }
function RingButton({children, href='#work', light=false}:{children:React.ReactNode;href?:string;light?:boolean}) { return <a href={href} className={'ring-btn '+(light?'light':'')}><span>{children}</span></a> }
function Hero() { const [r,setR]=useState(0); const roles=['Creative','Fullstack','Founder','Scholar']; useEffect(()=>{const i=setInterval(()=>setR(x=>(x+1)%roles.length),2000); return()=>clearInterval(i)},[]); useEffect(()=>{const ctx=gsap.context(()=>gsap.timeline({delay:.1}).fromTo('.name-reveal',{opacity:0,y:50},{opacity:1,y:0,duration:1.2,ease:'power3.out'}).fromTo('.blur-in',{opacity:0,y:20,filter:'blur(10px)'},{opacity:1,y:0,filter:'blur(0)',duration:1,stagger:.1,ease:'power3.out'},.2));return()=>ctx.revert()},[]); return <section id="home" className="hero"><Video className="hero-video"/><div className="hero-shade"/><Nav/><div className="hero-copy"><p className="eyebrow blur-in">Collection ’26</p><h1 className="name-reveal">Michael Smith</h1><p className="role blur-in">A <span key={r}>{roles[r]}</span> lives in Chicago.</p><p className="intro blur-in">Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.</p><div className="hero-actions blur-in"><RingButton>See works</RingButton><RingButton href="#contact">Reach out...</RingButton></div></div><div className="scroll">Scroll <em><b/></em></div><div className="bottom-fade"/></section> }
const works=['Automotive Motion','Urban Architecture','Human Perspective','Brand Identity']
function SectionHead({label,title,copy}:{label:string;title:React.ReactNode;copy:string}){return <motion.div className="section-head" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-100px'}} transition={{duration:1}}><p className="eyebrow"><i/> {label}</p><h2>{title}</h2><p>{copy}</p></motion.div>}
function Work() {return <section id="work" className="work wrap"><SectionHead label="Selected work" title={<>Featured <em>projects</em></>} copy="A selection of projects I’ve worked on, from concept to launch."/><a className="all-link" href="#journal">View all work ↗</a><div className="work-grid">{works.map((w,i)=><article className={'work-card card-'+i} key={w}><img src={pics[i]} alt=""/><div className="dots"/><div className="work-overlay"><span>View — <em>{w}</em></span></div><p>{w}</p></article>)}</div></section>}
const articles=[['Why the best brands leave room for play', '6 min read', 'Sep 24',pics[4]],['The small details of a calm interface', '4 min read', 'Aug 18',pics[5]],['Notes from a week without notifications', '5 min read', 'Jul 09',pics[1]],['Building an identity with a pulse', '7 min read', 'Jun 21',pics[3]]]
function Journal(){return <section id="journal" className="journal wrap"><SectionHead label="Journal" title={<>Recent <em>thoughts</em></>} copy="Ideas, observations, and a little of what I’m learning."/><div className="articles">{articles.map(([t,time,date,img])=><a className="article" key={t} href="#contact"><img src={img}/><strong>{t}</strong><small>{time}</small><small>{date}</small><b>↗</b></a>)}</div></section>}
function Explore(){const ref=useRef<HTMLElement>(null);useEffect(()=>{const ctx=gsap.context(()=>{gsap.to('.column-a',{y:-220,ease:'none',scrollTrigger:{trigger:ref.current,start:'top bottom',end:'bottom top',scrub:1}});gsap.to('.column-b',{y:180,ease:'none',scrollTrigger:{trigger:ref.current,start:'top bottom',end:'bottom top',scrub:1}})},ref);return()=>ctx.revert()},[]);return <section ref={ref} className="explore"><div className="explore-copy"><p className="eyebrow">Explorations</p><h2>Visual <em>playground</em></h2><p>Personal studies, experiments, and moments worth holding on to.</p><RingButton href="#contact">Find me on Dribbble ↗</RingButton></div><div className="gallery"><div className="gallery-col column-a">{[pics[0],pics[2],pics[4]].map(x=><img key={x} src={x}/>)}</div><div className="gallery-col column-b">{[pics[1],pics[3],pics[5]].map(x=><img key={x} src={x}/>)}</div></div></section>}
function Footer(){return <><section className="stats wrap"><div><b>20<span>+</span></b><p>Years Experience</p></div><div><b>95<span>+</span></b><p>Projects Done</p></div><div><b>200<span>%</span></b><p>Satisfied Clients</p></div></section><footer id="contact"><Video className="footer-video"/><div className="footer-shade"/><div className="marquee">{'BUILDING THE FUTURE • '.repeat(7)}</div><div className="footer-cta"><p>Have an idea in mind?</p><a href="mailto:hello@michaelsmith.com">Let’s make it real ↗</a></div><div className="footer-bottom"><span>© 2026 Michael Smith</span><div><a>Twitter</a><a>LinkedIn</a><a>Dribbble</a><a>GitHub</a></div><span className="available"><i/> Available for projects</span></div></footer></>}
function App(){const [loading,setLoading]=useState(true);return <><AnimatePresence>{loading&&<Loading done={()=>setLoading(false)}/>}</AnimatePresence><main className={loading?'hidden-main':''}><Hero/><Work/><Journal/><Explore/><Footer/></main></>};createRoot(document.getElementById('root')!).render(<App/>)
*/
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { profile, projects, skills, journey, ambitions } from './content/portfolio'
import './styles.css'
import './enhanced.css'
import './nav.css'
import './hero-visual.css'
import './hero-scale.css'
import './space-cursor.css'
import './nav-glass.css'
import './nav-compact.css'
import './section-fade.css'
import './home-hero-primary.css'
import './cursor-glow.css'
import './selection.css'
import './cursor-nav-fix.css'
import './cursor-nav-tuned.css'
import './extra-orbits.css'
import './starfield-quality.css'
import './digital-earth.css'
import './earth-motion.css'
import './three-earth.css'
import './violet-globe.css'
import './preferred-globe.css'
import './globe-drift.css'
import './site-starfield.css'
import './home-transition-fix.css'
import './home-section-blend.css'
import './lower-sky-tone.css'
import './unified-sky.css'
import './single-sky-layer.css'
import './remove-quick-nav.css'
import './violet-satellite.css'
import './satellite-depth.css'
import './satellite-direction.css'
import { attachSatelliteTrail } from './satellite-trail'
import './hero-composition-height.css'
import './timeline-tags.css'
import './profile-highlights.css'
import './page-flow.css'
import './page-enrichment.css'
import './projects-intro.css'
import './home-globe-restore.css'
import './profile-details.css'
import './responsive-final.css'
import './performance.css'

function Nav() {
  return (
    <header className="nav">
      <Link className="mark" to="/" aria-label="Home">{profile.initials}</Link>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/projets">Projects</NavLink>
        <NavLink to="/profil">Profile</NavLink>
        <NavLink to="/parcours">Experience</NavLink>
      </nav>
      <Link className="contact-pill" to="/contact">Contact me <span>↗</span></Link>
    </header>
  )
}

function Orb({ home = false }: { home?: boolean }) {
  const orb = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (orb.current) return attachSatelliteTrail(orb.current)
  }, [])

  return (
    <div className="orb" ref={orb} aria-hidden="true">
      {home ? (
        <img
          className="hero-globe-image"
          src="/media/digital-earth-network.webp"
          srcSet="/media/digital-earth-network-small.webp 640w, /media/digital-earth-network.webp 1263w"
          sizes="(max-width: 720px) 92vw, (max-width: 1454px) 44vw, 640px"
          fetchPriority="high"
          decoding="async"
          alt=""
        />
      ) : <span />}
      <i/><i/><i/><i/><i/><b className="satellite"/>
    </div>
  )
}

function Button({ to, children, dark = false }: { to: string; children: React.ReactNode; dark?: boolean }) {
  return <Link className={dark ? 'button button-dark' : 'button'} to={to}>{children} <span>↗</span></Link>
}

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Nav />
      <main key={pathname} className="page">{children}</main>
      <footer>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Building interfaces that leave a lasting impression.</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </footer>
    </>
  )
}

function Home() {
  const [role, setRole] = useState(0)
  useEffect(() => {
    const motionPreference = matchMedia('(prefers-reduced-motion: reduce)')
    let timer: number | undefined
    const updateTimer = () => {
      window.clearInterval(timer)
      if (!motionPreference.matches && !document.hidden) {
        timer = window.setInterval(() => setRole(index => (index + 1) % profile.roles.length), 2200)
      }
    }
    updateTimer()
    motionPreference.addEventListener('change', updateTimer)
    document.addEventListener('visibilitychange', updateTimer)
    return () => {
      window.clearInterval(timer)
      motionPreference.removeEventListener('change', updateTimer)
      document.removeEventListener('visibilitychange', updateTimer)
    }
  }, [])

  return (
    <section className="hero-new">
      <div className="grid-bg" />
      <Orb home />
      <div className="hero-content">
        <p className="kicker">PORTFOLIO — {profile.location}</p>
        <h1>{profile.firstName}<br /><em>{profile.lastName}</em></h1>
        <p className="role-line">{profile.introPrefix} <strong key={role}>{profile.roles[role]}</strong></p>
        <p className="hero-text">{profile.shortBio}</p>
        <div className="actions">
          <Button to="/projets">Explore my projects</Button>
          <Button to="/profil" dark>View my profile</Button>
        </div>
      </div>
      <div className="hero-status"><i /> Open to new collaborations</div>
      <p className="scroll-note">SCROLL TO EXPLORE <span>↓</span></p>
    </section>
  )
}

function Title({ eyebrow, title, copy, signals = [] }: {
  eyebrow: string; title: React.ReactNode; copy?: React.ReactNode; signals?: string[]
}) {
  return (
    <section className="page-title">
      <p className="kicker">{eyebrow}</p>
      <h1>{title}</h1>
      {signals.length > 0 && (
        <div className="title-signals">
          {signals.map((signal, index) => <span key={signal}><b>{String(index + 1).padStart(2, '0')}</b>{signal}</span>)}
        </div>
      )}
      {copy && <p className="title-copy">{copy}</p>}
    </section>
  )
}

function Projects() {
  return (
    <>
      <Title
        eyebrow="SELECTION / 01"
        title={<>Selected <em>projects.</em></>}
        signals={['4 projects', 'AI agents · Data · Automation', 'Personal & academic work']}
        copy={<>
          <span className="title-copy-lead">A selection of projects that turn ideas, videos and data into practical tools.</span>
          <span>Each project starts with a concrete need: <strong>organising information</strong>, automating a repetitive task, making content easier to access or supporting a decision.</span>
          <span>I combine design, development, AI and data analysis to build and refine each tool. These projects are also a way to learn. I test what I build and use feedback to improve it.</span>
        </>}
      />
      <section className="project-grid" aria-label="Projects">
        {projects.map((project, index) => (
          <article className={`project-card p${index}`} key={project.title}>
            <img src={project.image} loading="lazy" decoding="async" alt="" />
            <div className="project-glow" />
            <div className="project-info">
              <p>{project.year} — {project.category}</p>
              <h2>{project.title}</h2>
              <span>{project.description}</span>
              {project.url && <a href={project.url}>View case study <b>↗</b></a>}
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

function Profile() {
  return (
    <>
      <Title
        eyebrow="PROFILE / 02"
        title={<>Build, learn,<br /><em>deliver.</em></>}
        signals={['Business, Data & AI', 'Paris · Albert School × Mines Paris – PSL', 'Internship from June 2027']}
        copy={profile.longBio}
      />
      <section className="profile-overview" aria-label="Profile at a glance">
        <p className="kicker">AT A GLANCE</p>
        <div>
          <article><span>EDUCATION</span><strong>Bachelor’s in Business, Data & AI</strong><p>Albert School × Mines Paris – PSL · Paris<br />2026–2029</p></article>
          <article><span>INTERNSHIP</span><strong>At least six weeks</strong><p>Available from early June 2027, with interests in consulting, AI, finance and startups.</p></article>
          <article><span>STUDENT INVOLVEMENT</span><strong>Sports Association Treasurer</strong><p>Albert School × Mines Paris – PSL · Member of Albert Junior Consulting.</p></article>
        </div>
      </section>
      <section className="profile-layout">
        <div className="portrait"><div /><span>{profile.initials}</span></div>
        <div className="profile-copy">
          <p className="kicker">MY APPROACH</p>
          <div className="profile-highlights">
            {profile.highlights.map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</span>)}
          </div>
          <h2>{profile.philosophy}</h2>
          <div className="skill-list">
            {skills.map((skill, index) => (
              <div key={skill.name}><span>0{index + 1}</span><strong>{skill.name}</strong><em>{skill.level}</em><i><b style={{ width: `${skill.score}%` }} /></i></div>
            ))}
          </div>
        </div>
      </section>
      <section className="ambition">
        <p className="kicker">WHAT’S NEXT</p>
        <h2>{ambitions.heading}</h2>
        <p>{ambitions.description}</p>
        <div>{ambitions.items.map(item => <span key={item}>{item}</span>)}</div>
      </section>
    </>
  )
}

function Journey() {
  return (
    <>
      <Title
        eyebrow="EXPERIENCE / 03"
        title={<>Create, learn,<br /><em>grow.</em></>}
        signals={['Bachelor’s · 2026–2029', 'Technical & student projects', 'Paris · Alpes-Maritimes']}
        copy="The projects, coursework and student activities that shape how I work and collaborate."
      />
      <section className="timeline" aria-label="Experience timeline">
        {journey.map((item, index) => (
          <article key={item.title}>
            <span>{item.period}</span><i>{String(index + 1).padStart(2, '0')}</i>
            <div>
              <p>{item.type}</p>
              <h2>{item.title}</h2>
              <strong>{item.organization}</strong>
              <p>{item.description}</p>
              <ul>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

function Contact() {
  return (
    <section className="contact-page">
      <Orb />
      <p className="kicker">HAVE AN IDEA OR A CHALLENGE?</p>
      <h1>Let’s build something<br /><em>memorable.</em></h1>
      <p>I’m always happy to talk about an idea, a product or a potential collaboration.</p>
      <a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <span>↗</span></a>
      <div className="socials">
        {Object.entries(profile.socials).map(([name, url]) => <a key={name} href={url} target="_blank" rel="noreferrer">{name} ↗</a>)}
      </div>
    </section>
  )
}

function Cursor() {
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = cursor.current?.querySelector('i')
    const ring = cursor.current?.querySelector('span')
    if (!dot || !ring) return

    const pointer = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let visible = false
    let x = 0
    let y = 0
    let ringX = 0
    let ringY = 0

    const draw = () => {
      const settled = Math.abs(x - ringX) < 0.3 && Math.abs(y - ringY) < 0.3
      ringX = settled ? x : ringX + (x - ringX) * 0.15
      ringY = settled ? y : ringY + (y - ringY) * 0.15
      dot.style.transform = `translate3d(${x}px,${y}px,0)`
      ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)`
      frame = settled ? 0 : requestAnimationFrame(draw)
    }

    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType === 'touch') return
      x = event.clientX
      y = event.clientY
      if (!visible) {
        ringX = x
        ringY = y
        visible = true
        dot.classList.add('is-visible')
        ring.classList.add('is-visible')
      }
      if (!frame) frame = requestAnimationFrame(draw)
    }

    const hover = (event: PointerEvent) => {
      ring.classList.toggle('is-link', event.target instanceof Element && !!event.target.closest('a, button'))
    }

    const hide = () => {
      cancelAnimationFrame(frame)
      frame = 0
      visible = false
      dot.classList.remove('is-visible')
      ring.classList.remove('is-visible', 'is-link')
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', hover, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    pointer.addEventListener('change', hide)
    return () => {
      hide()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', hover)
      document.documentElement.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      pointer.removeEventListener('change', hide)
    }
  }, [])

  return <div className="cursor" ref={cursor} aria-hidden="true"><span /><i /></div>
}

function App() {
  useEffect(() => {
    const loader = document.getElementById('startup-loader')
    if (!loader) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      loader.remove()
      return
    }

    const started = performance.now()
    const globe = document.querySelector<HTMLImageElement>('.hero-globe-image')
    let reveal: number | undefined
    let remove: number | undefined
    let stopped = false

    const finish = () => {
      if (stopped || reveal !== undefined) return
      reveal = window.setTimeout(() => {
        loader.classList.add('is-ready')
        remove = window.setTimeout(() => loader.remove(), 210)
      }, Math.max(0, 340 - (performance.now() - started)))
    }

    // The application mounts immediately underneath the intro.
    const deadline = window.setTimeout(finish, 720)
    if (globe) void globe.decode().then(finish, finish)
    else finish()

    return () => {
      stopped = true
      window.clearTimeout(deadline)
      window.clearTimeout(reveal)
      window.clearTimeout(remove)
    }
  }, [])

  return (
    <>
      <Cursor />
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/parcours" element={<Journey />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </HashRouter>
    </>
  )
}

createRoot(document.getElementById('root')!).render(<App/>)
