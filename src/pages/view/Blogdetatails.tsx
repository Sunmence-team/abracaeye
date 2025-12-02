import React, { useEffect, useState, type SyntheticEvent } from "react";
import { FaArrowLeftLong, FaHeart, FaRegCommentDots } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import BlogCard from "../../components/cards/BlogCards";
import { Link, useParams } from "react-router-dom";
import type { BlogPostProps } from "../../lib/sharedInterface";
import api from "../../helpers/api";
import { assets } from "../../assets/assets";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Blogdetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ blogDetails, setBlogDetails ] = useState<BlogPostProps | null>(null);
  const [ relatedBlogs, setRelatedBlogs ] = useState<BlogPostProps[]>([])
  const [ isLoading, setIsLoading ] = useState(false)

  const fetchBlogDetails = async () => {
    setIsLoading(true)
    try {
      const response = await api.get(`/blogs/${id}`, {
        headers: { "Content-Type": `application/json` },
      });

      console.log("details response", response)

      if (response.status === 200) {
        setBlogDetails(response.data.data)
      }

    } catch (err) {
      console.error("Failed to fetch blogs: ", err);
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRelatedBlog = async () => {
    setIsLoading(true)
    try {
      const response = await api.get(`/blogs/${id}/related?mode=related&limit=3`, {
        headers: { "Content-Type": `application/json` },
      });

      console.log("related response", response)

      if (response.status === 200) {
        setRelatedBlogs(response.data.data)
      }

    } catch (err) {
      console.error("Failed to fetch related blogs: ", err);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchBlogDetails()
    fetchRelatedBlog()
  }, [])

  const fullImageUrl = `${API_URL}/${blogDetails?.cover_image}`;
  const defaultImageUrl = assets.news2;

  const firstName = blogDetails?.user?.name.split(" ")?.[0]
  const lastName = blogDetails?.user?.name.split(" ")?.[1]
  const userInitials = `${firstName?.split("")[0].toUpperCase()}${lastName ? lastName?.split("")[0].toUpperCase() : ''}`

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement; 
    target.onerror = null;
    target.src = defaultImageUrl;
  };

  if (isLoading) {
    <div className="size-15 border-4 border-dark-red rounded-full border-t-transparent animate-spin mx-auto my-8"></div>
  }

  return (
    <div className="w-[90%] mx-auto bg-white py-10 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT CONTENT */}
        <div className="col-span-2">
         
          <Link to={"/"} className="flex items-center gap-2 text-black mb-6">
            <FaArrowLeftLong size={20} />
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-light-red">
            {blogDetails?.title}
          </h1>

          
          <img
            src={fullImageUrl}
            alt={blogDetails?.title}
            className="w-full h-[350px] md:h-[400px] object-cover rounded-xl mt-6"
            onError={handleError}
          />

          
          <div className="mt-6 space-y-5 text-[17px] text-gray-700 leading-relaxed">
            <p className="whitespace-pre-wrap">{blogDetails?.body.content}</p>
          </div>

          
          <div className="w-full flex justify-between mt-5">
            <div className="flex items-center gap-2">
              <div className="bg-light-red w-8 h-8 rounded-full flex items-center justify-center text-white text-xs p-2 font-bold">
                {userInitials}
              </div>
              <p className="text-[15px] capitalize font-medium">{blogDetails?.user?.name}</p>
            </div>

            <div className="justify-end flex gap-3 items-center">
              <FaHeart className="text-light-red" size={20} />
              <FaRegCommentDots size={20} />
              <IoIosShareAlt size={20} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="mt-30">
          <h2 className="text-lg font-semibold mb-4 text-light-red">
            Related Eye News
          </h2>

          {/* ⭐ Clickable Blog Cards */}
          <div className="w-full flex flex-col gap-6 mt-8">
            {relatedBlogs.length === 0 ? (
              <div className="text-center">
                <img src={assets.notFound} alt="" />
                <h3 className="text-dark-red text-lg font-bold">We couldn't curate more related blogs for your reading right now</h3>
                <small className="font-medium text-gray-500">We are working on that</small>
              </div>
            ) : (
              relatedBlogs.map((post, index) => (
                <BlogCard
                  key={post.id+""+index}
                  {...post}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogdetails;
