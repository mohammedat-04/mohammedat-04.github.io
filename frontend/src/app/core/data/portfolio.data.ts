export interface NavigationItem {
  id: string;
  label: string;
}

export interface HeroMetric {
  value: string;
  label: string;
}

export interface SkillItem {
  name: string;
  short: string;
  category: string;
  level: number;
  summary: string;
}

export interface ProjectItem {
  title: string;
  year: string;
  summary: string;
  outcome: string;
  techStack: string[];
  demoUrl?: string;
  sourceUrl?: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  organization: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface SocialLink {
  label: string;
  caption: string;
  href: string;
}

export const NAV_ITEMS: NavigationItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];

export const HERO_CONTENT = {
  availability: 'Open to internships, research, and robotics collaborations',
  name: 'Mohamed',
  title: 'Computer Engineering Student | Future ML & Robotics Engineer',
  intro:
    'I design intelligent, hardware-aware systems that connect software, embedded control, and machine learning into products that feel precise, useful, and future-ready.',
  focus:
    'Currently exploring robotics software, ROS2 pipelines, embedded prototyping, and machine learning systems with an emphasis on clean engineering and strong user experience.',
  traits: ['Embedded Intelligence', 'ROS2 Workflows', 'ML Prototyping', 'Modern Frontends']
};

export const HERO_METRICS: HeroMetric[] = [
  { value: '8+', label: 'Core technologies in active use' },
  { value: '6', label: 'Portfolio-ready engineering concepts' },
  { value: '24/7', label: 'Curiosity for robotics and AI systems' }
];

export const ABOUT_HIGHLIGHTS: string[] = [
  'Programming with a strong interest in building dependable systems, not just demos.',
  'Robotics and automation workflows that combine perception, control, and visualization.',
  'Machine learning applied with engineering discipline and product thinking.',
  'Embedded systems and Arduino-based prototyping for hands-on experimentation.'
];

export const SKILLS: SkillItem[] = [
  {
    name: 'Python',
    short: 'Py',
    category: 'AI Tooling',
    level: 92,
    summary: 'Used for automation, ML experiments, data processing, and backend problem solving.'
  },
  {
    name: 'Angular',
    short: 'Ng',
    category: 'Frontend',
    level: 86,
    summary: 'Building structured, animated, and scalable web interfaces with strong UX attention.'
  },
  {
    name: 'Node.js',
    short: 'Nd',
    category: 'Backend',
    level: 82,
    summary: 'Creating APIs, services, and integration layers with clean application structure.'
  },
  {
    name: 'C',
    short: 'C',
    category: 'Systems',
    level: 88,
    summary: 'Low-level programming foundations for embedded control and performance-sensitive logic.'
  },
  {
    name: 'Java',
    short: 'Jv',
    category: 'Applications',
    level: 79,
    summary: 'Desktop application development and strong object-oriented problem solving.'
  },
  {
    name: 'ROS2',
    short: 'R2',
    category: 'Robotics',
    level: 84,
    summary: 'Developing robotics workflows around communication, visualization, and modular nodes.'
  },
  {
    name: 'Arduino',
    short: 'Ar',
    category: 'Embedded',
    level: 90,
    summary: 'Rapid prototyping for sensors, control loops, motor drivers, and physical interaction.'
  },
  {
    name: 'Machine Learning',
    short: 'ML',
    category: 'Intelligence',
    level: 76,
    summary: 'Applying core ML ideas to perception, prediction, and robotics-oriented experiments.'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    title: 'Arduino Line Follower',
    year: '2026',
    summary:
      'A compact robotics build focused on real-time sensor input, path correction, and stable motor control.',
    outcome: 'Designed for responsive tracking and iterative tuning under changing track conditions.',
    techStack: ['Arduino', 'C', 'Sensors', 'Control Logic'],
    demoUrl: '#contact',
    sourceUrl: 'https://github.com/mohammedat04'
  },
  {
    title: 'ROS2 Visualization Workspace',
    year: '2026',
    summary:
      'A robotics visualization environment for monitoring node state, telemetry, and navigation-related events.',
    outcome: 'Improved clarity for debugging and system understanding during robotics experiments.',
    techStack: ['ROS2', 'Python', 'Visualization', 'Ubuntu'],
    demoUrl: '#contact',
    sourceUrl: 'https://github.com/mohammedat04'
  },
  {
    title: 'JavaFX Pokemon Battle Simulator',
    year: '2025',
    summary:
      'A polished desktop simulator with turn-based battle logic, state transitions, and animated game feedback.',
    outcome: 'Focused on OOP design, UI orchestration, and smooth interaction flow.',
    techStack: ['Java', 'JavaFX', 'OOP', 'UI Logic'],
    demoUrl: '#contact',
    sourceUrl: 'https://github.com/mohammedat04'
  },
  {
    title: 'Embedded Telemetry Dashboard',
    year: '2025',
    summary:
      'A concept dashboard for streaming hardware metrics into a modern interface for quick diagnosis and insight.',
    outcome: 'Bridged embedded signals with an operator-facing product layer.',
    techStack: ['Angular', 'Node.js', 'WebSocket', 'Embedded Data'],
    demoUrl: '#contact',
    sourceUrl: 'https://github.com/mohammedat04'
  },
  {
    title: 'Vision-Guided Robotics Concept',
    year: '2026',
    summary:
      'An ML-oriented concept exploring how perception pipelines can support robotic movement decisions.',
    outcome: 'Framed a path from classification experiments toward applied robotics intelligence.',
    techStack: ['Python', 'Machine Learning', 'Computer Vision', 'Robotics'],
    demoUrl: '#contact'
  },
  {
    title: 'Interactive Portfolio Platform',
    year: '2026',
    summary:
      'A premium web portfolio experience built with Angular and Express, emphasizing visual quality and motion.',
    outcome: 'Combines frontend craft, backend structure, and performance-minded interactivity.',
    techStack: ['Angular', 'SCSS', 'Node.js', 'Express'],
    demoUrl: '#hero',
    sourceUrl: 'https://github.com/mohammedat04'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: 'Present',
    title: 'Computer Engineering Student',
    organization: 'Academic Track',
    location: 'Germany',
    summary:
      'Developing a strong base in software engineering, embedded systems, and intelligent robotics.',
    highlights: [
      'Bridging theory with hands-on prototyping and implementation.',
      'Focusing on robotics software, machine learning, and dependable system design.'
    ]
  },
  {
    period: 'HiWi Role',
    title: 'HiWi / Student Assistant',
    organization: 'Research or Technical Environment',
    location: 'Germany',
    summary:
      'Supporting technical work with careful implementation, iterative testing, and a practical engineering mindset.',
    highlights: [
      'Contributed to structured development tasks and day-to-day technical problem solving.',
      'Worked across software and engineering details with reliability and clarity in mind.'
    ]
  },
  {
    period: '2025 - 2026',
    title: 'Independent Builder',
    organization: 'Personal Projects',
    location: 'Remote',
    summary:
      'Building portfolio-grade projects that connect frontend quality, backend APIs, robotics ideas, and embedded experimentation.',
    highlights: [
      'Created interactive interfaces with polished visual language and strong layout discipline.',
      'Developed projects that reflect long-term direction toward ML and robotics engineering.'
    ]
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    caption: 'Code, experiments, and project structure',
    href: 'https://github.com/mohammedat04'
  },
  {
    label: 'LinkedIn',
    caption: 'Professional profile and networking',
    href: 'https://www.linkedin.com/in/atef-helali-6b9568283/'
  },
  {
    label: 'Email',
    caption: 'Direct contact for internships and collaboration',
    href: 'mailto:mohamed@example.com'
  }
];

export const CONTACT_COPY = {
  lead:
    'If you are looking for a motivated engineering student with strong interest in robotics, embedded systems, and machine learning, let’s talk.',
  note:
    'This form is connected to an Express API and persists submissions in a simple message store for local development.'
};
