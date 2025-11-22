'use client';

import React from 'react';

interface MobileBlogCardsProps {
  image: string;
  title: string;
  excerpt: string;
  authorInitials: string;
  authorName: string;
  onClick: () => void;
}

const MobileBlogCards: React.FC<MobileBlogCardsProps> = ({
  image,
  title,
  excerpt,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="h-full w-full relative overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-24 text-white z-10 text-left">
        <h3 className="font-semibold text-lg leading-tight mb-1">
          {title}
        </h3>
        <p className="text-sm text-white/90 leading-tight line-clamp-3">
          {excerpt}
        </p>
      </div>
    </button>
  );
};

export default MobileBlogCards;