# Codebase Overview

## Purpose

This repository is a single-page personal portfolio built with Next.js 15 (App Router). It presents profile, education, experience, skills, projects, and a contact form, with Framer Motion and React Three Fiber used for visual effects.

## Runtime and commands

- `npm run dev` starts the Turbopack development server on port `3192`.
- `npm run build` creates the production build.
- `npm run start` serves a completed production build.
- `npm run lint` runs ESLint using the Next.js Core Web Vitals rules and is suitable for non-interactive CI.

The project uses TypeScript with strict mode, Tailwind CSS v4, React 19, and Next.js 15.3.8.

## Application structure

| Path | Responsibility |
| --- | --- |
| `src/app/layout.tsx` | Root metadata, global CSS, and persistent navigation |
| `src/app/page.tsx` | Composes every portfolio section and the fixed star background |
| `src/app/api/contact/route.ts` | Validates contact requests and sends email with Nodemailer/Gmail |
| `src/components/` | Page sections: hero, about, education, experience, skills, projects, contact, and navigation |
| `src/components/canvas/` | React Three Fiber scenes for stars, astronaut, rocket, and legacy models |
| `src/lib/animations.ts` | Shared Framer Motion variants |
| `src/data/skillColors.json` | Colour mapping for skill-logo effects |
| `public/` | Publicly served images, documents, GLTF models, and texture assets |

## Main UI flow

`page.tsx` renders the sections in this order:

1. Home (`#home`) — hero text and astronaut model.
2. About (`#about`) — bio, statistics, and service cards.
3. Education (`#education`) — education record and document lightbox.
4. Experience (`#experience`) — Fastdo record and image lightbox.
5. Skills (`#skills`) — skill marquess and orbital layout.
6. Projects (`#projects`) — category-filtered project cards.
7. Contact (`#contact`) — contact form, toast feedback, and rocket canvas.

`Nav.tsx` links to the section anchors, shows a scroll-progress bar, and provides social/CV links.

## Contact configuration

The contact endpoint accepts JSON with `name`, `email`, and `message`, validates and HTML-escapes it, then sends it with Gmail via Nodemailer. It permits at most five requests per minute for each IP address in a single running instance.

Required environment variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

Optional variable:

```env
EMAIL_TO=recipient@gmail.com
```

When `EMAIL_TO` is omitted, mail is delivered to `EMAIL_USER`. This supports local testing without duplicating the sender address. Environment files are excluded from Git.

## Asset conventions

- A URL such as `/images/profile.png` resolves to `public/images/profile.png`.
- Asset path casing must exactly match the filename. This is essential for Linux production hosts, even though Windows development filesystems are case-insensitive.
- Large GLTF models and textures are stored in `public/desktop_pc`, `public/robot_playground`, `public/planet`, and `public/screen-monitor`.

## Current known follow-ups

- The legacy robot and desktop PC assets remain archived and are not used by the active page.
- The canvas loading spinner uses viewport height and can be revisited as a future 3D polish task.
- Contact currently has in-memory IP/email rate limiting and a honeypot; use a shared provider before deploying multiple server instances.
## Current implementation notes

- `HomeSection` renders the astronaut model, not the legacy desktop PC.
- `ContactSection` renders the Launch Pad control deck and `RocketCanvas`, not the legacy robot.
- `ProjectsSection` consumes the shared catalog from `src/lib/constants.ts`.
- `Nav` includes cyan scroll-progress and active-link indicators.
- Responsive layout has been reviewed at desktop and smaller breakpoints; run a final browser pass after any content changes.
- Production deployments with multiple server instances should replace the in-memory limiter with a shared provider.
- The rocket asset is AI-generated with no author metadata; its source/license should be documented as unknown unless the generator terms are confirmed.

## Skills icon normalization

- `public/images/skills-normalized/` contains review-only PNG variants generated from the original skill icons.
- The variants trim transparent margins, preserve aspect ratio, and center each logo on a consistent 512×512 canvas.
- Original files under `public/images/skills/` are preserved.

## Universe section map

- Home: astronaut exploration.
- About: Galaxy Core identity center.
- Education: constellation chart of learning milestones.
- Experience: Orbital Mission Archive.
- Skills: Solar System / Skill Belt.
- Projects: Mission Gallery.
- Contact: Launch Pad with the space rocket.
- Nav: Starship HUD.
