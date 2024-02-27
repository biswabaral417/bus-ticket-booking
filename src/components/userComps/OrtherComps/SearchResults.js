import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchResults() {
  const { finalDate, ToLocation, fromLocation } = useLocation().state;
  const [Buses, setBuses] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const searchResFetcher = async () => {
      const res = await fetch("/api/searchbuses", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromLocation, ToLocation, finalDate }),
      }
      )
      const data = await res.json()
      setBuses(data);
    }
    searchResFetcher()

  }, [ToLocation, fromLocation, finalDate])
  const getSeats = (bus) => {
    let availableSeats = 0;
    const selectedDate = new Date(finalDate);

    bus.seatStructure.rows.forEach((row) => {
      row.seats.forEach((seat) => {
        const bookingsForDate = seat.bookings.filter((booking) => {
          const bookingDate = new Date(booking.date);
          return bookingDate.toDateString() === selectedDate.toDateString() && !booking.isOccupied;

        });

        if (bookingsForDate.length === 0) {
          availableSeats++;
        }
      });
    });

    return availableSeats;
  }
  const OpenSelSeat = (bus) => {
    navigate('/bookTickets', { replace: true, state: { finalDate, bus, fromLocation, ToLocation  } })
  }
  return (
    <>
      {Buses.map((bus) => (
        <button key={bus._id} onClick={() => OpenSelSeat(bus)} style={{ background: 'red' }}>
          <p>Agency Name : {bus.agencyName}</p>
          <p>Bus Number Plate : {bus.busNumber}</p>
          <p>Price : {bus.routes[0].cost}</p>
          <p>Departure time : {bus.routes[0].StartTime.split('.')[0].split(':')[0] <= 12 ? bus.routes[0].StartTime.split('.')[0].split(':')[0] + `:${bus.routes[0].StartTime.split('.')[0].split(':')[1]}AM` : bus.routes[0].StartTime.split('.')[0].split(':')[0] - 12 + `:${bus.routes[0].StartTime.split('.')[0].split(':')[1]}PM`}</p>
          <p>Available seats : {getSeats(bus)}</p>
        </button>
      )
      )}
    </>
  )
}
