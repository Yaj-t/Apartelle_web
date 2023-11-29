const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 *60;
const createToken = (id, userType) => {
  return jwt.sign({ id , userType}, 'Apartelle Secret Website', {
    expiresIn: maxAge
  })
}

function handleErrors(error) {
  let errors = { email: '', contactNumber: ''};

  if(error.message === 'Incorrect Email and Password'){
    errors.email = 'Incorrect Email and Password';
    return { status: 401, errors }; // 401 Unauthorized
  }

  // Handling duplicate email or contact number
  if (error.name === 'SequelizeUniqueConstraintError') {
    if (error.errors && error.errors.length > 0) {
      error.errors.forEach((err) => {
        if (err.path === 'email') {
          errors.email = 'Email already registered';
        }
        if (err.path === 'contactNumber') {
          errors.contactNumber = 'Contact number already registered';
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


const signup = async (req, res) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create user
    const user = await db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      contactNumber: req.body.contactNumber,
      userType: 'User' // Or based on what you receive in req.body
    });

    const token = createToken(user.userId, user.userType);
    // res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).send({ message: 'User created successfully'});
  } catch (error) {
    const { status, errors } = handleErrors(error);
    console.log(error);
    res.status(status).send({ errors });
  }
};

const login = async (req, res) => {
  try {
    // Find user
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (!user) {
      throw Error('Incorrect Email and Password');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      throw Error('Incorrect Email and Password');
    }

    // Generate token
    const token = createToken(user.userId, user.userType);
    
    // res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000})
    // res.setHeader('Set-Cookie', `jwt=${token}; max-age=${maxAge}; httpOnly`);
    res.status(200).json({'accessToken': token});
  } catch (error) {
    const { status, errors } = handleErrors(error);
    res.status(status).send({ errors });
  }
};

const logout = (req, res) => {
  res.cookie('jwt', '', {maxAge: 1})
  res.redirect('/home');
}

module.exports = {
  signup,
  login,
  logout
};
