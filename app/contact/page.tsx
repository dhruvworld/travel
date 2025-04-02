'use client';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg mb-8">
        We'd love to hear from you! Get in touch with our team for any inquiries or to start planning your dream vacation.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Reach Out</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="font-medium mr-2">Email:</span> 
              <a href="mailto:info@shuhamtravels.com" className="text-indigo-600 hover:underline">
                info@shuhamtravels.com
              </a>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Phone:</span> +91 98765 43210
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Address:</span> 
              <span>123 Travel Street, Tourism District, Mumbai, Maharashtra, India</span>
            </li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Office Hours</h2>
          <p>Monday to Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
          <p className="text-gray-600 mb-4">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}