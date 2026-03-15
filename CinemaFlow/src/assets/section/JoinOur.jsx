import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import img1 from "../image/imgE.png";
import img2 from "../image/imgE1.png";
import img3 from "../image/img3.png";

import FooterCard from "../shared/FooterCard";
import NewsletterForm from "../shared/NewsLetterForm";

const footerLinks = [
  ["Preview","Home V1","Home V2","Home V3","About","Services"],
  ["Service single","Portfolio V1","Portfolio V2","Portfolio V3","Portfolio single","Blog V1"],
  ["Blog V2","Blog V3","Blog post","Careers","Career single","Contact"],
  ["Start here","Style guide","404 not found","Password protected","Licenses","Changelog"],
];

const JoinOur = () => {
  const pagesLinksRef = useRef(null);
  const sectionRef = useRef(null);
  const activeAnimationsRef = useRef(new Map());

  useEffect(() => {
    // Hover animation للروابط
    if (pagesLinksRef.current) {
      const links = pagesLinksRef.current.querySelectorAll("a");

      links.forEach((link) => {
        const originalText = link.textContent || "";

        const handleMouseEnter = () => {
          const letters = originalText
            .split("")
            .map((char) => {
              if (char === " ") return '<span class="split-letter" style="display:inline-block">&nbsp;</span>';
              return `<span class="split-letter" style="display:inline-block;color:inherit;">${char}</span>`;
            })
            .join("");

          link.innerHTML = letters;

          const letterElements = link.querySelectorAll(".split-letter");

          gsap.fromTo(
            letterElements,
            { y: 0, opacity: 1, color: "inherit" },
            {
              y: -2,
              color: "#9CA3AF",
              duration: 0.3,
              stagger: { amount: 0.2, from: "start" },
              ease: "power1.inOut",
            }
          );
        };

        const handleMouseLeave = () => {
          const letterElements = link.querySelectorAll(".split-letter");
          if (!letterElements.length) return;

          gsap.to(letterElements, {
            y: 0,
            color: "inherit",
            duration: 0.3,
            stagger: { amount: 0.2, from: "end" },
            ease: "power2.out",
            onComplete: () => {
              link.innerHTML = originalText;
            },
          });
        };

        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    // Scroll animation للقسم كامل
    if (sectionRef.current) {
      const sectionChildren = sectionRef.current.querySelectorAll("div, h3, p, img");
      gsap.set(sectionChildren, { opacity: 0, y: 20 });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.to(sectionChildren, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1
            });
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(sectionRef.current);
    }

  }, []);

  return (
    <section ref={sectionRef} className="mc pb-6! px-6 lg:p-10 max-w-275 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      {/* Newsletter Card */}
      <div
        className="row-span-2 py-12 px-12 rounded-3xl bg-cover bg-center order-3 lg:order-1"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${img1})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          minHeight: '550px', 
        }}
      >
        <div className="text-text-white text-[18px] md:text-[25px] text-nowrap lg:text-xl lg:text-wrap font-family font-medium leading-tight tracking-tight">
          <span className="text-text-gray">Join our </span>newsletter!
        </div>
        <p className="mt-2 text-text-light-gray text-[12px] md:text-[14px] lg:text-[19px] font-family font-medium">
          Lorem ipsum dolor sit amet consectetur diam nunc ut placerat vitae urna orci quam quam lorem facilisis accumsan aliquet lacus.
        </p>
        <div className="mt-6">
          <NewsletterForm />
        </div>
      </div>

      {/* Social Card */}
      <FooterCard className="order-1 lg:order-2">
        <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-4">
          <img src={img2} alt="Footer Logo - Cinemaflow - Webflow Template | BRIX Templates" className="max-w-25 lg:max-w-48 xl:max-w-62.5 hover:scale-105" />
          <div className="flex md:flex-nowrap justify-start px-0 xl:px-4 gap-2 lg:gap-4 mt-2 lg:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex justify-center items-center w-4 h-4 lg:w-6 lg:h-6 hover:-translate-y-0.5 transition-transform">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <circle cx="12" cy="12" r="10" className="fill-bg-darker" />
                <path className="fill-white" transform="translate(12 12) scale(1.7) translate(-12 -12)" d="M13.5 17v-4h1.5l.2-2h-1.7V9.7c0-.6.2-1 1-1H15V7.1c-.2 0-.9-.1-1.6-.1-1.6 0-2.6 1-2.6 2.8V11H9v2h1.8v4h2.7z" />
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="flex justify-center items-center w-4 h-4 lg:w-6 lg:h-6 hover:-translate-y-0.5 transition-transform">
              <img src={img3} className="w-3 h-3 lg:w-5 lg:h-5" alt="x" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex justify-center items-center w-4 h-4 lg:w-6 lg:h-6 hover:-translate-y-0.5 transition-transform">
             <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
               <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.5v-7l6.2 3.5-6.2 3.5z"/>
              </svg> 
            </a>
          </div>
        </div>
        <p className="mt-6 text-text-light-gray text-[14px] lg:text-[12.5px] xl:text-[16px] font-medium font-family">
          Lorem ipsum dolor sit amet consectetur diam nunc ut placerat vitae urna orci quam quam lorem facilisis accumsan aliquet lacus.
        </p>
      </FooterCard>

      {/* Pages Card */}
      <FooterCard className="order-2 lg:order-3">
        <h3 className="text-text-white font-medium font-family text-[18px] lg:text-[25px] xl:[28px] leading-tight">
          Template pages
        </h3>
        <div ref={pagesLinksRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-1 md:gap-3 lg:gap-5 mt-6">
          {footerLinks.map((column, index) => (
            <div key={index} className="grid gap-2 lg:gap-4">
              {column.map((link, i) => {
                const is404 = link === "404 not found";
                return is404 ? (
                  <Link key={i} to="/404-not-found" className="text-text-gray text-[14px] lg:text-[16px] xl:text-[17px] lg:text-wrap xl:text-nowrap font-family font-medium leading-tight duration-300 hover:opacity-70">
                    {link}
                  </Link>
                ) : (
                  <a key={i} href="/" className="text-text-gray text-[14px] lg:text-[16px] xl:text-[17px] lg:text-wrap xl:text-nowrap font-family font-medium leading-tight duration-300 hover:opacity-70">
                    {link}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </FooterCard>

    </section>
  );
};

export default JoinOur;