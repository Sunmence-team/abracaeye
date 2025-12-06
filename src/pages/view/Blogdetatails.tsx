import React, { useEffect, useState, type SyntheticEvent } from "react";
import { FaArrowLeftLong, FaHeart, FaRegCommentDots } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import BlogCard from "../../components/cards/BlogCards";
import { Link, useParams } from "react-router-dom";
import type { BlogPostProps, CommentProps } from "../../lib/sharedInterface";
import api from "../../helpers/api";
import { assets } from "../../assets/assets";
import { formatISODateToCustom } from "../../helpers/formatterUtilities";
import { shareCurrentPage } from "../../helpers/ShareFunction";

const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const Blogdetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ blogDetails, setBlogDetails ] = useState<BlogPostProps | null>(null);
  const [ relatedBlogs, setRelatedBlogs ] = useState<BlogPostProps[]>([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ comments, setComments ] = useState<CommentProps[]>([]);
  const [ newComment, setNewComment ] = useState("");
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ isLoadingComments, setisLoadingComments ] = useState(false);

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
        setRelatedBlogs(response.data.data.data)
      }

    } catch (err) {
      console.error("Failed to fetch related blogs: ", err);
    } finally {
      setIsLoading(false)
    }
  }

  const fetchComments = async () => {
    setisLoadingComments(true)
    try {
      const response = await api.get(`/blogs/${id}/comments?per_page=20`);
      if (response.status === 200) {
        setComments(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch comments: ", err);
    } finally {
      setisLoadingComments(false)
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await api.post(`/blogs/${id}/comments`, { text: newComment });
      if (response.status === 201 || response.status === 200) { 
        setNewComment("");
        fetchComments(); 
      }
    } catch (err) {
      console.error("Failed to post comment: ", err);
      // You might want to show an error to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    if (id) {
      fetchBlogDetails()
      fetchRelatedBlog()
      fetchComments()
    }
  }, [id])

  const fullImageUrl = `${IMAGE_URL}/${blogDetails?.cover_image}`;
  const defaultImageUrl = assets.news2;

  const firstName = blogDetails?.user?.name.split(" ")?.[0]
  const lastName = blogDetails?.user?.name.split(" ")?.[1]
  const userInitials = `${firstName?.split("")[0].toUpperCase()}${lastName ? lastName?.split("")[0].toUpperCase() : ''}`

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement; 
    target.onerror = null;
    target.src = defaultImageUrl;
  };

  if (isLoading && !blogDetails) { // Show loader only on initial load
    return <div className="flex justify-center items-center h-screen">
      <div className="size-15 border-4 border-dark-red rounded-full border-t-transparent animate-spin"></div>
    </div>
  }

  return (
    <div className="w-[90%] mx-auto bg-white py-10 md:mt-20 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 md:gap-10">
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
              <div className="bg-dark-red ring-2 ring-dark-red/20 w-9 h-9 rounded-full flex items-center justify-center text-white text-base p-2 font-bold">
                {userInitials}
              </div>
              <div className="flex flex-col">
                <p className="text-[15px] capitalize font-medium">{blogDetails?.user?.name}</p>
                <small className="text-gray-500">{formatISODateToCustom(blogDetails?.created_at ?? "")}</small>
              </div>
            </div>

            <div className="justify-end flex gap-3 items-center">
              <FaHeart className="text-light-red" size={20} />
              <FaRegCommentDots size={20} />
              <IoIosShareAlt 
                size={20} 
                onClick={() => shareCurrentPage(
                  blogDetails?.title
                )}
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="md:mt-30 mt-10">
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
              relatedBlogs?.map((post, index) => (
                <BlogCard
                  key={post.id+""+index}
                  {...post}
                />
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Comments Section */}
      <div className="md:w-3/4 w-full mt-10">
        <h2 className="text-xl font-bold mb-4 text-light-red">Comments ({comments?.length})</h2>

        {/* Post Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea
            className="w-full p-3 text-sm border border-gray-300 rounded-lg outline-0 resize-none focus:ring-light-red focus:border-light-red"
            rows={3}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="mt-2 text-sm px-6 py-2 bg-light-red text-white font-semibold rounded-md hover:bg-dark-red disabled:opacity-50"
            disabled={isSubmitting || !newComment.trim()}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>

        {/* Display Comments */}
        <div className="space-y-6">
          {isLoadingComments ? (
            <div className="size-8 border-4 border-dark-red rounded-full border-t-transparent animate-spin"></div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <div className="bg-dark-red w-10 h-10 rounded-full flex items-center justify-center text-white ring-2 ring-dark-red/20 font-bold">
                    {comment.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold">{comment.user.name}</p>
                    <small className="text-gray-500 text-xs">{formatISODateToCustom(comment.created_at)}</small>
                  </div>
                </div>
                <p className="text-gray-800 font-medium ms-4">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogdetails;
