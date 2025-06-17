import React from 'react';

const faqs = [
  {
    question: 'What services does Shubham Tours offer?',
    answer: 'Shubham Tours offers a wide range of travel services including India tour packages, custom tours, car rentals, hotel bookings, and adventure holidays. We are based in Ahmedabad and serve clients across India.'
  },
  {
    question: 'Is Shubham Tours the same as Shubham Travels?',
    answer: 'Yes, many people search for us as Shubham Travels, but our official name is Shubham Tours. We are a leading travel agency in Ahmedabad, Gujarat.'
  },
  {
    question: 'How can I book a tour package with Shubham Tours?',
    answer: 'You can book a tour package online through our website, call us at +91-97379-90335, or visit our office in New Ranip, Ahmedabad.'
  },
  {
    question: 'Does Shubham Tours provide customized travel packages?',
    answer: 'Absolutely! Shubham Tours specializes in custom and personalized travel experiences across India. Contact us to plan your perfect trip.'
  },
  {
    question: 'Why should I choose Shubham Tours in Ahmedabad?',
    answer: 'Shubham Tours is trusted by thousands of travelers for our local expertise, personalized service, and best-value packages. We are a government-registered travel agency based in Ahmedabad.'
  },
  {
    question: 'Which destinations are most popular with Shubham Tours?',
    answer: 'Our most popular destinations include Ladakh, Manali, Goa, Kerala, Rajasthan, and the Golden Triangle. We also offer tours across all of India.'
  }
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqs.map(faq => ({
    '@type': 'Question',
    'name': faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.answer
    }
  }))
};

export default function FAQSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 