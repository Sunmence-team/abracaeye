import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, } from "react-router-dom";
import type { postCardProps } from "../../lib/sharedInterface";
import { assets } from "../../assets/assets";
import PostCard from "../../components/cards/PostCard";

const Posts: React.FC = () => {
  const posts: postCardProps[] = [
    {
      image: assets.post,
      title: "The CEO of Sunmence won 3 billion Contract",
      details:
        "The ceo of sunmence, has been a warded a multi-billion contract, being an amazing time for the ceo, as he said he hjas worked hard for it",
      likesCount: 100,
      commentsCount: 103,
    },
    {
      image: assets.post,
      title: "The CEO of Sunmence won 3 billion Contract",
      details:
        "The ceo of sunmence, has been a warded a multi-billion contract, being an amazing time for the ceo, as he said he hjas worked hard for it",
      likesCount: 100,
      commentsCount: 103,
    },
    {
      image: assets.post,
      title: "The CEO of Sunmence won 3 billion Contract",
      details:
        "The ceo of sunmence, has been a warded a multi-billion contract, being an amazing time for the ceo, as he said he hjas worked hard for it",
      likesCount: 100,
      commentsCount: 103,
    },
    {
      image: assets.post,
      title: "The CEO of Sunmence won 3 billion Contract",
      details:
        "The ceo of sunmence, has been a warded a multi-billion contract, being an amazing time for the ceo, as he said he hjas worked hard for it",
      likesCount: 100,
      commentsCount: 103,
    },
  ];
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-5 justify-between">
        <Link
          to="/dashboard/add-post"
          className="flex items-center justify-center bg-white w-1/2 lg:h-[156px] rounded-md p-3 font-semibold text-base lg:text-2xl cursor-pointer shadow shadow-black/30"
        >
          <h2 className="flex flex-col lg:flex-row gap-4 items-center">
            <FaPlus className="text-light-red" />
            Add new post
          </h2>
        </Link>
        <div className="flex items-center justify-center bg-white w-1/2 lg:h-[156px] rounded-md p-3 font-semibold text-base lg:text-2xl cursor-pointer shadow shadow-black/30">
          <h2 className="flex gap-2 flex-col text-light-red items-center">
            <span className="text-black">100</span>
            Total Post
          </h2>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        {posts.map((post, idx) => (
          <div className="" key={idx}>
            <PostCard
              image={post.image}
              title={post.title}
              details={post.details}
              likesCount={post.likesCount}
              commentsCount={post.commentsCount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
