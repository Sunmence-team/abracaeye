import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, } from "react-router-dom";
import type { postCardProps } from "../../lib/sharedInterface";
import PostCard from "../../components/cards/PostCard";
import { useUser } from "../../context/UserContext";
import AccessDeniedScreen from "../../components/notify/AccessDeniedScreen";
import api from "../../helpers/api";

const Posts: React.FC = () => {
  const { user, refreshUser, token } = useUser()
  const [ posts, setPosts ] = useState<postCardProps[]>([])
  const [ isLoading, setIsLoading ] = useState(false)

  // const posts: postCardProps[] = [
  //   {
  //     image: assets.post,
  //     title: "The CEO of Sunmence won 3 billion Contract",
  //     details:
  //       "The ceo of sunmence, has been a warded a multi-billion contract, being an amazing time for the ceo, as he said he hjas worked hard for it",
  //     likesCount: 100,
  //     commentsCount: 103,
  //   },
  //   {
  //     image: assets.post,
  //     title: "The CEO of Sunmence won 3 billion Contract",
  //     details:
  //       "The ceo of sunmence, has been a warded a multi-billion contract, being an amazing time for the ceo, as he said he hjas worked hard for it",
  //     likesCount: 100,
  //     commentsCount: 103,
  //   },
  //   {
  //     image: assets.post,
  //     title: "The CEO of Sunmence won 3 billion Contract",
  //     details:
  //       "The ceo of sunmence, has been a warded a multi-billion contract, being an amazing time for the ceo, as he said he hjas worked hard for it",
  //     likesCount: 100,
  //     commentsCount: 103,
  //   },
  //   {
  //     image: assets.post,
  //     title: "The CEO of Sunmence won 3 billion Contract",
  //     details:
  //       "The ceo of sunmence, has been a warded a multi-billion contract, being an amazing time for the ceo, as he said he hjas worked hard for it",
  //     likesCount: 100,
  //     commentsCount: 103,
  //   },
  // ];

  const fetchMyPosts = async () => {
    setIsLoading(true)
    try {
      const response = await api.get(`/blogs/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) { 
        const { data } = response.data.data
        setPosts(data)
      }

    } catch (err) {
      console.error("Failed to fetch posts: ", err);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return;

    refreshUser(token ?? "")
    fetchMyPosts()
  }, [token])

  if (!user?.blog) {
    return <AccessDeniedScreen />
  } else {
    return (
      <div className="flex flex-col gap-8 px-1">
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
        {
          isLoading ? (
            <div className="size-15 border-4 border-dark-red rounded-full border-t-transparent animate-spin mx-auto my-8"></div>
          ) : (
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              {posts.map((post, idx) => (
                <div className="" key={`${post.id}-${idx+1}`}>
                  <PostCard {...post}/>
                </div>
              ))}
            </div>
          )
        }
      </div>
    );
  }
};

export default Posts;
