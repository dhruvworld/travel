import React from 'react';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About Us | Travel Agency',
  description: 'Learn about our travel agency and our mission to provide exceptional travel experiences.',
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to Shuham Tours & Travels! We are dedicated to providing exceptional travel experiences throughout India.
      </p>
      <p className="text-lg mb-4">
        With over a decade of experience in the travel industry, we specialize in creating personalized itineraries that showcase the best of India's diverse landscapes, rich cultural heritage, and unforgettable experiences.
      </p>
      <p className="text-lg mb-6">
        Our team of travel experts has extensive knowledge of the most beautiful and authentic destinations across the country, ensuring that your journey with us will be both memorable and comfortable.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
      <p className="text-lg mb-8">
        To provide travelers with authentic, enriching experiences that connect them with India's diverse cultures, landscapes, and traditions while ensuring the highest standards of service and sustainability.
      </p>
    </main>
  );
}