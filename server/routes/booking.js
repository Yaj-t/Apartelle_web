const express = require("express");
const router = express.Router();
const { Booking, User, Room } = require("../models");

// Get all bookings
router.get('/', async (req, res) => {
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
router.get('/:bookingId', async (req, res) => {
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

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).send({ message: 'Error creating booking', error });
  }
});

// Update a booking by ID
router.put('/:bookingId', async (req, res) => {
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
router.delete('/:bookingId', async (req, res) => {
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

module.exports = router;
