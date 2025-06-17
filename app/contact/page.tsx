'use client';

import { useState } from 'react';
import Script from 'next/script';

// Note: Client components can't export static metadata directly
// This will be handled by the parent layout file

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
    alert("Thank you for your message! We'll get back to you shortly.");
  };

  return (
    <>
      <Script id="contact-structured-data" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Shubham Tours",
            "description": "Get in touch with Shubham Tours in Ahmedabad to plan your dream vacation across India. We're available to answer your questions and help with bookings.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://shubhamtours.com/contact"
            },
            "mainEntity": {
              "@type": "TravelAgency",
              "name": "Shubham Tours",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "10, Yogeshwar Twin Bungalows, New Ranip",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "postalCode": "382481",
                "addressCountry": "IN"
              },
              "telephone": "+91-97379-90335",
              "email": "info@shubhamtours.com",
              "openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-16:00"
            }
          }
        `}
      </Script>
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Contact Us</h1>
        <p className="text-sm sm:text-lg mb-6 sm:mb-8">
          We'd love to hear from you! Get in touch with our team for any inquiries or to start planning your dream vacation.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Reach Out</h2>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <span className="font-medium mr-2">Email:</span> 
                <a href="mailto:info@shubhamtours.com" className="text-indigo-600 hover:underline text-sm sm:text-base">
                  info@shubhamtours.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Phone:</span> 
                <span className="text-sm sm:text-base">+91 97379 90335</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Address:</span> 
                <span className="text-sm sm:text-base">10, Yogeshwar Twin Bungalows, New Ranip, Ahmedabad, Gujarat – 382481, India.</span>
              </li>
            </ul>
            
            <h2 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">Office Hours</h2>
            <p className="text-sm sm:text-base">Monday to Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-sm sm:text-base">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-sm sm:text-base">Sunday: Closed</p>
          </div>
          
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mt-6 md:mt-0">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Send a Message</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 text-sm sm:text-base rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}