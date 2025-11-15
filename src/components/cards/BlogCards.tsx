import React from 'react';
import { FaHeart, FaRegCommentDots } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  authorInitials: string;
  authorName: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  image,
  title,
  excerpt,
  authorInitials,
  authorName,
}) => {
  return (
    <Link 
      to={`/blogdetails/${id}`}
      className="w-full border border-black/10 flex flex-col rounded-lg shadow-[4px_4px_4px_rgba(0,0,0,0.05)]">
      <img
        src={image}
        alt={title}
        className="w-full h-72 object-cover rounded-t-lg"
      />
      <div className="w-full p-4 flex flex-col gap-3">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm">{excerpt}</p>
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-dark-red w-6 h-6 rounded-full flex items-center justify-center text-white text-xs p-2">
              {authorInitials}
            </div>
            <p className="text-xs font-medium">{authorName}</p>
          </div>
          <div className="justify-end flex gap-3 items-center">
            <FaHeart className="text-dark-red" />
            <FaRegCommentDots />
            <IoIosShareAlt />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;