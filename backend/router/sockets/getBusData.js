const Bus = require("../../models/BusSchema");
const Bookings = require("../../models/bookings");
require("../../DB/conn");

const getBusData = async ({ finalDate, busNumber, userToken }) => {
  try {
    const selectedBus = await Bus.findOne({ busNumber: busNumber }).populate({
      path: "routes",
      model: "Routes",
    });
    // console.log(selectedBus)
    if (!selectedBus) {
      return;
    }
    const bookingDate = await Bookings.findOne({ date: finalDate });

    if (!bookingDate) {
      return selectedBus;
    }
    let bookingsForBus = bookingDate.buses.find(
      (booking) => booking.BusNumber === selectedBus.busNumber,
    );

    // If no bookings found for the bus, initialize its booking status
    if (!bookingsForBus) {
      selectedBus.bookings = {
        seatsBooked: [],
        seatsSelected: [],
        userSelected: [],
      };
    } else {
      const getUserselectedSeats = bookingsForBus.seatsSelected
        .filter((seat) => seat.userToken === userToken)
        .map((seat) => seat.seatNumber);
      // Map to get array of seat numbers
      selectedBus.bookings = {
        seatsBooked: bookingsForBus.seatsBooked,
        seatsSelected: bookingsForBus.seatsSelected.map(
          (seat) => seat.seatNumber,
        ),
        userSelected: getUserselectedSeats ? getUserselectedSeats : [],
      };
    }
    return selectedBus;
  } catch (error) {
    console.error("Error in busPending:", error);
  }
};

module.exports = getBusData;
