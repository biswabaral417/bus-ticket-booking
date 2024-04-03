import React from 'react'

export default function Ticket({ ticket }) {
    console.log(ticket)
    return (
        <div className='border-1pb'>
            <h4 className='ticketh3'>Agency Name :&nbsp; {ticket.AgencyName}</h4>
            <h4 className='ticketh3'>Bus Number :&nbsp; {ticket.BusNumber}</h4>
            <h4 className='ticketh3'>Depature time :&nbsp; {ticket.StartTime}</h4>
            <h4 className='ticketh3'>Total Price :&nbsp;{ ticket.TotalPrice} RS</h4>
            <h3>Seats Booked</h3>
            <div className='border-1pb' style={{width:"100px"}}>{

                ticket.SeatsArray && ticket.SeatsArray.map((seat) =>
                    <h2 key={`${ticket._id}+${seat}`}>{seat}</h2>
                )
            }
            </div>

            <h4 className='ticketh3'>From:{ticket.From}</h4>
            <h4 className='ticketh3'>To:{ticket.to}</h4>
            <h4>here&nbsp;HERE</h4>
        </div>
    )
}

