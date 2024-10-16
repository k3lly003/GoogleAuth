'use client';

import localFont from 'next/font/local';
import './globals.css';
import Image from 'next/image';
import { useState } from 'react';

import AuthLayout from './layouts/authLayout';

import { usePathname } from 'next/navigation';
import Footer from "./footer";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path ? 'text-orange-500' : 'text-black dark:text-white';

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Check if the current path is one of the authentication pages
  const useAuthLayout = ['/login', '/resetpassword', '/otp'].includes(pathname);

  const isDashboardPage = pathname.startsWith('/dashboard' || '/dashboard/');

  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-black dark:text-white`}>
        {useAuthLayout ? (
          <AuthLayout>{children}</AuthLayout>
        ) : (
          <>
                    {!isDashboardPage && (
          <header className="sticky top-0 bg-white dark:bg-gray-800 shadow-lg z-10 flex flex-col tablet:px-4 laptop:px-[126px] laptop:py-3 tablet:py-[14px]">
            <div className="flex w-full h-73 justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="LOGO"
                  width={75}
                  height={75}
                  className="rounded-md"
                />
                <div>
                  <p className="text-lg leading-6 flex flex-col">Igire Rwanda
                    <span className="text-md"> Organization</span>
                  </p>
                </div>
              </div>

              <button 
                className={`tablet:hidden p-2 text-gray-600 dark:text-gray-300 ${menuOpen ? 'hidden' : 'block'}`}
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-controls="main-menu"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>

              <nav 
                id="main-menu"
                className={`flex flex-col tablet:flex-row laptop:gap-[75px] tablet:gap-10 text-[16px] tablet:text-[20px] ${menuOpen ? 'flex-1 block' : 'hidden'} tablet:flex tablet:flex-row`}
              >
                <a href="/" className={isActive('/')}>Home</a>
                <a href="/about" className={isActive('/about')}>About</a>
                <a href="/program" className={isActive('/program')}>Programs</a>
                <a href="/contact" className={isActive('/contact')}>Contact</a>

                <button 
                className="p-2"
                onClick={toggleDarkMode}
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <MdDarkMode/>
                ) : (
                  <MdOutlineDarkMode/>
                )}
              </button>
              </nav>
            </div>
          </header>
        )}
        {children}
        {!isDashboardPage && <Footer />}
          </>
        )}

      </body>
    </html>
  );
}
