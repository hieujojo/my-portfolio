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
  engine?: string;
  genre?: string;
  dimension?: '2D' | '3D';
  status?: string;
};

export const projects: Project[] = [
  {
    id: 'distributed-cache',
    title: 'Distributed Cache',
    image: '/images/project/distributed-cache.png',
    description: 'A lightweight distributed cache built from scratch with consistent hashing, virtual nodes, quorum-based replication, TTL, LRU/LFU/FIFO eviction, leader election, wildcard invalidation, and a Redis-inspired TCP protocol.',
    tags: ['#typescript', '#nodejs', '#distributed-systems', '#murmurhash', '#jest'],
    category: ['Backend'],
    repo: 'https://github.com/hieujojo/distributed-cache',
    demo: 'https://distributed-cache-docs.vercel.app',
    demoLabel: 'Docs',
    extraLinks: [{ label: 'npm', url: 'https://www.npmjs.com/package/@hieujojo/distributed-cache' }],
    comingSoon: false,
    isNew: true,
    status: 'v0.1.6',
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
  },
  {
    id: 'starveil-runner',
    title: 'Starveil Runner',
    image: '/images/project/starveil-runner.png',
    description: 'A 3D space runner built with Unity, focused on ship movement, obstacle avoidance and collecting energy through a starfield.',
    tags: ['#unity', '#csharp', '#3d', '#space-runner'],
    category: ['Games'],
    repo: 'https://github.com/hieujojo/Starveil-Runner',
    demo: 'https://play.unity.com/en/games/00ba213a-f671-4e8d-9a57-65da13cf1e5c/starveil-runner',
    demoLabel: 'Unity Play',
    extraLinks: [{ label: 'itch.io', url: 'https://lothric11.itch.io/starveil-runner' }],
    comingSoon: false,
    isNew: false,
    engine: 'Unity',
    genre: 'Space Runner',
    dimension: '3D',
    status: 'Archive',
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
    engine: 'PixiJS',
    genre: 'Endless Runner',
    dimension: '2D',
    status: 'Archive',
  },
];

export const projectCategories = ['All', 'Web', 'Mobile', 'Backend', 'AI', 'Games'] as const;
