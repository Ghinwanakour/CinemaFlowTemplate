import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import img from "../image/imgf.png";
import img1 from "../image/imgf1.png";

const MoreTemplatesBadge = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationData, setAnimationData] = useState(null);

  const ANIMATION_INTERVAL = 8000;

  const badges = [
    {
      type: "next",
      href: "https://brixtemplates.com/more-webflow-templates-b",
      title: "Explore our collection of 200+",
      subtitle: "Premium Webflow Templates",
      logo: img,
      lottie:
        "https://cdn.prod.website-files.com/5e30f06b05f79621331ddc25/65dcea068e8dfd14eaed7b6f_Notification%20Dot.json",
    },
    {
      type: "customization",
      href: "https://brixtemplates.com/template-customization?utm_source=webflow&utm_medium=template&utm_campaign=badge",
      title: "Need to customize this template?",
      subtitle: "Hire our Webflow team!",
      logo: img1,
      lottie:
        "https://cdn.prod.website-files.com/5e30f06b05f79621331ddc25/65dcea068e8dfd14eaed7b6f_Notification%20Dot.json",
    },
  ];

  // تحميل Lottie
  useEffect(() => {
    fetch(badges[0].lottie)
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  // تغيير البادج كل 8 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % badges.length);
    }, ANIMATION_INTERVAL);

    return () => clearInterval(interval);
  }, [badges.length]);

  return (
    <div className="fixed bottom-15 lg:bottom-30 left-[85%] -translate-x-0.5 sm:left-auto sm:right-8 lg:right-150 xl:right-6 z-9999 flex flex-col items-end">
      {badges.map((badge, index) => {
        let className =
          "transition-all duration-700 ease-in-out transform absolute w-[85vw] max-w-56.25 sm:max-w-[320px]";

        if (index === currentIndex) {
          className += " opacity-100 translate-y-0 scale-100 z-[2]";
        } else {
          className += " opacity-0 scale-95 z-[1]";
        }

        return (
          <a
            key={index}
            href={badge.href}
            target="_blank"
            rel="noreferrer"
            className={
              className +
              " bg-white rounded-xl p-2 sm:p-4 shadow-xl flex gap-2 sm:gap-3 items-center border border-border-blue hover:scale-105"
            }
          >
            {/* Lottie */}
            {badge.lottie && animationData && (
              <div className="absolute -top-1 -right-1 lg:-top-3 lg:-right-3 w-4 h-4 sm:w-8 sm:h-8">
                <Lottie animationData={animationData} loop autoplay />
              </div>
            )}

            {/* Logo */}
            <img
              src={badge.logo}
              alt=""
              className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
            />

            {/* Text */}
            <div className="flex flex-col text-left leading-tight">
              <p className="text-[11px] sm:text-[14px] text-text-gray-1">
                {badge.title}
              </p>

              <span className="text-[10px] sm:text-xs text-text-blue underline">
                {badge.subtitle}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default MoreTemplatesBadge;