import React from 'react';

const ExampleCarouselImage = ({ text, src, alt }) => {
  return (
    <img
      className="d-block w-100"
      src={src || `holder.js/800x400?text=${text}&bg=f5f5f5`}
      alt={alt || text}
    />
  );
};

export default ExampleCarouselImage;