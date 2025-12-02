'use client';

import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assessts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlogCard from '../../components/cards/BlogCards';
import { useScreenSize } from '../../hook/useScreenSize';
import MobileHome from './mobile/Home';
import { useUser } from '../../context/UserContext';
import api from '../../helpers/api';
import type { BlogPostProps } from '../../lib/sharedInterface';

interface Slide {
  image: string;
  badge: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: assets.news1,
    badge: 'Top News',
    title: 'The Future is Here: New Tech Changing Everyday Life',
    description:
      'Technology is evolving faster than ever, transforming how we live, work, and connect. From AI-powered personal assistants that anticipate our needs to smart homes that adapt to our routines, innovation is no longer a glimpse into the future — it’s part of our daily lives.',
  },
  {
    image: assets.news2 || assets.news1,
    badge: 'Top News',
    title: 'Global Climate Summit Reaches Historic Agreement',
    description:
      'World leaders commit to net-zero emissions by 2050 in landmark deal. New funding and carbon credit systems to accelerate green energy transition worldwide.',
  },
  {
    image: assets.news3 || assets.news1,
    badge: 'Top News',
    title: 'AI Breakthrough: Machines Now Write Better Than Humans',
    description:
      'New language model surpasses human writers in creativity, nuance, and speed. Experts warn of job disruption but celebrate new era of human-AI collaboration.',
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isMobile } = useScreenSize();
  const [ blogs, setBlogs ] = useState<BlogPostProps[]>([])
  const [ isLoading, setIsLoading ] = useState(false)
  
  const prevSlide = () => setCurrentIndex(i => (i === 0 ? slides.length - 1 : i - 1));
  const nextSlide = () => setCurrentIndex(i => (i === slides.length - 1 ? 0 : i + 1));
  
  const { isLoggedIn, token, refreshUser } = useUser();
  
  useEffect(() => {
    if (isLoggedIn && token) {
      refreshUser(token)
    }
  }, [isLoggedIn, token])

  useEffect(() => {
    const id = setInterval(nextSlide, 3000);
    return () => clearInterval(id);
  }, []);
  
  const fetchBlogs = async () => {
    setIsLoading(true)
    try {
      const response = await api.get(`/blogs?per_page=6`, {
        headers: { "Content-Type": `application/json` },
      });

      if (response.status === 200) { 
        const { data } = response.data.data
        setBlogs(data)
      }

    } catch (err) {
      console.error("Failed to fetch blogs: ", err);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return isMobile ? (
    <MobileHome />
  ) : (
    <div className="w-full flex items-center justify-center flex-col">
      {/* Hero Carousel */}
      <div className="relative w-full lg:h-screen md:h-[80dvh] overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="min-w-full h-full relative">
              <img src={slide.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full transition-all duration-300 group z-10"
        >
          <ChevronLeft className="w-5 h-5 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full transition-all duration-300 group z-10"
        >
          <ChevronRight className="w-5 h-5 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Text */}
        <div className="absolute inset-0 flex items-end pb-8 md:pb-12">
          <div className="w-[90%] mx-auto text-white">
            <div className="w-full lg:w-[55%] md:w-3/4 flex flex-col gap-3 md:gap-4">
              <button className="bg-light-red text-white px-3 md:px-4 py-1 text-xs md:text-sm rounded-sm w-fit font-medium">
                {slides[currentIndex].badge}
              </button>
              <h1 className="font-bold text-2xl md:text-4xl leading-tight">
                {slides[currentIndex].title
                  .split('<br />')
                  .map((l, i) => (
                    <React.Fragment key={i}>
                      {l}
                      {i === 0 && <br />}
                    </React.Fragment>
                  ))}
              </h1>
              <p className="text-sm text-white/90 leading-relaxed">
                {slides[currentIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Eye News */}
      <div className="w-[90%] flex flex-col py-12">
        <p className="text-dark-red text-sm md:text-base">Recent Eye News</p>
        {
          isLoading ? (
            <div className="size-15 border-4 border-dark-red rounded-full border-t-transparent animate-spin mx-auto my-8"></div>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8">
              {blogs.map((post, i) => (
                <BlogCard
                  key={i}
                  {...post}
                />
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Home;