'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ClearAuthCookies } from './ClearAuthCookies';

export function SessionDebug() {
  const { data: session, status } = useSession();
  const [showDebug, setShowDebug] = useState(false);
  
  if (!showDebug) {
    return (
      <button 
        onClick={() => setShowDebug(true)} 
        className="text-xs text-gray-500 underline mt-2"
      >
        Show session debug
      </button>
    );
  }
  
  return (
    <div className="mt-4 border border-gray-200 rounded-md p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Session Debug</h3>
        <button 
          onClick={() => setShowDebug(false)} 
          className="text-xs text-gray-500"
        >
          Hide
        </button>
      </div>
      
      <div className="text-xs">
        <p>Status: <span className="font-semibold">{status}</span></p>
        {status === 'authenticated' ? (
          <pre className="mt-2 p-2 bg-gray-100 overflow-auto text-xs">
            {JSON.stringify(session, null, 2)}
          </pre>
        ) : null}
      </div>
      
      <div className="mt-2">
        <ClearAuthCookies />
      </div>
    </div>
  );
}
