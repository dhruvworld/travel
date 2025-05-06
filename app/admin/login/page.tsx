// app/admin/login/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
  const [key, setKey] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (key === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      localStorage.setItem('adminKey', key);
      router.push('/admin');
    } else {
      alert('Invalid key');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input
        type="password"
        placeholder="Enter Admin Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="border border-gray-300 px-4 py-2 mb-4 rounded"
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}
