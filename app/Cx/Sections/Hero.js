'use client';

import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ptSerif } from '../Font/font';

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);

  // Video data with different text content
  const videos = [
    {
      src: '/vid1.mp4',
      leftText: 'NEW ARRIVALS',
      centerText: 'ABAYA',
      rightText: 'WINTER 25/26'
    },
    {
      src: '/vid2.mp4',
      leftText: 'COLLECTION',
      centerText: 'ELEGANCE',
      rightText: 'SUMMER 25/26'
    },
    {
      src: '/vid4.mp4',
      leftText: 'LUXURY',
      centerText: 'STYLE',
      rightText: 'AUTUMN 25/26'
    },
    {
      src: '/vid5.mp4',
      leftText: 'TAILORED',
      centerText: 'PERFECTION',
      rightText: 'CRAFTED 25/26'
    }
  ];

  const currentVideo = videos[currentVideoIndex];

  // Handle video change
  const changeVideo = (direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (direction === 'next') {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    } else {
      setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  // Handle scroll down to next video
  useEffect(() => {
    let scrollTimeout;
    let isScrolling = false;

    const handleWheel = (e) => {
      if (isScrolling || isTransitioning) return;

      // Only handle scroll down
      if (e.deltaY > 0) {
        isScrolling = true;
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 700);
        
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      if (section) {
        section.removeEventListener('wheel', handleWheel);
      }
      clearTimeout(scrollTimeout);
    };
  }, [isTransitioning, videos.length]);

  // Play current video when it changes and refresh AOS
  useEffect(() => {
    const currentVideoElement = videoRefs.current[currentVideoIndex];
    if (currentVideoElement) {
      currentVideoElement.play().catch(() => {
        // Auto-play might fail, but that's okay
      });
    }
    
    // Refresh AOS animations when video changes
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [currentVideoIndex]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Backgrounds */}
      {videos.map((video, index) => {
        const isCurrent = index === currentVideoIndex;
        const isNext = index === (currentVideoIndex + 1) % videos.length;
        const isPrev = index === (currentVideoIndex - 1 + videos.length) % videos.length;
        
        let transformClass = '';
        if (isCurrent) {
          transformClass = 'translate-y-0';
        } else if (isNext) {
          transformClass = 'translate-y-full';
        } else {
          transformClass = '-translate-y-full';
        }
        
        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full z-0 transition-transform duration-700 ease-in-out ${transformClass}`}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        );
      })}

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Text Overlays */}
        <div className="flex flex-col items-center space-y-8">
          {/* Left Text */}
          <div 
            key={`left-${currentVideoIndex}`}
            data-aos="fade-right"
            className="text-white text-lg sm:text-xl md:text-2xl font-light tracking-wider transition-transform duration-700"
          >
            {currentVideo.leftText}
          </div>

          {/* Center Main Text */}
          <h1 
            key={`center-${currentVideoIndex}`}
            data-aos="fade-up"
            data-aos-delay="200"
            className={`${ptSerif.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white transition-transform duration-700`}
            style={{ fontWeight: 700 }}
          >
            {currentVideo.centerText}
          </h1>

          {/* Right Text */}
          <div 
            key={`right-${currentVideoIndex}`}
            data-aos="fade-left"
            data-aos-delay="400"
            className="text-white text-lg sm:text-xl md:text-2xl font-light tracking-wider transition-transform duration-700"
          >
            {currentVideo.rightText}
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Positioned at screen edges */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => changeVideo('prev')}
          className="text-white hover:text-gray-300 transition-colors duration-200 p-4"
          aria-label="Previous"
        >
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => changeVideo('next')}
          className="text-white hover:text-gray-300 transition-colors duration-200 p-4"
          aria-label="Next"
        >
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Hero
