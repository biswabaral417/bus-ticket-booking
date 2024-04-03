import React, { useState, useEffect } from "react";

export default function BusInformation({
  bus,
  finalDate,
  ToLocation,
  fromLocation,
}) {
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (bus&&bus.routes) {
      const foundRoute = bus.routes.find(
        (route) => fromLocation === route.From && ToLocation === route.To
      );
      if (foundRoute) {
        setStartTime(foundRoute.StartTime);
      }
    }
  }, [bus, fromLocation, ToLocation]);

  return (
    bus && (

      <div>
        <h2>Agency Name: {bus.agencyName}</h2>
        <h3>Bus Number : {bus.busNumber}</h3>
        <h3>Date : {finalDate}</h3>
        <h3>From : {fromLocation}</h3>
        <h3>To : {ToLocation}</h3>
        <h3>Departure Time : {startTime}</h3>
      </div>
    )
  );
}
