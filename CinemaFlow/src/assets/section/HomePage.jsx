import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import ButtonMain from "../shared/ButtonMain";
import ButtonStyle from "../shared/ButtonStyle";
import JoinOur from "./JoinOur";

// Images
import img1 from "../image/imig1.avif";
import img2 from "../image/imig2.avif";
import img3 from "../image/imig3.avif";
import img4 from "../image/imig4.avif";
import img5 from "../image/imig5.avif";
import img6 from "../image/imig6.avif";
import img7 from "../image/imig7.avif";
import img8 from "../image/imig8.avif";
import imgB1 from "../image/imgB1.png";
import imgB2 from "../image/imgB2.png";
import imgt1 from "../image/imgt1.avif";
import imgt2 from "../image/imgt2.avif";
import imgt3 from "../image/imgt3.avif";
import imgt4 from "../image/imgt4.avif";

// ─── Divider ────────────────────────────────────────────────────────────────
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
    <div ref={ref} className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
      <div className="divider-label opacity-0 translate-y-4 text-text-gray text-sm font-medium whitespace-nowrap" style={{ transform: "translateY(16px)" }}>
        {label}
      </div>
      <div className="divider-line h-px bg-border-dark" style={{ width: 0 }} />
    </div>
  );
};

// ─── Fade-in wrapper ─────────────────────────────────────────────────────────
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

// ─── Hero ────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const titleRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" });
    gsap.fromTo(subRef.current, { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" });
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={titleRef}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight text-text-white">
            <span className="text-text-gray">Bringing brands to life with</span>{" "}
            impactful video content
          </h1>
        </div>
        <div ref={subRef}>
          <p className="mt-6 text-text-gray text-base md:text-lg font-medium max-w-md mx-auto">
            Lorem ipsum dolor sit amet consectetur purus curabitur diam ultricies placerat diam id donec augue amet ac.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <ButtonMain>Contact us</ButtonMain>
            <ButtonStyle>View portfolio</ButtonStyle>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Logo Strip ───────────────────────────────────────────────────────────────
const LogoStrip = () => (
  <section className="py-16 px-6">
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <p className="text-center text-text-gray text-sm font-medium mb-10 uppercase tracking-widest">
          Trusted by world's most exciting brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
          {["COMPANY", "AGENCY", "VENTURE", "STARTUP", "INSTITUTE", "ENTERPRISE"].map((name) => (
            <span key={name} className="text-text-white font-medium text-sm md:text-base tracking-widest">
              {name}
            </span>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── About ───────────────────────────────────────────────────────────────────
const AboutSection = () => (
  <section className="py-20 px-6">
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <FadeIn delay={0.1}>
        <div className="relative rounded-2xl overflow-hidden bg-bg-dark aspect-video group cursor-pointer">
          <img src={img1} alt="Visual Stories" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white ml-1"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
            <span className="text-text-gray">We transform ideas into visual stories that </span>
            inspire and connect
          </h2>
          <p className="mt-6 text-text-gray font-medium leading-relaxed">
            Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna nunc aliquam eleifend sagittis elementum molestie laoreet nulla auctor eu mi at vitae tortor.
          </p>
          <div className="mt-8">
            <ButtonStyle>Learn more</ButtonStyle>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── Portfolio ────────────────────────────────────────────────────────────────
const portfolioItems = [
  { img: img2, title: "Quatro", date: "Mar 30, 2025", badge: "Documentary" },
  { img: img3, title: "Lunari", date: "Feb 28, 2026", badge: "Music video" },
  { img: img4, title: "Siply", date: "Jan 26, 2026", badge: "Commercial" },
  { img: img5, title: "Mirae", date: "Dec 24, 2025", badge: "Event" },
];

const PortfolioSection = () => (
  <section className="py-20 px-6">
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
            <span className="text-text-gray">See what </span>
            <span className="text-text-white">creativity</span>
            <span className="text-text-gray"> looks like</span>
          </h2>
          <p className="mt-4 text-text-gray font-medium text-[18px] max-w-xl mx-auto">
            Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna.
          </p>
        </div>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioItems.map((item, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden border border-border-dark group-hover:border-white/20 transition-all duration-300">
                <img src={item.img} alt={item.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-text-white font-medium text-lg">{item.title}</h3>
                  <p className="text-text-gray text-sm mt-1">{item.date}</p>
                </div>
                <span className="text-xs font-medium text-text-gray border border-border-dark rounded-full px-3 py-1">
                  {item.badge}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}>
        <div className="flex justify-center mt-12">
          <ButtonStyle>View portfolio</ButtonStyle>
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  { num: "01", title: "Commercials", desc: "Lorem ipsum dolor sit amet consectetur ultrices dignissim hendrerit in volutpat fames pretium neque hac mauris ornare in odio at consequat." },
  { num: "02", title: "Corporate", desc: "Lorem ipsum dolor sit amet consectetur ultrices dignissim hendrerit in volutpat fames pretium neque hac mauris ornare in odio at consequat." },
  { num: "03", title: "Documentary", desc: "Lorem ipsum dolor sit amet consectetur ultrices dignissim hendrerit in volutpat fames pretium neque hac mauris ornare in odio at consequat." },
  { num: "04", title: "Music videos", desc: "Lorem ipsum dolor sit amet consectetur ultrices dignissim hendrerit in volutpat fames pretium neque hac mauris ornare in odio at consequat." },
];

const ServicesSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight max-w-xs">
              <span className="text-text-gray">Services that bring </span>stories to life
            </h2>
            <p className="text-text-gray font-medium max-w-sm self-end">
              Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna.
            </p>
          </div>
        </FadeIn>
        <div className="divide-y divide-border-dark border-t border-border-dark">
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <button
                className="w-full text-left py-6 flex items-start justify-between gap-4 group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-center gap-6 flex-1">
                  <h3 className="text-text-white font-medium text-xl md:text-2xl group-hover:text-text-gray transition-colors duration-300">
                    {s.title}
                  </h3>
                  <span className="text-text-gray text-sm">{s.num}</span>
                </div>
                <span className="text-text-gray text-2xl mt-1 transition-transform duration-300" style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {open === i && (
                <p className="pb-6 text-text-gray font-medium leading-relaxed max-w-2xl">{s.desc}</p>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Stats / CTA ──────────────────────────────────────────────────────────────
const StatsSection = () => (
  <section className="py-20 px-6">
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <div className="rounded-3xl border border-border-dark overflow-hidden relative">
          <img src={img6} alt="CTA" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="relative z-10 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-text-white">
                Let's work together!
              </h2>
              <p className="mt-4 text-text-gray font-medium">
                Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 items-center">
                <a href="mailto:[email]" className="text-text-white underline hover:text-text-gray transition-colors duration-300 font-medium">
                  [email]@cinemaflow.com
                </a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[["400+", "Successful projects"], ["25+", "Video awards"], ["10+", "Years of experience"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="text-3xl md:text-4xl font-medium text-text-white">{num}</div>
                  <div className="mt-2 text-text-gray text-sm font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  { img: imgt1, quote: "Amazing craft, professional and delivered on time!", name: "John Carter", role: "Founder at Converra" },
  { img: imgt2, quote: "Captured our vision perfectly. Truly outstanding!", name: "Sophie Moore", role: "VP of Design at Venture" },
  { img: imgt3, quote: "Professional, creative, fast — highly recommended", name: "Matt Cannon", role: "VP of Product at Nexora" },
  { img: imgt4, quote: "Reliable team with flawless execution always", name: "Lilly Woods", role: "VP of Marketing at Vireon" },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
              <span className="text-text-gray">Look at what </span>
              <span className="text-text-white">our clients</span>
              <span className="text-text-gray"> have to say about us</span>
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="relative rounded-3xl overflow-hidden border border-border-dark">
            <img src={testimonials[active].img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="relative z-10 p-10 md:p-16 min-h-72 flex flex-col justify-between">
              <h3 className="text-text-white font-medium text-2xl md:text-3xl max-w-lg">
                "{testimonials[active].quote}"
              </h3>
              <div className="mt-8">
                <div className="text-text-white font-medium">{testimonials[active].name}</div>
                <div className="text-text-gray text-sm mt-1">{testimonials[active].role}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? "bg-white w-6" : "bg-border-dark"}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-border-dark flex items-center justify-center text-text-white hover:border-white/40 transition-colors duration-300">
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none"><path d="M10.37 3.6L5.63 8l4.74 4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>
              </button>
              <button onClick={() => setActive((active + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-border-dark flex items-center justify-center text-text-white hover:border-white/40 transition-colors duration-300">
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none"><path d="M5.63 12.4L10.37 8 5.63 3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "Documentaries", budget: "10-15K", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn>
            <div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
                <span className="text-text-gray">Let's make your </span>vision come true
              </h2>
              <p className="mt-4 text-text-gray font-medium">
                Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna.
              </p>
              <div className="mt-10 space-y-6">
                <div>
                  <p className="text-text-gray text-sm font-medium mb-2">Send us a message</p>
                  <a href="mailto:[email]@cinemaflow.com" className="text-text-white font-medium text-lg hover:text-text-gray transition-colors duration-300">
                    [email]@cinemaflow.com
                  </a>
                </div>
                <div>
                  <p className="text-text-gray text-sm font-medium mb-2">Give us a call</p>
                  <a href="tel:1234567890" className="text-text-white font-medium text-lg hover:text-text-gray transition-colors duration-300">
                    (123) 456 - 7890
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <h3 className="text-text-white font-medium text-2xl">Thank you!</h3>
                <p className="text-text-gray mt-3">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[["name", "Your name", "text", "ex. John"], ["email", "Your email", "email", "[email]@example.com"]].map(([field, label, type, ph]) => (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="text-text-gray text-sm font-medium">{label}</label>
                    <input type={type} placeholder={ph} required value={form[field]}
                      onChange={e => setForm({ ...form, [field]: e.target.value })}
                      className="bg-transparent border-b border-border-dark text-text-white placeholder-text-gray py-2 focus:outline-none focus:border-white transition-colors duration-300" />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label className="text-text-gray text-sm font-medium">Company</label>
                  <input type="text" placeholder="ex. Facebook" value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="bg-transparent border-b border-border-dark text-text-white placeholder-text-gray py-2 focus:outline-none focus:border-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-text-gray text-sm font-medium">Service</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    className="bg-bg-darkest border-b border-border-dark text-text-white py-2 focus:outline-none focus:border-white transition-colors duration-300">
                    {["Documentaries", "Music video", "Commercial", "Event"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-text-gray text-sm font-medium">Message</label>
                  <textarea rows={4} placeholder="Tell us more about your project..." value={form.message}
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

// ─── Blog ─────────────────────────────────────────────────────────────────────
const blogPosts = [
  { img: imgB1, title: "How to start your career as a film director", badge: "Production", date: "Sep 25, 2025" },
  { img: imgB2, title: "What do you need to start color grading professionally?", badge: "Portfolio", date: "Apr 21, 2025" },
];

const BlogSection = () => (
  <section className="py-20 px-6">
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
            <span className="text-text-gray">Our latest </span>news
          </h2>
          <p className="mt-4 text-text-gray font-medium max-w-md mx-auto">
            Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin.
          </p>
        </div>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post, i) => (
          <FadeIn key={i} delay={i * 0.15}>
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden border border-border-dark group-hover:border-white/20 transition-all duration-300">
                <img src={post.img} alt={post.title} className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="mt-5">
                <h3 className="text-text-white font-medium text-xl leading-snug group-hover:text-text-gray transition-colors duration-300">
                  {post.title}
                </h3>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs font-medium text-text-gray border border-border-dark rounded-full px-3 py-1">{post.badge}</span>
                  <span className="text-text-gray text-sm">{post.date}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.3}>
        <div className="flex justify-end mt-10">
          <ButtonStyle>View all articles</ButtonStyle>
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "Are you open for new projects?", a: "Lorem ipsum dolor sit amet consectetur diam nunc ut placerat vitae urna orci quam quam lorem facilisis accumsan aliquet lacus egestas velit praesent." },
  { q: "How long has your agency been running for?", a: "Lorem ipsum dolor sit amet consectetur diam nunc ut placerat vitae urna orci quam quam lorem facilisis accumsan aliquet lacus egestas velit praesent." },
  { q: "Do you currently have career openings?", a: "Lorem ipsum dolor sit amet consectetur diam nunc ut placerat vitae urna orci quam quam lorem facilisis accumsan aliquet lacus egestas velit praesent." },
  { q: "Do you offer discounts for nonprofit companies?", a: "Lorem ipsum dolor sit amet consectetur diam nunc ut placerat vitae urna orci quam quam lorem facilisis accumsan aliquet lacus egestas velit praesent." },
];

const FaqSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <FadeIn>
          <div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
              <span className="text-text-gray">Do you have </span>more questions?
            </h2>
            <p className="mt-4 text-text-gray font-medium">
              Lorem ipsum dolor sit amet consectetur diam nunc ut placerat vitae urna orci quam quam lorem facilisis accumsan aliquet lacus.
            </p>
            <div className="mt-8 p-8 rounded-2xl border border-border-dark bg-bg-darker">
              <h3 className="text-text-white font-medium text-xl">Would you like to work with us?</h3>
              <p className="mt-3 text-text-gray font-medium text-sm">Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus.</p>
              <div className="mt-6">
                <ButtonMain>Join our team</ButtonMain>
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="divide-y divide-border-dark border-t border-border-dark">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button className="w-full text-left py-5 flex items-center justify-between gap-4 group"
                  onClick={() => setOpen(open === i ? null : i)}>
                  <span className="text-text-white font-medium group-hover:text-text-gray transition-colors duration-300">{faq.q}</span>
                  <span className="text-text-gray text-xl transition-transform duration-300 shrink-0"
                    style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                {open === i && (
                  <p className="pb-5 text-text-gray font-medium text-sm leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────
const HomePage = () => (
  <>
    <HeroSection />
    <LogoStrip />
    <SectionDivider label="02 / About us" />
    <AboutSection />
    <SectionDivider label="03 / Portfolio" />
    <PortfolioSection />
    <SectionDivider label="04 / Services" />
    <ServicesSection />
    <SectionDivider label="05 / Stats" />
    <StatsSection />
    <SectionDivider label="06 / Testimonials" />
    <TestimonialsSection />
    <SectionDivider label="07 / Contact us" />
    <ContactSection />
    <SectionDivider label="08 / Our blog" />
    <BlogSection />
    <SectionDivider label="09 / FAQs" />
    <FaqSection />
    <JoinOur />
  </>
);

export default HomePage;
