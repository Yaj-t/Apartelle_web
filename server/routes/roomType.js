const express = require("express");
const router = express.Router();
const { authRole } = require("../middleware/authMiddleware");

const { RoomType } = require("../models");


// Get all room types
router.get('/', async (req, res) => {
  try {
    const roomTypes = await RoomType.findAll();
    res.status(200).json(roomTypes);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

// Get a single room type by ID
router.get('/:roomTypeId', async (req, res) => {
  try {
    const roomType = await RoomType.findByPk(req.params.roomTypeId);
    if (!roomType) {
      return res.status(404).send({ message: 'Room type not found' });
    }
    res.status(200).json(roomType);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

// Create a new room type
router.post('/', authRole(['ADMIN', 'Staff']), async (req, res) => {
  try {
    const roomType = await RoomType.create(req.body);
    res.status(201).json(roomType);
  } catch (error) {
    res.status(500).send({ message: 'Error creating room type', error });
  }
});

// Update a room type by ID
router.put('/:roomTypeId', authRole(['ADMIN']), async (req, res) => {
  try {
    const roomType = await RoomType.findByPk(req.params.roomTypeId);
    if (!roomType) {
      return res.status(404).send({ message: 'Room type not found' });
    }
    const updatedRoomType = await roomType.update(req.body);
    res.status(200).json(updatedRoomType);
  } catch (error) {
    res.status(500).send({ message: 'Error updating room type', error });
  }
});

// Delete a room type by ID
router.delete('/:roomTypeId', authRole(['ADMIN']), async (req, res) => {
  try {
    const roomType = await RoomType.findByPk(req.params.roomTypeId);
    if (!roomType) {
      return res.status(404).send({ message: 'Room type not found' });
    }
    await roomType.destroy();
    res.status(200).send({ message: 'Room type deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting room type', error });
  }
});

module.exports = router;
