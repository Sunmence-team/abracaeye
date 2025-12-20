import React, { useState, useEffect } from 'react'
import api from '../../helpers/api';
import BlogCard from '../../components/cards/BlogCards';
import type { BlogPostProps } from '../../lib/sharedInterface';
import { FaChevronDown } from "react-icons/fa6";

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPostProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const fetchBlogs = async (page: number) => {
    if (page === 1) setIsLoading(true);
    else setIsMoreLoading(true);

    try {
      const response = await api.get(`/blogs?per_page=6&page=${page}`);

      if (response.status === 200) {
        const { data, last_page } = response.data.data;
        
        if (page === 1) {
          setBlogs(data);
        } else {
          setBlogs(prev => [...prev, ...data]);
        }
        setLastPage(last_page);
        setCurrentPage(page);
      }
    } catch (err) {
      console.error("Failed to fetch blogs: ", err);
    } finally {
      setIsLoading(false);
      setIsMoreLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  const handleLoadMore = () => {
    if (currentPage < lastPage) {
      fetchBlogs(currentPage + 1);
    }
  };

  return (
    <div className="w-full flex items-center justify-center flex-col py-20">
      <div className="w-[90%] flex flex-col">
         <h1 className="text-3xl md:text-4xl font-bold text-dark-red mb-8">All Blogs</h1>
        
        {isLoading ? (
            <div className="size-15 border-4 border-dark-red rounded-full border-t-transparent animate-spin mx-auto my-8"></div>
        ) : (
            <>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8">
                    {blogs.map((post, i) => (
                        <BlogCard key={`${post.id}-${i}`} {...post} />
                    ))}
                </div>

                {currentPage < lastPage && (
                    <div className="flex justify-center mt-12">
                        <button 
                            onClick={handleLoadMore}
                            disabled={isMoreLoading}
                            className="flex items-center gap-2 text-dark-red font-semibold hover:gap-3 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                        >
                            {isMoreLoading ? 'Loading...' : 'View More'}
                            {!isMoreLoading && <FaChevronDown />}
                        </button>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  )
}

export default Blogs