import React from 'react';

interface MobileBlogCardsProps {
  image?: string;
  title?: string;
  excerpt?: string;
  authorInitials?: string;
  authorName?: string;
}

const MobileBlogCards: React.FC<MobileBlogCardsProps> = ({
  image,
  title,
  excerpt,
  authorInitials,
  authorName,
}) => {
    return (
        <div className="h-full w-full">
            <img src={image} className="h-full w-full object-cover" />
        </div>
    );
};

export default MobileBlogCards;