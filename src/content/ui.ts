import * as english from './portfolio'
import * as french from './portfolio.fr'

export type Language = 'en' | 'fr'

export const content = { en: english, fr: french }

export const ui = {
  en: {
    navigation: ['Home', 'Projects', 'Profile', 'Experience'],
    navigationLabel: 'Main navigation',
    languageLabel: 'Language',
    contactLink: 'Contact me',
    footer: 'Building interfaces that leave a lasting impression.',
    home: {
      projects: 'Explore my projects',
      profile: 'View my profile',
      availability: 'Open to new collaborations',
      scroll: 'SCROLL TO EXPLORE',
    },
    projects: {
      eyebrow: 'SELECTION / 01',
      title: ['Selected', 'projects.'],
      signals: ['4 projects', 'AI agents · Data · Automation', 'Personal & academic work'],
      lead: 'A selection of projects that turn ideas, videos and data into practical tools.',
      need: 'Each project starts with a concrete need:',
      emphasis: 'organising information',
      examples: ', automating a repetitive task, making content easier to access or supporting a decision.',
      method: 'I combine design, development, AI and data analysis to build and refine each tool. These projects are also a way to learn. I test what I build and use feedback to improve it.',
      caseStudy: 'View case study',
    },
    profile: {
      eyebrow: 'PROFILE / 02',
      title: ['Build, learn,', 'deliver.'],
      signals: ['Business, Data & AI', 'Paris · Albert School × Mines Paris – PSL', 'Internship from June 2027'],
      overviewLabel: 'Profile at a glance',
      overview: 'AT A GLANCE',
      details: [
        { label: 'EDUCATION', title: 'Bachelor’s in Business, Data & AI', lines: ['Albert School × Mines Paris – PSL · Paris', '2026–2029'] },
        { label: 'INTERNSHIP', title: 'At least six weeks', lines: ['Available from early June 2027, with interests in consulting, AI, finance and startups.'] },
        { label: 'STUDENT INVOLVEMENT', title: 'Sports Association Treasurer', lines: ['Albert School × Mines Paris – PSL · Member of Albert Junior Consulting.'] },
      ],
      approach: 'MY APPROACH',
      next: 'WHAT’S NEXT',
    },
    experience: {
      eyebrow: 'EXPERIENCE / 03',
      title: ['Create, learn,', 'grow.'],
      signals: ['Bachelor’s · 2026–2029', 'Technical & student projects', 'Paris · Alpes-Maritimes'],
      copy: 'The projects, coursework and student activities that shape how I work and collaborate.',
      timeline: 'Experience timeline',
    },
    contact: {
      eyebrow: 'HAVE AN IDEA OR A CHALLENGE?',
      title: ['Let’s build something', 'memorable.'],
      copy: 'I’m always happy to talk about an idea, a product or a potential collaboration.',
    },
  },
  fr: {
    navigation: ['Accueil', 'Projets', 'Profil', 'Parcours'],
    navigationLabel: 'Navigation principale',
    languageLabel: 'Langue',
    contactLink: 'Me contacter',
    footer: 'Construire des interfaces qui laissent une trace.',
    home: {
      projects: 'Découvrir mes projets',
      profile: 'Mon profil',
      availability: 'Disponible pour de nouvelles collaborations',
      scroll: 'DÉFILER POUR EXPLORER',
    },
    projects: {
      eyebrow: 'SÉLECTION / 01',
      title: ['Projets', 'choisis.'],
      signals: ['4 projets', 'Agents IA · Data · Automatisation', 'Projets personnels et académiques'],
      lead: 'Une sélection de projets où une idée, une vidéo ou des données deviennent un outil exploitable.',
      need: 'Chaque projet part d’un besoin concret :',
      emphasis: 'mieux organiser l’information',
      examples: ', automatiser une tâche répétitive, rendre des contenus plus accessibles ou aider à la prise de décision.',
      method: 'De la réflexion initiale à la mise en œuvre, je combine design, développement, intelligence artificielle et analyse de données. Ces projets sont aussi des terrains d’apprentissage : je teste, j’itère et j’améliore chaque système au fil des retours.',
      caseStudy: 'Voir l’étude',
    },
    profile: {
      eyebrow: 'PROFIL / 02',
      title: ['Construire,', 'apprendre, livrer.'],
      signals: ['Business, Data & AI', 'Paris · Albert School × Mines Paris – PSL', 'Stage recherché dès juin 2027'],
      overviewLabel: 'Repères du profil',
      overview: 'EN BREF',
      details: [
        { label: 'FORMATION', title: 'Bachelor Business, Data & AI', lines: ['Albert School × Mines Paris – PSL · Paris', '2026–2029'] },
        { label: 'RECHERCHE', title: 'Stage de six semaines minimum', lines: ['Disponible à partir de début juin 2027, avec un intérêt pour le conseil, l’IA, la finance et les startups.'] },
        { label: 'ENGAGEMENTS', title: 'Trésorier du Bureau des sports', lines: ['Albert School × Mines Paris – PSL · Membre d’Albert Junior Consulting.'] },
      ],
      approach: 'MON APPROCHE',
      next: 'EN LIGNE DE MIRE',
    },
    experience: {
      eyebrow: 'PARCOURS / 03',
      title: ['Créer, apprendre,', 'évoluer.'],
      signals: ['Bachelor · 2026–2029', 'Projets techniques et associatifs', 'Paris · Alpes-Maritimes'],
      copy: 'Les expériences, formations et engagements qui façonnent ma manière de réfléchir, de collaborer et de produire.',
      timeline: 'Chronologie du parcours',
    },
    contact: {
      eyebrow: 'UNE IDÉE ? UN DÉFI ?',
      title: ['Créons quelque chose', 'd’inoubliable.'],
      copy: 'Je suis toujours curieux d’échanger autour d’une idée, d’un produit ou d’une future collaboration.',
    },
  },
} as const
