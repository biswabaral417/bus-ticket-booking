const express = require("express");
const { check, validationResult } = require("express-validator");
const signUpApi = express.Router();
const UserData = require("../../../models/userModel");
require("../../../DB/conn");

signUpApi.use(express.json());

signUpApi.post(
  "/api/signup",
  [
    // Validation rules using express-validator
    check("fName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    check("lName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters"),
    check("phoneNo")
      .isNumeric()
      .isLength({ min: 10 })
      .withMessage("Phone number must be a number and at least 10 digits"),
    check("email").isEmail().withMessage("Invalid email address"),
    check("password").isStrongPassword().withMessage("Password must be strong"),
    check("cPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
    check("Address").notEmpty().withMessage("Address is required"),
  ],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const userExists = await UserData.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(422).json({ error: "User already exists" });
      }

      const user = new UserData(req.body);
      const userRegistered = await user.save();

      if (userRegistered) {
        return res.status(201).json({ success: "User registered" });
      } else {
        return res.status(500).json({ error: "Server error" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
  },
);

module.exports = signUpApi;
