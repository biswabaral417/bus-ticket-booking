
// Assuming you have a route in your backend to fetch paginated routes
const express = require('express')
const router = express.Router()
const Routes = require('../../../models/RoutesSchema')
router.get("/api/routes",async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Adjust the limit as per your need
    try {
      const routes = await Routes.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
  
      const totalRoutesCount = await Routes.countDocuments().exec();
  
      res.json({
        totalPages: Math.ceil(totalRoutesCount / limit),
        currentPage: page,
        routes,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
  
module.exports=router