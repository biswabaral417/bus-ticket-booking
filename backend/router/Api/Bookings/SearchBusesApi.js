const express = require("express");
const SearchBuses = express.Router();
const Bus = require("../../../models/BusSchema");
const BusRoutes = require("../../../models/RoutesSchema");
const Bookings = require("../../../models/bookings");
require("../../../DB/conn");
SearchBuses.use(express.json());

SearchBuses.post("/api/searchbuses", async (req, res) => {
  try {
    const { fromLocation, ToLocation, finalDate } = req.body;
    const day = new Date(finalDate).toLocaleDateString("en-US", {
      weekday: "long",
    });
    // Use the $in operator to find buses with routes matching the search query
    let BusesInRoute = await Bus.find({
      routes: {
        $in: await BusRoutes.find({
          From: fromLocation,
          To: ToLocation,
          Days: day,
        }).select("_id"),
      },
    }).populate({
      path: "routes",
      model: "Routes",
    });

    // Retrieve bookings for the given date
    let bookingsForDate = await Bookings.findOne({ date: finalDate });

    // If there are no bookings for the given date, return buses without changes
    if (!bookingsForDate) {
      BusesInRoute.forEach((bus) => {
        // Debugging: Check bus object before adding bookings
        // Add empty bookings object to the bus
        bus.bookings = {
          seatsBooked: [],
          seatsSelected: [],
          userSelected: [],
        };
      });

      return res.status(200).json(BusesInRoute);
    }

    // Iterate through each bus and check for available seats
    BusesInRoute.forEach((bus) => {
      // Find bookings for the current bus
      let bookingsForBus = bookingsForDate.buses.find(
        (booking) => booking.BusNumber === bus.busNumber,
      );

      // If no bookings found for the bus, initialize its booking status
      if (!bookingsForBus) {
        bus.bookings = {
          seatsBooked: [],
          seatsSelected: [],
          userSelectedSeats: [],
        };
      } else {
        const getUserselectedSeats = bookingsForBus.seatsSelected
          .filter((seat) => seat.userToken === req.token)
          .map((seat) => seat.seatNumber);
        // Map to get array of seat numbers
        bus.bookings = {
          seatsBooked: bookingsForBus.seatsBooked,
          seatsSelected: bookingsForBus.seatsSelected.map(
            (seat) => seat.seatNumber,
          ),
          userSelected: getUserselectedSeats ? getUserselectedSeats : [],
        };
      }
    });

    // Send the updated BusesInRoute array with booking status
    res.status(200).json(BusesInRoute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = SearchBuses;
