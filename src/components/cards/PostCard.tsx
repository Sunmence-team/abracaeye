import React, { type SyntheticEvent } from "react";
import type { postCardProps } from "../../lib/sharedInterface";
import { BsHeartFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { assets } from "../../assets/assets";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const PostCard: React.FC<postCardProps> = ({
  cover_image,
  title,
  body,
  likes_count,
  comments_count,
}) => {
  const fullImageUrl = `${API_URL}/${cover_image}`;
  const defaultImageUrl = assets.logo2;

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    // Type assertion allows access to src and onerror properties
    const target = e.target as HTMLImageElement; 
    target.onerror = null; // Prevents infinite loop
    target.src = defaultImageUrl;
  };
  return (
    <div className="flex items-start justify-between gap-4 bg-white shadow-sm shadow-black/20 rounded-md h-[145px] lg:h-[200px]">
      <div className="w-[40%] h-full">
        <img
          src={fullImageUrl}
          alt="post-img"
          className="w-full h-full object-cover rounded-md"
          onError={handleError}
        />
      </div>
      <div className="flex flex-col gap-1 lg:gap-2 p-2 lg:py-4 w-[60%] h-full">
        <div>
          <h2 className="text-xs lg:text-base text-light-red font-semibold line-clamp-2">
            {title}
          </h2>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6 h-full">
          <h4 className="text-xs lg:text-sm font-light line-clamp-3">
            {body?.content}
          </h4>
          <div className="flex items-start gap-4 text-center mt-auto">
            <div className="flex gap-2 items-center">
              <BsHeartFill size={18} className="text-light-red" />
              <span className="text-xs text-center font-medium">
                {likes_count}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <FaCommentDots size={18} />
              <span className="text-xs font-medium">{comments_count}</span>
            </div>
            <div className="">
              <FaTrashAlt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
