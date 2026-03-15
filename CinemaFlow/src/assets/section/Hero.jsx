import ButtonMain from '../shared/ButtonMain';
import ButtonStyle from '../shared/ButtonStyle';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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

function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const images = [
    { src: img1, alt: "Cinemaflow - Blog V1 Page" },
    { src: img2, alt: "Cinemaflow - Home V1 Page" },
    { src: img3, alt: "Cinemaflow - Home V2 Page" },
    { src: img4, alt: "Cinemaflow - Home V3 Page" },
    { src: img5, alt: "Cinemaflow - About Page" },
    { src: img6, alt: "Cinemaflow - Portfolio V1 Page" },
    { src: img7, alt: "Cinemaflow - Portfolio V2 Page" },
    { src: img8, alt: "Cinemaflow - Portfolio V3 Page" },
    { src: img9, alt: "Cinemaflow - Portfolio V4 Page" },
    { src: img10, alt: "Cinemaflow - Portfolio V5 Page" }
  ];
  const firstRowImages = images.slice(0, 5);
  const secondRowImages = images.slice(5, 10);
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visibleProgress = Math.max(0, Math.min(1, 
          (windowHeight - rect.top) / (windowHeight + rect.height)
        ));  
        const normalizedProgress = (visibleProgress * 2) - 1;
        setScrollProgress(normalizedProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getFirstRowTransform = () => {
    const moveX = -scrollProgress * 100;
    return `translateX(${moveX}px)`;
  };

  const getSecondRowTransform = () => {
    const moveX = scrollProgress * 100;
    return `translateX(${moveX}px)`;
  };

  return (
    <section 
      ref={sectionRef}
      className="mc flex flex-col items-center py-20">
      <div className="ml-auto mr-auto max-w-7xl pr-6 pl-6 w-full">
        <div className="ml-auto mr-auto max-w-7xl">
          <div className="text-center flex flex-col justify-center items-center">
            <h1 className="mt-0 mb-0 font-medium text-4xl/13 md:text-6xl/17 max-w-3xl text-text-white tracking-tight">
              Cinemaflow Webflow Template
            </h1>
            <div className="mt-2">
              <p className="mb-0 text-[17px] text-text-gray font-medium">
                Presenting Cinemaflow, the ultimate Video Agency Webflow Template.
              </p>
            </div>
            <div className="mt-6 grid-cols-1 gap-4 grid-rows-1 flex-wrap justify-center items-center flex">
              <ButtonMain onClick={() => window.open("https://webflow.com/templates/html/cinemaflow-website-template", "_blank")}>Buy template</ButtonMain>
              <ButtonStyle onClick={() => window.open("https://cinemaflowtemplate.webflow.io/#main-pages", "_blank")}>Explore pages</ButtonStyle>
            </div>
          </div>
          
          <div className='mt-12 w-full overflow-hidden md:overflow-visible'>
            <div className='flex flex-col gap-y-6 md:gap-y-6 items-center ' style={{transform: 'rotate(-4deg) skew(19deg)', opacity:'1', filter: 'blur(0)'}}>
              <div className='flex gap-4 md:gap-6 flex-nowrap justify-center transition-transform duration-300 ease-out' style={{transform: getFirstRowTransform(), transformStyle: 'preserve-3d', willChange: 'transform'}}>
                {firstRowImages.map((img, index) => (
                  <Link key={index} to="/get-started" className="text-text-white underline duration-300 border border-solid border-border-dark rounded-[10px] w-30 sm:w-37.5 md:w-50 lg:w-85 shrink-0 overflow-hidden md:overflow-visible transition-all transform-gpu preserve-3d inline-block hover:scale-95 hover:shadow-2xl hover:border-white/15">
                    <div className="overflow-hidden md:overflow-visible">
                      <img 
                        src={img.src}
                        alt={img.alt}
                        className="h-auto w-full "
                      />
                    </div>
                  </Link>
                ))}
              </div>

              <div className='flex gap-4 md:gap-6 flex-nowrap justify-center transition-transform duration-300 ease-out' style={{transform: getSecondRowTransform(), transformStyle: 'preserve-3d', willChange: 'transform'}}>
                {secondRowImages.map((img, index) => (
                  <Link key={index + 5} to="/get-started" className="text-text-white underline duration-300 border border-solid border-border-dark rounded-[10px] w-30 sm:w-37.5 md:w-50 lg:w-85 shrink-0 overflow-hidden md:overflow-visible transition-all transform-gpu preserve-3d inline-block hover:scale-95 hover:shadow-2xl hover:border-white/15">
                    <div className="overflow-hidden md:overflow-visible">
                      <img 
                        src={img.src}
                        alt={img.alt}
                        className="h-auto w-full "
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;