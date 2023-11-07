const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create user
    const user = await db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      contact_number: req.body.contact_number,
      user_type: 'User' // Or based on what you receive in req.body
    });

    res.status(201).send({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).send({ message: 'Error creating user', error });
  }
};

const login = async (req, res) => {
  try {
    // Find user
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error logging in', error });
  }
};

module.exports = {
  register,
  login
};
