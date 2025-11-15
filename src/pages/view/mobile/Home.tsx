'use client';

import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../../../assets/assessts';
import MobileBlogCards from '../../../components/cards/MobileBlogCards';
import { X } from 'lucide-react';

interface BlogPost {
  image: string;
  title: string;
  excerpt: string;
  fullContent: string;
  authorInitials: string;
  authorName: string;
}

const blogPosts: BlogPost[] = [
  {
    image: assets.news1,
    title: 'Ronaldo Set to Marry Georgina After 2026 World Cup',
    excerpt:
      'Soccer legend Cristiano Ronaldo has confirmed that his long-time partner Georgina Rodríguez said “yes” to his proposal this August.',
    fullContent: `
      Soccer superstar Cristiano Ronaldo has officially announced his engagement to long-time partner Georgina Rodríguez. The proposal took place in August during a private ceremony in Dubai. 
      
      The couple, who have been together since 2016, share two children and are planning a grand wedding after the 2026 FIFA World Cup. Sources close to the family say Ronaldo wants to focus on his career before the big day.
      
      Georgina was seen wearing a stunning diamond ring estimated at $1.2 million. The news has sent shockwaves through the football world, with teammates and fans flooding social media with congratulations.
      
      This will be Ronaldo's second marriage. His first was to model Irina Shayk from 2010 to 2015. The Portuguese forward has won 5 Ballon d'Or awards and continues to perform at the highest level at age 40.
    `.trim(),
    authorInitials: 'JS',
    authorName: 'John Smith',
  },
  {
    image: assets.news2 || assets.news1,
    title: 'Elon Musk Announces Mars Mission Launch in 2026',
    excerpt:
      'SpaceX to send first crewed mission to Mars with reusable Starship. Historic step toward multi-planetary civilization.',
    fullContent: `
      Elon Musk has confirmed that SpaceX will launch its first crewed mission to Mars in 2026 using the fully reusable Starship spacecraft. The announcement came during a live presentation at Starbase, Texas.
      
      The mission will carry 12 astronauts and over 100 tons of cargo, including habitat modules, scientific equipment, and 3D printers for building infrastructure. The journey will take approximately 6 months.
      
      This marks humanity's first attempt at interplanetary travel. NASA has partnered with SpaceX to provide life support systems and radiation shielding technology. The crew includes scientists, engineers, and medical professionals from 8 countries.
      
      Starship has completed 15 successful test flights in 2025, achieving full reusability. The vehicle stands 120 meters tall and can carry up to 150 tons to orbit.
    `.trim(),
    authorInitials: 'AM',
    authorName: 'Alex Morgan',
  },
  {
    image: assets.news3 || assets.news1,
    title: 'New COVID Variant Detected in South Africa',
    excerpt:
      'Health officials monitor new strain with increased transmissibility. WHO calls emergency meeting to assess global risk.',
    fullContent: `
      A new COVID-19 variant, designated B.1.1.529, has been identified in South Africa with an unusually high number of mutations. Scientists are concerned about its potential to evade immunity from vaccines and previous infections.
      
      The variant contains 32 mutations in the spike protein, more than any previous strain. Early data suggests it may spread 500% faster than the Delta variant. South Africa has reported a 300% increase in cases over the past week.
      
      The World Health Organization has scheduled an emergency meeting to classify the variant. Travel restrictions are already being implemented by several countries including the UK, EU, and Japan.
      
      Vaccine manufacturers Pfizer and Moderna have begun testing updated formulations. Initial studies show current vaccines provide 60-70% protection against severe disease from this variant.
    `.trim(),
    authorInitials: 'TD',
    authorName: 'Tina Davis',
  },
  {
    image: assets.news1,
    title: 'Bitcoin Hits $100,000 Milestone for First Time',
    excerpt:
      'Cryptocurrency surges past historic mark as institutional adoption grows. Analysts predict $150K by year-end.',
    fullContent: `
      Bitcoin has officially crossed the $100,000 threshold for the first time in history, reaching a peak of $103,420 during Asian trading hours. The surge comes amid unprecedented institutional adoption.
      
      Major corporations including Tesla, MicroStrategy, and Square have added Bitcoin to their balance sheets. The US government has approved three Bitcoin ETFs, bringing in over $50 billion in investments.
      
      Mining difficulty has reached an all-time high as more computing power joins the network. Transaction fees remain elevated at $15-20 per transfer. The Lightning Network now processes over 1 million transactions daily.
      
      Analysts from JPMorgan predict Bitcoin could reach $150,000 by December 2025, citing continued institutional inflows and limited supply. Only 2.1 million BTC remain to be mined.
    `.trim(),
    authorInitials: 'MK',
    authorName: 'Mike King',
  },
  {
    image: assets.news2 || assets.news1,
    title: 'Taylor Swift Announces Surprise Album Drop',
    excerpt:
      'Pop superstar releases 11th studio album at midnight, breaking streaming records within hours.',
    fullContent: `
      Taylor Swift surprised fans worldwide by releasing her 11th studio album "Midnights" at exactly 12:00 AM EST. The 13-track record explores themes of anxiety, self-doubt, and late-night confessions.
      
      Within the first hour, the album garnered 85 million streams on Spotify, breaking the previous record held by Adele. Apple Music reported 42 million plays in the same timeframe.
      
      The lead single "Anti-Hero" debuted at #1 on the Billboard Hot 100. Music critics have praised the album's mature songwriting and 80s-inspired production. Swift co-produced every track with Jack Antonoff.
      
      Physical vinyl sales crashed retailer websites within minutes. The deluxe edition includes 7 bonus tracks and a 24-page photo booklet. This is Swift's 4th album in 18 months.
    `.trim(),
    authorInitials: 'LJ',
    authorName: 'Lisa Johnson',
  },
  {
    image: assets.news3 || assets.news1,
    title: 'Scientists Discover Water on Exoplanet K2-18b',
    excerpt:
      'James Webb Telescope confirms liquid water and organic compounds on distant world, fueling hopes of alien life.',
    fullContent: `
      The James Webb Space Telescope has detected definitive signs of liquid water and organic molecules on exoplanet K2-18b, located 120 light-years away in the constellation Leo.
      
      Spectral analysis reveals water vapor, methane, and carbon dioxide in the planet's atmosphere. The presence of dimethyl sulfide (DMS) — a compound produced only by living organisms on Earth — has sparked intense debate.
      
      K2-18b is a "super-Earth" 8.6 times more massive than our planet, orbiting in the habitable zone of a red dwarf star. Its surface temperature allows for liquid oceans beneath a hydrogen-rich atmosphere.
      
      NASA has prioritized follow-up observations. The European Space Agency plans to launch the ARIEL mission in 2029 to study exoplanet atmospheres in greater detail.
    `.trim(),
    authorInitials: 'RP',
    authorName: 'Robert Park',
  },
];

const MobileHome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const isScrolling = useRef(false);
  const velocity = useRef(0);
  const lastScrollTop = useRef(0);
  const rafId = useRef<number | null>(null);

  // Lock body scroll when popup is open
  useEffect(() => {
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

      targetIndex = Math.max(0, Math.min(targetIndex, blogPosts.length - 1));
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
      const targetIndex = Math.max(0, Math.min(currentIndex + direction, blogPosts.length - 1));

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

  return (
    <>
      {/* Main Scroll Container */}
      <div
        ref={containerRef}
        className="h-screen w-full overflow-y-auto"
        style={{
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        {blogPosts.map((post, idx) => (
          <section
            key={idx}
            className="h-screen snap-start flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
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
            className="absolute inset-0 bg-gray-500/80 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />

          {/* White Popup - 80% height from bottom */}
          <div className="relative mt-auto h-[80vh] bg-white rounded-t-4xl shadow-2xl overflow-hidden animate-slide-up">
            {/* Close Button */}


            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto pb-20">
              {/* Title */}
              <div className="px-6 pt-16 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {selectedPost.title}
                </h1>
              </div>

              {/* Framed Image */}
              <div className="px-6 mb-6">
                <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border-2 border-black">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="px-6 mb-6 flex gap-2">
                <div className="w-6 h-6 bg-dark-red text-white flex items-center justify-center rounded-full p-6 font-bold">
                  {selectedPost.authorInitials}
                </div>
                <div className='flex flex-col'>
                  <p className='text-dark-red italic text-[9px]'>Posted by:</p>
                  <p className='text-gray-900'>{selectedPost.authorName}</p>
                  <p className='text-gray-900 text-[9px]'>9 secs ago</p>
                </div>
              </div>

              {/* Full Content */}
              <div className="px-6 pb-8">
                <div className="prose prose-lg max-w-none text-gray-700">
                  {selectedPost.fullContent.split('\n').map((para, i) => (
                    <p key={i} className="mb-4 leading-relaxed">
                      {para}
                    </p>
                  ))}
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