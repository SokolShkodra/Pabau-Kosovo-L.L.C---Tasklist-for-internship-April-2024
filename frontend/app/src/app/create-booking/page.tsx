// src/app/create-booking/page.tsx

"use client"; // Add this line to indicate this is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

const CreateBooking: React.FC = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [service, setService] = useState('');
  const router = useRouter(); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://host.docker.internal:5000/api/bookings', {
        cache: 'no-store', mode: 'no-cors',
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({
          date,
          start_time: startTime,
          end_time: endTime,
          doctor_name: doctorName,
          service
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      router.push('/'); // Redirect to the homepage
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Start Time:
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </label>
      <label>
        End Time:
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </label>
      <label>
        Doctor Name:
        <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
      </label>
      <label>
        Service:
        <input type="text" value={service} onChange={(e) => setService(e.target.value)} />
      </label>
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default CreateBooking;
