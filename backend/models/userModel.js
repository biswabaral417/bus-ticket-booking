const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    default: function () {
      return this.fName && this.lName
        ? this.fName.charAt(0).toUpperCase() +
            this.fName.slice(1) +
            " " +
            this.lName.charAt(0).toUpperCase() +
            this.lName.slice(1)
        : undefined;
    },
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  tickets: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Tickets",
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//generating auth token
userSchema.methods.generateAuthtoken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens.push({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const UserData = mongoose.model("UserData", userSchema);

module.exports = UserData;
