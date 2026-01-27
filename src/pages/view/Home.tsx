"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "../../components/cards/BlogCards";
import { useUser } from "../../context/UserContext";
import api from "../../helpers/api";
import type { BlogPostProps } from "../../lib/sharedInterface";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";

const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { isLoggedIn, token, refreshUser } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blogs, setBlogs] = useState<BlogPostProps[]>([]);
  const [slides, setSlides] = useState<BlogPostProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const prevSlide = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  }, [slides.length]);


  useEffect(() => {
    if (isLoggedIn && token) {
      refreshUser(token);
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    if (slides.length === 0) return;

    const id = setInterval(nextSlide, 3000);
    return () => clearInterval(id);
  }, [slides.length, nextSlide]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/blogs?per_page=6`, {
        headers: { "Content-Type": `application/json` },
      });

      if (response.status === 200) {
        const { data } = response.data.data;
        setSlides(data.slice(0, 3));
        setBlogs(data);
      }
    } catch (err) {
      console.error("Failed to fetch blogs: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col">
      {/* Hero Carousel */}
      <div className="relative w-full lg:h-screen md:h-[80dvh] overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, i) => {
            const fullImageUrl = `${IMAGE_URL}/${slide.cover_image}`;
            return (
              <Link to={`/blogdetails/${slide.id}`} key={i} className="min-w-full h-full relative cursor-pointer">
                <img
                  src={fullImageUrl}
                  alt=""
                  className="w-full h-screen object-cover"
                />
                <div  className="absolute inset-0 bg-black/30 cursor-pointer" />
              </Link>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full transition-all duration-300 group z-10"
        >
          <ChevronLeft className="w-7 h-7 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full transition-all duration-300 group z-10"
        >
          <ChevronRight className="w-7 h-7 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Text */}
        <div onClick={() => navigate(`/blogdetails/${slides[currentIndex].id}`)} className="absolute inset-0 flex items-end pb-8 md:pb-12 cursor-pointer">
          <div className="w-[90%] mx-auto text-white">
            <div className="w-full lg:w-[55%] md:w-3/4 flex flex-col gap-3 md:gap-4">
              <button className="bg-light-red text-white px-3 md:px-4 py-2 text-sm md:text-sm rounded-sm w-fit font-medium">
                Top News
              </button>
              <h1 className="font-bold text-2xl md:text-4xl leading-tight line-clamp-2">
                {slides[currentIndex]?.title}
              </h1>
              <p className="text-sm line-clamp-4 text-white/90 leading-relaxed">
                {slides[currentIndex]?.body?.content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Eye News */}
      <div className="w-[90%] flex flex-col py-12">
        <div className="flex items-center justify-between">
          <p className="text-light-red text-sm md:text-xl font-semibold">
            Recent Eye News
          </p>
          <Link
            to={"/blogs"}
            className="flex items-center text-dark-red hover:border-b"
          >
            <span>View More</span>
            <MdOutlineArrowOutward />
          </Link>
        </div>

        {isLoading ? (
          <div className="size-15 border-4 border-dark-red rounded-full border-t-transparent animate-spin mx-auto my-8"></div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mt-8">
            {blogs.map((post, alade) => (
              <motion.div
                key={alade}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 2, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.6,
                  delay: alade * 0.1,
                  ease: "easeOut",
                }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
