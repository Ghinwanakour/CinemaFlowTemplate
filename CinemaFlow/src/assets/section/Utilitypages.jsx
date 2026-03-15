import React from 'react'
import Line from '../shared/Line'
import MainTitle from '../shared/MainTitle'
import CardsGrid from '../shared/CardsGrid';
import Card from '../shared/Card';
import img1 from '../image/img11.png';
import img2 from '../image/img12.png';
import img3 from '../image/img13.png';
import ButtonMain from '../shared/ButtonMain';
import { useEffect, useRef, useState } from "react";

const useRevealOnScroll = (threshold = 0.4) => {
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

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight * (1 - threshold)) {
      setIsVisible(true);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

const Utilitypages = () => {

  const CardsData = [
    {
      id: "1",
      href: img1,
      imageSrc: img1,
      imageAlt: "Cinemaflow - Coming Soon Page - Ultimate Video Agency Webflow Template",
      title: "Coming Soon"
    },
    {
      id: "2",
      href: img3,
      imageSrc: img3,
      imageAlt: "Cinemaflow - 404 Not Found Page - Ultimate Video Agency Webflow Template",
      title: "404 not found"
    },
    {
      id: "3",
      href: img2,
      imageSrc: img2,
      imageAlt: "Cinemaflow - Password Protected Page - Ultimate Video Agency Webflow Template",
      title: "Password Protected"
    },
  ]

  const [sectionRef, isVisible] = useRevealOnScroll(0.3)

  return (
    <> 
     <Line/>

     <section ref={sectionRef} className="pb-12 md:pb-24 mc">
        <div className="max-w-324 mx-auto block px-4 md:px-6">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <MainTitle 
              title="Utility pages"
              description1="Take a look at the utility pages included in Cinemaflow Template."
            />
          </div>

          {/* Cards */}
          <div
            className={`mt-12 mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <CardsGrid>
              {CardsData.map((card) => (
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

          {/* Button */}
          <div
            className={`mt-8 md:mt-12 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <div className='flex items-center justify-center'>
              <ButtonMain onClick={() => window.open("https://webflow.com/templates/html/cinemaflow-website-template", "_blank")}>Buy template</ButtonMain>
            </div>
          </div>

        </div>
     </section>
    </>
  )
}

export default Utilitypages