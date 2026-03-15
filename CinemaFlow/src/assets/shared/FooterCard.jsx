import React from "react";

const FooterCard = ({ children, className }) => {
  return (
    <div className={`p-10 lg:p-16 bg-bg-darker border border-border-darker rounded-3xl ${className}`}>
      {children}
    </div>
  );
};

export default FooterCard;