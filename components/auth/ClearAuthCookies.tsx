'use client';

import { useRouter } from 'next/navigation';

export function ClearAuthCookies() {
  const router = useRouter();

  const clearCookies = () => {
    // Get all cookies
    const cookies = document.cookie.split(";");
    
    // Filter for NextAuth cookies and delete them
    cookies.forEach(cookie => {
      // NextAuth cookies typically start with next-auth
      if (cookie.trim().startsWith("next-auth")) {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
    
    // Refresh the page
    router.refresh();
  };

  return (
    <button 
      onClick={clearCookies} 
      className="text-xs text-red-600 hover:text-red-800 underline mt-2"
    >
      Clear auth cookies
    </button>
  );
}
