import React, { useRef, useEffect, useState } from "react";

function ButtonStyle({ children, onClick, className = '', variant = 'secondary', isGlass = false }) {
  const buttonRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [enterDirection, setEnterDirection] = useState(null);
  const [fillAmount, setFillAmount] = useState(0);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = (e) => {
      const rect = button.getBoundingClientRect();
      const enterX = e.clientX - rect.left;
      const middleX = rect.width / 2;
      const direction = enterX < middleX ? 'right' : 'left';
      
      setEnterDirection(direction);
      setIsHovered(true);
      setFillAmount(0.97);
      
      const fillLayer = button.querySelector('.btn-fill');
      if (fillLayer) fillLayer.style.transformOrigin = direction === 'left' ? 'right center' : 'left center';
    };

    const handleMouseLeave = (e) => {
      const rect = button.getBoundingClientRect();
      const leaveX = e.clientX - rect.left;
      const exitDirection = leaveX < rect.width / 2 ? 'left' : 'right';
      
      setIsHovered(false);
      setEnterDirection(null);
      setFillAmount(0);
      setMousePosition({ x: 50, y: 50 });

      const fillLayer = button.querySelector('.btn-fill');
      if (fillLayer) fillLayer.style.transformOrigin = exitDirection === 'left' ? 'left center' : 'right center';

      const leftBg = button.querySelector('.button-bg.left');
      const rightBg = button.querySelector('.button-bg.right');
      if (leftBg && rightBg) {
        leftBg.style.transform = 'translate3d(0%, 0, 0) scale3d(1, 1, 1)';
        rightBg.style.transform = 'translate3d(0%, 0, 0) scale3d(1, 1, 1)';
      }
    };

    const handleMouseMove = (e) => {
      if (!isHovered) return;
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
      button.style.setProperty('--mouse-x', `${x}%`);
      button.style.setProperty('--mouse-y', `${y}%`);

      const leftBg = button.querySelector('.button-bg.left');
      const rightBg = button.querySelector('.button-bg.right');
      if (leftBg && rightBg) {
        const moveX = (x - 50) * 0.05;
        leftBg.style.transform = `translate3d(${moveX}%, 0, 0) scale3d(1, 1, 1)`;
        rightBg.style.transform = `translate3d(${moveX}%, 0, 0) scale3d(1, 1, 1)`;
      }
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousemove', handleMouseMove);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || !isHovered) return;

    const fillLayer = button.querySelector('.btn-fill');
    if (fillLayer && enterDirection) {
      fillLayer.style.transformOrigin = enterDirection === 'left' ? 'right center' : 'left center';
    }
  }, [mousePosition, isHovered, enterDirection]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const fillLayer = button.querySelector('.btn-fill');
    if (fillLayer) fillLayer.style.transform = `scaleX(${fillAmount})`;
  }, [fillAmount]);

  const buttonClasses = `btn ${variant === 'secondary' ? 'btn-secondary' : 'btn-primary'} ${isGlass ? 'glass' : ''} ${className}`;

  return (
    <button 
      ref={buttonRef}
      className={buttonClasses}
      onClick={onClick}
      style={{ '--mouse-x': '50%', '--mouse-y': '50%' }}
    >
      <div className="button-bg left" style={{ willChange: 'transform', transform: 'translate3d(0%, 0, 0) scale3d(1, 1, 1)', transformStyle: 'preserve-3d' }} />
      <div className="button-bg right" style={{ willChange: 'transform', transform: 'translate3d(0%, 0, 0) scale3d(1, 1, 1)', transformStyle: 'preserve-3d' }} />
      
      <span className="btn-text">{children}</span>
      <span className="btn-fill" />
    </button>
  )
}

export default ButtonStyle;