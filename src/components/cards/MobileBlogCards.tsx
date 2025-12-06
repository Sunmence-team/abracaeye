'use client';

import React, { type SyntheticEvent } from 'react';
import type { BlogPostProps } from '../../lib/sharedInterface';
import { assets } from '../../assets/assets';

const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface MobileBlogCardsProps extends BlogPostProps {
  onClick: () => void;
}

const MobileBlogCards: React.FC<MobileBlogCardsProps> = ({
  cover_image,
  title,
  body,
  onClick
}) => {
  const fullImageUrl = `${IMAGE_URL}/${cover_image}`;
  const defaultImageUrl = assets.manFour;

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement; 
    target.onerror = null;
    target.src = defaultImageUrl;
  };
  
  return (
    <button
      onClick={onClick}
      className="h-full w-full relative overflow-hidden"
    >
      <img
        src={fullImageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={handleError}
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/20 to-black" />
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-16 text-white z-10 text-left">
        <h3 className="font-semibold text-lg leading-tight mb-1">
          {title}
        </h3>
        <p className="text-sm text-white/90 leading-tight line-clamp-3">
          {body?.content}
        </p>
      </div>
    </button>
  );
};

export default MobileBlogCards;