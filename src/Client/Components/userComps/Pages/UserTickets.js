import React, { useState, useEffect } from "react";
import Ticket from "./Ticket";

export default function UserTickets() {
  const [tickets, setTickets] = useState([])
  useEffect(() => {
    const GetTickets = async () => {
      const res = await fetch("/api/userTickets", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data =await res.json()
      setTickets(data.tickets)
    }
    return () => {
      GetTickets()
    }
  }, [setTickets])

  return <div className="d_grid autofit_ticket">
    {
      tickets ?
        tickets.map((ticket) => (
          <Ticket key={ticket._id}  ticket={ticket} />
        )) : 'no tickets found'
    }

  </div>;
}
