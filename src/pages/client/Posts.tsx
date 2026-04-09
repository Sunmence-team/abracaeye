import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import type { BlogPostProps, postCardProps } from "../../lib/sharedInterface";
import PostCard from "../../components/cards/PostCard";
import { useUser } from "../../context/UserContext";
import AccessDeniedScreen from "../../components/notify/AccessDeniedScreen";
import api from "../../helpers/api";
import BlogAction from "../../components/modal/BlogAction";

const Posts: React.FC = () => {
  const { user, refreshUser, token } = useUser();
  const [posts, setPosts] = useState<postCardProps[]>([]);
  const [total, setTotal] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPostProps | null>(null);

  const fetchMyPosts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/blogs/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const { data, total } = response.data.data;
        setPosts(data);
        setTotal(total);
      }
    } catch (err) {
      console.error("Failed to fetch posts: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    refreshUser(token ?? "");
    fetchMyPosts();
  }, [token]);

  if (!user?.blog) {
    return <AccessDeniedScreen />;
  } else {
    return (
      <div className="flex flex-col gap-8 px-0.5">
        <Link
          to="/dashboard/add-post"
          className="absolute top-5 right-6 flex gap-2 items-center justify-center bg-dark-red text-white rounded-md p-3 font-semibold text-xs cursor-pointer"
        >
          <FaPlus />
          <span>Add new post</span>
        </Link>
        <h2 className="font-semibold -mt-4">
          &#40;<span className="text-light-red font-bold">{total}</span> Total
          Post&#41;
        </h2>
        {isLoading ? (
          <div className="size-15 border-4 border-dark-red rounded-full border-t-transparent animate-spin mx-auto my-8"></div>
        ) : (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {posts.map((post, idx) => (
              <div
                onClick={() => setSelectedBlog(post as BlogPostProps)}
                key={`${post.id}-${idx + 1}`}
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}

        {selectedBlog && (
          <BlogAction
            blog={selectedBlog}
            type="view"
            isOpen={Boolean(selectedBlog)}
            onClose={() => setSelectedBlog(null)}
            succesAction={() => {}}
          />
        )}
      </div>
    );
  }
};

export default Posts;
