const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  routes: [
    {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  ],
  agencyName: {
    type: String,
    required: true,
  },
  busNumber: {
    type: String,
    required: true,
    unique: true,
  },
  busRows: {
    type: Number,
    required: true,
  },
  busFeatures: {
    type: String,
    required: false,
  },
  bookings: {
    seatsBooked: [],
    seatsSelected: [],
    userSelected: [],
  },
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
