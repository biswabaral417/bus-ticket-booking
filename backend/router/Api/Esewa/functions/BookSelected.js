const Bus = require("../../../../models/BusSchema");
const Bookings = require("../../../../models/bookings");
require("../../../../DB/conn");


const BookSelected = async ({ busNumber, finalDate, seatsArr }) => {
  try {
    const selectedBus = await Bus.findOne({ busNumber: busNumber });
    if (!selectedBus) {
      throw new Error("Selected bus not found");
    }
  
    const bookingDate = await Bookings.findOne({ date: finalDate });
    if (!bookingDate) {
      throw new Error("Booking date not found");
    }

    let bookingsForBus = bookingDate.buses.find(
      (booking) => booking.BusNumber === selectedBus.busNumber,
    );
    if (!bookingsForBus) {
      selectedBus.bookings = {
        seatsBooked: seatsArr,
        seatsSelected: [], 
        userSelectedSeats: [], 
      };
    } else {
      bookingsForBus.seatsBooked = bookingsForBus.seatsBooked.concat(seatsArr); // Add seatsArr to bookedSeats
      bookingsForBus.seatsSelected = bookingsForBus.seatsSelected.filter(
        (seat) => !seatsArr.includes(seat.seatNumber) // Remove seats from seatsSelected
      );
      await bookingDate.save();
      return seatsArr;
    }
  } catch (error) {
    throw new Error(`Failed to book seats: ${error.message}`);
  }
};
module.exports= BookSelected