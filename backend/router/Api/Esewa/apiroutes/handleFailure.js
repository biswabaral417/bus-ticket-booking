const express = require("express");
const createSignature = require("../functions/createSignature");
const secretKeyEsewa=process.env.esewaKey
const Ticket = require('../../../../models/Tickects')
const router = express.Router();

router.get("/api/esewaPayment/failure", async (req, res) => {
  try {
    const { data } = req.query;
    const decodedString = await JSON.parse(Buffer.from(data, "base64").toString("UTF-8"));
    
    const message = `transaction_code=${decodedString.transaction_code},status=${decodedString.status},total_amount=${decodedString.total_amount},transaction_uuid=${decodedString.transaction_uuid},product_code=${decodedString.product_code},signed_field_names=${decodedString.signed_field_names}`
  
    const signature = createSignature(message,secretKeyEsewa);
    console.log("decoded : "+decodedString);
    console.log(signature);
    if (signature !== decodedString.signature) {
      return res.status(400).json({ message: "error integrity error" });
    }
    req.transaction_uuid = decodedString.transaction_uuid;
    req.transaction_code = decodedString.transaction_code;

    let ticket = await Ticket.findOneAndDelete(req.transaction_uuid); 
    await ticket.save();
    res.redirect("http://localhost:3000/ticket");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error?.message || "no tickets found" });

  }
});

module.exports = router;
