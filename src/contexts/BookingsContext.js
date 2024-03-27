import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";

import { useLocation } from "react-router-dom";
export const BookingsContext = createContext(); //creating context

const BookingsContextProvider = ({ children }) => {
  const { finalDate, selbus, fromLocation, ToLocation } = useLocation().state;
  const [bus, setBus] = useState({});
  const [socket, setSocket] = useState(null);
  const [userSelectedSeat, setUserSelectedSeat] = useState([]);
  const [seatStructure, setSeatStructure] = useState([]);
  const [selectedSeats, setSelectedSeat] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  useEffect(() => {
    const newSocket = io("https://localhost:9000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
      auth: { token: Cookies.get("jwtoken") },
    });
    newSocket.emit("selectBus", { busNumber: selbus.busNumber, finalDate });
    newSocket.on("reciveBus", (sbus) => {
      setBus(sbus);
      setUserSelectedSeat(sbus.bookings.userSelected);
      setSelectedSeat(sbus.bookings.seatsSelected);
      setBookedSeats(sbus.bookings.seatsBooked);
    });
    newSocket.on("busSeatsBooked", (seatBooked) => {
        setBookedSeats((prevBooked) => [...prevBooked, ...seatBooked]);
      })
    newSocket.on("busSeatsCleared", (seatsCleared) => {
        setSelectedSeat(prevSelectedSeats => prevSelectedSeats.filter(seat => !seatsCleared.includes(seat)));
    })
    setSocket(newSocket);
    return () => {};
  }, [finalDate, selbus]);



  useEffect(() => {
    const generateSeatStructure = () => {
      const allSeats = [];
      let j = 0;
      for (let row = 1; row <= selbus.busRows; row++) {
        const seat = [];
        if (row === 1) {
          for (let i = 0; i < 3; i++) {
            if (i === 0) {
              seat.push("A1");
            } else {
              seat.push(`B${i}`);
            }
          }
        } else {
          for (let i = 0; i < 4; i++) {
            if (i === 0 || i === 1) {
              seat.push(`A${row + i + j}`);
            } else {
              seat.push(`B${row + i + j - 1}`);
            }
          }
          j++;
        }
        allSeats.push(seat);
      }
      allSeats[selbus.busRows - 1].push(`B${selbus.busRows * 2 + 1}`);
      setSeatStructure(allSeats);
    };
    generateSeatStructure();
  }, [selbus]);
  return (
    <BookingsContext.Provider
      value={{
        socket,
        bus,
        userSelectedSeat,
        setUserSelectedSeat,
        seatStructure,
        selectedSeats,
        bookedSeats,
        setBookedSeats,
        setSelectedSeat,
        finalDate,
        selbus,
        fromLocation,
        ToLocation,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};

export default BookingsContextProvider;
