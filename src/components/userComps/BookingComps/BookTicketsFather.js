import React from "react";
import BookTickets from "./BookTickets";
import BookingsContextProvider from "../../../contexts/BookingsContext";

export default function BookTicketsFather() {
  return (
    <>
      <BookingsContextProvider>
        <BookTickets />
      </BookingsContextProvider>
    </>
  );
}
