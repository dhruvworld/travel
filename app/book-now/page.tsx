'use client';

import { Phone, MessageSquare, Home } from "lucide-react";
import Link from "next/link";
import BookingForm from './booking-form';

export default function BookNowPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const source = typeof searchParams.source === 'string' ? searchParams.source : 'general';
  const itemName = typeof searchParams.name === 'string' ? searchParams.name : '';
  const itemType = typeof searchParams.type === 'string' ? searchParams.type : '';

  // Generate appropriate WhatsApp message based on source
  const getWhatsAppMessage = () => {
    const baseMessage = "Hi Jayendra, I'm interested in ";
    
    switch(source) {
      case 'car':
        return `${baseMessage}renting a ${itemName}. Can you please provide more information about availability, pricing, and terms?`;
      case 'hotel':
        return `${baseMessage}booking a stay at ${itemName}. Could you please share details about room availability, rates, and amenities?`;
      case 'package':
        return `${baseMessage}the ${itemName} tour package. Please provide more information about the itinerary, pricing, and inclusions.`;
      default:
        return `${baseMessage}your travel services. Can you please provide more information about your offerings?`;
    }
  };

  // Generate WhatsApp URL with pre-filled message
  const whatsappUrl = `https://wa.me/919737990335?text=${encodeURIComponent(getWhatsAppMessage())}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Let's Get You Booked!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Reach out to our travel expert and confirm your {itemType || 'booking'} instantly.
        </p>

        <BookingForm 
          source={source}
          itemName={itemName}
          itemType={itemType}
        />

        <Link href="/" className="inline-flex items-center gap-2 mt-4 text-sm text-blue-600 hover:text-blue-800 transition">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </main>
  );
}
