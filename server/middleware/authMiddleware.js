const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.header("accessToken")

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'Apartelle Secret Website', (err, decodedToken) => {
      if (err) {  
        console.log(err.message);
        res.json({error: "not logged in"});   
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.json({error: "not logged in"});
  }
};

const authRole = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.header('accessToken');
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, 'Apartelle Secret Website', (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(403).send({error: "not logged in"});
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
      res.status(403).send({ message: 'Access denied. Insufficient permissions.' });
    } 
  };
};

module.exports = { 
  requireAuth,
  authRole
 };