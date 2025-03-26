'use client';

import { motion } from 'framer-motion';

export default function GoogleReviews() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Travelers Say</h2>
          <p className="mt-4 text-lg text-gray-600">Read reviews from our satisfied customers</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5960964!2d77.591299!3d12.9396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15986765d7d9%3A0x357ffd235fe4b18e!2sTravel%20India!5e0!3m2!1sen!2sin!4v1648123456789!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </motion.div>

        <div className="text-center mt-12">
          <a
            href="https://g.co/kgs/LiamjfR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Reviews on Google
          </a>
        </div>
      </div>
    </div>
  );
} 