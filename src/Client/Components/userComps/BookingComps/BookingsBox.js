import React, { useContext } from "react";
import { BookingsContext } from "../../../contexts/BookingsContext";
import Cookies from "js-cookie";

export default function Bookings() {
  const {
    socket,
    bus,
    setUserSelectedSeat,
    userSelectedSeat,
    ToLocation,
    fromLocation,
    finalDate,
  } = useContext(BookingsContext);

  const busRoute = bus.routes.find(
    (route) => fromLocation === route.From && ToLocation === route.To,
  )
  const cost = busRoute.cost

  const busNumber = bus.busNumber;

  const clearSelected = () => {
    socket.emit("clearSelectedSeats", finalDate, busNumber);
    setUserSelectedSeat([]);
  };
  const bookSelected = async () => {
    // socket.emit("bookSelectedSeats",finalDate,busNumber)
    // setUserSelectedSeat([]);
    const res = await fetch('/api/bookTickets', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({ busNumber, finalDate, userToken: Cookies.get('jwtoken'), busRoute })
    });

    const data = await res.json();
    esewaCall(data.formData)
  }
  const esewaCall = (formData) => {
    if (document.getElementById("jkajgl")) {
      return window.alert("eerrroeeeeeeeer")
    }
    const form = document.createElement("form");
    form.id = "jkajgl"
    let path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    // Create hidden input fields for each key-value pair in formData
    for (let key in formData) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }
    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();

  }

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
