'use client';

import { Phone, MessageSquare, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function BookNowPage() {
  // Get the source and item details from URL parameters
  const searchParams = useSearchParams();
  const source = searchParams.get('source') || 'general';
  const itemName = searchParams.get('name') || '';
  const itemType = searchParams.get('type') || '';

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

        <div className="bg-blue-50 rounded-xl shadow-inner p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Jayendra Patel</h2>

          <div className="flex flex-col items-center gap-3">
            <a href="tel:+919737990335" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-lg font-medium transition">
              <Phone className="w-5 h-5" /> +91 97379 90335
            </a>

            <a 
              href={whatsappUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 hover:text-green-800 text-lg font-medium transition"
            >
              <MessageSquare className="w-5 h-5" /> WhatsApp Now
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-500">Available every day from 9:00 AM to 9:00 PM</p>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 mt-4 text-sm text-blue-600 hover:text-blue-800 transition">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </main>
  );
}
