const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  bookedBy:{
    type:ObjectId,
    required:true
  },
  AgencyName: {
    type: String,
    required: true,
  },
  BusNumber: {
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
  SeatsArray:[
  ],
  TotalPrice: {
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
  bookingStatus: {
    type: String,
    enum: ["initiated", "paid"],
    default: "initiated",
  },
});

const Tickets = mongoose.model("Tickets", TicketSchema);

module.exports = Tickets;
