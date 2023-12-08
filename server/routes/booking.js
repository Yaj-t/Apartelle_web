const express = require("express");
const router = express.Router();
const { Booking, User, Room } = require("../models");
const { requireAuth, authRole } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Get all bookings

// Get the users bookings
router.get('/my-bookings', requireAuth, async (req, res) => {
  try {
    console.log('problem\n\n\n\n\n')
    const token = req.header("accessToken")
    const decodedToken = jwt.verify(token, 'Apartelle Secret Website');
    console.log(decodedToken)
    const userId = decodedToken.id;
    const bookings = await Booking.findAll({
      where: { userid: userId },
      include: [User, Room]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

router.get('/', authRole(['ADMIN', 'Staff']), async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [User, Room]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

// Get a single booking by ID
router.get('/:bookingId', authRole(['ADMIN', 'Staff']), async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.bookingId, {
      include: [User, Room]
    });
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

// Update a booking by ID
router.put('/:bookingId', authRole(['ADMIN', 'Staff']), async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    const updatedBooking = await booking.update(req.body);
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).send({ message: 'Error updating booking', error });
  }
});

// Delete a booking by ID
router.delete('/:bookingId', authRole(['ADMIN']), async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    await booking.destroy();
    res.status(200).send({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting booking', error });
  }
});

// Get all bookings by room id
router.get('/room/:roomId', authRole(['ADMIN', 'Staff']), async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { roomId: req.params.roomId },
      include: [User, Room]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

// Create a new booking
router.post('/', requireAuth, async (req, res) => {
  try {
    const token = req.header("accessToken")

    const decodedToken = jwt.verify(token, 'Apartelle Secret Website');
    const userId = decodedToken.id;

    const bookingData = req.body;
    bookingData.userId = userId;

    // Check if the room is available in the given date range
    const conflictingBookings = await Booking.findAll({
      where: {
        roomId: bookingData.roomId,
        [Op.and]: [
          { dateStart: { [Op.lte]: bookingData.dateEnd } },
          { dateEnd: { [Op.gte]: bookingData.dateStart } }
        ],
        isCancelled: false
      }
      
    });

    if (conflictingBookings && conflictingBookings.length > 0) {
      return res.status(400).send({ message: 'Room is not available for the selected dates' });
    }

    // Fetch the room price
    const room = await Room.findByPk(bookingData.roomId);
    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }

    // Calculate the number of days
    const startDate = new Date(bookingData.dateStart);
    const endDate = new Date(bookingData.dateEnd);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate the amount
    bookingData.amount = room.price * diffDays;

    // Create the booking
    const booking = await Booking.create(bookingData);
    res.status(201).json({message: 'booking successful', booking});
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send({ message: 'Error creating booking', error });
  }
});



router.put('/my-bookings/:bookingId', requireAuth, async (req, res) => {
  try {
    const decodedToken = jwt.verify(token, 'Apartelle Secret Website');
    const userId = decodedToken.userId;
    const bookingId = req.params.bookingId;
    const bookingData = req.body;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }

    if (booking.userId !== userId) {
      return res.status(403).send({ message: 'Unauthorized access' });
    }

    const updatedBooking = await booking.update(bookingData);
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).send({ message: 'Error updating booking', error });
  }
});



// Check availability
router.get('/check-availability/:roomId/:startDate/:endDate', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);

    const bookings = await Booking.findAll({
      where: {
        roomId: roomId,
        startDate: {
          [Op.lte]: endDate
        },
        endDate: {
          [Op.gte]: startDate
        }
      }
    });

    if (bookings.length > 0) {
      res.status(400).send({ message: 'Room is not available' });
    } else {
      res.status(200).send({ message: 'Room is available' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

router.delete('/my-bookings/:bookingId', requireAuth, async (req, res) => {
  try {
    const decodedToken = jwt.verify(token, 'Apartelle Secret Website');
    const userId = decodedToken.userId;
    const bookingId = req.params.bookingId;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }

    if (booking.userId !== userId) {
      return res.status(403).send({ message: 'Unauthorized access' });
    }

    await booking.destroy();
    res.status(200).send({ message: 'Booking canceled successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error canceling booking', error });
  }
});

module.exports = router;
