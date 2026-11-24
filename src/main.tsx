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
import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
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
import './satellite-trail'
import './hero-composition-height.css'
import './timeline-tags.css'
import './profile-highlights.css'
import './page-flow.css'
import './page-enrichment.css'
import './projects-intro.css'
import './home-globe-restore.css'
import './profile-details.css'
import './responsive-final.css'

const rise = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: .6 } }
function Loader(){const[n,setN]=useState(0);useEffect(()=>{let x=0;const i=setInterval(()=>{x+=4;setN(x);if(x>=100)clearInterval(i)},35);return()=>clearInterval(i)},[]);return <motion.div className="loader" exit={{opacity:0}}><p>PORTFOLIO / 2026</p><strong>{String(n).padStart(3,'0')}</strong><i><b style={{transform:`scaleX(${n/100})`}}/></i></motion.div>}
function Nav(){return <header className="nav"><Link className="mark" to="/">{profile.initials}</Link><nav><NavLink to="/">Accueil</NavLink><NavLink to="/projets">Projets</NavLink><NavLink to="/profil">Profil</NavLink><NavLink to="/parcours">Parcours</NavLink></nav><Link className="contact-pill" to="/contact">Me contacter <span>↗</span></Link></header>}
function Orb(){return <div className="orb"><img className="hero-globe-image" src="/media/digital-earth-network.png" alt=""/><i/><i/><i/><i/><i/><b/></div>}
function Button({to,children,dark=false}:{to:string,children:React.ReactNode,dark?:boolean}){return <Link className={'button '+(dark?'button-dark':'')} to={to}>{children} <span>↗</span></Link>}
function Layout({children}:{children:React.ReactNode}){const loc=useLocation();useEffect(()=>{window.scrollTo({top:0,left:0,behavior:'instant'})},[loc.pathname]);return <><Nav/><AnimatePresence mode="wait"><motion.main key={loc.pathname} className="page" {...rise}>{children}</motion.main></AnimatePresence><footer><span>© {new Date().getFullYear()} {profile.name}</span><span>Construire des interfaces qui laissent une trace.</span><a href={`mailto:${profile.email}`}>{profile.email}</a></footer></>}
function Home(){const[r,setR]=useState(0);useEffect(()=>{const t=setInterval(()=>setR(v=>(v+1)%profile.roles.length),2200);return()=>clearInterval(t)},[]);return <><section className="hero-new"><div className="grid-bg"/><Orb/><div className="hero-content"><p className="kicker">PORTFOLIO — {profile.location}</p><h1>{profile.firstName}<br/><em>{profile.lastName}</em></h1><p className="role-line">{profile.introPrefix} <AnimatePresence mode="wait"><motion.strong key={r} initial={{opacity:0,y:9}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-9}}>{profile.roles[r]}</motion.strong></AnimatePresence></p><p className="hero-text">{profile.shortBio}</p><div className="actions"><Button to="/projets">Découvrir mes projets</Button><Button to="/profil" dark>Mon profil</Button></div></div><div className="hero-status"><i/> Disponible pour de nouvelles collaborations</div><p className="scroll-note">SCROLL TO EXPLORE <span>↓</span></p></section><section className="home-portal"><p className="kicker">NAVIGATION RAPIDE</p><div className="portal-grid"><Link to="/projets"><span>01</span><strong>Projets</strong><small>Études de cas & créations</small><b>↗</b></Link><Link to="/profil"><span>02</span><strong>Profil</strong><small>Compétences & vision</small><b>↗</b></Link><Link to="/parcours"><span>03</span><strong>Parcours</strong><small>Expériences & apprentissages</small><b>↗</b></Link></div></section></>}
function Title({eyebrow,title,copy,signals=[]}:{eyebrow:string,title:React.ReactNode,copy?:React.ReactNode,signals?:string[]}){return <section className="page-title"><p className="kicker">{eyebrow}</p><h1>{title}</h1>{signals.length>0&&<div className="title-signals">{signals.map((signal,index)=><span key={signal}><b>{String(index+1).padStart(2,'0')}</b>{signal}</span>)}</div>}{copy&&<p className="title-copy">{copy}</p>}</section>}
function Projects(){return <><Title eyebrow="SÉLECTION / 01" title={<>Projets <em>choisis.</em></>} signals={['04 systèmes en construction', 'Agents IA · Data · automatisation', 'Projets personnels & académiques']} copy={<><span className="title-copy-lead">Une sélection de projets où une idée, une vidéo ou des données deviennent un outil exploitable.</span><span>Chaque projet part d’un besoin concret : <strong>mieux organiser l’information</strong>, automatiser une tâche répétitive, rendre des contenus plus accessibles ou aider à la prise de décision.</span><span>De la réflexion initiale à la mise en œuvre, je conçois des expériences claires et utiles en combinant design, développement, intelligence artificielle et analyse de données. Ces projets sont aussi des terrains d’apprentissage : je teste, j’itère et j’améliore chaque système au fil des retours.</span></>}/><section className="project-grid">{projects.map((p,i)=><article className={'project-card p'+i} key={p.title}><img src={p.image} alt=""/><div className="project-glow"/><div className="project-info"><p>{p.year} — {p.category}</p><h2>{p.title}</h2><span>{p.description}</span><a href={p.url||'#'}>Voir l’étude <b>↗</b></a></div></article>)}</section></>}
function Profile(){return <><Title eyebrow="PROFIL / 02" title={<>Construire,<br/><em>apprendre, livrer.</em></>} signals={['Business, Data & AI', 'Paris · Albert School × Mines Paris – PSL', 'Stage recherché dès juin 2027']} copy={profile.longBio}/><section className="profile-overview" aria-label="Repères du profil"><p className="kicker">EN BREF</p><div><article><span>FORMATION</span><strong>Bachelor Business, Data & AI</strong><p>Albert School × Mines Paris – PSL · Paris<br/>2026 — 2029</p></article><article><span>RECHERCHE</span><strong>Stage de 6 semaines minimum</strong><p>Disponible à partir de début juin 2027, avec un intérêt pour le conseil, l’IA, la finance et les startups.</p></article><article><span>ENGAGEMENTS</span><strong>Trésorier du Bureau des sports</strong><p>Albert School × Mines Paris – PSL · Membre d’Albert Junior Consulting.</p></article></div></section><section className="profile-layout"><div className="portrait"><div/><span>{profile.initials}</span></div><div className="profile-copy"><p className="kicker">MON APPROCHE</p><div className="profile-highlights">{profile.highlights.map((item,index)=><span key={item}><b>{String(index+1).padStart(2,'0')}</b>{item}</span>)}</div><h2>{profile.philosophy}</h2><div className="skill-list">{skills.map((s,i)=><div key={s.name}><span>0{i+1}</span><strong>{s.name}</strong><em>{s.level}</em><i><b style={{width:`${s.score}%`}}/></i></div>)}</div></div></section><section className="ambition"><p className="kicker">EN LIGNE DE MIRE</p><h2>{ambitions.heading}</h2><p>{ambitions.description}</p><div>{ambitions.items.map(x=><span key={x}>{x}</span>)}</div></section></>}
function Journey(){return <><Title eyebrow="PARCOURS / 03" title={<>Créer, apprendre,<br/><em>évoluer.</em></>} signals={['Bachelor · 2026 — 2029', 'Projets techniques & associatifs', 'Paris · Alpes-Maritimes']} copy="Les expériences, formations et engagements qui façonnent ma manière de réfléchir, de collaborer et de produire."/><section className="timeline">{journey.map((x,i)=><article key={x.title}><span>{x.period}</span><i>{String(i+1).padStart(2,'0')}</i><div><p>{x.type}</p><h2>{x.title}</h2><strong>{x.organization}</strong><p>{x.description}</p><ul>{x.tags.map(t=><li key={t}>{t}</li>)}</ul></div></article>)}</section></>}
function Contact(){return <section className="contact-page"><Orb/><p className="kicker">UNE IDÉE ? UN DÉFI ?</p><h1>Créons quelque chose<br/><em>d’inoubliable.</em></h1><p>Je suis toujours curieux d’échanger autour d’une idée, d’un produit ou d’une future collaboration.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <span>↗</span></a><div className="socials">{Object.entries(profile.socials).map(([n,u])=><a key={n} href={u} target="_blank">{n} ↗</a>)}</div></section>}
function Cursor(){useEffect(()=>{const dot=document.querySelector<HTMLElement>('.cursor i'),ring=document.querySelector<HTMLElement>('.cursor span');let x=0,y=0,rx=0,ry=0,frame=0;const move=(e:MouseEvent)=>{x=e.clientX;y=e.clientY;dot?.classList.add('is-visible');ring?.classList.add('is-visible')};const hover=(e:MouseEvent)=>ring?.classList.toggle('is-link',!!(e.target as HTMLElement).closest('a,button'));const loop=()=>{rx+=(x-rx)*.15;ry+=(y-ry)*.15;if(dot)dot.style.transform=`translate3d(${x}px,${y}px,0)`;if(ring)ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;frame=requestAnimationFrame(loop)};addEventListener('mousemove',move);addEventListener('mouseover',hover);frame=requestAnimationFrame(loop);return()=>{removeEventListener('mousemove',move);removeEventListener('mouseover',hover);cancelAnimationFrame(frame)}},[]);return <div className="cursor" aria-hidden="true"><span/><i/></div>}
function App(){const[load,setLoad]=useState(true);useEffect(()=>{const t=setTimeout(()=>setLoad(false),1000);return()=>clearTimeout(t)},[]);return <><Cursor/><HashRouter><AnimatePresence>{load&&<Loader/>}</AnimatePresence>{!load&&<Layout><Routes><Route path="/" element={<Home/>}/><Route path="/projets" element={<Projects/>}/><Route path="/profil" element={<Profile/>}/><Route path="/parcours" element={<Journey/>}/><Route path="/contact" element={<Contact/>}/></Routes></Layout>}</HashRouter></>}
createRoot(document.getElementById('root')!).render(<App/>)
