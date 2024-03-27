import React from "react";
import { useContext } from "react";
import BusSeat from "./BusSeat";
import ExitSvg from "../../customElementsComponents/svgs/ExitSvg";
import SeatLegend from "./SeatLegend";
import BusInformation from "./BusInformation";
import Bookings from "./BookingsBox";
import { BookingsContext } from "../../../contexts/BookingsContext";

export default function BookTickets() {
  const { finalDate, bus, fromLocation, ToLocation, seatStructure } =
    useContext(BookingsContext);

  return (
    <div className="d-flx">
      <div style={{ padding: "20px" }}>
        <BusInformation
          bus={bus}
          finalDate={finalDate}
          fromLocation={fromLocation}
          ToLocation={ToLocation}
        />

        <SeatLegend />
      </div>
      <div className="  BusBorder" style={{ marginTop: "80px" }}>
        <div style={{ paddingBottom: "30px" }}>
          <ExitSvg />
        </div>
        {seatStructure.map((seat, i) => (
          <div key={`${bus._id}${i}`} className="d-flx j_Content-C">
            {seat.map((seatNo) => (
              <BusSeat
                key={`${bus._id}${seatNo}`}
                seatNumber={seatNo}
              />
            ))}
          </div>
        ))}
      </div>
      <div>{bus.routes && <Bookings />}</div>
    </div>
  );
}
