import React from 'react';

const Card = ({ 
  href = "#", 
  imageSrc, 
  imageAlt, 
  title, 
  wId, 
  style = {} 
}) => {
  return (
    <a 
      data-w-id={wId}
      style={{ opacity: 1, filter: 'blur(0px)', ...style }}
      href={href}
      className="block rounded-3xl overflow-hidden transition-all duration-300  border border-solid border-border-dark hover:border-white/15 hover:shadow-2xl hover:scale-98">
        
      <img 
        src={imageSrc}
        width="1056"
        height="1044"
        alt={imageAlt}
        srcSet={`${imageSrc.split('.')[0]}-p-500.avif 500w, ${imageSrc} 1056w`}
        sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
        className="w-full h-auto rounded-2xl object-cover"
      />
      <div className="p-8 border-t border-solid border-border-dark hover:border-white/12 hover:shadow-2xl text-center">
        <h3 className="font-family text-text-white text-[30px] leading-[1.115em] font-medium tracking-[-0.03em] m-0 ">
          {title}
        </h3>
      </div>
    </a>
  );
};

export default Card;