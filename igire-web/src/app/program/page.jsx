"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Programs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sheCanCodeGallery = [
    { src: '/awe9 2.png', alt: 'Event 1' },
    { src: '/Rectangle 53.png', alt: 'Event 2' },
    { src: '/awe 1.png', alt: 'Event 3' },
  ];

  const aweGallery = [
    { src: '/awe9 2.png', alt: 'Event 1' },
    { src: '/awe 1.png', alt: 'Event 2' },
    { src: '/Rectangle 53.png', alt: 'Event 3' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sheCanCodeGallery.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [sheCanCodeGallery.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="px-[134px] py-12 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-[24px] font-bold text-center mb-8">Programs</h1>
      <div className="bg-white dark:bg-gray-800">
        <p className="text-[18px] font-bold mb-4">ShecanCODE Program</p>
        <Image
          src="/Rectangle 53.png"
          alt="Graduation"
          width={1160}
          height={530}
          className="w-full h-auto mb-8"
        />

        <div className="text-center text-[18px] mb-8">
          <p className="text-orange-400 dark:text-orange-300 mb-4">
            We empower girls and women to solve community problems through entrepreneurial trainings.
          </p>
          <div className="py-8 border-l-2 border-black dark:border-white">
            <p className="px-4 md:px-12 lg:px-24">
            
iii Nulla non sapien vitae orci porttitor tristique. Vesti,mhklvbulum consequat felis pharetra egestas sagittis. Morbi gravida magna fringilla elit convallis facilisis. Sed id congue risus. Sed at dolor id nisi elementum condimentum. Nuljnylam vehicula
iii Nulla non sapien vitae orci porttitor tristique. Vesti,mhklvbulum consequat felis pharetra egestas sagittis. Morbi gravida magna fringilla elit convallis facilisis. Sed id congue risus. Sed at dolor id nisi elementum condimentum. Nuljnylam vehicula 
iii Nulla non sapien vitae orci porttitor tristique. Vesti,mhklvbulum consequat felis pharetra egestas sagittis. Morbi gravida magna fringilla elit convallis facilisis. Sed id congue risus. Sed at dolor id nisi elementum condimentum. Nuljnylam vehicula </p>
          </div>
        </div>

        <div className="text-center">
          <p className="font-bold text-[18px]">ShecanCODE gallery</p>
          <div className="relative sm:px-0 md:px-[50px] lg:px-[100px] flex flex-col items-center py-[30px]">
            <div className="w-full px-2 mb-4">
              <Image
                src={sheCanCodeGallery[currentSlide].src}
                alt={sheCanCodeGallery[currentSlide].alt}
                width={1000}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex justify-center space-x-2 mt-4">
              {sheCanCodeGallery.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                    index === currentSlide ? 'bg-gray-500 dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text py-12">
          <p className="text-[18px] font-bold pb-4">A.W.E Program <span className='text-gray-500 dark:text-gray-400'>( Academy for Women Entrepreneurs / Rwanda )</span></p>
          <Image
            src="/awe 1.png"
            alt="Graduation"
            width={1160}
            height={530}
            className="w-full h-auto mb-8"
          />
          <div className="text-center text-[18px]">
            <p className="text-orange-400 dark:text-orange-300 mb-4">
              We empower girls and women to solve community problems through entrepreneurial trainings.
            </p>
            <div className="py-8 border-l-2 border-black dark:border-white">
              <p className="px-4 md:px-12 lg:px-24">
             
iii Nulla non sapien vitae orci porttitor tristique. Vesti,mhklvbulum consequat felis pharetra egestas sagittis. Morbi gravida magna fringilla elit convallis facilisis. Sed id congue risus. Sed at dolor id nisi elementum condimentum. Nuljnylam vehicula
iii Nulla non sapien vitae orci porttitor tristique. Vesti,mhklvbulum consequat felis pharetra egestas sagittis. Morbi gravida magna fringilla elit convallis facilisis. Sed id congue risus. Sed at dolor id nisi elementum condimentum. Nuljnylam vehicula 
iii Nulla non sapien vitae orci porttitor tristique. Vesti,mhklvbulum consequat felis pharetra egestas sagittis. Morbi gravida magna fringilla elit convallis facilisis. Sed id congue risus. Sed at dolor id nisi elementum condimentum. Nuljnylam vehicula </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="font-bold text-[18px]">A.W.E gallery</p>
          <div className="relative flex flex-col items-center py-[30px] sm:px-0 md:px-[50px] lg:px-[100px]">
            <div className="w-full px-2 mb-4">
              <Image
                src={aweGallery[currentSlide].src}
                alt={aweGallery[currentSlide].alt}
                width={1000}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex justify-center space-x-2 mt-4">
              {aweGallery.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                    index === currentSlide ? 'bg-gray-500 dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
