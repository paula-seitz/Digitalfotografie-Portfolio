export type Language = 'en' | 'de';

export interface Translations {
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    sectionTitle: string;
    description: string[];
  };
  skills: {
    sectionTitle: string;
    items: { title: string; description: string; icon: string }[];
  };
  projects: {
    sectionTitle: string;
    sectionSubtitle: string;
    viewProject: string;
    backToProjects: string;
    overview: string;
    role: string;
    duration: string;
    tools: string;
    challenge: string;
    solution: string;
    results: string;
  };
  contact: {
    sectionTitle: string;
    description: string;
    email: string;
    linkedin: string;
  };
  footer: {
    copyright: string;
    madeWith: string;
  };
}

const en: Translations = {
  nav: {
    home: 'Home',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
  },
  hero: {
    greeting: 'Hello, I\'m',
    name: 'Paula',
    title: 'UX Designer',
    subtitle: 'I craft intuitive digital experiences that bridge the gap between user needs and business goals. With a human-centered approach, I transform complex problems into elegant, accessible solutions.',
    cta: 'View My Work',
  },
  about: {
    sectionTitle: 'About Me',
    description: [
      'I\'m a passionate UX Designer with a keen eye for detail and a deep understanding of user behavior. My design philosophy centers around empathy, research, and iterative thinking.',
      'With experience across various industries, I bring a versatile skill set that combines strategic thinking with hands-on design execution. I believe great design is invisible — it just works.',
      'When I\'m not designing, you\'ll find me exploring new design trends, attending UX meetups, or sketching ideas in my notebook.',
    ],
  },
  skills: {
    sectionTitle: 'What I Do',
    items: [
      {
        title: 'UX Research',
        description: 'User interviews, surveys, usability testing, persona development, and journey mapping to uncover deep user insights.',
        icon: '🔍',
      },
      {
        title: 'UI Design',
        description: 'Pixel-perfect interface design with a focus on visual hierarchy, typography, and cohesive design systems.',
        icon: '🎨',
      },
      {
        title: 'Interaction Design',
        description: 'Crafting meaningful micro-interactions and animations that enhance the user experience and delight users.',
        icon: '✨',
      },
      {
        title: 'Prototyping',
        description: 'From low-fidelity wireframes to high-fidelity interactive prototypes using Figma, Sketch, and Adobe XD.',
        icon: '📐',
      },
      {
        title: 'Design Systems',
        description: 'Building scalable, consistent component libraries and design tokens that accelerate team productivity.',
        icon: '🧩',
      },
      {
        title: 'Strategy & Workshop',
        description: 'Facilitating design thinking workshops, stakeholder alignment sessions, and product strategy development.',
        icon: '💡',
      },
    ],
  },
  projects: {
    sectionTitle: 'Featured Projects',
    sectionSubtitle: 'A selection of recent work that showcases my design process and problem-solving approach.',
    viewProject: 'View Case Study',
    backToProjects: '← Back to Projects',
    overview: 'Overview',
    role: 'Role',
    duration: 'Duration',
    tools: 'Tools',
    challenge: 'The Challenge',
    solution: 'The Solution',
    results: 'Results & Impact',
  },
  contact: {
    sectionTitle: 'Let\'s Connect',
    description: 'I\'m always open to discussing new opportunities, creative ideas, or ways to bring your vision to life. Let\'s create something amazing together.',
    email: 'Send an Email',
    linkedin: 'Connect on LinkedIn',
  },
  footer: {
    copyright: '© 2026 Paula. All rights reserved.',
    madeWith: 'Designed with passion',
  },
};

const de: Translations = {
  nav: {
    home: 'Start',
    projects: 'Projekte',
    about: 'Über mich',
    contact: 'Kontakt',
  },
  hero: {
    greeting: 'Hallo, ich bin',
    name: 'Paula',
    title: 'UX Designerin',
    subtitle: 'Ich gestalte intuitive digitale Erlebnisse, die Nutzerbedürfnisse und Geschäftsziele verbinden. Mit einem menschzentrierten Ansatz verwandle ich komplexe Probleme in elegante, zugängliche Lösungen.',
    cta: 'Meine Arbeiten ansehen',
  },
  about: {
    sectionTitle: 'Über Mich',
    description: [
      'Ich bin eine leidenschaftliche UX Designerin mit einem Auge fürs Detail und einem tiefen Verständnis für Nutzerverhalten. Meine Designphilosophie basiert auf Empathie, Forschung und iterativem Denken.',
      'Mit Erfahrung in verschiedenen Branchen bringe ich ein vielseitiges Skillset mit, das strategisches Denken mit praktischer Designumsetzung verbindet. Ich glaube, dass großartiges Design unsichtbar ist — es funktioniert einfach.',
      'Wenn ich nicht gerade designe, entdecke ich neue Designtrends, besuche UX Meetups oder skizziere Ideen in meinem Notizbuch.',
    ],
  },
  skills: {
    sectionTitle: 'Was Ich Mache',
    items: [
      {
        title: 'UX Research',
        description: 'Nutzerinterviews, Umfragen, Usability-Tests, Persona-Entwicklung und Journey Mapping für tiefe Nutzereinblicke.',
        icon: '🔍',
      },
      {
        title: 'UI Design',
        description: 'Pixelgenaues Interface-Design mit Fokus auf visuelle Hierarchie, Typografie und kohärente Designsysteme.',
        icon: '🎨',
      },
      {
        title: 'Interaction Design',
        description: 'Bedeutungsvolle Micro-Interactions und Animationen, die das Nutzererlebnis bereichern und begeistern.',
        icon: '✨',
      },
      {
        title: 'Prototyping',
        description: 'Von Low-Fidelity Wireframes bis hin zu interaktiven High-Fidelity Prototypen mit Figma, Sketch und Adobe XD.',
        icon: '📐',
      },
      {
        title: 'Design Systeme',
        description: 'Aufbau skalierbarer, konsistenter Komponentenbibliotheken und Design Tokens für mehr Teamproduktivität.',
        icon: '🧩',
      },
      {
        title: 'Strategie & Workshops',
        description: 'Moderation von Design Thinking Workshops, Stakeholder-Alignment und Produktstrategieentwicklung.',
        icon: '💡',
      },
    ],
  },
  projects: {
    sectionTitle: 'Ausgewählte Projekte',
    sectionSubtitle: 'Eine Auswahl aktueller Arbeiten, die meinen Designprozess und Problemlösungsansatz zeigen.',
    viewProject: 'Case Study ansehen',
    backToProjects: '← Zurück zu Projekten',
    overview: 'Überblick',
    role: 'Rolle',
    duration: 'Dauer',
    tools: 'Tools',
    challenge: 'Die Herausforderung',
    solution: 'Die Lösung',
    results: 'Ergebnisse & Impact',
  },
  contact: {
    sectionTitle: 'Kontakt aufnehmen',
    description: 'Ich freue mich immer über neue Möglichkeiten, kreative Ideen oder Wege, Ihre Vision zum Leben zu erwecken. Lassen Sie uns gemeinsam etwas Großartiges schaffen.',
    email: 'E-Mail senden',
    linkedin: 'Auf LinkedIn vernetzen',
  },
  footer: {
    copyright: '© 2026 Paula. Alle Rechte vorbehalten.',
    madeWith: 'Mit Leidenschaft gestaltet',
  },
};

export const translations: Record<Language, Translations> = { en, de };
