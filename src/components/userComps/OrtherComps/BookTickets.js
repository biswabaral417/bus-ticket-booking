import React, { useEffect, useState } from 'react';
import BusSeat from './BusSeat';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function BookTickets() {
    const { finalDate, bus } = useLocation().state;
    const [selBus, setSelBus] = useState(bus);
    const [socket, setSocket] = useState(null);
    const [selectedSeat,SetSelectedSeat]=useState([])
    useEffect(() => {
        const newSocket = io('https://localhost:3000', {
            withCredentials: true,
            transports: ["websocket", "polling"],
        });

        newSocket.on('busUpdate', (updatedBus) => {
            setSelBus(updatedBus)
            console.log(updatedBus)
            console.log(finalDate)
        });
        setSocket(newSocket);

        // Cleanup the socket connection on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, [finalDate]);

  
    const seatClick = (e,{ seatNumber, finalDate, selBus }) => {
        console.log('click')
        console.log(selBus)
        const isnotAvailabe = selBus.seatStructure.rows
        .flatMap(row => row.seats)
        .some(seat => 
            seat.seatNumber === seatNumber &&
            seat.bookings.some(booking => 
                booking.date.split("T")[0] === finalDate.toISOString().split("T")[0]
            )
        );    

        console.log(isnotAvailabe)   
        if (isnotAvailabe) {
            return
        }
        socket.emit('seat-clicked', seatNumber, finalDate, selBus)
        SetSelectedSeat(prevSelectedSeats=>[...prevSelectedSeats,seatNumber])
        e.target.closest("svg").classList.add("selected")
    }
    const isSelected=(sn)=>{
        if (selectedSeat.includes(sn)) {
            return true
        }
        else{
            return false
        }
    }
    return (
        <div className='d-flx flx_column' style={{ width: 'fit-content' }}>
            {selBus.seatStructure.rows.map((row) => (
                <div key={row._id} className='d-flx' style={{ justifyContent: 'space-between' }}>
                    <div className='d-flx'>
                        {row.seats
                            .filter((seat) => seat.seatNumber.startsWith('A'))
                            .map((seat) => (
                                <BusSeat key={seat._id} isSelected={isSelected} selBus={selBus} seatNumber={seat.seatNumber} seatClick={seatClick} bookings={seat.bookings} finalDate={finalDate} />
                            ))}
                    </div>
                    <div className='d-flx' style={{ marginRight: "0" }}>
                        {row.seats
                            .filter((seat) => seat.seatNumber.startsWith('B'))
                            .map((seat) => (
                                <BusSeat key={seat._id} isSelected={isSelected} selBus={selBus} seatNumber={seat.seatNumber} seatClick={seatClick} bookings={seat.bookings} finalDate={finalDate} />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
