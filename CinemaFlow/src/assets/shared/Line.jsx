import React, { useEffect, useRef, useState } from 'react';

const Line = ({ 
  height = "h-[1.5px]",
  color = "bg-[#2a2a2a]",
  className = "",
  threshold = 0.5, // متى يظهر الخط (0.5 = نصف العنصر)
  animationDuration = 0.9, // مدة الحركة بالثواني
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const lineRef = useRef(null);
  const innerLineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // عندما يصبح العنصر مرئياً
        if (entry.isIntersecting) {
          setIsVisible(true);
          // يمكنك إيقاف المراقبة بعد الظهور الأول
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: threshold, // نسبة ظهور العنصر
        rootMargin: '0px', // مسافة إضافية قبل وبعد
      }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    // تنظيف
    return () => {
      if (lineRef.current) {
        observer.unobserve(lineRef.current);
      }
    };
  }, [threshold]);

  return (
    <div 
      ref={lineRef}
      className={`
        w-full mx-auto 
        max-w-324 
        px-5 md:px-6
        ${className}
      `}
      {...props}
    >
      <div 
        ref={innerLineRef}
        className={`
          ${color} 
          ${height}
          w-full
          transform-gpu
          transition-all
          ease-out
          origin-center
        `}
        style={{
          transform: isVisible 
            ? 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)'
            : 'translate3d(0px, 0px, 0px) scale3d(0, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
          transformOrigin: 'center',
          transitionDuration: `${animationDuration}s`,
          transitionProperty: 'transform',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // Easing مخصص
        }}
      />
    </div>
  );
};

export default Line;