import React, { type SyntheticEvent } from 'react';
import { FaHeart, FaRegCommentDots } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import { Link } from 'react-router-dom';
import type { BlogPostProps } from '../../lib/sharedInterface';
import { assets } from '../../assets/assessts';

const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const BlogCard: React.FC<BlogPostProps> = ({
  id,
  cover_image,
  title,
  body,
  likes_count,
  comments_count,
  user
}) => {
  const fullImageUrl = `${IMAGE_URL}/${cover_image}`;
  const defaultImageUrl = assets.logo2;

  const firstName = user?.name.split(" ")?.[0]
  const lastName = user?.name.split(" ")?.[1]
  const userInitials = `${firstName?.split("")[0].toUpperCase()}${lastName ? lastName?.split("")[0].toUpperCase() : ''}`

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement; 
    target.onerror = null;
    target.src = defaultImageUrl;
  };

  return (
    <Link 
      to={`/blogdetails/${id}`}
      className="group w-full border border-black/10 flex flex-col rounded-lg shadow-[4px_4px_4px_rgba(0,0,0,0.05)]">
      <img
        src={fullImageUrl}
        alt={title}
        className="w-full h-72 object-cover rounded-t-lg"
        onError={handleError}
      />
      <div className="w-full p-4 flex flex-col gap-1 h-full">
        <p className="font-semibold group-hover:text-light-red transition-all duration-500 text-lg line-clamp-2">{title}</p>
        <p className="text-sm line-clamp-3 mb-4">{body.content}</p>
        <div className="w-full flex justify-between gap-2 mt-auto">
          <div className="flex items-center gap-1 w-[70%]">
            <div className="bg-dark-red w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold p-2">
              {userInitials}
            </div>
            <p className="text-xs capitalize font-medium">{user?.name}</p>
          </div>
          <div className="justify-end flex gap-3 items-center">
            <div className="flex items-center gap-1">
              <FaHeart className="text-dark-red" />
              <span className='text-xs'>{likes_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegCommentDots />
              <span className='text-xs'>{comments_count}</span>
            </div>
            <IoIosShareAlt />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;