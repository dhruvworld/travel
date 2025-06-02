'use client';

import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function HotelManager() {
  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Hotel Management</h1>
      <p className="text-gray-500">
        This component will allow you to manage hotel listings.
        Implementation in progress.
      </p>
    </div>
  );
}
