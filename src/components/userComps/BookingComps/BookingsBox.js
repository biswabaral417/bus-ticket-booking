import React, { useContext } from "react";
import { BookingsContext } from "../../../contexts/BookingsContext";

export default function Bookings() {
  const {
    socket,
    bus,
    setUserSelectedSeat,
    userSelectedSeat,
    ToLocation,
    fromLocation,
    finalDate,
    setBookedSeats
  } = useContext(BookingsContext);

  const cost = bus.routes.find(
    (route) => fromLocation === route.From && ToLocation === route.To,
  ).cost;

  const busNumber = bus.busNumber;

  const clearSelected = () => {
    socket.emit("clearSelectedSeats", finalDate, busNumber);
    setUserSelectedSeat([]);
  };
  const bookSelected = () => {
    socket.emit("bookSelectedSeats",finalDate,busNumber)
    setBookedSeats(prevBookedSeats=>[...prevBookedSeats,...userSelectedSeat])
    setUserSelectedSeat([]);
  };

  return (
    <div className="bookingsBox">
      <h3> No of Seats Selected : {userSelectedSeat.length}</h3>
      <h3>cost per each seat: {cost} RS</h3>
      <h3> Total Amount : {cost * userSelectedSeat.length} Rs</h3>
      <button
        className="d_block c_pointer clearSeatsButton"
        onClick={clearSelected}
      >
        Clear Selected
      </button>
      <button
        className="d_block BookSeatsButton c_pointer"
        onClick={bookSelected}
      >
        Book Selected
      </button>
    </div>
  );
}
