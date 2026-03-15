import React from 'react';

const CardsGrid = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-cols-fr ${className}`}>
      {children}
    </div>
  );
};

export default CardsGrid;

export const PagesGridLastRow = ({ children, className = "" }) => {
  const items = React.Children.toArray(children);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 col-span-3 ${className}`}>
      {items.map((child, index) => {
        if (index === 0) {
          return (
            <div key={index} className="lg:col-start-2 lg:col-span-2">
              {child}
            </div>
          );
        }

        if (index === 1) {
          return (
            <div key={index} className="lg:col-start-4 lg:col-span-2">
              {child}
            </div>
          );
        }

        return <div key={index}>{child}</div>;
      })}
    </div>
  );
};