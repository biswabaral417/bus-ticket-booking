import React, { useEffect, useState } from 'react';
import BusSeat from './BusSeat';
import { useLocation } from 'react-router-dom';

import Cookies from 'js-cookie'
import { io } from 'socket.io-client';



export default function BookTickets() {
    const { finalDate, bus, } = useLocation().state;
    const [selBus, setSelBus] = useState(bus);
    const [socket, setSocket] = useState(null);
    
    const [selectedSeat, SetSelectedSeat] = useState(selBus.bookings.userSelected)

    useEffect(() => {
        const newSocket = io('https://localhost:9000', {
            withCredentials: true,
            transports: ["websocket", "polling"],
            auth:{token:Cookies.get('jwtoken')}
        });
        setSocket(newSocket)
        newSocket.emit('selectBus', {busNumber:bus.busNumber, finalDate})

        newSocket.on('busSeatSelected', (seat) => {

            setSelBus(prevSelBus=>{
                if(!prevSelBus.bookings.seatsSelected.includes(seat)){
                    prevSelBus.bookings.seatsSelected.push(seat)
                }
                return prevSelBus;
            })
         
            
           
        });
        return () => {

        }
    }, [bus,finalDate]);
    const [seatStructure, setSeatStructure] = useState([]);
    useEffect(() => {
        const generateSeatStructure = () => {
            const allSeats = [];
            let j = 0
            for (let row = 1; row <= selBus.busRows; row++) {
                const seat = []
                if (row === 1) {
                    for (let i = 0; i < 3; i++) {
                        if (i === 0) {
                            seat.push("A1")
                        }
                        else {
                            seat.push(`B${i}`)
                        }
                    }
                }

                else {
                    for (let i = 0; i < 4; i++) {
                        if (i === 0 || i === 1) {
                            seat.push(`A${row + i + j}`)
                        }
                        else {
                            seat.push(`B${row + i + j - 1}`)
                        }
                    }
                    j++

                }
                allSeats.push(seat);
            }
            allSeats[selBus.busRows - 1].push(`B${selBus.busRows * 2 + 1}`);
            setSeatStructure(allSeats);
        }
        generateSeatStructure();


    }, [selBus])



    const seatClick = (e, { seatNumber, finalDate, selBus }) => {
        const isNotAvailable = selBus.bookings.seatsBooked.includes(seatNumber) || selBus.bookings.seatsSelected.includes(seatNumber);
        if (isNotAvailable) {
            return
        }
        socket.emit('seat-clicked', seatNumber, finalDate, selBus)
        SetSelectedSeat(prevSelectedSeats => [...prevSelectedSeats, seatNumber])
    }
    const isSelected = (seatNumber) => selectedSeat.includes(seatNumber);
    const isPending = (seatNumber) => selBus.bookings.seatsSelected.includes(seatNumber);


    return (
        <div className='d-flx flx_column' style={{ width: 'fit-content' }}>

            {seatStructure.map((seat, i) => (
                <div key={`${selBus._id}${i}`} className='d-flx'>{
                    seat.map((seatNo) => (
                        <BusSeat key={`${selBus._id}${seatNo}`} seatNumber={seatNo} SetSelectedSeat={SetSelectedSeat} bookings={selBus.bookings} finalDate={finalDate} seatClick={seatClick} selBus={selBus} isSelected={isSelected(seatNo)} isPending={isPending(seatNo)}/>
                    )
                    )
                }
                </div>
            )
            )}


        </div>
    );
}