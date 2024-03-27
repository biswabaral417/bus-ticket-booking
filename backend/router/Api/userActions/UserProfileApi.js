const express = require("express");
const userAuth = require("../../../middleware/userAuth");
const UserProfileApi = express.Router();
const UserData = require("../../../models/userModel");
require("../../../DB/conn");
UserProfileApi.use(express.json());

UserProfileApi.get("/api/userProfile", userAuth, async (req, res) => {
  if (req.rootUser) {
    const user = await UserData.findById(req.rootUser._id); // Adjust as needed
    const resData = {
      Name: user.Name,
      phoneNo: user.phoneNo,
      email: user.email,
      Address: user.Address,
    };
    res.status(200).json(resData);
  } else {
  }
});

module.exports = UserProfileApi;
