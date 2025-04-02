import React from 'react';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About Us | Travel Agency',
  description: 'Learn about our travel agency and our mission to provide exceptional travel experiences.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Welcome to our travel agency! We are dedicated to providing exceptional travel experiences 
          that create lasting memories for our clients.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p>
          Our mission is to make travel accessible, enjoyable, and enriching for everyone. 
          We believe that travel broadens perspectives, creates connections, and enriches lives.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
        <p>
          Our team consists of experienced travel enthusiasts who have explored diverse corners 
          of the world. We combine our firsthand knowledge with personalized service to craft 
          the perfect itinerary for each client.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personalized travel planning tailored to your interests and budget</li>
          <li>24/7 support during your journey</li>
          <li>Exclusive access to unique experiences and accommodations</li>
          <li>Sustainable travel options that respect local communities and environments</li>
          <li>Competitive pricing and transparent booking process</li>
        </ul>
      </div>
    </div>
  );
}