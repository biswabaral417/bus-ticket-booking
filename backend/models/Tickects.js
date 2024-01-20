const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  AgencyName: {
    type: String,
    required: true,
  },
  BusNumber: {
    type: String,
    required: true,
  },
  SeatName: {
    type: String,
    required: true,
  },
  StartTime: {
    type: Date,
    required: true,
  },
  EndTime: {
    type: Date,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  From: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "booked", "pending"],
    default: "available",
  },
});

const Tickets = mongoose.model("Tickets", TicketSchema);

module.exports = Tickets;
