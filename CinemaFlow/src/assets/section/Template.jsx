import React, { useEffect, useRef, useState } from "react";
import MainTitle from '../shared/MainTitle'
import Line from '../shared/Line'
import SectionText from "../shared/SectionText"
import ButtonMain from '../shared/ButtonMain';
import imgt1 from "../image/imgt1.avif"
import imgt2 from "../image/imgt2.avif"
import imgt3 from "../image/imgt3.avif"
import imgt4 from "../image/imgt4.avif"
import imgt5 from "../image/imgt5.avif"

const sections = [
  { title: "3 Headers and Footers", description:"With a total of 3 different headers and footers, you can easily customize Cinemaflow Webflow Template to fit your company needs and requirements.", image: imgt1 },
  { title: "3 Notification bars", description:"If you are looking to get more sales, use one of our 3 notification bars included in the Cinemaflow Webflow Template, and start promoting your products or services.", image: imgt2 },
  { title: "Custom icon set", description:"With a total of 3 different headers and footers, you can easily customize Cinemaflow Webflow Template to fit your company needs and requirements.", image: imgt3 },
  { title: "Social Media Assets", description:"Our Cinemaflow Webflow Template Figma file includes a collection of social media covers that match with the Webflow Template design (for Facebook, Twitter and LinkedIn), so you can easily edit, customize, and use them for your own social media profiles.", image: imgt4 },
  { title: "Email signature", description:"Our Cinemaflow Webflow Template Figma file includes 2 custom email signature templates that match with the Webflow template, and you can use them to impress your customers with an amazing email signature.", image: imgt5 },
];

// ============================
// Custom Hook: useRevealOnScroll
// ============================
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

    // تحقق عند تحميل الصفحة
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight * (1 - threshold)) {
      setIsVisible(true);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

// ============================
// Component الرئيسي
// ============================
const Template = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  // MainTitle مع الانيميشن
  const [titleRef, isTitleVisible] = useRevealOnScroll(0.3);

  useEffect(() => {
    sectionRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight * 0.7) {
        setVisibleSections((prev) => prev.includes(index) ? prev : [...prev, index]);
      }
    });
  }, []);

  // IntersectionObserver للأقسام
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleSections((prev) => prev.includes(index) ? prev : [...prev, index]);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Line />
      <section className="pb-12 md:pb-24 mc">
        <div className="max-w-324 mx-auto block px-4 md:px-6">
          <div
            ref={titleRef}
            className={`transition-all duration-1000 ${
              isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <MainTitle
              title1="The Cinemaflow Webflow Template"
              title2="also comes with more surprises..."
            />
          </div>

          <div className="mt-12 space-y-32">
            {sections.map((item, index) => {
              const isVisible = visibleSections.includes(index);
              return (
                <div
                  key={index}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  data-index={index}
                  className="grid md:grid-cols-2 gap-11 items-center"
                >

                  <div
                    className={`
                      transition-all duration-1000
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
                      flex flex-col items-start md:items-start
                      ${index % 2 === 1 ? "md:order-2" : "md:order-1"}
                    `}
                  >
                    <SectionText
                      title={item.title}
                      description={item.description}
                    />

                    <div
                      className={`
                        mt-3 md:mt-7
                        transition-all duration-1000 delay-150
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
                      `}
                    >
                      <div className="flex items-center justify-start md:justify-start">
                        <ButtonMain onClick={() => window.open("https://webflow.com/templates/html/cinemaflow-website-template", "_blank")}>Buy template</ButtonMain>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`
                      transition-all duration-1000 delay-400
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
                      flex justify-center
                      ${index % 2 === 1 ? "md:order-1" : "md:order-2"}
                    `}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-2xl w-full max-w-175 object-cover"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Template;