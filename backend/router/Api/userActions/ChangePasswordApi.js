const express = require("express");
const { check, validationResult } = require("express-validator");
const userAuth = require("../../../middleware/userAuth");
const ChangePassword = express.Router();
const UserData = require("../../../models/userModel");
const bcrypt = require("bcrypt");
require("../../../DB/conn");
ChangePassword.use(express.json());
ChangePassword.post(
  "/api/changePassword",
  [
    // Validation rules using express-validator
    check("newPassword")
      .isStrongPassword()
      .custom((value, { req }) => {
        if (value === req.body.oldPassword) {
          throw new Error("new pssword cannot be equal to old password");
        }
        return true;
      }),
    check("confirmNewPassword").custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("passwords donot match");
      }
      return true;
    }),
  ],
  userAuth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    //now to change password
    try {
      const user = await UserData.findOne({ email: req.rootUser.email });
      if (user && (await bcrypt.compare(req.body.oldPassword, user.password))) {
        user.password = req.body.newPassword;
        user.save();
        return res.status(201).json({ success: "password changed" });
      }
    } catch (error) {
      res.status(500).json({ error: "internal server error" });
    }
  },
);

module.exports = ChangePassword;
