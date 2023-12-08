const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { requireAuth, authRole } = require('../middleware/authMiddleware');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

// Fetch all users from the database
router.get('/users', authRole(['ADMIN', 'Employee']), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        'userId',
        'firstName',
        'lastName',
        'email',
        'userType',
        'contactNumber'
      ] // attributes to retrieve
    });

    // Send the users as a response
    res.status(200).json({
      message: 'Users fetched successfully',
      users: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error', error });
  }
});

// Fetch a user based on user id
router.get(
  '/profile/:userId',
  authRole(['ADMIN', 'Employee']),
  async (req, res) => {
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.status(200).json({
        message: 'User profile fetched successfully',
        user: {
          id: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
          contactNumber: user.contactNumber
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
);

// update a user based on user id
router.put('/profile/:userId', authRole(['ADMIN']), async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    await user.update(req.body);
    res.status(200).send({ message: 'User updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// delete a user based on user id
router.delete('/profile/:userId', authRole(['ADMIN']), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

// fetch logged in user information
router.get('/myprofile', requireAuth, async (req, res) => {
  try {
    const token = req.header('accessToken');
    console.log(token);
    const decodedToken = jwt.verify(token, 'Apartelle Secret Website');
    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile fetched successfully',
      user: {
        id: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        contactNumber: user.contactNumber
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// PUT /myprofile - Update own profile
router.put('/myprofile', requireAuth, async (req, res) => {
  try {
    const token = req.header('accessToken');
    const decodedToken = jwt.verify(token, 'Apartelle Secret Website');
    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.update(req.body);
    res.status(200).send({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// DELETE /myprofile - Delete own profile
router.delete('/myprofile', requireAuth, async (req, res) => {
  try {
    const token = req.header('accessToken');
    const decodedToken = jwt.verify(token, 'Apartelle Secret Website');
    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).send({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
