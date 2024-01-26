const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  routes:[{
    type:mongoose.Schema.ObjectId,
    required:true
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
            isOccupied: {
              type: Boolean,
              default: false,
            },
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

busSchema.pre("save", function (next) {
  const numRows = this.busRows || 1; // Default to 1 row if busRows is not specified
  const rows = [];
  for (let i = 1; i <= numRows; i++) {
    const seats = [];
    const numSeats = i === 1 ? 3 : i === numRows ? 5 : 4;
    for (let j = 0; j < numSeats; j++) {
      seats.push({
        seatNumber: j===0?i===1?"A1":`A${(i-1)*2}`:j===1?i===1?"B1":`A${((i-1)*2)+1}`:j===2?i===1?"B2":`B${((i-1)*2+1)}`:j===3?`B${((i-1)*2)+2}`:`B${(i-1)*2+3}`,
        isOccupied: false,
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
