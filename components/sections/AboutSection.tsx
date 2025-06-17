'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
<h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">About Shubham Tours</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            At Shubham Tours, we craft unforgettable journeys for passionate explorers. With years of
expertise and local insight, our mission is to offer personalized travel experiences that
            connect people to culture, adventure, and memory-making moments.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Whether you're chasing the serenity of mountains, the spirit of festivals, or a custom
            getaway — our team ensures everything is smooth, exciting, and unforgettable.
          </p>
          <p className="text-gray-600 leading-relaxed">
Founded with a passion for showcasing India's diverse beauty, Shubham Tours has grown into
a trusted name in the travel industry. Our team of experienced travel consultants work tirelessly
            to provide exceptional service and create tailor-made experiences for every client.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/about-us.jpg"
alt="Shubham Tours Team"
width={600}
              height={400}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Values Section */}
      <div className="mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core principles guide everything we do and help us deliver exceptional travel experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Customer-First Approach",
              description: "Your satisfaction and experience are our top priorities. We listen to your needs and craft journeys that exceed expectations."
            },
            {
              title: "Local Expertise",
              description: "Our deep knowledge of destinations ensures authentic experiences that showcase the true essence of each location."
            },
            {
              title: "Responsible Travel",
              description: "We're committed to sustainable practices that respect local communities and preserve natural environments."
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Journey Timeline */}
      <div className="mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            How we've grown from a small local agency to a trusted travel partner.
          </p>
        </motion.div>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-blue-300 before:sm:mx-auto before:sm:translate-x-0 sm:space-y-16">
          {[
            {
              year: "2010",
              title: "The Beginning",
description: "Shubham Tours was founded with a vision to showcase the beauty of India to travelers."
},
            {
              year: "2015",
              title: "Expanding Horizons",
              description: "Added international destinations and expanded our team of travel experts."
            },
            {
              year: "2020",
              title: "Digital Transformation",
              description: "Launched our online booking platform to serve clients more efficiently."
            },
            {
              year: "Today",
              title: "Continued Excellence",
              description: "Continually innovating and improving to deliver exceptional travel experiences."
            }
          ].map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="relative flex items-center sm:flex-row-reverse"
            >
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full border border-primary bg-white text-primary font-semibold sm:mx-auto sm:absolute sm:inset-0">
                {milestone.year}
              </div>
              <div className="sm:w-1/2 sm:pl-8 sm:pr-8 sm:ml-0 sm:mr-auto ml-6">
                <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
