'use client';

import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assessts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlogCard from '../../components/cards/BlogCards';
import { useScreenSize } from '../../hook/useScreenSize';
import MobileHome from './mobile/Home';

interface Slide {
  image: string;
  badge: string;
  title: string;
  description: string;
}

interface BlogPost {
  image: string;
  title: string;
  excerpt: string;
  authorInitials: string;
  authorName: string;
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

const blogPosts: BlogPost[] = [
  {
    image: assets.news1,
    title: 'Ronaldo Set to Marry Georgina After 2026 World Cup',
    excerpt: 'Soccer legend Cristiano Ronaldo has confirmed that his long-time partner Georgina Rodríguez said “yes” to his proposal this August.',
    authorInitials: 'JS',
    authorName: 'John Smith',
  },
  {
    image: assets.news2 || assets.news1,
    title: 'Elon Musk Announces Mars Mission Launch in 2026',
    excerpt: 'SpaceX to send first crewed mission to Mars with reusable Starship. Historic step toward multi-planetary civilization.',
    authorInitials: 'AM',
    authorName: 'Alex Morgan',
  },
  {
    image: assets.news3 || assets.news1,
    title: 'New COVID Variant Detected in South Africa',
    excerpt: 'Health officials monitor new strain with increased transmissibility. WHO calls emergency meeting to assess global risk.',
    authorInitials: 'TD',
    authorName: 'Tina Davis',
  },
  {
    image: assets.news1,
    title: 'Bitcoin Hits $100,000 Milestone for First Time',
    excerpt: 'Cryptocurrency surges past historic mark as institutional adoption grows. Analysts predict $150K by year-end.',
    authorInitials: 'MK',
    authorName: 'Mike King',
  },
  {
    image: assets.news2 || assets.news1,
    title: 'Taylor Swift Announces Surprise Album Drop',
    excerpt: 'Pop superstar releases 11th studio album at midnight. Fans flood streaming platforms, breaking records within hours.',
    authorInitials: 'LJ',
    authorName: 'Lisa Johnson',
  },
  {
    image: assets.news3 || assets.news1,
    title: 'Scientists Discover Water on Exoplanet K2-18b',
    excerpt: 'James Webb Telescope confirms liquid water and organic compounds on distant world, fueling hopes of alien life.',
    authorInitials: 'RP',
    authorName: 'Robert Park',
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { isMobile } = useScreenSize();

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    isMobile ? (
      <MobileHome />
    ) : (
      <div className="w-full flex items-center justify-center flex-col">
        {/* Hero Carousel */}
        <div className="relative w-full h-screen overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full h-full relative">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            ))}
          </div>
  
          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full transition-all duration-300 group z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform" />
          </button>
  
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full transition-all duration-300 group z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform" />
          </button>
  
          {/* Text */}
          <div className="absolute inset-0 flex items-end pb-8 md:pb-12">
            <div className="w-[90%] mx-auto text-white">
              <div className="w-full md:w-[55%] flex flex-col gap-3 md:gap-4">
                <button className="bg-light-red text-white px-3 md:px-4 py-1 text-xs md:text-sm rounded-sm w-fit font-medium">
                  {slides[currentIndex].badge}
                </button>
  
                <h1 className="font-bold text-2xl md:text-4xl leading-tight">
                  {slides[currentIndex].title.split('<br />').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
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
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8">
            {blogPosts.map((post, index) => (
              <BlogCard
                key={index}
                image={post.image}
                title={post.title}
                excerpt={post.excerpt}
                authorInitials={post.authorInitials}
                authorName={post.authorName}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Home;