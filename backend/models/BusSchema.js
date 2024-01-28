const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  routes: [{
    type: mongoose.Schema.ObjectId,
    required: true,
  }],
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
  seatStructure: {
    rows: [
      {
        rowNumber: {
          type: Number,
          required: true,
        },
        seats: [
          {
            seatNumber: {
              type: String,
              required: true,
            },
            bookings: [
              {
                date: {
                  type: Date,
                  required: true,
                },
                status: {
                  type: String,
                  enum: ["booked", "available", "pending"],
                  default: "available",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  busFeatures: {
    type: String,
    required: false,
  },
});

// Generate seat number based on row and column
function generateSeatNumber(row, col) {
  const seatLetter = col === 0 ? "A" : "B";
  const seatNumber = col === 0 ? row : (row - 1) * 2 + col;
  return `${seatLetter}${seatNumber}`;
}

busSchema.pre("save", function (next) {
  const numRows = this.busRows || 1; // Default to 1 row if busRows is not specified
  const rows = [];

  for (let i = 1; i <= numRows; i++) {
    const seats = [];

    const numSeats = i === 1 ? 3 : i === numRows ? 5 : 4;

    for (let j = 0; j < numSeats; j++) {
      seats.push({
        seatNumber: generateSeatNumber(i, j),
        bookings: [],
      });
    }

    rows.push({
      rowNumber: i,
      seats,
    });
  }

  this.seatStructure = { rows };
  next();
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
