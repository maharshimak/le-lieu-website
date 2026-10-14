'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

type FormData = {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
};

const initialData: FormData = { name: '', email: '', date: '', time: '', guests: '2' };

export function ReservationPanel() {
  const [data, setData] = useState<FormData>(initialData);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!data.name.trim()) return setError('Please enter your name.');
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return setError('Please enter a valid email.');
    if (!data.date || !data.time) return setError('Please select a date and time.');

    const guestsNumber = Number(data.guests);
    if (!Number.isInteger(guestsNumber) || guestsNumber < 1 || guestsNumber > 12) return setError('Guests must be between 1 and 12.');

    setLoading(true);
    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, guests: guestsNumber })
      });
      const result = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        setError(result.error ?? 'Unable to process request right now.');
      } else {
        setError('No booking integration is configured.');
        setData(initialData);
      }
    } catch {
      setError('Network error. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section id="reservation" initial={{ y: 35, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mx-auto mb-24 max-w-4xl px-6">
      <form onSubmit={onSubmit} className="glass rounded-3xl p-8 md:p-10" noValidate>
        <h2 className="section-title text-3xl">Book a Table</h2>
        <p className="mt-2 text-sm text-white/70">Demo form only. Online reservations are unavailable; no booking will be saved or sent.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm">Name<input suppressHydrationWarning aria-label="Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="focus-ring mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3" /></label>
          <label className="text-sm">Email<input suppressHydrationWarning aria-label="Email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="focus-ring mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3" /></label>
          <label className="text-sm">Date<input suppressHydrationWarning aria-label="Date" type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className="focus-ring mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3" /></label>
          <label className="text-sm">Time<input suppressHydrationWarning aria-label="Time" type="time" value={data.time} onChange={(e) => setData({ ...data, time: e.target.value })} className="focus-ring mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3" /></label>
          <label className="text-sm md:col-span-2">Guests<input suppressHydrationWarning aria-label="Guests" type="number" min={1} max={12} value={data.guests} onChange={(e) => setData({ ...data, guests: e.target.value })} className="focus-ring mt-1 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3" /></label>
        </div>
        <AnimatePresence mode="wait">
          {error ? (
            <motion.p key="error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 text-sm text-red-300">
              {error}
            </motion.p>
          ) : null}
          {success ? (
            <motion.p key="success" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 text-sm text-emerald-300">
              {success}
            </motion.p>
          ) : null}
        </AnimatePresence>
        <Button type="submit" size="lg" className="mt-6 min-w-[220px]" disabled={loading}>
          {loading ? (
            <span className="inline-flex items-center gap-2">Sending<span className="inline-flex gap-1"><motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="h-1 w-1 rounded-full bg-black" /><motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.15 }} className="h-1 w-1 rounded-full bg-black" /><motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.3 }} className="h-1 w-1 rounded-full bg-black" /></span></span>
          ) : 'Send Reservation Request'}
        </Button>
      </form>
    </motion.section>
  );
}
