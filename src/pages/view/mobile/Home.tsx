import React, { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import MobileBlogCards from '../../../components/cards/MobileBlogCards';
import { Search, ShoppingBag, X } from 'lucide-react';
import api from '../../../helpers/api';
import type { BlogPostProps, CommentProps } from '../../../lib/sharedInterface';
import { assets } from '../../../assets/assets';
import { formatISODateToCustom } from '../../../helpers/formatterUtilities';
import { BsHeartFill } from 'react-icons/bs';
import { LuLoaderCircle } from "react-icons/lu";
import { useUser } from '../../../context/UserContext';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';

const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const MobileHome: React.FC = () => {
  const { isLoggedIn, user, token, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [blogs, setBlogs] = useState<BlogPostProps[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPostProps | null>(null);
  
  const [isLikingBlog, setisLikingBlog] = useState(false)

  const [ comments, setComments ] = useState<CommentProps[]>([]);
  const [ newComment, setNewComment ] = useState("");
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ isLoadingComments, setisLoadingComments ] = useState(false);

  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const currentIndexRef = useRef(0);
  const [isOnLastSlide, setIsOnLastSlide] = useState(false);

  const apiItemsPerPage = 5

  const fetchBlogs = async (pageToFetch = 1) => {
    if (isFetchingNext) return;

    setIsFetchingNext(true);

    try {
      const response = await api.get(
        `/blogs?per_page=${apiItemsPerPage}&page=${pageToFetch}`,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const { data, last_page } = response.data.data;

        setBlogs(prev =>
          pageToFetch === 1 ? data : [...prev, ...data]
        );

        data.forEach((post: BlogPostProps) => {
          const img = new Image();
          img.src = `${IMAGE_URL}/${post.cover_image}`;
        });

        setLastPage(last_page);
        setPage(pageToFetch);
      }
    } catch (err) {
      console.error("Failed to fetch blogs: ", err);
    } finally {
      setIsFetchingNext(false);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {

            const target = entry.target as HTMLElement;
            const index = Number(target.dataset.index);

            currentIndexRef.current = index;

            const isLastSlide =
              page === lastPage &&
              index === blogs.length - 1;

            setIsOnLastSlide(isLastSlide);
            
            const PREFETCH_OFFSET = 2;

            if (
              index >= blogs.length - PREFETCH_OFFSET &&
              !isFetchingNext &&
              lastPage &&
              page < lastPage
            ) {
              fetchBlogs(page + 1);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6, // perfect for snap
      }
    );

    slideRefs.current.forEach(el => el && observer.observe(el));

    return () => observer.disconnect();
  }, [blogs, page, lastPage]);

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

  useEffect(() => {
    fetchBlogs(1)
  }, [])

  const fetchComments = async () => {
    setisLoadingComments(true)
    try {
      const response = await api.get(`/blogs/${selectedPost?.id}/comments?per_page=20`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
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
      const response = await api.post(`/blogs/${selectedPost?.id}/comments`, { text: newComment }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
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

  const userFirstName = user?.name?.split(" ")?.[0]
  const userLastName = user?.name?.split(" ")?.[1]
  const userInitials = `${userFirstName?.split("")?.[0].toUpperCase() ?? "0"}${userLastName ? userLastName?.split("")?.[0].toUpperCase() ?? "0" : ''}`
  
  const blogAuthorFirstName = selectedPost?.user?.name?.split(" ")?.[0]
  const blogAuthorLastName = selectedPost?.user?.name?.split(" ")?.[1]
  const blogAuthorInitials = `${blogAuthorFirstName?.split("")?.[0].toUpperCase() ?? "0"}${blogAuthorLastName ? blogAuthorLastName?.split("")?.[0].toUpperCase() ?? "0" : ''}`

  const fullImageUrl = `${IMAGE_URL}/${selectedPost?.cover_image}`;
  const defaultImageUrl = assets.manFour;

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement; 
    target.onerror = null;
    target.src = defaultImageUrl;
  };

  return (
    <>
      <nav className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-50">
        {/* Logo Left */}
        <div className="shrink-0">
          <img src={assets.logo2} className="w-10" alt="Logo" />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button className="rounded-full hover:bg-gray-100 transition-colors">
            <Search size={22} className="text-dark-red" />
          </button>

          {/* Marketplace */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ShoppingBag size={22} className="text-dark-red" />
          </button>

          {!isLoggedIn ? (
            <Link
              to="/auth/login"
              title="Log In"
              className='cursor-pointer text-gray-700 hover:text-dark-red'
            >
              <FaRegUserCircle size={20} />
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-9 h-9 rounded-full bg-dark-red text-white flex items-center justify-center text-sm font-semibold ring-2 ring-dark-red/20 cursor-pointer outline-none"
              >
                {userInitials}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 border border-gray-100 z-60">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main Scroll Container */}
      <div
        ref={containerRef}
        className="h-screen w-full overflow-y-scroll overscroll-contain will-change-transform"
        style={{
          scrollSnapType: 'y proximity',
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {blogs.map((post, idx) => (
          <section
            key={post.id ?? idx}
            ref={(el) => {
              slideRefs.current[idx] = el;
            }}
            data-index={idx}
            className="h-[98vh] snap-start"
          >
            <MobileBlogCards
              {...post}
              onClick={() => setSelectedPost(post)}
            />
          </section>
        ))}
        {isOnLastSlide && (
          <div className="h-screen flex items-center justify-center bg-dark-red text-white text-sm px-4 text-center snap-start">
            No more content. We are working to bring you more juicy updates 💛
          </div>
        )}
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
                    {blogAuthorInitials}
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
                <div className="">
                  {!isLoggedIn ? (
                    <div className="flex items-center flex-col gap-2">
                      <p className="text-2xl text-center text-light-red font-bold">What to know others take on this...?</p>
                      <Link 
                        to={"/auth/login"}
                        className="bg-dark-red text-white flex items-center justify-center px-6 h-[50px] rounded-md"
                      >Login/Create account</Link>
                    </div>
                  ) : isLoadingComments ? (
                    <div className="size-8 mx-auto border-4 border-dark-red rounded-full border-t-transparent animate-spin"></div>
                  ) : comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id} className="flex flex-col gap-1 border-b last:border-0 border-gray-400 pb-2 mb-3">
                        <div className="flex gap-2 items-center">
                          <div className="bg-dark-red text-sm w-8 h-8 rounded-full flex items-center justify-center text-white ring-2 ring-dark-red/20 font-semibold">
                            {comment.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <p className="font-semibold text-xs">{comment.user.name}</p>
                            <small className="text-gray-500 text-[10px]">{formatISODateToCustom(comment.created_at)}</small>
                          </div>
                        </div>
                        <p className="text-gray-800 text-base font-medium ms-1">{comment.text}</p>
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