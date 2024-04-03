const express = require('express')
const router = express.Router()
const Bus = require('../../../models/BusSchema')
const Routes = require('../../../models/RoutesSchema')
router.post('/api/addbus', async (req, res) => {
    try {
        const { routeId, addBusInp } = req.body


        const alreadyExists = await Bus.findOne({ busNumber: addBusInp.busNumber });
        const routeExists = await Routes.findById(routeId);
        if (!routeExists) {
            return res.status(400).json({ error: "Route Doesnt exists" })
        }
        if (alreadyExists) {
            return res.status(400).json({ error: "bus with same number plate already exists" })
        }
        const newBus = new Bus({
            routes: [routeExists._id],
            agencyName: addBusInp.AgencyInp,
            busNumber: addBusInp.busNumber,
            busRows: addBusInp.busRows,
        })

        const isSaved = await newBus.save();
        if (isSaved) {
            return res.status(201).json({ success: "bus Saved sucessfully" })
        }
        else {
            return res.status(400).json({ error: "error occured while saving" })
        }

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: "internal server Error" })

    }
})
module.exports = router