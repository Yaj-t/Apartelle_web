const express = require("express");
const router = express.Router();
const { Review, Booking, User, Room } = require("../models");

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: Booking, include: [User] }]
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).send({ message: 'Error creating review', error });
  }
});

// Get a single review by ID
router.get('/:reviewId', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.reviewId, {
      include: [Booking, User]
    });
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});

// Create a new review


// Update a review by ID
router.put('/:reviewId', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    const updatedReview = await review.update(req.body);
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).send({ message: 'Error updating review', error });
  }
});

// Delete a review by ID
router.delete('/:reviewId', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    await review.destroy();
    res.status(200).send({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting review', error });
  }
});

// Get all reviews by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const reviews = await Review.findAll({
      include: [{
        model: Booking,
        include: [{
          model: User,
          where: { userId: userId } 
        },
        {
          model: Room,
        }
      ]
      }]
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
});


module.exports = router;
