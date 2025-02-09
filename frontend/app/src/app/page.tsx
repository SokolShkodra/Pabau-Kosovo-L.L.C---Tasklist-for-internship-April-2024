// src/app/page.tsx

import Link from 'next/link';
import Bookings from './Bookings';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Home: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div>
      <h1>Current booking count: {bookings.length}</h1>
      <Link href="/create-booking">Create a New Booking</Link>
      <Bookings data={bookings}/>
    </div>
  );
};

export default Home;
