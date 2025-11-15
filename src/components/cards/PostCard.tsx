import React from "react";
import type { postCardProps } from "../../lib/sharedInterface";
import { BsHeartFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

const PostCard: React.FC<postCardProps> = ({
  image,
  title,
  details,
  likesCount,
  commentsCount,
}) => {
  return (
    <div className="flex items-center justify-center gap-5 bg-white shadow shadow-black/30 rounded-md">
      <div className="w-1/2 h-full">
        <img
          src={image}
          alt="post-img"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-lg text-light-red font-semibold">{title}</h2>
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-light">{details}</h4>
          <div className="flex items-start gap-2">
            <div className="flex flex-col">
              <BsHeartFill className="text-pink-500" />
              <span className="text-xs font-medium">{likesCount}k</span>
            </div>
            <div className="flex flex-col">
              <FaCommentDots />
              <span className="text-xs font-medium">{commentsCount}k</span>
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
