const express = require('express');
const { Op } = require('sequelize');
const { Booking, sequelize } = require('../models');

const router = express.Router();

// Endpoint to get booking analytics
router.get('/bookings', async (req, res) => {
    try {
      const { dateStart = '1970-01-01', dateEnd = new Date().toISOString().split('T')[0] } = req.query;
  
      const bookings = await Booking.findAll({
        attributes: [
          'roomId',
          [sequelize.fn('COUNT', sequelize.col('bookingId')), 'totalBookings'],
          [sequelize.fn('SUM', sequelize.col('amount')), 'totalRevenue']
        ],
        where: {
          dateStart: { [Op.gte]: new Date(dateStart) },
          dateEnd: { [Op.lte]: new Date(dateEnd) },
          isCancelled: false
        },
        group: ['roomId'],
        order: [[sequelize.fn('SUM', sequelize.col('amount')), 'DESC']]
      });
  
      res.json(bookings);
    } catch (error) {
      res.status(500).send({ message: 'Internal server error', error: error.message });
    }
  });
  
module.exports = router;
