const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.header('accessToken');

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'Apartelle Secret Website', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(403).json({ error: 'not logged in' });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(403).json({ error: 'not logged in' });
  }
};

const authRole = allowedRoles => {
  return (req, res, next) => {
    const token = req.header('accessToken');
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, 'Apartelle Secret Website', (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(403).send({ error: 'not logged in' });
        } else {
          console.log(decodedToken);
          const userType = decodedToken.userType;

          if (allowedRoles.includes(userType)) {
            next(); // User has an allowed role, proceed to the next middleware or route handler
          } else {
            console.log('not authorized');
            res
              .status(403)
              .send({
                message: 'Access denied. Insufficient permissions.',
                error: 'Not Authorized'
              });
          }
        }
      });
    } else {
      res
        .status(403)
        .send({
          message: 'Access denied. Insufficient permissions.',
          error: 'Not Authorized'
        });
    }
  };
};

module.exports = {
  requireAuth,
  authRole
};
