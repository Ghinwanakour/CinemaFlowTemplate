import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ButtonMain from "../shared/ButtonMain";
import ButtonStyle from "../shared/ButtonStyle";
import JoinOur from "./JoinOur";

import img1 from "../image/imig1.avif";
import img2 from "../image/imig2.avif";
import img3 from "../image/imig3.avif";
import img4 from "../image/imig4.avif";
import img5 from "../image/imig5.avif";
import img6 from "../image/imig6.avif";
import img7 from "../image/imig7.avif";
import img8 from "../image/imig8.avif";
import img9 from "../image/imig9.avif";
import img10 from "../image/imig10.avif";
import imgi1 from "../image/imgi_1.png";
import imgi2 from "../image/imgi_2.png";
import imgi3 from "../image/imgi_3.png";
import imgi4 from "../image/imgi_4.png";
import imgi5 from "../image/imgi_5.png";

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
    <section className="min-h-[70vh] flex items-end px-6 pt-40 pb-16">
      <div className="max-w-5xl mx-auto w-full flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">
        <div ref={titleRef} className="flex-1">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight">
            <span className="text-text-gray">The story about our </span>
            production company.
          </h1>
        </div>
        <div ref={subRef} className="lg:max-w-xs">
          <p className="text-text-gray font-medium leading-relaxed">
            Lorem ipsum dolor sit amet consectetur purus curabitur diam ultricies placerat diam id donec augue amet ac.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <ButtonMain>Contact us</ButtonMain>
            <ButtonStyle>View portfolio</ButtonStyle>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Hero Images ──────────────────────────────────────────────────────────────
const HeroImages = () => (
  <section className="px-6 pb-10">
    <div className="max-w-5xl mx-auto grid grid-cols-2 gap-4">
      <FadeIn delay={0.1}>
        <div className="rounded-2xl overflow-hidden border border-border-dark aspect-[4/3]">
          <img src={img7} alt="About hero left" className="w-full h-full object-cover opacity-80" />
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="rounded-2xl overflow-hidden border border-border-dark aspect-[4/3]">
          <img src={img8} alt="About hero right" className="w-full h-full object-cover opacity-80" />
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── Logo Strip ───────────────────────────────────────────────────────────────
const LogoStrip = () => (
  <section className="py-12 px-6">
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <p className="text-text-gray text-sm font-medium whitespace-nowrap">
            Trusted by world's most exciting brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
            {["COMPANY", "AGENCY", "VENTURE", "STARTUP", "INSTITUTE", "ENTERPRISE"].map((name) => (
              <span key={name} className="text-text-white font-medium text-sm tracking-widest">{name}</span>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── Story ────────────────────────────────────────────────────────────────────
const StorySection = () => (
  <section className="py-20 px-6">
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            <span className="text-text-gray">We started with a small team of </span>
            passionate filmmakers
          </h2>
          <p className="mt-6 text-text-gray font-medium leading-relaxed">
            Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna nunc aliquam eleifend sagittis elementum molestie laoreet nulla auctor eu mi at vitae tortor tortor at sollicitudin quam mattis leo.
          </p>
          <div className="mt-8">
            <ButtonStyle>Learn more</ButtonStyle>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── Team ─────────────────────────────────────────────────────────────────────
const teamMembers = [
  { img: imgi1, name: "John Carter", role: "CEO & Founder" },
  { img: imgi2, name: "Matt Cannon", role: "Producer" },
  { img: imgi3, name: "Lilly Woods", role: "Camera Operator" },
  { img: imgi4, name: "Sophie Moore", role: "Film Director" },
];

const TeamSection = () => (
  <section className="py-20 px-6">
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
              <span className="text-text-gray">Meet </span>
              the team
              <span className="text-text-gray"> behind us</span>
            </h2>
            <p className="mt-4 text-text-gray font-medium max-w-md">
              Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna nunc aliquam eleifend sagittis elementum.
            </p>
          </div>
          <ButtonStyle>Join our team</ButtonStyle>
        </div>
      </FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {teamMembers.map((member, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden border border-border-dark aspect-square">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-text-white font-medium">{member.name}</h3>
                <p className="text-text-gray text-sm mt-1">{member.role}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

// ─── Offices ──────────────────────────────────────────────────────────────────
const offices = [
  {
    img: img9,
    city: "New York, NY",
    address: "123 Main Street, New York, NY 10001",
    desc: "Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna.",
    email: "newyork@cinemaflow.com",
  },
  {
    img: img10,
    city: "Los Angeles, CA",
    address: "910 Wilshire Blvd, Los Angeles, CA 90024",
    desc: "Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna.",
    email: "losangeles@cinemaflow.com",
  },
];

const OfficesSection = () => {
  const [active, setActive] = useState(0);
  const office = offices[active];
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
              <span className="text-text-gray">Come and </span>
              visit our offices
              <span className="text-text-gray"> around the world</span>
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="rounded-2xl overflow-hidden border border-border-dark">
            <div className="aspect-video relative">
              <img src={office.img} alt={office.city} className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="p-8 flex flex-col md:flex-row gap-8 justify-between">
              <div>
                <h3 className="text-text-white font-medium text-xl">{office.city}</h3>
                <p className="text-text-gray text-sm mt-2">{office.address}</p>
                <p className="text-text-gray font-medium mt-4 max-w-sm">{office.desc}</p>
              </div>
              <div className="shrink-0">
                <p className="text-text-gray text-sm font-medium">Email address</p>
                <a href={`mailto:${office.email}`} className="text-text-white font-medium mt-2 block hover:text-text-gray transition-colors duration-300">
                  {office.email}
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              {offices.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === active ? "bg-white w-6" : "bg-border-dark w-2"}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setActive((active - 1 + offices.length) % offices.length)}
                className="w-10 h-10 rounded-full border border-border-dark flex items-center justify-center text-text-white hover:border-white/40 transition-colors duration-300">
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none"><path d="M10.37 3.6L5.63 8l4.74 4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>
              </button>
              <button onClick={() => setActive((active + 1) % offices.length)}
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
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-14">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight max-w-xs">
              <span className="text-text-gray">Do you have </span>more questions?
            </h2>
            <p className="text-text-gray font-medium max-w-sm self-end">
              Lorem ipsum dolor sit amet consectetur diam nunc ut placerat vitae urna orci quam quam lorem facilisis accumsan aliquet lacus egestas velit praesent.
            </p>
          </div>
        </FadeIn>
        <div className="divide-y divide-border-dark border-t border-border-dark">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <button
                className="w-full text-left py-6 flex items-center justify-between gap-4 group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-text-white font-medium text-lg group-hover:text-text-gray transition-colors duration-300">
                  {faq.q}
                </span>
                <span className="text-text-gray text-2xl shrink-0 transition-transform duration-300"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {open === i && (
                <p className="pb-6 text-text-gray font-medium leading-relaxed max-w-2xl">{faq.a}</p>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Instagram ────────────────────────────────────────────────────────────────
const instagramImages = [img1, img2, img3, img4, img5, img6];

const InstagramSection = () => (
  <section className="py-20 px-6 overflow-hidden">
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
              <span className="text-text-gray">Follow our work </span>on Instagram
            </h2>
            <p className="mt-4 text-text-gray font-medium max-w-md">
              Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus ultrices proin nunc semper urna urna nunc aliquam eleifend sagittis elementum.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-border-dark">
                <img src={img1} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <span className="text-text-white font-medium text-sm">@cinemaflow</span>
            </div>
            <div className="w-px h-8 bg-border-dark" />
            <ButtonMain>Follow us</ButtonMain>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {instagramImages.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-border-dark aspect-square group cursor-pointer">
              <img src={img} alt={`instagram ${i + 1}`}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── Main Export ──────────────────────────────────────────────────────────────
const AboutPage = () => (
  <>
    <HeroSection />
    <HeroImages />
    <LogoStrip />
    <SectionDivider label="02 / Our story" />
    <StorySection />
    <SectionDivider label="03 / Team" />
    <TeamSection />
    <SectionDivider label="04 / Our offices" />
    <OfficesSection />
    <SectionDivider label="05 / FAQs" />
    <FaqSection />
    <SectionDivider label="06 / Follow us" />
    <InstagramSection />
    <JoinOur />
  </>
);

export default AboutPage;
