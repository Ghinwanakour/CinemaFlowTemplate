import React, { useEffect, useRef, useState } from 'react';
import MainTitle from '../shared/MainTitle';
import ButtonMain from '../shared/ButtonMain';
import ButtonStyle from '../shared/ButtonStyle';
import imgs1 from '../image/imgs1.png';
import imgs2 from '../image/imgs2.png';
import imgs3 from '../image/imgs3.png';
import imgs4 from '../image/imgs4.png';
import imgs5 from '../image/imgs5.png';
import img from '../image/img.png';
import img1 from '../image/img1.png';

const Section = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const refs = useRef([]);

  const images = [
    { src: imgs1, alt: "Cinemaflow - Pages Included", number: "20+", text: "Pages" },
    { src: imgs2, alt: "Cinemaflow - Sections Included", number: "40+", text: "Sections" },
    { src: imgs3, alt: "Cinemaflow - Styles Included", number: "25+", text: "Styles & components" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleSections((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // تحقق عند تحميل الصفحة
  useEffect(() => {
    refs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight * 0.7) {
        setVisibleSections((prev) =>
          prev.includes(index) ? prev : [...prev, index]
        );
      }
    });
  }, []);

  return (
    <section className='pb-12 md:pb-24 mc'>
      <div
        ref={(el) => (refs.current[0] = el)}
        data-index={0}
        className={`max-w-324 w-full mx-auto block px-4 md:px-6 transition-all duration-1000 ${
          visibleSections.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <MainTitle
          title="What's included in Cinemaflow"
          description="Cinemaflow Webflow Template includes over 20 pages in total, with more than 40 sections, and 3 different Home, Blog & Contacts pages."
        />
      </div>

      <div className='mt-8 md:mt-12 px-4 md:px-6 lg:px-25 space-y-6'>
        <div
          ref={(el) => (refs.current[1] = el)}
          data-index={1}
          className={`grid gap-4 grid-cols-1 lg:grid-cols-3 auto-cols-fr transition-all duration-1000 ${
            visibleSections.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {images.map((imgItem, index) => (
            <div key={index} className='border border-solid border-border-darker rounded-2xl md:rounded-3xl bg-bg-darker overflow-hidden'>
              <img 
                src={imgItem.src}
                alt={imgItem.alt}
                className="image h-auto w-full inline-block"
              />
              <div className='flex flex-col text-center p-4 md:p-8'>
                <div className='text-text-white'>
                  <div className='font-medium text-xl md:text-2xl leading-normal tracking-tight'>{imgItem.number}</div>
                </div>
                <div className='mt-1'>
                  <div className='text-base md:text-[20px] text-text-gray font-medium leading-normal tracking-tight'>{imgItem.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={(el) => (refs.current[2] = el)}
          data-index={2}
          className={`mt-6 flex flex-col lg:flex-row border border-solid border-border-darker rounded-2xl md:rounded-3xl bg-bg-darker overflow-hidden transition-all duration-1000 ${
            visibleSections.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className='lg:flex-1 flex items-start justify-center flex-col p-6 md:p-8 lg:p-10 order-1 lg:order-2'> 
            <img src={img} alt="Figma file" className='w-12 h-12 md:w-16 md:h-16'/>
            <div className='mt-3 md:mt-4'>
              <h2 className='text-base md:text-lg lg:text-lg leading-normal tracking-tight text-text-white font-medium'>Figma file included</h2>
            </div>
            <div className='mt-2'>
              <p className='text-sm md:text-base text-text-gray'>
                Send us an email to{' '}
                <a href="mailto:cinemaflowtemplate@brixtemplates.com" className='text-text-white underline break-all'>
                  cinemaflowtemplate@brixtemplates.com
                </a>{' '}
                with your purchase receipt, and we will send you the editable Figma file for the Cinemaflow template
              </p>
            </div>
            <div className='mt-4 md:mt-6'>
              <ButtonStyle>Request figma file</ButtonStyle>
            </div>
          </div>
          <div className='lg:w-[56%] order-1 lg:order-2'>
            <img 
              src={imgs4} 
              alt="Figma preview" 
              className='w-full h-50 sm:h-75 md:h-100 lg:h-full object-cover object-center'
            />
          </div>
        </div>

        <div
          ref={(el) => (refs.current[3] = el)}
          data-index={3}
          className={`flex mt-6 flex-col lg:flex-row border border-solid border-border-darker rounded-2xl md:rounded-3xl bg-bg-darker overflow-hidden transition-all duration-1000 ${
            visibleSections.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className='lg:w-[56%] order-2 lg:order-1'>
            <img 
              src={imgs5} 
              alt="Cinemaflow - More Webflow Templates" 
              className='w-full h-50 sm:h-75 md:h-100 lg:h-full object-cover object-center ' 
            />
          </div>
          <div className='lg:flex-1 flex flex-col justify-center items-start p-6 md:p-8 lg:p-10 order-1 lg:order-2'>
            <img 
              src={img1} 
              alt="Cinemaflow - BRIX Logo" 
              className='max-w-12 md:max-w-16' style={{outline:'2px solid black',boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}
            />
            <div className='mt-3 md:mt-4'>
              <h2 className='text-base md:text-lg lg:text-lg leading-normal tracking-tight text-text-white font-medium'>
                Looking for more amazing Webflow Templates?
              </h2>
            </div>
            <div className='mt-2'>
              <p className='text-sm md:text-base text-text-gray'>
                Take a look at our collection of 100+ premium Webflow Templates at BRIX Templates.
              </p>
            </div>
            <div className='mt-4 md:mt-6'>
              <ButtonStyle onClick={() => window.open("https://www.brixtemplates.com/more-webflow-templates", "_blank")}>Browse templates</ButtonStyle>
            </div>
          </div>
        </div>

        <div
          ref={(el) => (refs.current[4] = el)}
          data-index={4}
          className={`mt-8 md:mt-12 transition-all duration-1000 ${
            visibleSections.includes(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className='flex items-center justify-center'>
            <ButtonMain onClick={() => window.open("https://webflow.com/templates/html/cinemaflow-website-template", "_blank")}>Buy template</ButtonMain>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Section;