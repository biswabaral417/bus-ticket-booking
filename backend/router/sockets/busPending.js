const Bus = require("../../models/BusSchema");
const Bookings = require("../../models/bookings");
require("../../DB/conn");

const busPending = async ({ seatNumber, finalDate, selBus, userToken }) => {
  try {
    if (!userToken) {
      return { error: "User is not authenticated" };
    }
    const busID = selBus._id;
    const selectedBus = await Bus.findOne({ _id: busID });
    if (!selectedBus) {
      return;
    }
    const bookingDate = await Bookings.findOne({ date: finalDate });

    if (!bookingDate) {
      const newBooking = new Bookings({
        date: finalDate,
        buses: [
          {
            BusNumber: selectedBus.busNumber,
            seatsSelected: [{ userToken: userToken, seatNumber: seatNumber }],
            seatsBooked: [],
            userSelected: [],
          },
        ],
      });
      await newBooking.save();

      return seatNumber;
    }
    const busPending = bookingDate.buses.find(
      (bus) => bus.BusNumber === selectedBus.busNumber,
    );
    if (!busPending) {
      bookingDate.buses = [
        {
          busNumber: selectedBus.busNumber,
          seatsSelected: [{ userToken: userToken, seatNumber: seatNumber }],
        },
      ];
      await bookingDate.save();

      return seatNumber;
    }

    // If the seat is already booked, return without modifying
    if (busPending.seatsBooked.includes(seatNumber)) {
      return seatNumber;
    }

    // If the seat is already selected by the same user, remove it from seatsSelected
    if (busPending.seatsSelected.some((item) =>item.seatNumber === seatNumber && item.userToken === userToken)) {
      busPending.seatsSelected = busPending.seatsSelected.filter(
        (item) =>
          !(item.seatNumber === seatNumber && item.userToken === userToken),
      );
      await bookingDate.save();
      return seatNumber;
    } else {
      // Add the seat to seatsSelected
      busPending.seatsSelected.push({
        userToken: userToken,
        seatNumber: seatNumber,
      });
      await bookingDate.save();
    }
    return seatNumber;
  } catch (error) {
    console.error("Error in busPending:", error);
  }
};

module.exports = busPending;
