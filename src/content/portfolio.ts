/** Portfolio copy and project media. */
export const profile = {
  initials: 'WG',
  firstName: 'Wael',
  lastName: 'Gasri',
  name: 'Wael Gasri',
  location: 'PARIS, FRANCE',
  email: 'gasriwael@gmail.com',
  roles: ['a Business, Data & AI student', 'an AI agent builder', 'interested in consulting and finance', 'learning to build a business'],
  introPrefix: 'I’m',
  shortBio: 'I’m a first-year Business, Data & AI student. I build tools that make ideas, videos and data easier to use. I’m looking for an internship of at least six weeks, starting in early June 2027.',
  longBio: 'I study business, data and AI, and I like turning open-ended ideas into practical tools. I learn by building: AI agents on a VPS, automation workflows, Dataiku projects, web prototypes and systems to organise my coursework. I enjoy understanding how the pieces fit together and building something others can use.',
  philosophy: 'Understand the problem, build a prototype, learn from feedback and deliver something people can use.',
  highlights: ['Business, Data & AI', 'Albert School × Mines Paris – PSL', 'Sports Association Treasurer', 'Available for an internship from June 2027'],
  socials: { LinkedIn: 'https://www.linkedin.com/in/wael-gasri/' },
}

export const projects = [
  {
    title: 'Hermes', year: '2026 · ONGOING', category: 'AI AGENTS & AUTOMATION',
    description: 'A personal assistant hosted on an Ubuntu VPS and accessible through Telegram, with separate profiles for coursework, projects and personal organisation.',
    image: '/media/project-hermes-v1.webp', url: '',
  },
  {
    title: 'Knowledge Base', year: '2026', category: 'ACADEMIC PROJECT · SYNCHRONE',
    description: 'A team project to make videos and training recordings searchable using transcripts, metadata and traceable sources. I helped prepare the Dataiku integration in Python.',
    image: '/media/project-knowledge-base-v1.webp', url: '',
  },
  {
    title: 'CryptoBot', year: '2026 · EXPERIMENTAL', category: 'DATA & SIMULATION',
    description: 'A simulation environment for collecting data, testing strategies, tracking their metrics and interpreting the reports the system produces.',
    image: '/media/project-cryptobot-v1.webp', url: '',
  },
  {
    title: 'Learning System', year: '2026 · ONGOING', category: 'ORGANISATION & PRODUCTIVITY',
    description: 'A personal system for turning course materials into organised notes, practice exercises and focused review questions.',
    image: '/media/project-learning-system-v1.webp', url: '',
  },
]

export const skills = [
  { name: 'AI Agents & Automation', level: 'Developing', score: 74 },
  { name: 'Data & Analysis', level: 'Excel, Dataiku, Python', score: 69 },
  { name: 'Web Prototyping', level: 'React, Vite, FastAPI', score: 67 },
  { name: 'Infrastructure & Tools', level: 'VPS, Git, organisation', score: 63 },
]

export const ambitions = {
  heading: 'Build useful systems that can run independently and last.',
  description: 'I want to learn to design, build and lead my own projects while working with teams in consulting, AI, finance or startups. From early June 2027, I’m looking for an internship of at least six weeks where I can contribute and gain hands-on experience.',
  items: ['Consulting & Strategy', 'Artificial Intelligence', 'Finance & Entrepreneurship', 'Practical Automation', 'Building in Teams'],
}

export const journey = [
  {
    period: '2026–2029', type: 'EDUCATION', title: 'Bachelor’s in Business, Data & AI',
    organization: 'Albert School × Mines Paris – PSL, Paris',
    description: 'Coursework in databases, mathematics, financial accounting and Excel-based data analysis.',
    tags: ['Business', 'Data', 'AI', 'Finance'],
  },
  {
    period: 'SEPT 2026–PRESENT', type: 'PERSONAL PROJECT', title: 'AI Agents & Workflows',
    organization: 'Independent project',
    description: 'Exploring AI agents, OpenClaw and automation workflows. I set up Hermes on an Ubuntu VPS with Telegram access and separate profiles.',
    tags: ['Hermes', 'Ubuntu VPS', 'Telegram', 'Automation'],
  },
  {
    period: '2026–PRESENT', type: 'PERSONAL PROJECT', title: 'Learning System',
    organization: 'Independent project',
    description: 'Building a system to keep course materials in one place, write study notes, prepare exercises and find information more easily.',
    tags: ['Obsidian', 'Organisation', 'Learning'],
  },
  {
    period: 'SEPT 2026', type: 'ACADEMIC PROJECT', title: 'Video Knowledge Base',
    organization: 'Albert School × Synchrone',
    description: 'Contributed to a team project that makes videos and training recordings searchable. I helped prepare the Dataiku integration with Python, video metadata and transcript segments.',
    tags: ['Dataiku', 'Python', 'Knowledge Management'],
  },
  {
    period: '2026–PRESENT', type: 'STUDENT ASSOCIATION', title: 'Treasurer, Sports Association',
    organization: 'Albert School × Mines Paris – PSL',
    description: 'Help manage the association’s finances and support the initiatives organised by the sports committee.',
    tags: ['Budget Management', 'Organisation', 'Responsibility'],
  },
  {
    period: '2026', type: 'STUDENT INVOLVEMENT', title: 'Albert Junior Consulting',
    organization: 'Albert School, Paris',
    description: 'Member interested in contributing to consulting assignments and learning how to approach client problems.',
    tags: ['Consulting', 'Teamwork', 'Business'],
  },
  {
    period: '2026', type: 'QUALIFICATION', title: 'French Baccalaureate with Highest Honours',
    organization: 'Lycée Auguste Renoir, Alpes-Maritimes',
    description: 'Specialised in mathematics and physics–chemistry, with additional coursework in advanced and preparatory mathematics.',
    tags: ['Mathematics', 'Physics–Chemistry', 'Analytical Thinking'],
  },
]
