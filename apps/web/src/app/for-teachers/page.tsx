'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LandingNavbar } from '@/components/layout/landing-navbar';
import { LandingFooter } from '@/components/layout/landing-footer';
import { Users, BarChart3, Target, Award, ArrowRight } from 'lucide-react';

export default function ForTeachersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-16">
      <LandingNavbar />
      
      {/* Ultra-premium dark ambient background */}
      <div className="fixed inset-0 z-[-1] bg-[#030303]">
        <div 
          className="absolute inset-0 opacity-[0.25] mix-blend-screen"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/90 to-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-60" />
      </div>

      <main className="relative py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-foreground/80 mb-6 shadow-inner">
              👩‍🏫 Nexus for Educators
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-black tracking-tight mb-6 leading-tight">
              Teach smarter, not harder.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Nexus gives you a real-time window into every student's understanding.
              No more guessing who's struggling — the AI flags at-risk students before they fall behind.
            </p>
            
            <ul className="space-y-6 mb-10">
              {[
                { icon: Users, text: 'Manage multiple classrooms with enrollment codes' },
                { icon: BarChart3, text: 'Live analytics: mastery, accuracy, and engagement per topic' },
                { icon: Target, text: 'AI-identified weak areas and personalized recommendations' },
                { icon: Award, text: 'Create assignments with auto-grading and progress tracking' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
                  </div>
                  <span className="text-lg text-muted-foreground group-hover:text-foreground transition-colors duration-300 pt-1.5">{text}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex gap-4">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold text-base hover:bg-gray-200 transition-all shadow-xl shadow-white/10 hover:-translate-y-1"
              >
                Start teaching for free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-8 shadow-2xl hover:border-white/20 transition-colors duration-500 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
              <p className="text-xl font-bold">Advanced Math — Grade 11</p>
              <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-bold border border-success/20">22/28 active</span>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Emma L.', mastery: 88, status: 'active', rank: '💎' },
                { name: 'James R.', mastery: 75, status: 'active', rank: '🥇' },
                { name: 'Sofia M.', mastery: 68, status: 'active', rank: '🥈' },
                { name: 'Marcus T.', mastery: 28, status: 'at-risk', rank: '⚠️' },
                { name: 'Olivia K.', mastery: 92, status: 'active', rank: '💎' },
              ].map((s) => (
                <div key={s.name} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${s.status === 'at-risk' ? 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10' : 'border-white/5 bg-black/20 hover:bg-black/60 hover:border-white/10'}`}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-lg shadow-sm text-foreground">{s.rank}</div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">{s.name}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden shadow-inner">
                        <div className={`h-full rounded-full transition-all duration-1000 ${s.status === 'at-risk' ? 'bg-gray-400 shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'}`} style={{ width: `${s.mastery}%` }} />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground w-8">{s.mastery}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Educator Tools Section */}
      <section className="relative py-24 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3"
            >
              Educator Tools
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-display font-bold mb-6"
            >
              Everything you need to <span className="text-gray-300">elevate</span> your classroom
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Automated Grading", desc: "Never grade a multiple-choice or math input again. Nexus grades assignments instantly, giving you your weekends back.", icon: Award },
              { title: "Early Intervention", desc: "The AI spots knowledge gaps before they become failures. Get alerted instantly when a student gets stuck on a concept.", icon: Target },
              { title: "Curriculum Builder", desc: "Build custom skill trees for your class. Reorder topics, add custom assignments, and set the pace of learning.", icon: BarChart3 }
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-white/5 bg-black/40 hover:bg-black/60 backdrop-blur-xl shadow-xl hover:shadow-white/5 hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-inner">
                  <feat.icon className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-bold mb-3">{feat.title}</h4>
                <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors leading-relaxed text-lg">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact / Social Proof Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-12 md:p-16 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-black/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="text-6xl text-white/10 mb-6 font-serif">"</div>
              <p className="text-2xl md:text-4xl font-display font-medium leading-relaxed mb-12 text-foreground/90">
                Nexus completely changed how I teach. I no longer spend hours trying to figure out who is struggling. The dashboard tells me exactly who needs my help and exactly what they don't understand.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                <div className="w-16 h-16 rounded-full border-2 border-white/20 overflow-hidden shadow-lg grayscale transition-all duration-500 group-hover:grayscale-0">
                  <img src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=200&auto=format&fit=crop" alt="Sarah Jenkins" className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-bold text-xl text-white">Sarah Jenkins</p>
                  <p className="text-base text-gray-400 font-medium">High School Math Teacher</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
