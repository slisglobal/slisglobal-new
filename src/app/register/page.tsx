"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const MAINS = ['Mains Precision Batch', 'Main Metamorph', 'Everyday Effort'];

const COURSES = [
  { id: 'precision', name: 'Mains Precision Batch', price: 600, badgeColor: 'bg-blue-500/20 text-blue-300', badgeTxt: '⚡ Limited Seats', desc: 'Personal evaluation · answer enhancement · mentor interaction (only 20 seats)', group: 'mains' },
  { id: 'metamorph', name: 'Main Metamorph', price: 3000, badgeColor: 'bg-purple-500/20 text-purple-300', badgeTxt: '🚀 Mentorship', desc: 'Personalized schedules · note-making system · tests & accountability', group: 'mains' },
  { id: 'everyday', name: 'Everyday Effort', price: 1000, badgeColor: 'bg-teal-500/20 text-teal-300', badgeTxt: '📆 Daily Practice', desc: 'Daily GS questions · structured approach · timely evaluation', group: 'mains' },
  { id: 'essay', name: 'The Art of Essay Writing', price: 2500, badgeColor: 'bg-amber-500/20 text-amber-300', badgeTxt: '✍️ Essay Mastery', desc: 'Step by step approach · structure evaluation · enhancement', group: 'addon' },
  { id: 'ethics', name: 'Governance & Ethics (GS Paper IV + II)', price: null, badgeColor: 'bg-primary/20 text-primary', badgeTxt: '💬 Fee Negotiable', desc: 'Advanced modules for ethics, integrity & governance', group: 'addon', negotiable: true },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const [user, setUser] = useState({
    name: '', phone: '', email: '', city: '', attempt: '1st Attempt', referral: '', msg: ''
  });

  const [errors, setErrors] = useState({
    name: false, phone: false, email: false, city: false, courses: false
  });

  const [selected, setSelected] = useState<Map<string, any>>(new Map());

  const totalAmt = () => {
    let t = 0;
    for (const c of Array.from(selected.values())) if (c.price) t += c.price;
    return t;
  };

  const validateStep1 = () => {
    const newErrors = {
      name: user.name.length < 2,
      phone: !/^[\d\s\+\-\(\)]{7,}$/.test(user.phone),
      email: !/^\S+@\S+\.\S+$/.test(user.email),
      city: user.city.length < 2,
      courses: false
    };
    setErrors(prev => ({ ...prev, ...newErrors }));
    return !Object.values(newErrors).some(Boolean);
  };

  const toggleCourse = (course: any) => {
    setErrors(prev => ({ ...prev, courses: false }));
    const newSelected = new Map(selected);

    if (newSelected.has(course.name)) {
      newSelected.delete(course.name);
    } else {
      if (MAINS.includes(course.name)) {
        // Auto-swap mains
        for (const k of Array.from(newSelected.keys())) {
          if (MAINS.includes(k)) newSelected.delete(k);
        }
      }
      newSelected.set(course.name, { ...course });
    }
    setSelected(newSelected);
  };

  const handleNextTo2 = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextTo3 = () => {
    if (selected.size === 0) {
      setErrors(prev => ({ ...prev, courses: true }));
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setStatus("loading");
    
    try {
      const payload = {
        fullName: user.name,
        phone: user.phone,
        email: user.email,
        city: user.city,
        attemptString: user.attempt,
        referral: user.referral,
        courseIds: Array.from(selected.values()).map(c => c.id),
        message: user.msg
      };

      const res = await fetch("https://portal.slisglobal.com/api/fightclub/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      setDone(true);
      setStatus("idle");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Registration error:", error);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setDone(false);
    setStep(1);
    setSelected(new Map());
    setUser({ name: '', phone: '', email: '', city: '', attempt: '1st Attempt', referral: '', msg: '' });
  };

  const renderStepper = () => {
    const labels = ['Details', 'Courses', 'Review'];
    return (
      <div className="mb-8">
        <div className="flex items-center glass-panel rounded-full p-2 gap-0 border border-white/10 relative">
          {labels.map((l, i) => {
            const n = i + 1;
            const isActive = step === n;
            const isDone = step > n;
            return (
              <div key={l} className={`flex-1 flex items-center justify-center gap-2 text-xs md:text-sm relative z-10 py-2 ${isActive ? 'text-primary font-bold' : isDone ? 'text-emerald-400 font-bold' : 'text-on-surface-variant font-medium'}`}>
                {i !== labels.length - 1 && (
                  <div className="absolute right-0 w-px h-4 bg-white/10 hidden sm:block"></div>
                )}
                <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black transition-all ${isActive ? 'bg-primary text-on-primary shadow-[0_0_10px_rgba(251,191,36,0.3)]' : isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5'}`}>
                  {isDone ? '✓' : n}
                </div>
                <span className="hidden sm:inline font-label uppercase tracking-wider">{l}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (done) {
    const selArr = Array.from(selected.values());
    const selNames = selArr.map(c => c.name).join(', ');
    const firstName = user.name.split(' ')[0];
    const hasNeg = selArr.some(c => c.negotiable);

    return (
      <div className="min-h-screen pb-20 pt-28 px-4 font-body relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#7c3aed]/10 to-transparent pointer-events-none z-0"></div>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="fixed top-0 left-0 right-0 z-50">
          <nav className="glass-panel border-b border-white/10 h-16 md:h-20 flex items-center justify-between px-6 lg:px-20 bg-background/80">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-headline font-bold text-sm md:text-xl tracking-tighter gold-text-gradient uppercase">Silver Lining</span>
            </Link>
            <Link href="/" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-label">
              <span className="material-symbols-outlined text-[14px]">arrow_back</span> Back to main site
            </Link>
          </nav>
        </div>

        <div className="max-w-2xl mx-auto relative z-10 animate-reveal-up">
          <div className="glass-panel gold-lining rounded-[2rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.1),rgba(251,191,36,0)_70%)] pointer-events-none"></div>
            
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-white mb-2">You're In, {firstName}!</h1>
            <p className="text-on-surface-variant font-light mb-8">Your registration has been successfully submitted.</p>

            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 md:p-6 text-left mb-8">
              <div className="flex justify-between py-3 border-b border-white/5 text-sm flex-wrap gap-2">
                <span className="text-on-surface-variant font-light">Name</span>
                <span className="text-white font-medium">{user.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5 text-sm flex-wrap gap-2">
                <span className="text-on-surface-variant font-light">Email</span>
                <span className="text-white font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5 text-sm flex-wrap gap-2">
                <span className="text-on-surface-variant font-light">Phone</span>
                <span className="text-white font-medium">{user.phone}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5 text-sm flex-wrap gap-2">
                <span className="text-on-surface-variant font-light">Programs</span>
                <span className="text-white font-medium text-right">{selNames}</span>
              </div>
              <div className="flex justify-between py-3 text-sm flex-wrap gap-2">
                <span className="text-on-surface-variant font-light">Total / mo</span>
                <span className="text-primary font-bold">₹{totalAmt().toLocaleString()}{hasNeg ? ' + negotiable' : ''}</span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed mb-8">
              Our team will reach out within <strong className="text-emerald-400 font-medium">24 hours</strong> to discuss your course details and fee structure. Keep an eye on your email and phone.
            </p>

            <button onClick={resetForm} className="glass-panel text-white hover:bg-white/10 transition-all font-label text-[10px] uppercase font-black tracking-widest px-8 py-4 rounded-xl">
              Register another candidate
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-28 px-4 font-body relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#7c3aed]/10 to-transparent pointer-events-none z-0"></div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-50">
        <nav className="glass-panel border-b border-white/10 h-16 md:h-20 flex items-center justify-between px-6 lg:px-20 bg-background/80">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 md:w-8 md:h-8 text-primary gold-glow-effect transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-125 hidden md:block">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="font-headline font-bold text-sm md:text-xl tracking-tighter gold-text-gradient uppercase">Silver Lining</span>
          </Link>
          <Link href="/" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-label">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span> <span className="hidden sm:inline">Back to main site</span>
          </Link>
        </nav>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="glass-panel gold-lining rounded-[1.5rem] p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(251,191,36,0.06)_0%,transparent_65%)] pointer-events-none"></div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary font-label">⚔️ UPSC Fight Club</span>
          </div>
          <h1 className="font-headline text-2xl md:text-4xl font-bold text-white leading-tight mb-2">
            Mains · Essay · <span className="gold-text-gradient">Ethics</span>
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base font-light border-l-2 border-primary pl-3 py-1 max-w-lg mb-6">
            Think deeply. Structure clearly. Express impactfully.<br />Mains is not just knowledge — it is expression.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-label tracking-wider flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">target</span> Expert-led batches</span>
            <span className="text-[10px] text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-label tracking-wider flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">edit_document</span> Personal evaluation</span>
            <span className="text-[10px] text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-label tracking-wider flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">lock</span> Limited seats</span>
          </div>
        </div>

        {renderStepper()}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass-panel rounded-[1.5rem] p-6 md:p-8 shadow-xl">
              <h2 className="font-headline text-2xl font-bold text-white mb-1">Your Details</h2>
              <p className="text-on-surface-variant text-sm font-light mb-8">Tell us about yourself so we can personalise your journey.</p>
              
              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant font-label">Full Name <span className="text-primary">*</span></label>
                  <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} className={`w-full bg-white/[0.02] border ${errors.name ? 'border-red-500' : 'border-white/10'} focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm text-white transition-all outline-none font-light`} placeholder="e.g. Arjun Kumar" />
                  {errors.name && <span className="text-xs text-red-400 mt-1">Please enter your full name.</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant font-label">Phone <span className="text-primary">*</span></label>
                  <input type="tel" value={user.phone} onChange={e => setUser({...user, phone: e.target.value})} className={`w-full bg-white/[0.02] border ${errors.phone ? 'border-red-500' : 'border-white/10'} focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm text-white transition-all outline-none font-light`} placeholder="+91 98765 43210" />
                  {errors.phone && <span className="text-xs text-red-400 mt-1">Please enter a valid phone number.</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant font-label">Email <span className="text-primary">*</span></label>
                  <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} className={`w-full bg-white/[0.02] border ${errors.email ? 'border-red-500' : 'border-white/10'} focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm text-white transition-all outline-none font-light`} placeholder="you@email.com" />
                  {errors.email && <span className="text-xs text-red-400 mt-1">Please enter a valid email.</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant font-label">City <span className="text-primary">*</span></label>
                  <input type="text" value={user.city} onChange={e => setUser({...user, city: e.target.value})} className={`w-full bg-white/[0.02] border ${errors.city ? 'border-red-500' : 'border-white/10'} focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm text-white transition-all outline-none font-light`} placeholder="Chennai, Delhi…" />
                  {errors.city && <span className="text-xs text-red-400 mt-1">Please enter your city.</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant font-label">UPSC Attempt</label>
                  <select value={user.attempt} onChange={e => setUser({...user, attempt: e.target.value})} className="w-full bg-[#130f1f] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm text-white transition-all outline-none font-light appearance-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23a78bfa\' stroke-width=\'1.5\' fill=\'none\' stroke-linecap=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}>
                    <option>1st Attempt</option>
                    <option>2nd Attempt</option>
                    <option>3rd Attempt</option>
                    <option>4+ Attempts</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant font-label">Referral <span className="text-white/30 lowercase tracking-normal">(optional)</span></label>
                  <input type="text" value={user.referral} onChange={e => setUser({...user, referral: e.target.value})} className="w-full bg-white/[0.02] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm text-white transition-all outline-none font-light" placeholder="Friend / Telegram handle" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={handleNextTo2} className="gold-button w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-[10px] tracking-widest uppercase font-label">
                  Continue to Courses →
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass-panel rounded-[1.5rem] p-6 md:p-8 shadow-xl">
              <h2 className="font-headline text-2xl font-bold text-white mb-1">Choose Your Programs</h2>
              <p className="text-on-surface-variant text-sm font-light mb-8">Select the courses that best match your preparation strategy.</p>
              
              <div className="flex items-center gap-2 mb-4 mt-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary font-label">🔥 Mains Programs</span>
                <span className="text-xs text-on-surface-variant italic">— pick only one</span>
                <div className="h-px bg-white/10 flex-1 ml-2"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {COURSES.filter(c => c.group === 'mains').map(course => {
                  const isSel = selected.has(course.name);
                  const mainsSelected = Array.from(selected.values()).filter(c => MAINS.includes(c.name));
                  const isLocked = mainsSelected.length > 0 && !isSel;
                  return (
                    <div key={course.id} onClick={() => !isLocked && toggleCourse(course)} className={`border ${isSel ? 'border-primary bg-primary/5 gold-lining' : 'border-white/10 bg-white/[0.02] hover:border-white/30'} ${isLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} rounded-2xl p-5 transition-all relative select-none`}>
                      <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${course.badgeColor}`}>{course.badgeTxt}</span>
                      <h3 className="text-sm font-bold text-white mb-1 leading-tight pr-6">{course.name}</h3>
                      <div className="font-mono text-xs text-primary mb-2 font-medium">{course.price ? `₹${course.price.toLocaleString()}/mo` : 'Fee Negotiable'}</div>
                      <p className="text-xs text-on-surface-variant font-light leading-relaxed">{course.desc}</p>
                      
                      {isSel && (
                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary font-black text-xs">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 mb-4 mt-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary font-label">✍️ Essay & Ethics</span>
                <span className="text-xs text-on-surface-variant italic">— optional add-ons</span>
                <div className="h-px bg-white/10 flex-1 ml-2"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {COURSES.filter(c => c.group === 'addon').map(course => {
                  const isSel = selected.has(course.name);
                  return (
                    <div key={course.id} onClick={() => toggleCourse(course)} className={`border ${isSel ? 'border-primary bg-primary/5 gold-lining' : 'border-white/10 bg-white/[0.02] hover:border-white/30'} cursor-pointer rounded-2xl p-5 transition-all relative select-none`}>
                      <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${course.badgeColor}`}>{course.badgeTxt}</span>
                      <h3 className="text-sm font-bold text-white mb-1 leading-tight pr-6">{course.name}</h3>
                      <div className="font-mono text-xs text-primary mb-2 font-medium">{course.price ? `₹${course.price.toLocaleString()}/mo` : 'Fee Negotiable'}</div>
                      <p className="text-xs text-on-surface-variant font-light leading-relaxed">{course.desc}</p>
                      
                      {isSel && (
                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary font-black text-xs">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-black/30 border border-white/5 rounded-xl p-5 mt-8">
                <div className="text-[10px] font-black uppercase tracking-widest text-primary font-label mb-3">Your Selection</div>
                <div className="flex flex-wrap gap-2 min-h-[28px] mb-4">
                  {selected.size === 0 ? (
                    <span className="text-xs text-on-surface-variant italic">No courses selected yet</span>
                  ) : (
                    Array.from(selected.values()).map(c => (
                      <span key={c.name} className="bg-white/5 border border-primary/30 text-white text-xs px-3 py-1 rounded-full">{c.name}</span>
                    ))
                  )}
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-white/10 flex-wrap gap-2">
                  <span className="text-xs text-on-surface-variant">Monthly Total (standard)</span>
                  <span className="font-mono text-xl text-primary font-medium">₹{totalAmt().toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-teal-400 mt-2 opacity-80">* Governance & Ethics fee is negotiable — our team will clarify after registration.</div>
              </div>
              
              {errors.courses && <div className="text-xs text-red-400 mt-4">⚠ Please select at least one course.</div>}

              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button onClick={() => setStep(1)} className="glass-panel w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-[10px] tracking-widest uppercase text-white hover:bg-white/10 font-label">
                  ← Back
                </button>
                <button onClick={handleNextTo3} className="gold-button w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-[10px] tracking-widest uppercase font-label">
                  Review & Confirm →
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass-panel rounded-[1.5rem] p-6 md:p-8 shadow-xl">
              <h2 className="font-headline text-2xl font-bold text-white mb-1">Review & Confirm</h2>
              <p className="text-on-surface-variant text-sm font-light mb-8">Double-check your details before submitting.</p>
              
              <div className="flex flex-col gap-1 mb-6">
                <div className="flex flex-col py-3 border-b border-white/5 gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-label">Full Name</span>
                  <span className="text-sm text-white font-medium">{user.name}</span>
                </div>
                <div className="flex flex-col py-3 border-b border-white/5 gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-label">Phone</span>
                  <span className="text-sm text-white font-medium">{user.phone}</span>
                </div>
                <div className="flex flex-col py-3 border-b border-white/5 gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-label">Email</span>
                  <span className="text-sm text-white font-medium">{user.email}</span>
                </div>
                <div className="flex flex-col py-3 border-b border-white/5 gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-label">City</span>
                  <span className="text-sm text-white font-medium">{user.city}</span>
                </div>
                <div className="flex flex-col py-3 border-b border-white/5 gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-label">Attempt</span>
                  <span className="text-sm text-white font-medium">{user.attempt}</span>
                </div>
                {user.referral && (
                  <div className="flex flex-col py-3 border-b border-white/5 gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-label">Referral</span>
                    <span className="text-sm text-white font-medium">{user.referral}</span>
                  </div>
                )}
                <div className="flex flex-col py-3 border-b border-white/5 gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-label">Selected Programs</span>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(selected.values()).map(c => (
                      <span key={c.name} className="bg-white/5 border border-white/10 text-xs px-3 py-1 rounded-full text-white">
                        {c.name} <span className="text-primary/70 ml-1">{c.price ? `· ₹${c.price}/mo` : '· Negotiable'}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col py-3 border-b border-white/5 gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-label">Monthly Total</span>
                  <span className="font-mono text-xl text-primary font-medium">₹{totalAmt().toLocaleString()} {Array.from(selected.values()).some(c => c.negotiable) && <span className="text-xs font-sans text-teal-400 font-medium ml-1">+ negotiable</span>}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                <label className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant font-label">Additional Message <span className="text-white/30 lowercase tracking-normal">(optional)</span></label>
                <textarea rows={3} value={user.msg} onChange={e => setUser({...user, msg: e.target.value})} className="w-full bg-white/[0.02] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm text-white transition-all outline-none font-light" placeholder="Any specific requirements or questions for our team…" />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button onClick={() => setStep(2)} className="glass-panel w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-[10px] tracking-widest uppercase text-white hover:bg-white/10 font-label">
                  ← Edit Courses
                </button>
                <button onClick={handleSubmit} disabled={status === "loading"} className="gold-button w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-[10px] tracking-widest uppercase font-label disabled:opacity-50">
                  {status === "loading" ? "Submitting..." : "✨ Submit Registration"}
                </button>
              </div>
              {status === "error" && (
                <div className="text-xs text-red-400 mt-4 text-center font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                  Registration failed. Please check your connection and try again.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="text-center py-8 text-xs text-on-surface-variant font-light relative z-10 mt-12">
        Part of <Link href="/" className="text-primary hover:underline">Silver Lining Intellectual Services Pvt Ltd</Link>
        &nbsp;·&nbsp; UPSC Fight Club
      </footer>
    </div>
  );
}
