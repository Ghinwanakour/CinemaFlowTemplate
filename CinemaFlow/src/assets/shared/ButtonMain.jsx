import React, { useRef, useEffect, useState } from "react";

function ButtonMain({ children, onClick, className = '' }) {
  const buttonRef = useRef(null);
  const [fillAmount, setFillAmount] = useState(1); 

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = (e) => {
      const rect = button.getBoundingClientRect();
      const enterX = e.clientX - rect.left;
      const middleX = rect.width / 2;

      const fillLayer = button.querySelector('.btn-fill');
      if (fillLayer) {
        fillLayer.style.transformOrigin = enterX < middleX ? 'right center' : 'left center';
      }

      setFillAmount(0.1);
    };

    const handleMouseLeave = (e) => {
      const rect = button.getBoundingClientRect();
      const leaveX = e.clientX - rect.left;

      const fillLayer = button.querySelector('.btn-fill');
      if (fillLayer) {
        fillLayer.style.transformOrigin = leaveX < rect.width / 2 ? 'right center' : 'left center';
      }

      setFillAmount(1);
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const fillLayer = button.querySelector('.btn-fill');
    if (fillLayer) {
      fillLayer.style.transform = `scaleX(${fillAmount})`;
    }
  }, [fillAmount]);

  return (
    <button 
      ref={buttonRef}
      className={`btn btn-primary ${className}`}
      onClick={onClick}
    >
      <span className="btn-text">{children}</span>
      <span className="btn-fill" />
    </button>
  )
}

export default ButtonMain;