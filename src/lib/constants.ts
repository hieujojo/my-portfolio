export type GameMetadata = {
  engine: string;
  genre: string;
  dimension: '2D' | '3D';
};

export type Project = {
  id: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
  category: string[];
  repo: string;
  demo: string | null;
  demoLabel?: string;
  extraLinks?: { label: string; url: string }[];
  comingSoon: boolean;
  isNew: boolean;
  game?: GameMetadata;
  status: 'Live' | 'Archive' | 'In Progress';
  type: 'Web App' | 'Mobile App' | 'Game' | 'Backend Service';
  stack: string[];
  year: number;
};

export const projects: Project[] = [
  {
    id: 'distributed-cache',
    title: 'Distributed Cache',
    image: '/images/project/distribute-cache.png',
    description: 'A lightweight distributed cache built from scratch with consistent hashing, virtual nodes, quorum-based replication, TTL, LRU/LFU/FIFO eviction, leader election, wildcard invalidation, and a Redis-inspired TCP protocol.',
    tags: ['#typescript', '#nodejs', '#distributed-systems', '#murmurhash', '#jest'],
    category: ['Backend'],
    repo: 'https://github.com/hieujojo/distributed-cache',
    demo: 'https://distributed-cache-docs.vercel.app',
    demoLabel: 'Live Demo',
    extraLinks: [{ label: 'npm', url: 'https://www.npmjs.com/package/@hieujojo/distributed-cache' }],
    comingSoon: false,
    isNew: true,
    status: 'Live',
    type: 'Backend Service',
    stack: ['TypeScript', 'Node.js', 'Jest'],
    year: 2025,
  },
  {
    id: 'interview-prep',
    title: 'Interview Prep – Luyện Phỏng Vấn AI',
    image: '/images/project/interview-prep-project.png',
    description: 'AI-powered technical interview platform featuring CV analysis, JD matching, mock interviews, code review, coding exercises, and learning progress tracking.',
    tags: ['#nextjs', '#typescript', '#tailwindcss', '#supabase', '#groq-ai'],
    category: ['Web', 'AI'],
    repo: 'https://github.com/hieujojo/interview-prep',
    demo: 'https://interview-prep-delta-eight.vercel.app',
    comingSoon: false,
    isNew: false,
    status: 'Live',
    type: 'Web App',
    stack: ['Next.js', 'Supabase', 'Groq AI'],
    year: 2025,
  },
  {
    id: 'crm',
    title: 'CRM Customer For Sales',
    image: '/images/project/crm.png',
    description: 'CRM app with Gmail & Google Calendar OAuth 2.0 sync, Firebase realtime notifications, Kanban board (dnd-kit) with Firestore realtime sync, and Layered Architecture + SOLID backend.',
    tags: ['#nextjs', '#typescript', '#firebase', '#mongodb', '#dotnet'],
    category: ['Web', 'Backend'],
    repo: 'https://github.com/hieujojo/cust360web',
    demo: 'https://cust360web.vercel.app',
    comingSoon: false,
    isNew: true,
    status: 'Live',
    type: 'Web App',
    stack: ['Next.js', 'Firebase', '.NET'],
    year: 2025,
  },
  {
    id: 'petshop',
    title: 'PetShop – E-commerce for Pet Products',
    image: '/images/project/pet.png',
    description: 'E-commerce site for pet products with AI-powered shopping via Wit.ai chatbot, Redis caching, responsive UI, secure auth, and order processing via Nodemailer.',
    tags: ['#nextjs', '#mongodb', '#tailwind'],
    category: ['Web'],
    repo: 'https://github.com/hieujojo/pet_shop_frontend',
    demo: null,
    comingSoon: false,
    isNew: false,
    status: 'Archive',
    type: 'Web App',
    stack: ['Next.js', 'MongoDB', 'Wit.ai'],
    year: 2024,
  },
  {
    id: 'social-app',
    title: 'Social App',
    image: '/images/project/project3.jpg',
    description: 'A full-stack social media app with authentication, posting, commenting, and real-time notifications. Built with Express.js and React Native (Expo).',
    tags: ['#react-native', '#mongodb', '#nativewind'],
    category: ['Mobile', 'Backend'],
    repo: 'https://github.com/hieujojo/Social-App',
    demo: null,
    comingSoon: false,
    isNew: false,
    status: 'Archive',
    type: 'Mobile App',
    stack: ['React Native', 'Expo', 'MongoDB'],
    year: 2024,
  },
  {
    id: 'starveil-runner',
    title: 'Starveil Runner',
    image: '/images/project/starveil-runner.png',
    description: 'A neon 3D endless runner built with Unity. Pilot a spaceship through three lanes, dodge drones, collect StarDust, build combos, and survive an escalating cosmic gauntlet.',
    tags: ['#unity', '#csharp', '#3d', '#endless-runner', '#gameplay-systems'],
    category: ['Games'],
    repo: 'https://github.com/hieujojo/Starveil-Runner',
    demo: 'https://play.unity.com/en/games/00ba213a-f671-4e8d-9a57-65da13cf1e5c/starveil-runner',
    demoLabel: 'Play Game',
    extraLinks: [{ label: 'itch.io', url: 'https://lothric11.itch.io/starveil-runner' }],
    comingSoon: false,
    isNew: false,
    game: { engine: 'Unity', genre: 'Endless Runner', dimension: '3D' },
    status: 'Live',
    type: 'Game',
    stack: ['Unity', 'C#', 'WebGL'],
    year: 2026,
  },
  {
    id: 'shipper-run-danang',
    title: 'Shipper Run Danang',
    image: '/images/project/shipper-run-danang.png',
    description: 'A 2D endless runner made with PixiJS, inspired by the streets and delivery culture of Da Nang.',
    tags: ['#pixijs', '#javascript', '#2d', '#endless-runner'],
    category: ['Games'],
    repo: 'https://github.com/hieujojo/shipper-run-danang',
    demo: 'https://shipper-run-danang.vercel.app/',
    comingSoon: false,
    isNew: false,
    game: { engine: 'PixiJS', genre: 'Endless Runner', dimension: '2D' },
    status: 'Archive',
    type: 'Game',
    stack: ['PixiJS', 'JavaScript', 'WebGL'],
    year: 2025,
  },
];

export const projectCategories = ['All', 'Web', 'Mobile', 'AI', 'Backend', 'Games'] as const;
