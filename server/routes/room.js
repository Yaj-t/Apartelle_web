const express = require("express");
const router = express.Router();
const { Room, RoomType } = require("../models");

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
      include: [RoomType]
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

// Create a new room
router.post('/', async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating new room' });
  }
});

// Update a room by ID
router.put('/:roomId', async (req, res) => {
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
router.delete('/:roomId', async (req, res) => {
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

module.exports = router;
