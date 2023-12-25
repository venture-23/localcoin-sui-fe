'use client';

import {
  BuildingLibraryIcon,
  ChevronDoubleDownIcon,
  HeartIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const RecipientCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const items = [
    { name: 'HeartIcon', iconUrl: <HeartIcon width={48} height={48} /> }, // Replace with actual image paths
    { name: ' Library', iconUrl: <BuildingLibraryIcon width={48} height={48} /> },
    { name: 'Home', iconUrl: <HomeIcon width={48} height={48} /> }
  ];

  const handleScroll = () => {
    const scrollLeft = carouselRef.current.scrollLeft;
    const itemWidth = carouselRef.current.clientWidth;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(index);
  };

  return (
    <>
      <div className="carousel" ref={carouselRef} onScroll={handleScroll}>
        <div className="carousel-inner">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-5 mb-6 text-white rounded-lg carousel-item"
              style={{
                background: 'linear-gradient(180deg, #1384F5 0%, #4EABFE 100%)'
              }}
            >
              {item.iconUrl}
              <p className="text-lg font-semibold">{item.name}</p>
              <div className="flex items-center justify-between w-full mt-4 ">
                <p className="!m-0 font-normal">Balance</p>
                <div className="flex items-center gap-1 ">
                  <div>
                    <Image
                      alt="coin"
                      src="/coin.png"
                      width={16}
                      height={16}
                      className="!h-5 !w-4"
                    />
                  </div>{' '}
                  <p className="!m-0">120</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-indicators !mb-6">
        {items.map((_, index) => (
          <span key={index} className={index === activeIndex ? 'dot active' : 'dot'}></span>
        ))}
      </div>
    </>
  );
};

export default RecipientCarousel;