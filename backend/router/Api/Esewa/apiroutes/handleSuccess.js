const express = require("express");
const createSignature = require("../functions/createSignature");
const Ticket = require("../../../../models/Tickects");
const BookSelected = require("../functions/BookSelected");
const secretKeyEsewa = process.env.esewaKey
const router = express.Router();

router.get("/api/esewaPayment/success", async (req, res) => {
  try {
    const { data } = req.query;
    const io=req.io
    const decodedData = await JSON.parse(Buffer.from(data, "base64").toString("UTF-8"));
    let message;
    message = decodedData.signed_field_names.split(",").map((field) => (
      field === "total_amount" ?"total_amount="+decodedData["total_amount"].split(",").join(""):
        `${field}=${decodedData[field] || ""}`
    )).join(",");
    const signature = createSignature(message, secretKeyEsewa);
    if (signature !== decodedData.signature) {
      return res.status(400).json({ message: "error integrity error" });
    }
    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;

    let ticket = await Ticket.findById(req.transaction_uuid);
    ticket.transaction_code = req.transaction_code;
    ticket.bookingStatus = "paid"
    await ticket.save();
    const finalDate=ticket.StartTime.toLocaleString().split(",")[0]
    const selSeatsArr=await BookSelected({ seatsArr:ticket.SeatsArray, busNumber:ticket.BusNumber, finalDate })
    res.redirect("https://localhost:3000/mytickets");
    io.to(`${ticket.BusNumber}-${finalDate}`).emit('busSeatsBooked',selSeatsArr)
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error?.message || "no orders found" });
  }
});


module.exports = router;


