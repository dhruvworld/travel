'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Offer {
  id: string;
  title: string;
  description: string;
}

export default function OfferManager() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/offers');
        if (!response.ok) throw new Error('Failed to fetch offers');
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
        toast.error('Failed to load offers.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/offers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete offer');
      setOffers((prev) => prev.filter((offer) => offer.id !== id));
      toast.success('Offer deleted successfully.');
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast.error('Failed to delete offer.');
    }
  };

  if (isLoading) {
    return <div>Loading offers...</div>;
  }

  return (
    <div>
      <h1>Manage Offers</h1>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            <h2>{offer.title}</h2>
            <p>{offer.description}</p>
            <button onClick={() => handleDelete(offer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
