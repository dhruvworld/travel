'use client';

import { Phone, MessageSquare } from "lucide-react";

interface BookingFormProps {
  source: string;
  itemName: string;
  itemType: string;
}

export default function BookingForm({ source, itemName, itemType }: BookingFormProps) {
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
  );
} 