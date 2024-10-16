"use client";

import { FaYoutube, FaLinkedinIn, FaInstagram, FaArrowUp } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  return (
    <footer className="bg-[#0B3004] dark:bg-gray-800 text-white dark:text:white  pt-10 pb-12 px-5 md:pt-[146px] md:pb-[186px] md:px-[130px]">
      <div className="container mx-auto flex flex-col  md:flex-row md:space-x-10">
        
        <div className="flex flex-col w-full md:w-[50%] mb-8 md:mb-0">
          
          <div className='mb-3 text-md flex items-center'>
            <Image src="/Logo.png" alt="IRO Logo" width={64} height={64} className="" />
            <span className='ml-2 text-2xl'>IRO</span>
          </div>
          
          <div className='mb-3 cursor-pointer flex items-center hover:text-orange-400'  onClick={scrollToTop}>
            <span>Back to top</span>
            <FaArrowUp className="ml-2 h-5 w-5" />
          </div>

          <div>{currentYear}, Igire Rwanda organization</div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:w-[50%] justify-between">

          <div className="flex flex-col md:items-start mb-8 md:mb-0">
            <h3 className="mb-4 text-[18px]">Quick link</h3> 
            <ul>
              <li className="mb-3 text-sm">
                <a href="/about" className=" hover:text-orange-400">About</a>
              </li>
              <li className="mb-3 text-sm">
                <a href="/programs" className="hover:text-orange-400">Programs</a>
              </li>
              <li className="mb-3 text-sm">
                <a href="#" className="hover:text-orange-400">Contact</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-4 text-[18px]">Follow us</h3> 
            <div className="flex flex-col space-y-3">
              <div className=''>
                <a href="https://www.youtube.com/@igirerwandaorganization7651" aria-label="Youtube" className='flex flex-row gap-2 items-center hover:text-orange-400'>
                  <FaYoutube className=" text-xl " /> 
                
                <span className="text-sm ">Youtube</span>
                </a>
              </div>

              <div className=''>
                <a href="https://www.linkedin.com/company/shecancodeschool" aria-label="LinkedIn" className='flex flex-row gap-2 items-center hover:text-orange-400'>
                  <FaLinkedinIn className=" text-xl " /> 
                
                <span className="text-sm ">LinkedIn</span>
                </a>
              </div>

              <div >
                <a href="https://www.instagram.com/igire_rwanda/" aria-label="Instagram" className='flex flex-row gap-2 items-center hover:text-orange-400 '>
                  <FaInstagram className="hover:text-orange-400 text-xl " /> 
                 <span className="text-sm">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
