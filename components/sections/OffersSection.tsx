// "use client";

// import { useEffect, useState } from "react";
// // import { getActiveOffers } from "@/lib/offer-service";

// export default function OffersSection() {
//   const [offers, setOffers] = useState([]);

//   useEffect(() => {
//     // const fetchOffers = async () => {
//     //   const data = await getActiveOffers();
//     //   setOffers(data);
//     // };

//     // fetchOffers();
//   }, []);

//   if (!offers.length) return null;

//   return (
//     <section className="py-12 px-6 bg-yellow-100 rounded-2xl shadow-md">
//       <h2 className="text-3xl font-bold mb-6 text-center">Special Offers</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {offers.map((offer) => (
//           <div key={offer.id} className="bg-white p-6 rounded-xl shadow-sm">
//             <h3 className="text-xl font-semibold">{offer.title}</h3>
//             <p className="text-gray-600">{offer.description}</p>
//             <span className="text-green-600 font-bold mt-2 block">
//               {offer.discount}% Off
//             </span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
