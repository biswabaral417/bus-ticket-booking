const express = require('express')
const router = express.Router()
const Routes = require('../../../models/RoutesSchema')

router.post('/api/addroutes', async (req, res) => {
    try {
        const data = (req.body)
        const newRoute = new Routes({
            cost: data.Cost,
            StartTime: data.DepartureTime,
            From: data.FromLocationInp,
            To: data.ToLocationInp,
            Days: data.days
        })
        const isSaved = await newRoute.save();
        if (isSaved) {
            res.status(201).json({ success: "Routes Saved Successfully" })
        }
        else {
            res.status(400).json({ error: "Erro while saving" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal sever error" })
    }
})
module.exports = router
