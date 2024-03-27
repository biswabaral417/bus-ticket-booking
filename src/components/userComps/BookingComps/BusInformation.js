import React from "react";

export default function BusInformation({
  bus,
  finalDate,
  ToLocation,
  fromLocation,
}) {
  return (
    <div>
      <h2>Agency Name: {bus.busNumber}</h2>
      <h3>Bus Number : {bus.busNumber}</h3>
      <h3>Date : {finalDate}</h3>
      <h3>From : {fromLocation}</h3>
      <h3>To : {ToLocation}</h3>
      <h3>Departure Time : {}</h3>
    </div>
  );
}
