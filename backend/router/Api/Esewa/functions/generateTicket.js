const Ticket = require('../../../../models/Tickects')
const Bus = require("../../../../models/BusSchema");
const Bookings = require('../../../../models/bookings')

const generateTicket = async (req, res) => {
  try {
    const { busNumber, finalDate, userToken, busRoute } = req.body;
    const user = req.rootUser;
    const selectedBus = await Bus.findOne({ busNumber: busNumber });
    if (!selectedBus) {
      return res.status().json({error:"no buses found"})
    }
    const bookingDate = await Bookings.findOne({ date: finalDate });
    if (!bookingDate) {
      return res.json({error:"no seats selected"})

    }
    let bookingsForBus = bookingDate.buses.find(
      (booking) => booking.BusNumber === selectedBus.busNumber,
    );
    if (!bookingsForBus) {
      selectedBus.bookings = {
        seatsBooked: [],
        seatsSelected: [],
        userSelectedSeats: [],
      };
      return res.json({error:"no seats selected"})
    } else {
      const finalArray = bookingsForBus.seatsSelected
      .filter((seat) => seat.userToken === userToken)
      .map((seat) => seat.seatNumber);
      const TotalPrice=finalArray.length*busRoute.cost
  
      const newTicket=new Ticket({
        bookedBy:user,
        AgencyName: selectedBus.agencyName,
        BusNumber: busNumber,
        StartTime:new Date(finalDate),
        EndTime:new Date(finalDate),
        SeatsArray:finalArray,
        TotalPrice:TotalPrice,
        From: busRoute.From,
        to: busRoute.To,
        bookingStatus: "initiated"
      })
       const savedTicket= await newTicket.save();
       if(savedTicket){
         return savedTicket
       }        
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving the order.' });
  }
}
module.exports = generateTicket