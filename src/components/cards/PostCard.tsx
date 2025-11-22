import React from "react";
import type { postCardProps } from "../../lib/sharedInterface";
import { BsHeartFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { useScreenSize } from "../../hook/useScreenSize";

const PostCard: React.FC<postCardProps> = ({
  image,
  title,
  details,
  likesCount,
  commentsCount,
}) => {
  const { isMobile } = useScreenSize();
  return (
    <div className="flex items-stretch justify-between gap-5 bg-white shadow shadow-black/30 rounded-md h-[145px] lg:h-[258px]">
      <div className="w-[40%] h-full">
        <img
          src={image}
          alt="post-img"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex pb-60 flex-col gap-1 lg:gap-6 p-2 lg:p-5 w-[60%]">
        <h2 className="text-xs lg:text-lg text-light-red font-semibold">
          {isMobile
            ? `${title.slice(0, 19)}...`
            : title.length > 42
            ? `${title.slice(0, 42)}...`
            : title}
        </h2>
        <div className="flex flex-col gap-4 lg:gap-6">
          <h4 className="text-xs lg:text-sm font-light">
            {isMobile
              ? `${details.slice(0, 90)}...`
              : details.length > 137
              ? `${details.slice(0, 137)}...`
              : details}
          </h4>
          <div className="flex items-start gap-3 text-center">
            <div className="flex flex-col">
              <BsHeartFill className="text-pink-500" />
              <span className="text-xs text-center font-medium">
                {likesCount}k
              </span>
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
