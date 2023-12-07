const express = require("express");
const router = express.Router();
const { Room, RoomType, Booking } = require("../models");
const { requireAuth, authRole} = require("../middleware/authMiddleware")
const { Op } = require('sequelize');


// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.findAll({
      include: [RoomType]
    });
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Get a single room by ID
router.get('/:roomId', async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.roomId, {
      include: [{
        model: RoomType,
        as: 'RoomType' // This alias should match the alias used in association, if any
      }]
    });

    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/available-rooms', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // First, find all bookings that are within the date range
    const bookedRooms = await Booking.findAll({
      where: {
        [Op.or]: [
          {
            dateStart: {
              [Op.lte]: endDate,
              [Op.gte]: startDate,
            },
          },
          {
            dateEnd: {
              [Op.lte]: endDate,
              [Op.gte]: startDate,
            },
          },
          {
            [Op.and]: [
              { dateStart: { [Op.lte]: startDate } },
              { dateEnd: { [Op.gte]: endDate } },
            ],
          },
        ],
        isCancelled: false,
      },
      attributes: ['roomId'],
    });

    // Extract roomIds from bookings
    const bookedRoomIds = bookedRooms.map(booking => booking.roomId);

    // Now, find all rooms that are not in the bookedRoomIds
    const availableRooms = await Room.findAll({
      where: {
        roomId: { [Op.notIn]: bookedRoomIds },
      },
    });

    res.json(availableRooms);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

// Create a new room
router.post('/', authRole(['ADMIN']), async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating new room' });
  }
});

// Update a room by ID
router.put('/:roomId', authRole(['ADMIN']), async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.roomId);
    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }
    const updatedRoom = await room.update(req.body);
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating room' });
  }
});

// Delete a room by ID
router.delete('/:roomId', authRole(['ADMIN']), async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.roomId);
    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }
    await room.destroy();
    res.status(200).send({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting room' });
  }
});

// Get all available rooms
router.get('/available-rooms/:startDate/:endDate', async (req, res) => {
  try {
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);

    // If startDate is greater than endDate, throw an error
    if (startDate > endDate) {
      throw new Error('Start date cannot be after end date');
    }

    const bookedRooms = await Booking.findAll({
      where: {
        startDate: {
          [Op.lte]: endDate
        },
        endDate: {
          [Op.gte]: startDate
        }
      }
    });

    const allRooms = await Room.findAll({
      include: [RoomType]
    });

    const availableRooms = allRooms.filter((room) => {
      const bookedRoom = bookedRooms.find((bookedRoom) => bookedRoom.roomId === room.id);
      return !bookedRoom;
    });

    res.status(200).json(availableRooms);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});


module.exports = router;
