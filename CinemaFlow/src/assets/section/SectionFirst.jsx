import React, { useEffect, useRef, useState } from "react";
import img1 from "../image/imgB1.png";
import img2 from "../image/imgB2.png";
import logo from "../image/img2.png";

const SectionFirst = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 mc">
      <div className="max-w-324 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1 */}
          <div
            className={`group relative overflow-hidden rounded-xl bg-bg-blue text-white p-10 flex flex-col justify-between min-h-160 border border-solid border-border-blue hover:border-blue-500 hover:shadow-2xl hover:scale-99 transition-all duration-700
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
          >
            <div>
              <img src={logo} alt="logo" className="w-14 h-14 mb-6" />

              <h2 className="text-[15px] sm:text-[20px] md:text-[30px] text-text-white font-semibold tracking-tight">
                Buy now on Webflow
              </h2>

              <p className="text-text-white text-[12px] md:text-[17px] mt-3 max-w-md tracking-tight">
                Get the Cinemaflow X Webflow Template today, and take your website design to the next level.
              </p>

              <div className="mt-6">
                <a
                  href="https://webflow.com/templates/html/cinemaflow-website-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-white px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[9px] md:text-sm font-medium"
                >
                  Buy template
                </a>
              </div>
            </div>

            <img
              src={img1}
              alt="template"
              className="absolute -bottom-9 left-1/2 -translate-x-1/2 min-w-244 max-w-244 object-cover"
            />
          </div>

          {/* Card 2 */}
          <div
            className={`group relative overflow-hidden rounded-xl bg-bg-darkest text-text-white p-10 flex flex-col justify-between min-h-160 border border-solid border-border-dark hover:border-white/12 hover:shadow-2xl hover:scale-99 transition-all duration-700
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
          >
            <div>
              <img src={logo} alt="logo" className="w-14 h-14 mb-6" />

              <h2 className="text-[15px] sm:text-[20px] md:text-[30px] text-text-white font-semibold tracking-tight">
                Browse all templates
              </h2>

              <p className="text-text-light-gray text-[12px] md:text-[17px] mt-3 max-w-md tracking-tight">
                Looking for more templates? Browse our collection of 100+ Webflow Templates on BRIXTemplates.com
              </p>

              <div className="mt-6">
                <a
                  href="https://www.brixtemplates.com/more-webflow-templates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-bg-white text-text-black px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[9px] md:text-sm font-medium"
                >
                  Browse templates
                </a>
              </div>
            </div>

            <img
              src={img2}
              alt="templates"
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 min-w-244 max-w-244 object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionFirst;