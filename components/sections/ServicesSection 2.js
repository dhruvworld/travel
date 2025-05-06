'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServicesSection;
var lucide_react_1 = require("lucide-react");
var services = [
    {
        icon: <lucide_react_1.Globe className="w-8 h-8 text-primary"/>,
        title: 'Worldwide Tours',
        description: 'Explore iconic destinations across the globe with curated experiences.',
    },
    {
        icon: <lucide_react_1.Users className="w-8 h-8 text-primary"/>,
        title: 'Certified Guides',
        description: 'Get access to professional, multilingual local guides on all trips.',
    },
    {
        icon: <lucide_react_1.Map className="w-8 h-8 text-primary"/>,
        title: 'Custom Itineraries',
        description: 'Design your journey just the way you like it — we handle the rest.',
    },
    {
        icon: <lucide_react_1.Headphones className="w-8 h-8 text-primary"/>,
        title: '24/7 Support',
        description: 'We\'re with you at every step — before, during, and after your trip.',
    },
];
function ServicesSection() {
    return (<section className="py-20 px-6 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Travel With Us?</h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-600 text-lg">
          We go beyond just bookings — we create unforgettable experiences with personalized care.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map(function (service, idx) { return (<div key={idx} className="p-6 rounded-xl bg-gray-50 hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>); })}
        </div>
      </div>
    </section>);
}
