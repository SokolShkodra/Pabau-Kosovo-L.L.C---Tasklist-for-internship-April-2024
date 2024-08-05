// src/app/Bookings.tsx
"use client"; // This marks the component as a client component

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Booking {
  id: number;
  date: string;
  start_time: string;
  doctor_name: string;
  service: string;
  end_time: string;
}
type Props={data?:Booking[]}
const Bookings: React.FC<Props> = ({data}) => {
  const [bookings, setBookings] = useState<Booking[]>(data??[]);
  const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Fetched bookings:', data); // Check fetched data
//         setBookings(data);
//       })
//       .catch(error => {
//         console.error('Error fetching bookings:', error);
//         setError('Failed to fetch bookings');
//       });
//   }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Bookings</h1>
      <ul>
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <li key={booking.id}>
              <Link href={`/booking/${booking.id}`}>
                A Booking on {booking.date} starting at {booking.start_time}
              </Link>
            </li>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </ul>
    </div>
  );
};

export default Bookings;
