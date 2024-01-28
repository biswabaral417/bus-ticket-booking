import React from 'react';
import BusSeat from './BusSeat';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function BookTickets() {
    const { finalDate, ToLocation, fromLocation, bus } = useLocation().state;
    console.log({ finalDate, ToLocation, fromLocation, bus });
    const socket = io('https://localhost:3000', {
        withCredentials: true,
        transports: ["websocket", "polling"],
    })
    return (
        <div className='d-flx flx_column' style={{ width: 'fit-content' }}>
            {bus.seatStructure.rows.map((row) => (
                <div key={row._id} className='d-flx' style={{ justifyContent: 'space-between' }}>
                    <div className='d-flx'>
                        {row.seats
                            .filter((seat) => seat.seatNumber.startsWith('A'))
                            .map((seat) => (
                                <BusSeat key={seat._id} seatNumber={seat.seatNumber} bookings={seat.bookings} finalDate={finalDate} />
                            ))}
                    </div>
                    <div className='d-flx' style={{ marginRight: "0" }}>
                        {row.seats
                            .filter((seat) => seat.seatNumber.startsWith('B'))
                            .map((seat) => (
                                <BusSeat key={seat._id} seatNumber={seat.seatNumber} bookings={seat.bookings} finalDate={finalDate} />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
