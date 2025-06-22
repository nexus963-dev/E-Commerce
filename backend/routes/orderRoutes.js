const express = require("express");
const Order = require("../models/Order");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

// GET  /api/orders/my-orders
//Get logged-in user's orders
router.get("/my-orders", protect, async (req,res) => {
    try {
        const orders = await Order.find({user: req.user._id}).sort({
            createdAt : -1,
        }); // sort by most recent orders
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Server Error"});
    }    
});

// GET /api/orders/:id
//Get order details by ID
router.get("/:id", protect, async (req,res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if(!order){
            return res.status(404).json({message: "Order not Found"})            ;
        }

        //Return the full order details
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

module.exports = router;