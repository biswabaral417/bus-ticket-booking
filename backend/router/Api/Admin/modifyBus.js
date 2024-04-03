const express = require('express');
const router = express.Router();
const Bus = require('../../../models/BusSchema');
const Routes = require('../../../models/RoutesSchema');

router.post('/api/modifybus', async (req, res) => {
    try {
        const { routeId, modifyBusInp } = req.body;

        // Check if the bus exists
        let alreadyExists = await Bus.findOne({ busNumber: modifyBusInp.busNumber });
        if (!alreadyExists) {
            return res.status(400).json({ error: "Bus doesn't exist" });
        }

        // Check if the route exists
        const routeExists = await Routes.findById(routeId);
        if (!routeExists && routeId) {
            return res.status(400).json({ error: "Route doesn't exist" });
        }

        // Update bus details based on modifyBusInp
        if (modifyBusInp.agencyName) {
            alreadyExists.agencyName = modifyBusInp.agencyName;
        }
        if (modifyBusInp.busRows && modifyBusInp.busRows !== 0) {
            alreadyExists.busRows = modifyBusInp.busRows;
        }
        if (routeId && routeExists) {
            alreadyExists.routes.push(routeExists._id);
        }
        alreadyExists.isDisabled = modifyBusInp.disable;

        // Save the modified bus
        const isSaved = await alreadyExists.save();
        if (isSaved) {
            return res.status(201).json({ success: "Bus saved successfully" });
        } else {
            return res.status(400).json({ error: "Error occurred while saving" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
