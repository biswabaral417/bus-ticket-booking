const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({

    Date: [{
        buses: [
            {
                BusNumber: {
                    type: String,
                    required: true,
                },
                seatsBooked:[

                ],
                seatsSelected:[

                ]
            }
        ]
    }]
});

const Bookings = mongoose.model("Bookings", bookingsSchema);

module.exports = Bookings;
