import { Variants, Transition } from 'framer-motion';

// ─── Text Variants ───────────────────────────────────
/** Slide down from top with spring — dùng cho tiêu đề section */
export const textVariant = (delay: number = 0): Variants => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    } as Transition,
  },
});

// ─── Fade In ─────────────────────────────────────────
/** Directional fade-in — dùng cho paragraphs, cards */
export const fadeIn = (
  direction: 'left' | 'right' | 'up' | 'down',
  delay: number = 0,
  duration: number = 1
): Variants => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      delay,
      duration,
      ease: 'easeOut',
    } as Transition,
  },
});

// ─── Stagger Container ───────────────────────────────
/** Wrapper container để stagger children animations */
export const staggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// ─── Scale In ────────────────────────────────────────
/** Scale from center — dùng cho cards, modals */
export const scaleIn = (delay: number = 0): Variants => ({
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
      delay,
    } as Transition,
  },
});

// ─── Slide In ────────────────────────────────────────
/** Slide from edge — dùng cho sidebar, mobile menu */
export const slideIn = (
  direction: 'left' | 'right' | 'up' | 'down',
  type: 'tween' | 'spring' = 'tween',
  delay: number = 0,
  duration: number = 0.5
): Variants => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: { type, delay, duration, ease: 'easeOut' } as Transition,
  },
});

// ─── Planet Orbit ────────────────────────────────────
/** Orbital rotation — dùng cho decorative planet elements */
export const planetOrbit = (
  duration: number = 20,
  direction: 'cw' | 'ccw' = 'cw'
): Variants => ({
  hidden: { rotate: 0 },
  show: {
    rotate: direction === 'cw' ? 360 : -360,
    transition: {
      duration,
      repeat: Infinity,
      ease: 'linear',
    },
  },
});

// ─── Word Reveal ─────────────────────────────────────
/** Reveal từng từ — dùng cho hero/bio text */
export const wordReveal: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

// ─── Section Wrapper Variants ────────────────────────
/** Standard section animation wrapper */
export const sectionVariants = staggerContainer(0.1, 0);
