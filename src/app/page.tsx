"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/all";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer, useGSAP);
}

const servicesData = [
  {
    icon: "school",
    title: "Competitive Exam Support",
    description: "Coaching for TNPSC, UPSC, SSC, Banking & Police exams with structured learning, mock tests, and expert mentoring.",
    points: [
      "Coaching for Government Competitive Exams",
      "Training for TNPSC, UPSC, SSC, Banking & Police Exams",
      "Structured Learning Programs",
      "Study Materials and Resources",
      "Regular Mock Tests and Practice Sessions",
      "Expert Guidance and Mentoring",
      "Exam Strategy and Time Management Support",
      "Career Guidance for Government Jobs"
    ]
  },
  {
    icon: "badge",
    title: "On-Campus Placement",
    description: "Resume building, aptitude training, interview preparation and full placement coordination for campus students.",
    points: [
      "Resume Building and Profile Development",
      "Aptitude and Assessment Training",
      "Career Readiness Programs",
      "Student Interview Preparation",
      "Placement Coordination and Support"
    ]
  },
  {
    icon: "hub",
    title: "Off-Campus Placement",
    description: "Connecting candidates with top companies through job referrals, interview prep, and multi-industry opportunities.",
    points: [
      "Off-Campus Job Opportunity Support",
      "Connecting Candidates with Companies",
      "Job Referrals and Hiring Support",
      "Interview Preparation and Guidance",
      "Resume and Profile Improvement",
      "Career Counseling for Job Seekers",
      "Access to Multiple Industry Opportunities",
      "Support for Skilled Professionals"
    ]
  },
  {
    icon: "public",
    title: "Higher Studies Support",
    description: "End-to-end guidance for higher education in India and abroad — from university selection to application support.",
    points: [
      "Guidance for Higher Education in India and Abroad",
      "Course Selection and Academic Planning",
      "University Selection and Admission Guidance",
      "Application Process Support",
      "Career Path Planning",
      "Information on Courses and Universities",
      "Counseling for Academic Growth",
      "Support for Future Educational Goals"
    ]
  },
  {
    icon: "rocket_launch",
    title: "Entrepreneurship Hub",
    description: "Supporting aspiring entrepreneurs with startup guidance, mentorship, networking, and business development training.",
    points: [
      "Guidance for Aspiring Entrepreneurs",
      "Support for Startup Ideas and Innovation",
      "Business Planning and Strategy Support",
      "Mentorship from Industry Experts",
      "Networking Opportunities with Professionals",
      "Training for Business Development",
      "Support to Start and Grow Businesses",
      "Encouraging Innovation and Self-Employment"
    ]
  },
  {
    icon: "terminal",
    title: "Technical Skill Development",
    description: "Industry-oriented technical training with hands-on practice, real-time examples, and mentorship for IT careers.",
    points: [
      "Industry-Oriented Technical Training",
      "Practical Learning with Real-Time Examples",
      "Project-Based Skill Development",
      "Training in Modern Technology Concepts",
      "Hands-On Practice and Workshops",
      "Mentorship from Experienced Trainers",
      "Career-Focused Technical Skills",
      "Preparing Students for Real-World IT Careers"
    ]
  },
  {
    icon: "groups",
    title: "Human Capital Solutions",
    description: "Skilled talent sourcing, recruitment support, workforce planning and long-term HR solutions for corporates.",
    points: [
      "Skilled Talent Sourcing for Companies",
      "Recruitment and Hiring Support",
      "Workforce Planning and Management",
      "Employee Training and Skill Development",
      "Talent Development Programs",
      "Support for Building Strong Teams",
      "Industry-Oriented Workforce Solutions",
      "Long-Term Human Resource Support"
    ]
  },
  {
    icon: "precision_manufacturing",
    title: "Business & IT Solutions",
    description: "Custom software development, digital transformation, system integration and end-to-end IT support for enterprises.",
    points: [
      "Innovative Business and IT Solutions",
      "Custom Software Development Services",
      "Digital Transformation and Technology Solutions",
      "System Integration and Automation",
      "IT Consulting and Technology Guidance",
      "Solutions to Improve Business Efficiency",
      "Scalable Technology for Business Growth",
      "End-to-End IT Support for Organizations"
    ]
  }
].map((service, idx) => ({ ...service, delay: `${((idx % 4) + 1) * 0.1}s` }));

function ServiceCard({ service, onLearnMore }: { service: any, onLearnMore: () => void }) {
  return (
    <div className="glass-panel gold-lining flex flex-col rounded-[2rem] card-hover-effect group reveal-on-scroll interactive-3d-card" style={{ animationDelay: service.delay }}>
      <div className="card-3d-inner w-full h-full p-8 md:p-10 flex flex-col gap-6">
        <div className="w-14 h-14 rounded-sm bg-white/5 flex items-center justify-center text-primary gold-glow-effect group-hover:scale-110 transition-all flex-shrink-0">
          <span className="material-symbols-outlined text-3xl">{service.icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
          <p className="text-on-surface-variant text-xs leading-relaxed font-light">{service.description}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); onLearnMore();
          }}
          className="text-primary text-[10px] uppercase tracking-widest font-black self-start hover:text-white transition-colors relative z-20 focus:outline-none flex items-center gap-2 mt-4"
        >
          Learn More <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
        </button>
        <div className="glint-overlay pointer-events-none"></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", inquiry: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const mainRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray(".mobile-gsap-card") as HTMLElement[];
      if (!cards.length) return;

      gsap.set(cards, {
        y: (index) => 20 * index,
        transformOrigin: "center top",
        zIndex: (index) => index,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cards-section-wrapper",
          start: "center center",
          end: `+=${cards.length * 250}`, 
          pin: true,
          pinSpacing: true, 
          scrub: 0.5, 
        }
      });

      cards.forEach((card, index) => {
        if (index === 0) return;
        
        tl.to(cards[index - 1], {
          scale: Math.max(0.85, 1 - (index * 0.05)),
          duration: 1,
        }, index);

        tl.from(card, {
          y: window.innerHeight,
          duration: 1,
        }, index);
      });

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    });
  }, { scope: mainRef });

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedService]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.inquiry) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", inquiry: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  useEffect(() => {
    // Intersection Observer for Entrance Animations
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".reveal-on-scroll")
      .forEach((el) => observer.observe(el));

    // Cache DOM queries for performance
    let cachedShards: HTMLElement[] | null = null;
    let cachedCards: HTMLElement[] | null = null;
    let cachedParallax: HTMLElement[] | null = null;
    let mouseRafId: number | null = null;
    let scrollRafId: number | null = null;

    const getShards = () => {
      if (!cachedShards) cachedShards = Array.from(document.querySelectorAll(".shard-parallax")) as HTMLElement[];
      return cachedShards;
    };
    const getCards = () => {
      if (!cachedCards) cachedCards = Array.from(document.querySelectorAll(".interactive-3d-card")) as HTMLElement[];
      return cachedCards;
    };
    const getParallax = () => {
      if (!cachedParallax) cachedParallax = Array.from(document.querySelectorAll(".parallax-el")) as HTMLElement[];
      return cachedParallax;
    };

    // Interactive Mouse Tracking Logic — batched via rAF
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (mouseRafId) return; // Skip if a frame is already queued
      
      let x = 0, y = 0;
      if ('touches' in e) {
        if (e.touches.length > 0) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        } else return;
      } else {
        x = (e as MouseEvent).clientX;
        y = (e as MouseEvent).clientY;
      }

      mouseRafId = requestAnimationFrame(() => {
        mouseRafId = null;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 1. Background Parallax Shards
        getShards().forEach((shard) => {
          const depth = parseFloat(shard.getAttribute("data-depth") || "0.2");
          const moveX = (x - windowWidth / 2) * depth;
          const moveY = (y - windowHeight / 2) * depth;
          const rotate = (x - windowWidth / 2) * 0.05;
          shard.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;
        });

        // 2. 3D Tilt Cards & Glint Effect
        getCards().forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardInner = card.querySelector(".card-3d-inner") as HTMLElement;
          const glint = card.querySelector(".glint-overlay") as HTMLElement;

          const isHovering =
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom;

          if (isHovering && cardInner) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (x - centerX) / (rect.width / 2);
            const deltaY = (y - centerY) / (rect.height / 2);

            const tiltX = deltaY * 12;
            const tiltY = -deltaX * 12;

            cardInner.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;

            if (glint) {
              const glintX = ((x - rect.left) / rect.width) * 100;
              const glintY = ((y - rect.top) / rect.height) * 100;
              glint.style.setProperty("--glint-x", `${glintX}%`);
              glint.style.setProperty("--glint-y", `${glintY}%`);
            }
          } else if (cardInner) {
            cardInner.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
          }
        });
      });
    };

    const handleTouchEnd = () => {
      getCards().forEach((card) => {
        const cardInner = card.querySelector(".card-3d-inner") as HTMLElement;
        if (cardInner) {
          cardInner.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleMouseMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Parallax — batched via rAF
    const handleScroll = () => {
      if (scrollRafId) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;
        const scrolled = window.scrollY;
        getParallax().forEach((el) => {
          const speed = parseFloat(el.getAttribute("data-speed") || "1");
          const yPos = -(scrolled * speed) / 5;
          const rotation = (scrolled * speed) / 25;
          el.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      if (mouseRafId) cancelAnimationFrame(mouseRafId);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel gold-lining w-full max-w-3xl rounded-[2.5rem] p-10 lg:p-14 relative shadow-2xl overflow-hidden m-auto"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors z-20 group"
              >
                <span className="material-symbols-outlined text-xl group-hover:rotate-90 transition-transform">close</span>
              </button>

              <div className="flex flex-col md:flex-row gap-10 items-start relative z-10 w-full">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary gold-glow-effect flex-shrink-0">
                  <span className="material-symbols-outlined text-4xl">{selectedService.icon}</span>
                </div>
                <div className="flex-1 w-full">
                  <h3 className="text-3xl font-headline font-bold text-white mb-2">{selectedService.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-light mb-8 max-w-xl">{selectedService.description}</p>

                  <div className="h-px w-full bg-white/10 mb-8"></div>

                  <h4 className="text-[10px] uppercase font-black tracking-widest text-primary mb-6 font-label flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span> Service Inclusions
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                    {selectedService.points.map((point: string, i: number) => (
                      <li key={i} className="text-[13px] text-on-surface-variant font-light leading-relaxed flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                        <span className="flex-1">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 pt-8 flex justify-end">
                    <button
                      onClick={() => { setSelectedService(null); window.location.href = '#contact'; }}
                      className="gold-button px-8 py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase shadow-lg font-label"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50" id="interactive-bg">
        <div className="shard-parallax absolute top-[10%] left-[5%] w-32 h-32 opacity-20" data-depth="0.2">
          <svg fill="none" viewBox="0 0 100 100">
            <path d="M0 50L50 0L100 50L50 100Z" fill="#fbbf24"></path>
          </svg>
        </div>
        <div className="shard-parallax absolute top-[40%] right-[8%] w-48 h-48 opacity-10" data-depth="0.5">
          <svg fill="none" viewBox="0 0 100 100">
            <rect height="60" stroke="#a78bfa" strokeWidth="0.5" transform="rotate(15 50 50)" width="60" x="20" y="20"></rect>
          </svg>
        </div>
        <div className="shard-parallax absolute bottom-[15%] left-[20%] w-64 h-64 opacity-15" data-depth="0.3">
          <svg fill="none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#fbbf24" strokeDasharray="10 20" strokeWidth="0.2"></circle>
          </svg>
        </div>
        <div className="absolute -left-20 top-1/4 w-40 h-80 animate-float animate-lavender-glow opacity-40 blur-none z-10 hidden xl:block" style={{ animationDuration: '6s' }}>
          <svg className="animate-rotate-slow" fill="none" style={{ animationDuration: '15s' }} viewBox="0 0 100 200">
            <path d="M50 0L90 70L50 140L10 70Z" fill="url(#crystalGrad)" stroke="#a78bfa" strokeWidth="0.5"></path>
            <path d="M50 140L90 170L50 200L10 170Z" fill="url(#crystalGrad2)" stroke="#a78bfa" strokeWidth="0.5"></path>
            <defs>
              <linearGradient id="crystalGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#a78bfa' }}></stop>
                <stop offset="100%" style={{ stopColor: '#5b21b6' }}></stop>
              </linearGradient>
              <linearGradient id="crystalGrad2" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#5b21b6' }}></stop>
                <stop offset="100%" style={{ stopColor: '#1e1b4b' }}></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute -right-20 bottom-1/4 w-40 h-80 animate-float animate-lavender-glow opacity-40 blur-none z-10 hidden xl:block" style={{ animationDuration: '8s', animationDelay: '-2s' }}>
          <svg className="animate-rotate-slow" fill="none" style={{ animationDuration: '20s' }} viewBox="0 0 100 200">
            <path d="M50 0L90 70L50 140L10 70Z" fill="url(#crystalGrad1)" stroke="#a78bfa" strokeWidth="0.5"></path>
            <path d="M50 140L90 170L50 200L10 170Z" fill="url(#crystalGrad3)" stroke="#a78bfa" strokeWidth="0.5"></path>
            <defs>
              <linearGradient id="crystalGrad1" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#a78bfa' }}></stop>
                <stop offset="100%" style={{ stopColor: '#5b21b6' }}></stop>
              </linearGradient>
              <linearGradient id="crystalGrad3" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#5b21b6' }}></stop>
                <stop offset="100%" style={{ stopColor: '#1e1b4b' }}></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 transition-[height] duration-500 ease-in-out flex flex-col justify-start px-6 lg:px-20 ${isMobileMenuOpen ? 'h-[300px]' : 'h-16 md:h-20 shadow-none'} overflow-hidden`}>
        <div className="w-full flex items-center justify-between h-16 md:h-20 shrink-0">
          <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-6 h-6 md:w-8 md:h-8 text-primary gold-glow-effect transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-125">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="font-headline font-bold text-sm md:text-xl tracking-tighter gold-text-gradient uppercase whitespace-nowrap">Silver Lining</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a className="text-xs font-bold uppercase tracking-widest hover:text-primary hover:scale-110 transition-all font-label" href="#solutions">Our Solutions</a>
            <a className="text-xs font-bold uppercase tracking-widest hover:text-primary hover:scale-110 transition-all font-label" href="#corporate">Corporate</a>
            <a className="text-xs font-bold uppercase tracking-widest hover:text-primary hover:scale-110 transition-all font-label" href="#contact">Consultation</a>
            <a href="#contact" className="gold-button px-7 py-2.5 rounded-full font-bold text-[10px] tracking-widest uppercase shadow-lg font-label">
              Connect Now
            </a>
          </div>

          <button className="md:hidden text-white flex items-center justify-center p-1 relative z-50" onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
            <span className="material-symbols-outlined text-3xl">{isMobileMenuOpen ? "close" : "menu_open"}</span>
          </button>
        </div>

        <div className={`md:hidden flex flex-col items-center gap-6 mt-4 transition-all duration-500 origin-top transform ${isMobileMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-75 pointer-events-none'}`}>
          <a className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-all font-label" href="#solutions" onClick={() => setIsMobileMenuOpen(false)}>Our Solutions</a>
          <a className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-all font-label" href="#corporate" onClick={() => setIsMobileMenuOpen(false)}>Corporate</a>
          <a className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-all font-label" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Consultation</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="gold-button w-full text-center px-7 py-3 mt-2 rounded-full font-bold text-[10px] tracking-widest uppercase shadow-lg font-label">
            Connect Now
          </a>
        </div>
      </nav>

      <main className="relative" ref={mainRef}>
        <section className="relative min-h-[100dvh] flex items-center px-6 lg:px-20 pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#7c3aed]/10 to-transparent pointer-events-none z-0"></div>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amethyst/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>
          <div className="absolute inset-0 amethyst-aura -z-10"></div>
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col gap-8 md:gap-10 order-2 lg:order-1 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel gold-lining w-fit hover:scale-105 hover:bg-white/10">
                <span className="text-[10px] uppercase tracking-widest font-black text-primary font-label">Shaping Lives // Igniting Success</span>
              </div>
              <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] md:leading-[0.95] tracking-tighter text-white glint-animate">
                Bridging Human Potential <br className="hidden md:block" /><span className="gold-text-gradient">& Global Requirements.</span>
              </h1>
              <p className="text-on-surface-variant text-base md:text-lg lg:text-xl max-w-lg leading-relaxed font-light">Silver Lining Intellectual Services is your trusted partner for career excellence, placement support, higher education guidance, and corporate growth solutions.</p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4">
                <button className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 gold-button rounded-xl font-black uppercase tracking-widest text-xs font-label">Get Started</button>
                <button className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 glass-panel gold-lining text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all hover:scale-110 active:scale-95 font-label">Explore Services</button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 flex justify-center reveal-on-scroll" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full aspect-square max-w-md lg:max-w-xl group interactive-3d-card">
                <div className="card-3d-inner w-full h-full">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-aura"></div>
                  <div className="w-full h-full rounded-[2.5rem] overflow-hidden glass-panel gold-lining shadow-2xl relative">
                    <Image fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover opacity-60 mix-blend-screen scale-110" alt="Futuristic floating crystal lavender structures for education" src="/images/hero_crystal.png" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                    <div className="glint-overlay"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative" id="about">
          <div className="max-w-6xl mx-auto glass-panel gold-lining rounded-[2rem] md:rounded-[3rem] reveal-on-scroll relative z-10 card-hover-effect interactive-3d-card">
            <div className="card-3d-inner p-8 md:p-10 lg:p-16 h-full w-full">
              <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 md:gap-12 lg:gap-16 items-start">
                <div>
                  <p className="font-label text-primary/60 text-[10px] tracking-[0.4em] uppercase font-black mb-4 md:mb-6">Our Mission</p>
                  <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tighter gold-text-gradient glint-animate">Igniting <br /><span className="lavender-text-gradient">Success</span></h2>
                </div>
                <div className="flex flex-col gap-10 md:gap-12">
                  <p className="text-2xl md:text-3xl font-extralight text-on-surface leading-tight">We don&apos;t just provide services; we craft <span className="text-primary font-medium hover:scale-110 inline-block transition-transform">pathways</span> to excellence. From student aspirations to corporate milestones, we are the silver lining in every journey.</p>
                  <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                    <div className="p-6 md:p-10 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/50 hover:bg-white/[0.05] transition-all group hover:-translate-y-2">
                      <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-4 group-hover:gold-text-gradient group-hover:scale-105 transition-all font-label">Empowering Minds</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed">Cultivating competitive edges through rigorous training and personalized career mentorship.</p>
                    </div>
                    <div className="p-6 md:p-10 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/50 hover:bg-white/[0.05] transition-all group hover:-translate-y-2">
                      <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-4 group-hover:gold-text-gradient group-hover:scale-105 transition-all font-label">Corporate Synergy</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed">Providing high-impact human capital and technical solutions for modern business landscapes.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glint-overlay"></div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 lg:py-32 px-6 lg:px-20 relative" id="solutions">
          <div className="max-w-7xl mx-auto relative cards-section-wrapper mb-32 md:mb-0">
            <div className="text-center mb-12 md:mb-16 lg:mb-24 reveal-on-scroll">
              <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tighter gold-text-gradient glint-animate">Educational &amp; Career <br />Excellence Hub</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-base md:text-lg font-light">Comprehensive solutions designed to bridge the gap between academic potential and professional achievement.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-md:[&>div]:col-start-1 max-md:[&>div]:row-start-1 h-[420px] sm:h-[450px] md:h-auto">
              {servicesData.map((service, idx) => (
                <div key={idx} className="mobile-gsap-card h-full">
                  <ServiceCard service={service} onLearnMore={() => setSelectedService(service)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 lg:py-32 px-6 lg:px-20" id="corporate">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-12 mb-12 lg:mb-20 reveal-on-scroll">
              <div className="max-w-xl">
                <p className="font-label text-primary/60 text-[10px] tracking-[0.4em] uppercase font-black mb-4 md:mb-6">Corporate Excellence</p>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter gold-text-gradient glint-animate">Empowering the <br />Global Workspace</h2>
              </div>
              <a className="text-primary font-bold tracking-widest text-xs uppercase flex items-center gap-3 group hover:text-white transition-all hover:scale-110 font-label" href="#">
                Corporate Partnerships
                <span className="material-symbols-outlined group-hover:translate-x-4 transition-transform">arrow_forward</span>
              </a>
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              <div className="group relative rounded-[2rem] md:rounded-[2.5rem] glass-panel gold-lining card-hover-effect reveal-on-scroll interactive-3d-card">
                <div className="card-3d-inner">
                  <div className="h-48 md:h-56 lg:h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors z-10 pointer-events-none"></div>
                    <Image fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-125 transition-transform duration-1000 opacity-40 mix-blend-screen" alt="Corporate networking abstract" src="/images/corporate_networking.png" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130f1f] to-transparent"></div>
                  </div>
                  <div className="p-6 md:p-8 lg:p-12 relative">
                    <h3 className="text-2xl md:text-3xl font-headline font-bold mb-4 text-white group-hover:gold-text-gradient transition-all origin-left">Human Capital Support</h3>
                    <p className="text-on-surface-variant mb-6 md:mb-8 text-base md:text-lg font-light">Bridge the gap with our curated talent pool. We provide skilled talent sourcing, recruitment support, workforce planning, and long-term HR solutions to help corporates build strong teams.</p>
                    <button className="text-primary font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 border-b border-primary/20 pb-2 hover:border-primary transition-all group/btn hover:scale-110 origin-left font-label w-fit">
                      Recruitment Portal <span className="material-symbols-outlined text-sm group-hover/btn:rotate-[360deg] transition-transform duration-700">person_search</span>
                    </button>
                  </div>
                  <div className="glint-overlay"></div>
                </div>
              </div>
              <div className="group relative rounded-[2rem] md:rounded-[2.5rem] glass-panel gold-lining card-hover-effect reveal-on-scroll interactive-3d-card" style={{ animationDelay: '0.2s' }}>
                <div className="card-3d-inner">
                  <div className="h-48 md:h-56 lg:h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-amethyst/10 group-hover:bg-amethyst/20 transition-colors z-10 pointer-events-none"></div>
                    <Image fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-125 transition-transform duration-1000 opacity-40 mix-blend-screen" alt="IT Infrastructure abstract" src="/images/it_infrastructure.png" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130f1f] to-transparent"></div>
                  </div>
                  <div className="p-6 md:p-8 lg:p-12 relative">
                    <h3 className="text-2xl md:text-3xl font-headline font-bold mb-4 text-white group-hover:gold-text-gradient transition-all origin-left">Business &amp; IT Solutions</h3>
                    <p className="text-on-surface-variant mb-6 md:mb-8 text-base md:text-lg font-light">Modernize your business with custom software development, digital transformation, system integration, and end-to-end IT consulting tailored for corporate enterprises.</p>
                    <button className="text-primary font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 border-b border-primary/20 pb-2 hover:border-primary transition-all group/btn hover:scale-110 origin-left font-label w-fit">
                      Consult IT <span className="material-symbols-outlined text-sm group-hover/btn:rotate-[360deg] transition-transform duration-700">settings_suggest</span>
                    </button>
                  </div>
                  <div className="glint-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 lg:py-24 px-6 lg:px-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto glass-panel gold-lining rounded-[2.5rem] md:rounded-[3rem] text-center relative overflow-hidden reveal-on-scroll card-hover-effect interactive-3d-card">
            <div className="card-3d-inner p-8 md:p-12 lg:p-20 h-full w-full">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),rgba(251,191,36,0)_70%)] animate-pulse-aura"></div>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-10 tracking-tighter gold-text-gradient glint-animate">Shaping Lives, <br />Igniting Success.</h2>
              <p className="text-on-surface-variant mb-10 md:mb-12 max-w-2xl mx-auto text-base md:text-xl font-light">Join Silver Lining Intellectual Services today and transform your future with expert guidance, placement support, and corporate solutions.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 relative z-10 w-full sm:w-auto">
                <button className="px-12 py-5 gold-button rounded-xl font-black uppercase tracking-widest text-xs font-label w-full sm:w-auto">Get Started</button>
              </div>
              <div className="glint-overlay"></div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 px-6 lg:px-20 relative" id="contact">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 relative z-10">
            <div className="reveal-on-scroll">
              <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-10 tracking-tighter gold-text-gradient glint-animate">Connect with <br />The Experts</h2>
              <p className="text-on-surface-variant mb-8 md:mb-16 text-sm md:text-base lg:text-xl font-light leading-relaxed">Our consultants are ready to help you navigate career growth, placement opportunities, higher education, and corporate development.</p>
              <div className="flex flex-col gap-6 md:gap-10">
                <div className="flex items-start gap-4 md:gap-6 group cursor-pointer">
                  <div className="w-10 h-10 md:w-12 md:h-12 glass-panel gold-lining rounded-full flex items-center justify-center text-primary group-hover:scale-125 group-hover:rotate-12 transition-all"><span className="material-symbols-outlined text-sm md:text-base">corporate_fare</span></div>
                  <div>
                    <h5 className="font-bold text-primary uppercase tracking-widest text-[10px] mb-1 group-hover:scale-105 transition-transform origin-left font-label">Corporate HQ</h5>
                    <p className="text-sm md:text-lg text-on-surface-variant font-light group-hover:text-white transition-colors">16/1, Paruppukara Street,
                      Palakarai, Trichy - 620001.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-6 group cursor-pointer">
                  <div className="w-10 h-10 md:w-12 md:h-12 glass-panel gold-lining rounded-full flex items-center justify-center text-primary group-hover:scale-125 group-hover:rotate-12 transition-all"><span className="material-symbols-outlined text-sm md:text-base">mail</span></div>
                  <div>
                    <h5 className="font-bold text-primary uppercase tracking-widest text-[10px] mb-1 group-hover:scale-105 transition-transform origin-left font-label">Inquiry Channel</h5>
                    <p className="text-sm md:text-lg text-on-surface-variant font-light group-hover:text-white transition-colors">sabari@slisglobal.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-panel gold-lining rounded-[2rem] md:rounded-[2.5rem] relative reveal-on-scroll card-hover-effect interactive-3d-card" style={{ animationDelay: '0.2s' }}>
              <div className="card-3d-inner p-6 md:p-8 lg:p-12 h-full w-full">
                <form className="flex flex-col gap-5 md:gap-8" onSubmit={handleContactSubmit}>
                  {status === "success" && (
                    <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-3 md:p-4 rounded-xl text-xs uppercase font-black tracking-widest text-center animate-reveal-up">
                      Transmission Received. We will reach out shortly.
                    </div>
                  )}
                  {status === "error" && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 md:p-4 rounded-xl text-xs uppercase font-black tracking-widest text-center animate-reveal-up">
                      Transmission Failed. Please review parameters and retry.
                    </div>
                  )}

                  <div className="flex flex-col gap-2 md:gap-3 group">
                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-primary/50 group-focus-within:text-primary transition-colors font-label">Identity</label>
                    <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl py-4 md:py-5 px-5 md:px-6 text-sm md:text-base text-white placeholder:text-white/20 transition-all font-light" placeholder="NAME" type="text" />
                  </div>
                  <div className="flex flex-col gap-2 md:gap-3 group">
                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-primary/50 group-focus-within:text-primary transition-colors font-label">Frequency</label>
                    <input required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl py-4 md:py-5 px-5 md:px-6 text-sm md:text-base text-white placeholder:text-white/20 transition-all font-light" placeholder="ADDRESS" type="email" />
                  </div>
                  <div className="flex flex-col gap-2 md:gap-3 group">
                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-primary/50 group-focus-within:text-primary transition-colors font-label">Inquiry Parameters</label>
                    <textarea required value={formData.inquiry} onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl py-4 md:py-5 px-5 md:px-6 text-sm md:text-base text-white placeholder:text-white/20 transition-all font-light" placeholder="HOW CAN WE HELP" rows={3}></textarea>
                  </div>
                  <button disabled={status === "loading"} className="w-full py-4 md:py-6 mt-2 gold-button rounded-xl font-black uppercase tracking-[0.3em] text-xs font-label disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    {status === "loading" ? "Transmitting..." : "Get Started"}
                  </button>
                </form>
                <div className="glint-overlay"></div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 md:py-24 px-6 lg:px-20 border-t border-white/10 bg-surface-dim relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-6 h-6 md:w-8 md:h-8 text-primary gold-glow-effect transition-transform duration-500 group-hover:rotate-[360deg]">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                  </svg>
                </div>
                <span className="font-headline font-bold text-lg md:text-xl tracking-tighter gold-text-gradient uppercase">SILVER LINING</span>
              </div>
              <p className="text-[10px] md:text-xs text-on-surface-variant max-w-xs leading-relaxed font-light">The intellectual standard in talent and business growth. Forged for future leaders and legacy builders.</p>
            </div>
            {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div className="flex flex-col gap-4 md:gap-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary font-label">Academy</p>
                <ul className="flex flex-col gap-2 md:gap-3 text-xs text-on-surface-variant uppercase tracking-widest font-bold font-label">
                  <li><a className="hover:text-primary hover:translate-x-2 transition-all block" href="#">Exam Portal</a></li>
                  <li><a className="hover:text-primary hover:translate-x-2 transition-all block" href="#">Job Board</a></li>
                  <li><a className="hover:text-primary hover:translate-x-2 transition-all block" href="#">Higher Ed</a></li>
                </ul>
              </div>
              <div className="flex flex-col gap-4 md:gap-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary font-label">Enterprise</p>
                <ul className="flex flex-col gap-2 md:gap-3 text-xs text-on-surface-variant uppercase tracking-widest font-bold font-label">
                  <li><a className="hover:text-primary hover:translate-x-2 transition-all block" href="#">Recruitment</a></li>
                  <li><a className="hover:text-primary hover:translate-x-2 transition-all block" href="#">IT Services</a></li>
                  <li><a className="hover:text-primary hover:translate-x-2 transition-all block" href="#">Sourcing</a></li>
                </ul>
              </div>
              <div className="hidden md:flex flex-col gap-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary font-label">Ethics</p>
                <ul className="flex flex-col gap-2 md:gap-3 text-xs text-on-surface-variant uppercase tracking-widest font-bold font-label">
                  <li><a className="hover:text-primary hover:translate-x-2 transition-all block" href="#">Privacy Hub</a></li>
                  <li><a className="hover:text-primary hover:translate-x-2 transition-all block" href="#">Client Terms</a></li>
                </ul>
              </div>
            </div> */}
          </div>
          <div className="max-w-7xl mx-auto mt-12 md:mt-24 pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 md:gap-8 items-center">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black font-label">© 2026 SILVER LINING INTELLECTUAL SERVICES PVT LTD.</p>
            <div className="flex gap-8 text-primary/40">
              <a className="hover:text-primary hover:scale-150 gold-glow-effect transition-all" href="https://www.linkedin.com/in/sabarinathan-dandapani-bb8a35386/" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a className="hover:text-primary hover:scale-150 gold-glow-effect transition-all" href="https://x.com/Slisglobal" aria-label="X (Twitter)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
              </a>
              <a className="hover:text-primary hover:scale-150 gold-glow-effect transition-all" href="https://www.instagram.com/slisglobal" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a className="hover:text-primary hover:scale-150 gold-glow-effect transition-all" href="https://www.youtube.com/@fightclubupsc" aria-label="YouTube">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
