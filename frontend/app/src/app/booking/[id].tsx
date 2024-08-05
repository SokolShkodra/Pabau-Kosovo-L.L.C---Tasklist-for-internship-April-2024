// src/app/booking/[id].tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Booking {
  id: number;
  date: string;
  start_time: string;
  doctor_name: string;
  service: string;
  end_time: string;
}

const BookingDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
console.log("test12334",id)
  useEffect(() => {
    if (!id) return;

    fetch(`http://host.docker.internal:5000/api/bookings/${id}`, {
      cache: 'no-store', mode: 'no-cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setBooking(data))
      .catch(error => {
        console.error('Error fetching booking:', error);
        setError('Failed to fetch booking details');
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Booking Details</h1>
      <p>This Booking is with {booking.doctor_name} for {booking.service} and it ends on {booking.end_time}.</p>
      <Link href="/">Back to Bookings List</Link>
    </div>
  );
};

export default BookingDetails;
