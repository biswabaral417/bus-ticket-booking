const express = require('express');
const router = express.Router();
const userAuth = require('../../../middleware/userAuth');
const Ticket = require('../../../models/Tickects');

router.get("/api/userTickets", userAuth, async (req, res) => {
    try {
        const userID = req.rootUser._id;
        // Use async/await with Mongoose query
        const tickets = await Ticket.find({ bookedBy: userID }).exec();

        if (tickets && tickets.length > 0) {
            return res.status(200).json({ tickets: tickets });
        } else {
            return res.status(404).json({ error: "No tickets found" });
        }
    } catch (error) {
        console.error("Error fetching user tickets:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

