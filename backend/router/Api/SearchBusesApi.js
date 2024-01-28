const express = require("express");
const SearchBuses = express.Router();
const Bus = require("../../models/BusSchema");
const BusRoutes = require("../../models/RoutesSchema");
require("../../DB/conn");
SearchBuses.use(express.json());
SearchBuses.post(
    "/api/searchbuses",
    async (req, res) => {
        try {
            const { fromLocation, ToLocation, finalDate } = req.body;
            const day = new Date(finalDate).toLocaleDateString('en-US', { weekday: "long" })

            // Use the $in operator to find buses with routes matching the search query
            const buses = await Bus.find({
                routes: {
                    $in: await BusRoutes.find({
                        From: fromLocation,
                        To: ToLocation,
                        Days: day,
                    }).select('_id')
                }
            }).populate({
                path: 'routes',
                model: 'Routes',
            });
            res.status(200).json(buses)
        } catch (error) {
            res.status(500).json({ error: "internal server error" })
        }
    });

module.exports = SearchBuses;
