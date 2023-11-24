const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'Apartelle Secret Website', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/auth/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/auth/login');
  }
};

const authRole = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, 'Apartelle Secret Website', (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect('/auth/login');
        } else {
          console.log(decodedToken);
          const userType = decodedToken.user_type;
    
          if (allowedRoles.includes(userType)) {
            next(); // User has an allowed role, proceed to the next middleware or route handler
          } else {
            res.status(403).send({ message: 'Access denied. Insufficient permissions.' });
          }
        }
      });
    } else {
      res.redirect('/auth/login');
    } 
  };
};

module.exports = { 
  requireAuth,
  authRole
 };