const express = require("express");
const router = express.Router();
const { Booking, User, Room, Review } = require("../models");
const { requireAuth, authRole } = require('../middleware/authMiddleware');  

const { Op } = require('sequelize');

async function generateReportData(startDate, endDate) {
    let dateFilter = {};

    if (startDate || endDate) {
        dateFilter = {
            dateStart: {
                [Op.gte]: startDate ? new Date(startDate) : new Date(0),
                [Op.lte]: endDate ? new Date(endDate) : new Date()
            }
        };
    }

    // Aggregate total number of bookings in date range
    const totalBookings = await Booking.count({ where: dateFilter });

    // Aggregate total revenue in date range
    const totalRevenue = await Booking.sum('amount', { where: dateFilter });

    // Calculate average room occupancy within date range
    const totalRooms = await Room.count();
    const occupiedRooms = await Booking.count({ where: { ...dateFilter, isCancelled: false } });
    const averageOccupancy = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;

    // Average rating from reviews in date range
    const totalRatings = await Review.sum('rating', { where: dateFilter });
    const totalReviews = await Review.count({ where: dateFilter });
    const averageRating = totalReviews > 0 ? (totalRatings / totalReviews) : 0;

    return {
        totalBookings,
        totalRevenue,
        averageOccupancy,
        averageRating
    };
}


app.get('/reports', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const reportData = await generateReportData(startDate, endDate);
        res.json(reportData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating report');
    }
});

