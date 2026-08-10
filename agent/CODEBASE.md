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
| `src/components/canvas/` | React Three Fiber scenes for stars, astronaut, desktop PC, and robot |
| `src/lib/animations.ts` | Shared Framer Motion variants |
| `src/data/skillColors.json` | Colour mapping for skill-logo effects |
| `public/` | Publicly served images, documents, GLTF models, and texture assets |

## Main UI flow

`page.tsx` renders the sections in this order:

1. Home (`#home`) — hero text and desktop PC model.
2. About (`#about`) — bio, statistics, and service cards.
3. Education (`#education`) — education record and document lightbox.
4. Experience (`#experience`) — Fastdo record and image lightbox.
5. Skills (`#skills`) — skill marquess and orbital layout.
6. Projects (`#projects`) — category-filtered project cards.
7. Contact (`#contact`) — contact form, toast feedback, and robot canvas.

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

- The robot interaction props in `RobotModel.tsx` are not wired into the rendered model; 3D fixes are deliberately deferred.
- The canvas loading spinner uses viewport height and should be revisited as part of the deferred 3D work.
- Replace the in-memory contact rate-limit store with a shared provider before using multiple server instances.
- Add bot protection to the contact form before a public launch.
## Current implementation notes

- `HomeSection` renders the astronaut model, not the legacy desktop PC.
- `ContactSection` renders the Launch Pad control deck and `RocketCanvas`, not the legacy robot.
- `ProjectsSection` consumes the shared catalog from `src/lib/constants.ts`.
- `Nav` includes cyan scroll-progress and active-link indicators.
- Remaining work: responsive verification across all sections, shared production rate limiting/bot protection, and rocket license confirmation.

## Universe section map

- Home: astronaut exploration.
- About: Galaxy Core identity center.
- Education: constellation chart of learning milestones.
- Experience: Orbital Mission Archive.
- Skills: Solar System / Skill Belt.
- Projects: Mission Gallery.
- Contact: Launch Pad with the space rocket.
- Nav: Starship HUD.
