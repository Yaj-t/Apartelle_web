const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 *60;
const createToken = (id) => {
  return jwt.sign({ id }, 'Apartelle Secret Website', {
    expiresIn: maxAge
  })
}

function handleErrors(error) {
  let errors = { email: '', password: '', contact_number: '', first_name: '', last_name: '' };

  // Handling duplicate email or contact number
  if (error.name === 'SequelizeUniqueConstraintError') {
    if (error.errors && error.errors.length > 0) {
      error.errors.forEach((err) => {
        if (err.path === 'email') {
          errors.email = 'Email already registered';
        }
        if (err.path === 'contact_number') {
          errors.contact_number = 'Contact number already registered';
        }
      });
    }
    return { status: 409, errors };
  }

  // Handling validation errors
  if (error.name === 'SequelizeValidationError') {
    error.errors.forEach(({ path, message }) => {
      if (errors.hasOwnProperty(path)) {
        errors[path] = message;
      }
    });
    return { status: 400, errors };
  }

  // Other errors
  return { status: 500, errors: { message: 'Internal Server Error' } };
}


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
    const token = createToken(user.user_id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).send({ message: 'User created successfully'});
  } catch (error) {
    const { status, errors } = handleErrors(error);
    res.status(status).send({ errors });
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
    const token = createToken(user.user_id);
    
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(200).send({ message: 'Login successful'});
  } catch (error) {
    const { status, errors } = handleErrors(error);
    res.status(status).send({ errors });
  }
};

module.exports = {
  register,
  login
};
