import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchResults() {
  const { finalDate, ToLocation, fromLocation } = useLocation().state;
  const [Buses, setBuses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const searchResFetcher = async () => {
      const res = await fetch("/api/searchbuses", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromLocation, ToLocation, finalDate }),
      });
      const data = await res.json();
      setBuses(data);
    };
    searchResFetcher();
  }, [ToLocation, fromLocation, finalDate]);

  const OpenSelSeat = (selbus) => {
    console.log(selbus);
    navigate("/bookTickets", {
      replace: true,
      state: { finalDate, selbus, fromLocation, ToLocation },
    });
  };
  return (
    <>
      {Buses.map((bus) => (
        <button
          key={bus._id}
          onClick={() => OpenSelSeat(bus)}
          style={{ background: "red" }}
        >
          <p>Agency Name : {bus.agencyName}</p>
          <p>Bus Number Plate : {bus.busNumber}</p>
          <p>Price : {bus.routes[0].cost}</p>
          <p>
            Departure time :{" "}
            {bus.routes[0].StartTime.split(".")[0].split(":")[0] <= 12
              ? bus.routes[0].StartTime.split(".")[0].split(":")[0] +
                `:${bus.routes[0].StartTime.split(".")[0].split(":")[1]}AM`
              : bus.routes[0].StartTime.split(".")[0].split(":")[0] -
                12 +
                `:${bus.routes[0].StartTime.split(".")[0].split(":")[1]}PM`}
          </p>
          <p>
            Available seats :{" "}
            {bus.busRows * 4 - bus.bookings.seatsBooked.length}
          </p>
        </button>
      ))}
    </>
  );
}
