const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  buses: [
    {
      BusNumber: {
        type: String,
        required: true,
      },
      seatsBooked: [],
      seatsSelected: [
        {
          userToken: {
            type: String,
            required: true,
          },
          seatNumber: {
            type: String,
            required: true,
          },
        },
      ],
      userSelected: [],
    },
  ],
});

const Bookings = mongoose.model("Bookings", bookingsSchema);

module.exports = Bookings;

