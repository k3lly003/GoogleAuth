import React from 'react';
import '../globals.css';

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <main className="p-8  text-black">
          {children}
        </main>
    
      </body>
    </html>
  );
}
