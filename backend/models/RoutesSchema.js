const mongoose = require("mongoose");

const Routeschema = new mongoose.Schema({
  cost: {
    type: Number,
    required: true
  },
  StartTime: {
    type: String,
    required: true,
  },
  EndTime: {
    type: String,
    required: true,
  },
  Days: [{
    type: String,
    enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: true,
  }],

  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true,
  }
});

const Routes = mongoose.model("Routes", Routeschema);

module.exports = Routes;
