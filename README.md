# 🚀 Portfolio Universe — Trương Công Hiếu

> A space-themed interactive portfolio built with Next.js 15, Three.js, and Framer Motion.

---

## 🌐 Live Demo

<!-- Add Vercel URL here when deployed -->
_Coming soon..._

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| Font | System sans-serif stack |
| 3D Engine | Three.js via `@react-three/fiber` |
| 3D Helpers | `@react-three/drei` (Float, Environment, OrbitControls) |
| Animation | Framer Motion |
| Email | Nodemailer via `/api/contact` |
| Tilt Effect | `react-parallax-tilt` |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens, keyframes, Space Grotesk font
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Nav.tsx              # Navigation with scroll-aware glassmorphism
│   ├── HomeSection.tsx      # Hero — 3D model + typewriter text
│   ├── AboutSection.tsx     # Bio + service cards + stats
│   ├── EducationSection.tsx # Timeline + lightbox gallery
│   ├── ExperienceSection.tsx# Mission log + image gallery
│   ├── SkillsSection.tsx    # Solar system skill visualization (Three.js)
│   ├── ProjectsSection.tsx  # Project cards with filter
│   ├── ContactSection.tsx   # Contact form + Robot 3D model
│   └── canvas/
│       ├── Stars.tsx        # Multi-layer star field (purple + blue + white)
│       ├── Computers.tsx    # Desktop PC model canvas [PRESERVED — see below]
│       ├── Loader.tsx       # Canvas loading spinner
│       ├── Robot.jsx        # Animated robot (reactive to typing)
│       └── RobotModel.tsx   # Robot model wrapper
├── lib/
│   └── animations.ts        # Centralized Framer Motion variants
├── data/                    # Static data files
├── assets/                  # Images, icons
└── types/                   # TypeScript types
public/
├── desktop_pc/              # Desktop PC GLTF model [PRESERVED]
├── planet/                  # Planet GLTF model
├── robot_playground/        # Robot GLTF model
├── screen-monitor/          # Monitor model
├── images/                  # Profile, backgrounds
└── CV_DEVELOPER.pdf
```

---

## 🖥️ Preserved Canvas Components

> These components are intentionally kept even if not currently in the main view. They serve as reference implementations.

### `Computers.tsx` + `/public/desktop_pc/`
- Original desktop PC GLTF model canvas
- Features: `OrbitControls`, `spotLight`, `hemisphereLight`, mobile-responsive scale
- Rendered by `HomeSection` as the current hero model

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--color-purple-core` | `#a855f7` | Stars, accents, glow |
| `--color-purple-deep` | `#6b21a8` | Gradients, scrollbar |
| `--color-purple-glow` | `rgba(168,85,247,0.15)` | Blur halos |
| `--color-blue-star` | `#60a5fa` | Star layer 2 |
| `--color-space-bg` | `#0a0a0f` | Background |

### CSS Utility Classes
| Class | Effect |
|---|---|
| `.nebula-glow` | Pulsing opacity + scale animation |
| `.float-animation` | Gentle vertical float |
| `.glow-ring` | Purple box-shadow pulse |
| `.scroll-indicator` | Bounce animation for scroll arrow |
| `.glass` | Glassmorphism backdrop-blur card |
| `.shooting-star` | Diagonal streak animation |

### Shared Animation Variants (`src/lib/animations.ts`)
```ts
textVariant(delay?)         // Spring drop-in for headings
fadeIn(direction, delay, duration) // Slide in from any direction
staggerContainer(stagger, delay)   // Wrapper for stagger effects
scaleIn(delay?)             // Scale up from center
slideIn(direction, type, delay, duration) // Edge slide
planetOrbit(duration, direction)   // Infinite rotation
wordReveal                  // Word-by-word text reveal
```

---

## ⭐ Stars System

`Stars.tsx` uses **3 independent rotating layers**:

| Layer | Count | Color | Size | Speed |
|---|---|---|---|---|
| 1 — Purple | 8,000 | `#a855f7` | 0.002 | Fast |
| 2 — Blue | 4,000 | `#93c5fd` | 0.001 | Medium |
| 3 — White | 2,000 | `#f8fafc` | 0.0015 | Slow |

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3192](http://localhost:3192)

### Environment Variables

Create `.env.local`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
# Optional: defaults to EMAIL_USER when omitted (convenient for local development)
EMAIL_TO=recipient@gmail.com
```

---

## 📦 Install & Build

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint check
```

---

## 🌍 Deploy

Recommended: [Vercel](https://vercel.com) — zero config for Next.js.

Add environment variables in Vercel dashboard before deploying.

The contact endpoint limits each IP address to five requests per minute per running instance. Use a shared rate-limit store or bot-protection service for a multi-instance production deployment.
