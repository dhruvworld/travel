'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Your message has been sent! We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send your message. Please try again later.');
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 px-6 bg-white" id="contact">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to plan your next adventure? We're here to help.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-sm h-full">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Address</p>
                    <p className="text-gray-600">
                      10, Yogeshwar Twin Bungalow<br />
                      New Ranip, Ahmedabad<br />
                      Gujarat – 382481, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <PhoneIcon className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Phone</p>
                    <p className="text-gray-600">+91 97379 90335</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MailIcon className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Email</p>
                    <p className="text-gray-600">info@shuhamtours.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Business Hours</h4>
                <p className="text-gray-600 mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600 mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Send Us a Message</h3>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary'
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                      errors.message ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary'
                    }`}
                    placeholder="Tell us about your travel plans or questions..."
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
