import jwt from 'jsonwebtoken';

/**
 * checks and performs actions based on validity of a user's token 
 * @param {object} req
 * @param {string} req.body.token
 * @param {object} res
 * @param {function} next
 * @returns {object} created group profile
 */
const authenticate = (req, res, next) => {
  const token = req.body.token || req.query.token
  || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          message: 'Failed to authenticate token',
          status: 401 });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      message: 'No token provided.'
    });
  }
};

export default authenticate;
