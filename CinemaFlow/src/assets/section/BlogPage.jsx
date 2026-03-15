import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import JoinOur from "./JoinOur";

import imgB1 from "../image/imgB1.png";
import imgB2 from "../image/imgB2.png";
import img1 from "../image/imig1.avif";
import img2 from "../image/imig2.avif";
import img3 from "../image/imig3.avif";
import img4 from "../image/imig4.avif";
import img5 from "../image/imig5.avif";
import img6 from "../image/imig6.avif";

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

// ─── Data ─────────────────────────────────────────────────────────────────────
const allPosts = [
  {
    img: imgB1,
    title: "How to start your career as a film director",
    excerpt: "Lorem ipsum dolor sit amet consectetur eros imperdiet cursus aliquam tincidunt integer ac congue sed arcu morbi duis nulla.",
    author: "John Carter",
    date: "Sep 25, 2025",
    badge: "Production",
  },
  {
    img: imgB2,
    title: "What do you need to start color grading professionally?",
    excerpt: "Lorem ipsum dolor sit amet consectetur eros imperdiet cursus aliquam tincidunt integer ac congue sed arcu morbi duis nulla.",
    author: "Sophie Moore",
    date: "Apr 21, 2025",
    badge: "Portfolio",
  },
  {
    img: img1,
    title: "How to remove audio background noise easily",
    excerpt: "Lorem ipsum dolor sit amet consectetur eros imperdiet cursus aliquam tincidunt integer ac congue sed arcu morbi duis nulla.",
    author: "Matt Cannon",
    date: "Apr 24, 2025",
    badge: "Tutorials",
  },
  {
    img: img2,
    title: "How to win clients' trust as a freelance video editor",
    excerpt: "Lorem ipsum dolor sit amet consectetur eros imperdiet cursus aliquam tincidunt integer ac congue sed arcu morbi duis nulla.",
    author: "John Carter",
    date: "Apr 24, 2025",
    badge: "Production",
  },
  {
    img: img3,
    title: "How to build an affordable pro studio for your videos",
    excerpt: "Lorem ipsum dolor sit amet consectetur eros imperdiet cursus aliquam tincidunt integer ac congue sed arcu morbi duis nulla.",
    author: "Sophie Moore",
    date: "Apr 21, 2025",
    badge: "Portfolio",
  },
  {
    img: img4,
    title: "5 video editing workflows to help organize your footage",
    excerpt: "Lorem ipsum dolor sit amet consectetur eros imperdiet cursus aliquam tincidunt integer ac congue sed arcu morbi duis nulla.",
    author: "Lilly Woods",
    date: "Apr 21, 2025",
    badge: "Tutorials",
  },
];

const secondaryPosts = [
  { title: "What do you need to start color grading professionally?", badge: "Portfolio", date: "Apr 21, 2025" },
  { title: "How to remove audio background noise easily", badge: "Tutorials", date: "Apr 24, 2025" },
  { title: "How to win clients' trust as a freelance video editor", badge: "Production", date: "Apr 24, 2025" },
];

const categories = ["All", "Production", "Portfolio", "Tutorials"];

// ─── Featured Post ────────────────────────────────────────────────────────────
const FeaturedPost = ({ post }) => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={ref} className="group cursor-pointer relative rounded-2xl overflow-hidden border border-border-dark">
      <div className="aspect-[21/9] relative">
        <img src={post.img} alt={post.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-lg">
            <h2 className="text-text-white font-medium text-2xl md:text-3xl leading-snug">
              {post.title}
            </h2>
            <p className="mt-3 text-text-gray font-medium text-sm leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="text-xs font-medium text-text-gray border border-white/20 rounded-full px-3 py-1">
                {post.badge}
              </span>
              <span className="text-text-gray text-sm">{post.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Secondary Posts ──────────────────────────────────────────────────────────
const SecondaryPosts = () => (
  <div className="divide-y divide-border-dark border-t border-b border-border-dark mt-10">
    {secondaryPosts.map((post, i) => (
      <FadeIn key={i} delay={i * 0.08}>
        <div className="group cursor-pointer py-6 flex items-start justify-between gap-6">
          <h3 className="text-text-white font-medium text-lg md:text-xl leading-snug group-hover:text-text-gray transition-colors duration-300 max-w-xl">
            {post.title}
          </h3>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-medium text-text-gray border border-border-dark rounded-full px-3 py-1">
              {post.badge}
            </span>
            <span className="text-text-gray text-sm hidden md:block">{post.date}</span>
          </div>
        </div>
      </FadeIn>
    ))}
  </div>
);

// ─── Article Card ─────────────────────────────────────────────────────────────
const ArticleCard = ({ post, delay = 0 }) => (
  <FadeIn delay={delay}>
    <div className="group cursor-pointer">
      <div className="rounded-2xl overflow-hidden border border-border-dark aspect-[4/3]">
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-text-gray text-sm">
            <span className="font-medium">{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-border-dark" />
            <span>{post.date}</span>
          </div>
          <span className="text-xs font-medium text-text-gray border border-border-dark rounded-full px-3 py-1">
            {post.badge}
          </span>
        </div>
        <h3 className="mt-3 text-text-white font-medium text-lg leading-snug group-hover:text-text-gray transition-colors duration-300">
          {post.title}
        </h3>
      </div>
    </div>
  </FadeIn>
);

// ─── Latest Articles ──────────────────────────────────────────────────────────
const LatestArticles = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? allPosts
    : allPosts.filter(p => p.badge === activeCategory);

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
              <span className="text-text-gray">Latest </span>articles
            </h2>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-all duration-300 ${
                    activeCategory === cat
                      ? "border-white text-text-white bg-white/10"
                      : "border-border-dark text-text-gray hover:border-white/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((post, i) => (
            <ArticleCard key={i} post={post} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const titleRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="px-6 pt-40 pb-10">
      <div className="max-w-5xl mx-auto">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-medium tracking-tight">
          News <span className="text-text-gray">&amp; articles.</span>
        </h1>
        <div className="mt-12">
          <FeaturedPost post={allPosts[0]} />
        </div>
        <SecondaryPosts />
      </div>
    </section>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────
const BlogPage = () => (
  <>
    <HeroSection />
    <SectionDivider label="02 / What's new" />
    <LatestArticles />
    <JoinOur />
  </>
);

export default BlogPage;
