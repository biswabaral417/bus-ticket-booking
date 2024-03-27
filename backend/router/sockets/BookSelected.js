const Bus = require("../../models/BusSchema");
const Bookings = require("../../models/bookings");
require("../../DB/conn");

const BookSelected = async ({ userToken, busNumber, finalDate }) => {
  if (!userToken) {
    return [];
  }
  const selectedBus = await Bus.findOne({ busNumber: busNumber });
  if (!selectedBus) {
    return [];
  }
  const bookingDate = await Bookings.findOne({ date: finalDate });
  if (!bookingDate) {
    return [];
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
  } else {
    const finalArray = bookingsForBus.seatsSelected
      .filter((seat) => seat.userToken === userToken)
      .map((seat) => seat.seatNumber);
      bookingsForBus.seatsBooked =  bookingsForBus.seatsBooked.concat(bookingsForBus.seatsSelected
      .filter((seat) => seat.userToken === userToken))
      
      bookingsForBus.seatsSelected = bookingsForBus.seatsSelected
      .filter(
          (seat) => seat.userToken !== userToken,
        );
    await bookingDate.save();
    return finalArray;
  }
};


module.exports = BookSelected;

