'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { ClearAuthCookies } from '@/components/auth/ClearAuthCookies';
import { useState } from 'react';

export default function AuthDebugPage() {
  const { data: session, status } = useSession();
  const [cookies, setCookies] = useState<string[]>([]);

  const showCookies = () => {
    const allCookies = document.cookie.split(';')
      .map(cookie => cookie.trim())
      .filter(cookie => cookie.startsWith('next-auth'));
    
    setCookies(allCookies);
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Page</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Session Status: <span className="font-mono">{status}</span></h2>
        
        {status === 'authenticated' ? (
          <div>
            <p className="text-green-600 mb-2">✓ You are authenticated</p>
            <pre className="bg-gray-800 text-green-400 p-3 rounded overflow-auto text-sm">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        ) : status === 'loading' ? (
          <p>Loading session...</p>
        ) : (
          <p className="text-red-600">✗ You are not authenticated</p>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <button 
          onClick={() => signIn()} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
        
        <button 
          onClick={() => signOut()} 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
        
        <button 
          onClick={showCookies} 
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Show Auth Cookies
        </button>
      </div>
      
      {cookies.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">NextAuth Cookies:</h2>
          <ul className="bg-gray-800 text-green-400 p-3 rounded overflow-auto text-sm">
            {cookies.map((cookie, i) => (
              <li key={i}>{cookie}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-4">
        <ClearAuthCookies />
        <p className="text-sm text-gray-500 mt-2">
          If you&apos;re experiencing auth issues, try clearing the cookies and signing in again.
        </p>
      </div>
    </div>
  );
}
