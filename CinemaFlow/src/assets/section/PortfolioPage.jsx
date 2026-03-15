import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ButtonMain from "../shared/ButtonMain";
import JoinOur from "./JoinOur";

import img1 from "../image/imig1.avif";
import img2 from "../image/imig2.avif";
import img3 from "../image/imig3.avif";
import img4 from "../image/imig4.avif";
import img5 from "../image/imig5.avif";
import img6 from "../image/imig6.avif";
import img7 from "../image/imig7.avif";
import img8 from "../image/imig8.avif";
import imgs1 from "../image/imgs1.png";
import imgs2 from "../image/imgs2.png";
import imgs3 from "../image/imgs3.png";
import imgs4 from "../image/imgs4.png";
import imgs5 from "../image/imgs5.png";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const SectionDivider = ({ label }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        gsap.to(el.querySelector(".divider-line"), { width: "100%", duration: 1.2, ease: "power2.out" });
        gsap.to(el.querySelector(".divider-label"), { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-6">
      <div className="divider-label opacity-0 text-text-gray text-sm font-medium whitespace-nowrap" style={{ transform: "translateY(16px)" }}>
        {label}
      </div>
      <div className="divider-line h-px bg-border-dark" style={{ width: 0 }} />
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 30, filter: "blur(6px)" });
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        gsap.to(el, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, delay, ease: "power2.out" });
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" }
    );
    gsap.fromTo(subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="min-h-[55vh] flex items-end px-6 pt-40 pb-16">
      <div className="max-w-5xl mx-auto w-full text-center">
        <div ref={titleRef}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight">
            <span className="text-text-gray">Our </span>
            latest projects
          </h1>
        </div>
        <div ref={subRef} className="mt-6">
          <p className="text-text-gray font-medium max-w-xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna nunc aliquam eleifend sagittis elementum.
          </p>
        </div>
      </div>
    </section>
  );
};

// ─── Portfolio Grid ───────────────────────────────────────────────────────────
const projects = [
  { img: img2, title: "Quatro",  date: "Mar 30, 2025", badge: "Documentary",  icon: "Q" },
  { img: img3, title: "Lunari",  date: "Feb 28, 2026", badge: "Music video",  icon: "L" },
  { img: img4, title: "Siply",   date: "Jan 26, 2026", badge: "Commercial",   icon: "S" },
  { img: img5, title: "Mirae",   date: "Dec 24, 2025", badge: "Event",        icon: "M" },
  { img: img6, title: "Nocta",   date: "Nov 22, 2025", badge: "Commercial",   icon: "N" },
];

const ProjectCard = ({ project, delay = 0, wide = false }) => {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current.querySelector(".portfolio-img"), {
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
    });
  };
  const handleMouseLeave = () => {
    gsap.to(cardRef.current.querySelector(".portfolio-img"), {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <FadeIn delay={delay}>
      <div
        ref={cardRef}
        className="group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image */}
        <div className={`rounded-2xl overflow-hidden border border-border-dark ${wide ? "aspect-[16/9]" : "aspect-[3/4]"}`}>
          <img
            src={project.img}
            alt={project.title}
            className="portfolio-img w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        {/* Meta */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Icon square */}
            <div className="w-10 h-10 rounded-lg border border-border-dark flex items-center justify-center shrink-0">
              <span className="text-text-white font-medium text-sm">{project.icon}</span>
            </div>
            <div>
              <h3 className="text-text-white font-medium text-lg leading-tight group-hover:text-text-gray transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-text-gray text-sm mt-0.5">{project.date}</p>
            </div>
          </div>
          <span className="text-xs font-medium text-text-gray border border-border-dark rounded-full px-3 py-1 shrink-0">
            {project.badge}
          </span>
        </div>
      </div>
    </FadeIn>
  );
};

const PortfolioGrid = () => {
  const [top, bottom] = [projects.slice(0, 2), projects.slice(2)];

  return (
    <section className="py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Row 1: 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {top.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.1} />
          ))}
        </div>
        {/* Row 2: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bottom.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Contact Section ──────────────────────────────────────────────────────────
const ContactSection = () => {
  const [form, setForm] = useState({
    name: "", email: "", company: "",
    service: "Documentaries", budget: "10-15K", message: "",
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(form.name && form.email && form.message ? "success" : "error");
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <FadeIn>
            <div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
                <span className="text-text-gray">Let's make your </span>vision come true
              </h2>
              <p className="mt-4 text-text-gray font-medium leading-relaxed">
                Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna.
              </p>
              <div className="mt-10 space-y-6">
                <div>
                  <p className="text-text-gray text-sm font-medium mb-2">Send us a message</p>
                  <a href="mailto:hello@cinemaflow.com" className="text-text-white font-medium text-lg hover:text-text-gray transition-colors duration-300">
                    hello@cinemaflow.com
                  </a>
                </div>
                <div className="w-full h-px bg-border-dark" />
                <div>
                  <p className="text-text-gray text-sm font-medium mb-2">Give us a call</p>
                  <a href="tel:1234567890" className="text-text-white font-medium text-lg hover:text-text-gray transition-colors duration-300">
                    (123) 456 - 7890
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: form */}
          <FadeIn delay={0.2}>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-full border border-border-dark flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-text-white font-medium text-2xl">Thank you!</h3>
                <p className="text-text-gray mt-3 font-medium">We'll get back to you as soon as possible.</p>
                <button onClick={() => setStatus(null)} className="mt-8 text-text-gray text-sm underline hover:text-text-white transition-colors duration-300">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {status === "error" && (
                  <p className="md:col-span-2 text-sm text-red-400 font-medium">Please fill in all required fields.</p>
                )}

                {[["name","Your name","text","ex. John"],["email","Your email","email","example@youremail.com"]].map(([field,label,type,ph]) => (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="text-text-gray text-sm font-medium">{label}</label>
                    <input type={type} placeholder={ph} required value={form[field]}
                      onChange={e => setForm({ ...form, [field]: e.target.value })}
                      className="bg-transparent border-b border-border-dark text-text-white placeholder-text-gray py-2 focus:outline-none focus:border-white transition-colors duration-300" />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label className="text-text-gray text-sm font-medium">Your Company name</label>
                  <input type="text" placeholder="ex. Facebook" value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="bg-transparent border-b border-border-dark text-text-white placeholder-text-gray py-2 focus:outline-none focus:border-white transition-colors duration-300" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-text-gray text-sm font-medium">Service</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    className="bg-transparent border-b border-border-dark text-text-white py-2 focus:outline-none focus:border-white transition-colors duration-300 cursor-pointer">
                    {["Documentaries","Music video","Commercial","Event"].map(o => <option key={o} className="bg-black">{o}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-text-gray text-sm font-medium">Budget</label>
                  <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                    className="bg-transparent border-b border-border-dark text-text-white py-2 focus:outline-none focus:border-white transition-colors duration-300 cursor-pointer">
                    {["10-15K","15-20K","20-35K"].map(o => <option key={o} className="bg-black">{o}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-text-gray text-sm font-medium">Message</label>
                  <textarea rows={4} placeholder="Tell us more about your project here..." required value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="bg-transparent border-b border-border-dark text-text-white placeholder-text-gray py-2 focus:outline-none focus:border-white transition-colors duration-300 resize-none" />
                </div>

                <div className="md:col-span-2">
                  <ButtonMain>Send message</ButtonMain>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────
const PortfolioPage = () => (
  <>
    <HeroSection />
    <PortfolioGrid />
    <SectionDivider label="02 / Contact us" />
    <ContactSection />
    <JoinOur />
  </>
);

export default PortfolioPage;
