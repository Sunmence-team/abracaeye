import React, { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import MobileBlogCards from '../../../components/cards/MobileBlogCards';
import { X } from 'lucide-react';
import api from '../../../helpers/api';
import type { BlogPostProps, CommentProps } from '../../../lib/sharedInterface';
import { assets } from '../../../assets/assets';
import { formatISODateToCustom } from '../../../helpers/formatterUtilities';
import { BsHeartFill } from 'react-icons/bs';
import { LuLoaderCircle } from "react-icons/lu";
import { useUser } from '../../../context/UserContext';
import { Link } from 'react-router-dom';

const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const MobileHome: React.FC = () => {
  const { isLoggedIn, token } = useUser();
  const containerRef = useRef<HTMLDivElement>(null);
  const [blogs, setBlogs] = useState<BlogPostProps[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPostProps | null>(null);
  const isScrolling = useRef(false);
  const velocity = useRef(0);
  const lastScrollTop = useRef(0);
  const rafId = useRef<number | null>(null);

  // const [ isLoading, setIsLoading ] = useState(false)
  const [isLikingBlog, setisLikingBlog] = useState(false)

  const [ comments, setComments ] = useState<CommentProps[]>([]);
  const [ newComment, setNewComment ] = useState("");
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ isLoadingComments, setisLoadingComments ] = useState(false);

  const apiItemsPerPage = 10

  const fetchBlogs = async () => {
    // setIsLoading(true)
    try {
      const response = await api.get(`/blogs?per_page=${apiItemsPerPage}`, {
        headers: { "Content-Type": `application/json` },
      });

      if (response.status === 200) { 
        const { data } = response.data.data
        setBlogs(data)
      }

    } catch (err) {
      console.error("Failed to fetch blogs: ", err);
    } finally {
      // setIsLoading(false)
    }
  }

  const likeBlog = async (id: string) => {
    setisLikingBlog(true);
    try {
      const response = await api.post(
        `/blogs/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setSelectedPost(prev => {
          if (!prev) return prev;
          if (prev.id !== id) return prev;

          return {
            ...prev,
            likes_count: prev.likes_count + 1
          };
        });
      }
    } catch (err) {
      console.error("Failed to like blog: ", err);
    } finally {
      setisLikingBlog(false);
    }
  };

  // Lock body scroll when popup is open
  useEffect(() => {
    if (selectedPost !== null) {
      fetchComments()
    }
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  // Smooth snap scrolling logic (unchanged)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || selectedPost) return;

    let startY = 0;
    let startTime = 0;
    let lastY = 0;

    const snapTo = (index: number) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      const viewportHeight = container.clientHeight;
      const target = index * viewportHeight;

      container.scrollTo({
        top: target,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 400);
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
      lastY = startY;
      velocity.current = 0;
      lastScrollTop.current = container.scrollTop;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = lastY - currentY;
      lastY = currentY;
      velocity.current = deltaY / (Date.now() - startTime || 1);
    };

    const handleTouchEnd = () => {
      const deltaTime = Date.now() - startTime;
      const currentScroll = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const currentIndex = Math.round(currentScroll / viewportHeight);

      const direction = velocity.current > 0.3 ? 1 : velocity.current < -0.3 ? -1 : 0;
      let targetIndex = currentIndex;

      if (Math.abs(velocity.current) > 0.3 || deltaTime < 300) {
        targetIndex = currentIndex + direction;
      } else {
        const offset = currentScroll % viewportHeight;
        if (offset > viewportHeight * 0.3) {
          targetIndex = currentIndex + 1;
        } else if (offset < viewportHeight * 0.3) {
          targetIndex = currentIndex;
        } else {
          targetIndex = currentIndex + (currentScroll > lastScrollTop.current ? 1 : -1);
        }
      }

      targetIndex = Math.max(0, Math.min(targetIndex, blogs.length - 1));
      snapTo(targetIndex);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      const delta = e.deltaY;
      const currentScroll = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const currentIndex = Math.round(currentScroll / viewportHeight);
      const direction = delta > 0 ? 1 : -1;
      const targetIndex = Math.max(0, Math.min(currentIndex + direction, blogs.length - 1));

      snapTo(targetIndex);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [selectedPost]);

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchComments = async () => {
    setisLoadingComments(true)
    try {
      const response = await api.get(`/blogs/${selectedPost?.id}/comments?per_page=20`);
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
      const response = await api.post(`/blogs/${selectedPost?.id}/comments`, { text: newComment });
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

  const firstName = selectedPost?.user?.name.split(" ")?.[0]
  const lastName = selectedPost?.user?.name.split(" ")?.[1]
  const userInitials = `${firstName?.split("")[0].toUpperCase()}${lastName ? lastName?.split("")[0].toUpperCase() : ''}`

  const fullImageUrl = `${IMAGE_URL}/${selectedPost?.cover_image}`;
  const defaultImageUrl = assets.manFour;

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement; 
    target.onerror = null;
    target.src = defaultImageUrl;
  };

  return (
    <>
      {/* Main Scroll Container */}
      <div
        ref={containerRef}
        className="h-screen w-full overflow-y-scroll overscroll-contain will-change-transform"
        style={{
          scrollSnapType: 'y proximity',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
        }}
      >
        {blogs.map((post, idx) => (
          <section
            key={idx}
            className="h-screen snap-start"
          >
            <MobileBlogCards
              {...post}
              onClick={() => setSelectedPost(post)}
            />
          </section>
        ))}
      </div>

      {/* POPUP MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex flex-col">

          <button
            onClick={() => setSelectedPost(null)}
            className="absolute top-8 left-4  rounded-full z-10"
          >
            <X size={36} className="text-white font-bold" />
          </button>
          {/* Gray Background */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />

          {/* White Popup - 80% height from bottom */}
          <div className="relative mt-auto h-[80vh] bg-white rounded-t-4xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="h-full overflow-y-auto pb-8">
              {/* Title */}
              <div className="px-6 pt-8 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {selectedPost.title}
                </h1>
              </div>

              {/* Framed Image */}
              <div className="px-6 mb-6">
                <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={fullImageUrl}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    onError={handleError}
                  />
                </div>
              </div>

              <div className="flex items-end justify-between px-6 mb-6">
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-dark-red text-white flex items-center justify-center rounded-full p-6 font-bold">
                    {userInitials}
                  </div>
                  <div className='flex flex-col'>
                    <p className='text-dark-red italic text-[9px]'>Posted by:</p>
                    <p className='text-gray-900'>{selectedPost.user?.name}</p>
                    <p className='text-gray-900 text-[9px]'>{formatISODateToCustom(selectedPost?.created_at)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  {
                    isLikingBlog ? (
                      <LuLoaderCircle size={20} className="animate-spin text-light-red" />
                    ) : (
                      <BsHeartFill size={20} onClick={() => likeBlog(selectedPost?.id)} />
                    )
                  }
                  <span>{selectedPost?.likes_count}</span>
                </div>
              </div>

              {/* Full Content */}
              <div className="px-6">
                <div className="max-w-none text-black">
                  <p className="mb-4 leading-relaxed whitespace-pre-wrap">
                    {selectedPost?.body?.content}
                  </p>
                </div>


              </div>

              {/* Comments Section */}
              <div className="px-6 w-full mt-10">
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
                    className="mt-2 text-sm px-6 w-full py-3 bg-light-red text-white font-semibold rounded-md hover:bg-dark-red disabled:opacity-50"
                    disabled={isSubmitting || !newComment.trim()}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>
        
                {/* Display Comments */}
                <div className="space-y-6">
                  {!isLoggedIn ? (
                    <div className="flex items-center flex-col">
                      <p className="text-lg text-light-red font-semibold">What to know others take on this...?</p>
                      <Link 
                        to={"/auth/login"}
                        className="bg-dark-red text-white flex items-center justify-center px-6 h-[50px] rounded-md"
                      >Login/Create account</Link>
                    </div>
                  ) : isLoadingComments ? (
                    <div className="size-8 mx-auto border-4 border-dark-red rounded-full border-t-transparent animate-spin"></div>
                  ) : comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id} className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                          <div className="bg-dark-red w-10 h-10 rounded-full flex items-center justify-center text-white ring-2 ring-dark-red/20 font-bold">
                            {comment.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <p className="font-semibold text-sm">{comment.user.name}</p>
                            <small className="text-gray-500 text-xs">{formatISODateToCustom(comment.created_at)}</small>
                          </div>
                        </div>
                        <p className="text-gray-800 font-medium ms-2">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHome;