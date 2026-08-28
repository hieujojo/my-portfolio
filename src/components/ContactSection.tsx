'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import RocketCanvas from './canvas/RocketCanvas';
import { fadeIn, staggerContainer } from '@/lib/animations';

const fieldClass =
  'peer w-full rounded-xl border border-cyan-300/10 bg-[#080b18]/80 px-4 pb-3 pt-6 text-white outline-none transition focus:border-cyan-300/70 focus:ring-1 focus:ring-cyan-300/30';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const sendEmail = async () => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send');
    };

    toast
      .promise(sendEmail(), {
        loading: 'Transmitting message...',
        success: 'Transmission successful!',
        error: 'Communication link failed.',
      }, {
        style: { background: '#080b18', color: '#fff', border: '1px solid rgba(103,232,249,.35)' },
        iconTheme: { primary: '#67e8f9', secondary: '#080b18' },
      })
      .then(() => {
        setFormData({ name: '', email: '', message: '', website: '' });
        setTriggerAnimation(true);
        window.setTimeout(() => setTriggerAnimation(false), 2000);
      })
      .catch(() => undefined)
      .finally(() => setIsLoading(false));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-12">
      <Toaster position="bottom-right" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-400/[0.035] blur-[140px]" />

      <motion.div
        variants={staggerContainer(0.12, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 mx-auto max-w-7xl"
      >
        <motion.header variants={fadeIn('down', 0, 0.8)} className="mb-12 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.45em] text-cyan-300">Launch Pad / Communication Deck</p>
          <h2 className="mt-3 text-4xl font-black text-white sm:text-6xl">Send Transmission</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">Open a secure channel and send your message into orbit.</p>
        </motion.header>

        <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div variants={fadeIn('right', 0.15, 0.9)} className="rounded-[2rem] border border-cyan-300/20 bg-[#080b18]/80 p-5 shadow-[0_0_70px_rgba(34,211,238,.07)] backdrop-blur-xl sm:p-8">
            <div className="mb-7 flex items-center justify-between border-b border-cyan-300/10 pb-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-500">Control console</p>
                <h3 className="mt-2 text-xl font-bold text-white">Communication uplink</h3>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" /> Online
              </span>
            </div>

            <div className="mb-7 flex items-center gap-4 rounded-xl border border-cyan-300/10 bg-cyan-300/[0.035] p-3">
              <Image src="/images/profile.png" alt="Truong Cong Hieu" width={56} height={56} className="h-14 w-14 rounded-full border border-cyan-300/40 object-cover shadow-[0_0_20px_rgba(103,232,249,.25)]" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Operator identity</p>
                <p className="mt-1 font-semibold text-white">Truong Cong Hieu</p>
                <p className="text-xs text-cyan-200">Full-stack transmission engineer</p>
              </div>
            </div>

            <div className="mb-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.04] p-4"><p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Frequency</p><p className="mt-2 text-sm text-cyan-200">0948041022</p></div>
              <div className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.04] p-4"><p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Coordinates</p><a href="mailto:conghieuzc112@gmail.com" className="mt-2 block truncate text-sm text-cyan-200 hover:text-cyan-300">conghieuzc112@gmail.com</a></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                aria-hidden="true"
                autoComplete="off"
                className="absolute -left-[9999px] h-px w-px opacity-0"
                name="website"
                tabIndex={-1}
                value={formData.website}
                onChange={handleInputChange}
              />
              <div className="relative"><input className={`${fieldClass} placeholder-transparent`} id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required /><label htmlFor="name" className="pointer-events-none absolute left-4 top-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300/70">Identification / name</label></div>
              <div className="relative"><input className={`${fieldClass} placeholder-transparent`} id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required /><label htmlFor="email" className="pointer-events-none absolute left-4 top-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300/70">Return frequency / email</label></div>
              <div className="relative"><textarea className={`${fieldClass} min-h-36 resize-none placeholder-transparent`} id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Message" required /><label htmlFor="message" className="pointer-events-none absolute left-4 top-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300/70">Transmission data</label></div>
              <motion.button type="submit" whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} disabled={isLoading} className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-300 to-blue-500 px-5 py-4 font-mono text-sm font-black uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_28px_rgba(103,232,249,.22)] transition hover:shadow-[0_0_38px_rgba(103,232,249,.4)] disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? 'Transmitting...' : 'Initiate transmission'}</motion.button>
            </form>
          </motion.div>

          <motion.div variants={fadeIn('left', 0.25, 1)} className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#050816]/75 shadow-[0_0_90px_rgba(59,130,246,.1)] backdrop-blur-xl">
            <div className="absolute inset-x-8 bottom-10 h-24 rounded-[50%] border border-cyan-300/20 bg-cyan-300/[0.04] shadow-[0_0_55px_rgba(34,211,238,.15)]" />
            <div className="absolute inset-x-16 bottom-14 h-12 rounded-[50%] border border-dashed border-cyan-300/30" />
            <div className="absolute left-6 top-6 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/70">Pad 07 / Ready</div>
            <div className="absolute right-6 top-6 z-10 text-right font-mono text-[10px] uppercase tracking-wider text-slate-500"><p>Telemetry</p><p className="mt-1 text-emerald-300">Nominal</p></div>
            <div className="relative z-[1] h-[500px] pt-8"><RocketCanvas launchTrigger={triggerAnimation} /></div>
            <div className="absolute bottom-5 left-8 right-8 z-10 flex justify-between font-mono text-[10px] uppercase tracking-wider text-slate-500"><span>Engine: standby</span><span className="text-cyan-300">Signal: open</span></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
