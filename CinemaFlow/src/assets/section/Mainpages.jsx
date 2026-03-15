import React from 'react';
import Line from '../shared/Line';
import MainTitle from '../shared/MainTitle';
import CardsGrid from '../shared/CardsGrid';
import Card from '../shared/Card';
import { PagesGridLastRow } from '../shared/CardsGrid';
import img1 from '../image/imig5.avif';
import img2 from '../image/imig1.avif';
import img3 from '../image/imig2.avif';
import img4 from '../image/imig3.avif';
import img5 from '../image/imig4.avif';
import img6 from '../image/imig9.avif';
import img7 from '../image/imig6.avif';
import img8 from '../image/imig8.avif';
import img9 from '../image/imig7.avif';
import img10 from '../image/imig10.avif';
import imgi_1 from '../image/imgi_1.png';
import imgi_2 from '../image/imgi_2.png';
import imgi_3 from '../image/imgi_3.png';
import imgi_4 from '../image/imgi_4.png';
import imgi_5 from '../image/imgi_5.png';
import ButtonMain from '../shared/ButtonMain';
import { useEffect, useRef, useState } from "react";

/* Scroll Animation Hook */
const useRevealOnScroll = (threshold = 0.3) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};


const Mainpages = () => {

  const homeCardsData = [
    { id: "1", href: "/home-pages/home-v1", imageSrc: img2, imageAlt: "", title: "Home V1" },
    { id: "2", href: "/home-pages/home-v2", imageSrc: img3, imageAlt: "", title: "Home V2" },
    { id: "3", href: "/home-pages/home-v3", imageSrc: img4, imageAlt: "", title: "Home V3" },
    { id: "4", href: "/company-pages/about", imageSrc: img5, imageAlt: "", title: "About" },
    { id: "5", href: "/blog-pages/blog-v1", imageSrc: img1, imageAlt: "", title: "Blog V1" },
    { id: "6", href: "/blog-pages/blog-v2", imageSrc: img7, imageAlt: "", title: "Blog V2" },
    { id: "7", href: "/blog-pages/blog-v3", imageSrc: img9, imageAlt: "", title: "Blog V3" },
    { id: "8", href: "/blog-posts/post", imageSrc: img8, imageAlt: "", title: "Blog post" },
    { id: "9", href: "/portfolio-pages/portfolio-v1", imageSrc: img6, imageAlt: "", title: "Portfolio V1" },
    { id: "10", href: "/portfolio-pages/portfolio-v2", imageSrc: img6, imageAlt: "", title: "Portfolio V2" },
    { id: "11", href: "/portfolio-pages/portfolio-v3", imageSrc: imgi_1, imageAlt: "", title: "Portfolio V3" },
    { id: "12", href: "/company-pages/portfolio-single", imageSrc: img10, imageAlt: "", title: "Portfolio single" },
    { id: "13", href: "/company-pages/careers", imageSrc: imgi_4, imageAlt: "", title: "Careers" },
    { id: "14", href: "/careers/creative-director", imageSrc: imgi_3, imageAlt: "", title: "Career single" },
    { id: "15", href: "/company-pages/services", imageSrc: imgi_2, imageAlt: "", title: "Services" },
  ];

  const serviesCardsData = [
    {
      id: "1",
      href: "/services/documentary",
      imageSrc: imgi_1,
      imageAlt: "",
      title: "Service single"
    },
    {
      id: "2",
      href: "/company-pages/contact",
      imageSrc: imgi_5,
      imageAlt: "",
      title: "Contact"
    },
  ];

  const [titleRef, titleVisible] = useRevealOnScroll(0.3);
  const [servicesRef, servicesVisible] = useRevealOnScroll(0.3);
  const [buttonRef, buttonVisible] = useRevealOnScroll(0.3);

  const groupedCards = [];
  for (let i = 0; i < homeCardsData.length; i += 3) {
    groupedCards.push(homeCardsData.slice(i, i + 3));
  }

  return (
    <>
      <Line />

      <section className="pb-12 md:pb-24 mc">
        <div className="max-w-324 mx-auto block px-4 md:px-6">

          {/* Title */}
          <div
            ref={titleRef}
            className={`transition-all duration-1000 ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <MainTitle
              title="Main pages"
              description1="Take a look at the main pages included in Cinemaflow Template."
            />
          </div>

          {/* Cards Sections */}
          <div className="mt-12 mb-8">
            {groupedCards.map((group, index) => {
              const [sectionRef, visible] = useRevealOnScroll(0.3);

              return (
                <div
                  key={index}
                  ref={sectionRef}
                  className={`mb-10 transition-all duration-1000 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                  }`}
                >
                  <CardsGrid>
                    {group.map((card) => (
                      <Card
                        key={card.id}
                        wId={card.id}
                        href={card.href}
                        imageSrc={card.imageSrc}
                        imageAlt={card.imageAlt}
                        title={card.title}
                      />
                    ))}
                  </CardsGrid>
                </div>
              );
            })}
          </div>

          {/* Last Row Animation */}
          <div
            ref={servicesRef}
            className={`mb-8 transition-all duration-1000 ${
              servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <PagesGridLastRow>
              {serviesCardsData.map((card) => (
                <Card
                  key={card.id}
                  wId={card.id}
                  href={card.href}
                  imageSrc={card.imageSrc}
                  imageAlt={card.imageAlt}
                  title={card.title}
                />
              ))}
            </PagesGridLastRow>
          </div>

          {/* Button Animation */}
          <div
            ref={buttonRef}
            className={`mt-8 md:mt-12 transition-all duration-1000 ${
              buttonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <div className='flex items-center justify-center'>
              <ButtonMain onClick={() => window.open("https://webflow.com/templates/html/cinemaflow-website-template", "_blank")}>Buy template</ButtonMain>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Mainpages;